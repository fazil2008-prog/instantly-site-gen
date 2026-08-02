import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const SYSTEM_PROMPT = `You are an expert web designer. Given a short description, output ONE complete, self-contained HTML document for a beautiful, responsive marketing website.

Rules:
- Output ONLY raw HTML. No markdown fences, no commentary.
- Include <!DOCTYPE html>, <head> with a <title> and <meta name="description">, and a single <h1>.
- Style everything with Tailwind via <script src="https://cdn.tailwindcss.com"></script>.
- Use images only from https://images.unsplash.com or inline SVG.
- Include a hero, at least two content sections, and a footer.
- Modern, distinctive design. Avoid generic purple-on-white gradients.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Not authenticated" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) return json({ error: "Not authenticated" }, 401);

    const body = await req.json().catch(() => null);
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (prompt.length < 5 || prompt.length > 2000) {
      return json({ error: "Prompt must be between 5 and 2000 characters." }, 400);
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI is not configured." }, 500);

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Lovable-API-Key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!aiRes.ok) {
      const details = await aiRes.text();
      console.error(`AI gateway failed [${aiRes.status}]: ${details}`);
      if (aiRes.status === 429) return json({ error: "Rate limit reached. Please try again shortly." }, 429);
      if (aiRes.status === 402) return json({ error: "AI credits exhausted. Please add credits to continue." }, 402);
      return json({ error: "Generation failed.", details }, aiRes.status);
    }

    const aiJson = await aiRes.json();
    let html: string = aiJson?.choices?.[0]?.message?.content ?? "";
    html = html.replace(/^\s*```(?:html)?\s*/i, "").replace(/```\s*$/, "").trim();
    if (!html) return json({ error: "The model returned an empty result." }, 502);

    const title =
      html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim().slice(0, 120) ||
      prompt.slice(0, 60);

    const { data: site, error: insertError } = await supabase
      .from("sites")
      .insert({ user_id: userData.user.id, prompt, html, title })
      .select()
      .single();

    if (insertError) {
      console.error("Insert failed:", insertError.message);
      return json({ error: "Could not save the generated site." }, 500);
    }

    return json({ site });
  } catch (error) {
    console.error("generate-site error:", error);
    return json({ error: error instanceof Error ? error.message : "Unexpected error" }, 500);
  }
});
