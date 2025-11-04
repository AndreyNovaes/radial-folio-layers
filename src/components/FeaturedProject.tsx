import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Zap } from "lucide-react";
import { projects } from "@/data/portfolioData";

export const FeaturedProject = () => {
  const featuredProject = projects[0];

  if (!featuredProject) return null;

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-muted/10 to-transparent">
      <div className="container mx-auto px-0 lg:px-12">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projeto de Destaque
            </h2>
          </div>
        </div>

        <Card className="overflow-hidden bg-gradient-to-br from-card/80 via-card/40 to-background border-border/50 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            {featuredProject.image && (
              <div className="relative h-64 lg:h-96 overflow-hidden bg-muted/30">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute top-6 right-6">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    Concluído
                  </Badge>
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    {featuredProject.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {featuredProject.description}
                  </p>
                </div>

                {/* Highlights */}
                {featuredProject.highlights && featuredProject.highlights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Destaques
                    </h4>
                    <ul className="space-y-2">
                      {featuredProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary font-bold mt-0.5">✓</span>
                          <span className="text-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Stack Tecnológico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-primary/50 bg-primary/10 text-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mt-8 pt-8 border-t border-border/30">
                {featuredProject.github && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-card border border-primary/30 hover:bg-primary/10 hover:border-primary/60 rounded-lg font-semibold text-foreground transition-all hover:scale-105"
                  >
                    <Github className="w-5 h-5" />
                    Ver no GitHub
                  </a>
                )}
                {featuredProject.link && (
                  <a
                    href={featuredProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-primary/25"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ver Projeto
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
