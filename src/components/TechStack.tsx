const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "OpenAI", category: "AI" },
  { name: "Vercel", category: "Hosting" },
];

const TechStack = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(280,70%,65%)]">Modern Tech</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by the latest technologies for optimal performance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-lg font-semibold text-card-foreground mb-1">{tech.name}</div>
              <div className="text-sm text-muted-foreground">{tech.category}</div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-3 text-foreground">Clean, Production-Ready Code</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every website is generated with clean HTML, CSS, and JavaScript following industry best practices. 
            Export your code or deploy instantly - it's your choice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
