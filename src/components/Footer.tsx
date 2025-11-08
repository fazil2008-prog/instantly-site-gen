import { Heart, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6">
          {/* Logo/Brand */}
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(280,70%,65%)]">
              Lovable AI
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              AI-Powered Website Generation
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/lovable_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:shadow-lg group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://twitter.com/lovable_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:shadow-lg group"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Credits */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 Lovable AI — Built with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>by Ahmed Fazil</span>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
