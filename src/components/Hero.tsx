import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-ai-generator.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" 
           style={{ background: 'var(--gradient-mesh)' }} />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">AI-Powered Website Generation</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-[hsl(280,70%,65%)] animate-gradient-shift bg-[length:200%_auto]">
                Build Websites
              </span>
              <br />
              <span className="text-foreground">In Seconds, Not Weeks</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transform your ideas into stunning, responsive websites with a single prompt. 
              AI designs, writes, and deploys your site automatically.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-[hsl(280,70%,65%)] text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all duration-300 px-8 py-6 text-lg font-semibold group">
                <Link to="/auth">
                  Start Creating Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary/30 hover:border-primary hover:bg-secondary transition-all duration-300 px-8 py-6 text-lg font-semibold">
                <Link to="/dashboard">See Examples</Link>
              </Button>
            </div>


            {/* Hero Image */}
            <div className="pt-12 px-4">
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-[var(--shadow-elegant)]">
                <img 
                  src={heroImage} 
                  alt="AI Website Generator Interface" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>No coding required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Instant deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>SEO optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
