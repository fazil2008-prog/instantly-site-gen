import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const examples = [
  {
    prompt: "Create a bakery website with pink theme and online menu",
    category: "E-commerce",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    prompt: "Build a personal portfolio for a UI/UX designer",
    category: "Portfolio",
    gradient: "from-purple-500/20 to-indigo-500/20",
  },
  {
    prompt: "Generate a landing page for a travel company",
    category: "Landing Page",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    prompt: "Photography studio website with gallery showcase",
    category: "Creative",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    prompt: "Tech startup landing page with modern animations",
    category: "Startup",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    prompt: "Restaurant website with reservation system",
    category: "Restaurant",
    gradient: "from-red-500/20 to-pink-500/20",
  },
];

const ExamplePrompts = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(280,70%,65%)]">Inspired</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with these example prompts or create your own
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {examples.map((example, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-xl border border-border bg-gradient-to-br ${example.gradient} hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-elegant)] cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-card text-card-foreground border border-border">
                  {example.category}
                </span>
              </div>
              <p className="text-foreground font-medium mb-4 leading-relaxed">
                "{example.prompt}"
              </p>
              <div className="flex items-center text-primary text-sm font-semibold group-hover:translate-x-2 transition-transform">
                Try this prompt
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-primary/20">
            <h3 className="text-2xl font-bold text-card-foreground">Ready to create your website?</h3>
            <p className="text-muted-foreground max-w-md">
              Type your idea and watch AI bring it to life
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-[hsl(280,70%,65%)] text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all duration-300 px-8 group">
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplePrompts;
