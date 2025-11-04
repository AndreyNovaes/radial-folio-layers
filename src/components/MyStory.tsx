import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { myStory, certifications, timeline, projects } from "@/data/portfolioData";
import { CheckCircle2, Clock, Target, ExternalLink, Code } from "lucide-react";
import { SkillsEvolutionRadar } from "./SkillsEvolutionRadar";
import { Timeline } from "./Timeline";

export const MyStory = () => {
  // Mostrar sempre todas as certificações
  const filteredCerts = certifications;

  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      label: "Concluído",
      color: "text-green-500",
      bgColor: "bg-green-500/10 border-green-500/50"
    },
    "in-progress": {
      icon: Clock,
      label: "Em Progresso",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10 border-yellow-500/50"
    },
    planned: {
      icon: Target,
      label: "Planejado",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10 border-blue-500/50"
    }
  };

  return (
    <>
      {/* SOBRE + PROJETOS (LEFT) + TRAJETÓRIA (RIGHT) */}
      <section id="sobre" className="w-full py-20 px-6">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* LEFT COLUMN - SOBRE + PROJETOS (2 colunas) */}
            <div className="lg:col-span-2 space-y-8">
              {/* SOBRE */}
              <div>
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 w-fit">
                  Sobre Mim
                </Badge>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {myStory.title}
                </h2>
                <p className="text-lg text-muted-foreground italic mb-8">
                  {myStory.subtitle}
                </p>
                <div className="space-y-4">
                  {myStory.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* FEATURED PROJECTS GRID */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">
                  Projetos em Destaque
                </h3>
                <div className="space-y-4">
                  {projects.slice(0, 2).map((project) => (
                    <Card
                      key={project.id}
                      className="p-4 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm hover:shadow-lg transition-all"
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm line-clamp-2">
                            {project.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs px-2 py-0.5">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Links */}
                        <div className="flex gap-2 pt-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-primary/10 transition-colors"
                              aria-label="GitHub"
                            >
                              <Code className="w-4 h-4 text-muted-foreground hover:text-primary" />
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-primary/10 transition-colors"
                              aria-label="View project"
                            >
                              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - TRAJETÓRIA (Full Height - 3 colunas) */}
            <div id="trajetoria" className="lg:col-span-3 flex flex-col">
              <div className="flex flex-col items-center">
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 w-fit">
                  Trajetória
                </Badge>
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent text-center">
                  Trajetória Profissional
                </h2>
              </div>
              <div>
                <Timeline items={timeline} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETÊNCIAS Section */}
      <section id="competencias" className="w-full py-20 px-6 bg-muted/20">
        <div className="w-full">
          <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Competências
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Evolução de Hard Skills
            </h2>
          </div>

          {/* 2 Column Layout - Evolução & Certificações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left - Evolução de Competências */}
            <div>
              <Card className="p-8 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm h-full flex flex-col">
                <h3 className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wide">
                  2024 → 2025
                </h3>
                <div className="flex-1 flex items-center justify-center w-full">
                  <SkillsEvolutionRadar showCard={false} />
                </div>
              </Card>
            </div>

            {/* Right - Certificações & Objetivos */}
            <div>
              {filteredCerts.length > 0 ? (
                <Card className="p-8 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm h-full flex flex-col">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wide">
                    Certificações & Objetivos
                  </h3>
                  <div className="space-y-4 flex-1">
                    {filteredCerts.map((cert) => {
                      const config = statusConfig[cert.status];
                      const Icon = config.icon;
                      return (
                        <Card
                          key={cert.id}
                          className={`p-4 border-2 ${config.bgColor} hover:shadow-lg transition-all`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-semibold text-foreground leading-tight mb-1">{cert.name}</h4>
                              {cert.date && (
                                <p className="text-xs text-muted-foreground mb-2">{cert.date}</p>
                              )}
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs px-2 py-0.5">
                                  {cert.category}
                                </Badge>
                                <Badge className="text-xs px-2 py-0.5 bg-primary/20 text-primary border border-primary/30">
                                  {config.label}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              ) : (
                <Card className="p-8 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm h-full flex flex-col items-center justify-center">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Certificações & Objetivos
                  </h3>
                  <div className="text-center">
                    <CheckCircle2 className="w-8 h-8 text-muted-foreground mb-2 mx-auto opacity-50" />
                    <p className="text-xs text-muted-foreground">Nenhuma certificação neste período</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
          </div>
          </div>
      </section>
    </>
  );
};
