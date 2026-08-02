import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, LogOut, Sparkles, Trash2 } from "lucide-react";

type Site = {
  id: string;
  title: string;
  prompt: string;
  html: string;
  created_at: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { session, loading, signOut } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) navigate("/auth", { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("sites")
      .select("id, title, prompt, html, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast.error("Could not load your sites.");
          return;
        }
        setSites(data ?? []);
        setActiveId((current) => current ?? data?.[0]?.id ?? null);
      });
  }, [session]);

  const handleGenerate = async () => {
    const trimmed = prompt.trim();
    if (trimmed.length < 5) {
      toast.error("Describe your site in at least 5 characters.");
      return;
    }
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke("generate-site", {
      body: { prompt: trimmed },
    });
    setGenerating(false);

    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      let message = "Generation failed. Please try again.";
      try {
        message = JSON.parse(details).error ?? message;
      } catch {
        /* keep default */
      }
      toast.error(message);
      return;
    }

    const site = data?.site as Site | undefined;
    if (!site) {
      toast.error("Generation failed. Please try again.");
      return;
    }
    setSites((current) => [site, ...current]);
    setActiveId(site.id);
    setPrompt("");
    toast.success("Your website is ready!");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("sites").delete().eq("id", id);
    if (error) {
      toast.error("Could not delete that site.");
      return;
    }
    setSites((current) => current.filter((site) => site.id !== id));
    setActiveId((current) => (current === id ? null : current));
  };

  const activeSite = sites.find((site) => site.id === activeId) ?? null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">Your workspace</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => signOut().then(() => navigate("/"))}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Describe your website</CardTitle>
              <CardDescription>One prompt is all it takes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                maxLength={2000}
                rows={5}
                placeholder="A landing page for a specialty coffee roastery with a shop section and story timeline"
              />
              <Button className="w-full" onClick={handleGenerate} disabled={generating}>
                {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {generating ? "Generating..." : "Generate website"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your sites</CardTitle>
              <CardDescription>{sites.length} saved</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {sites.length === 0 && (
                <p className="text-sm text-muted-foreground">Nothing yet — generate your first site.</p>
              )}
              {sites.map((site) => (
                <div
                  key={site.id}
                  className={`flex items-center gap-2 rounded-lg border p-3 transition-colors ${
                    site.id === activeId ? "border-primary bg-secondary" : "border-border"
                  }`}
                >
                  <button className="flex-1 text-left" onClick={() => setActiveId(site.id)}>
                    <span className="block text-sm font-medium truncate">{site.title}</span>
                    <span className="block text-xs text-muted-foreground truncate">{site.prompt}</span>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${site.title}`}
                    onClick={() => handleDelete(site.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="min-h-[600px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">{activeSite ? activeSite.title : "Preview"}</CardTitle>
            <CardDescription>Live preview of the generated website.</CardDescription>
          </CardHeader>
          <CardContent className="h-[70vh]">
            {activeSite ? (
              <iframe
                title={activeSite.title}
                srcDoc={activeSite.html}
                sandbox="allow-scripts"
                className="w-full h-full rounded-lg border border-border bg-white"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                Generate a site to see it here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
