import { MessageSquare, Palette, FileText, Code, Eye, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "User Prompt Input",
    description: "Type a natural language prompt describing your dream website",
  },
  {
    icon: Palette,
    title: "AI Design Generation",
    description: "AI creates a modern layout with matching colors and typography",
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Automatically generates SEO-optimized text and metadata",
  },
  {
    icon: Code,
    title: "Code Generation",
    description: "Produces clean, production-ready HTML, CSS, and JavaScript",
  },
  {
    icon: Eye,
    title: "Live Preview & Editing",
    description: "Real-time preview with options to customize every detail",
  },
  {
    icon: Rocket,
    title: "One-Click Deployment",
    description: "Publish your website to a live link instantly",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(280,70%,65%)]">Lovable AI</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From idea to live website in 6 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-elegant)] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(280,70%,65%)] flex items-center justify-center text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
