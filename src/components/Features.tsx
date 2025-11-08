import { Zap, Sparkles, Globe, Shield, Smartphone, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Generation",
    description: "Generate complete websites in seconds with cutting-edge AI models",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Beautiful layouts with perfect color schemes and modern UI/UX",
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built-in SEO best practices for maximum visibility",
  },
  {
    icon: Shield,
    title: "Production Ready",
    description: "Clean, maintainable code that follows industry standards",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Perfect on all devices - mobile, tablet, and desktop",
  },
  {
    icon: TrendingUp,
    title: "Instant Deployment",
    description: "One-click publishing to live hosting with SSL",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(280,70%,65%)]">Every Project</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create professional websites with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
