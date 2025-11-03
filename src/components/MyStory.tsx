import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { myStory, certifications, timeline } from "@/data/portfolioData";
import { CheckCircle2, Clock, Target } from "lucide-react";
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
      {/* SOBRE Section */}
      <section id="sobre" className="w-full py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Sobre Mim
            </Badge>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {myStory.title}
            </h2>
            <p className="text-lg text-muted-foreground italic mb-4">
              {myStory.subtitle}
            </p>
            <div className="prose prose-invert max-w-2xl mx-auto">
              {myStory.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0 text-sm md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPETÊNCIAS Section */}
      <section id="competencias" className="w-full py-10 px-6 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Competências
            </Badge>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Minha Jornada de Crescimento
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visualize minha evolução contínua em hard skills técnicas de 2024 ao presente em 2025.
            </p>
          </div>

            {/* 2 Column Layout - Evolução & Certificações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Evolução de Competências */}
            <div>
            <Card className="p-6 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm h-full flex flex-col">
              <h3 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">
                Evolução de Competências
              </h3>
              <div className="flex-1 flex items-center justify-center w-full">
                <SkillsEvolutionRadar showCard={false} />
              </div>
            </Card>
          </div>

            {/* Right - Certificações & Objetivos */}
            <div>
              {filteredCerts.length > 0 ? (
                <Card className="p-6 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm h-full flex flex-col">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">
                    Certificações & Objetivos
                  </h3>
                  <div className="space-y-3 flex-1">
                    {filteredCerts.map((cert) => {
                      const config = statusConfig[cert.status];
                      const Icon = config.icon;
                      return (
                        <Card
                          key={cert.id}
                          className={`p-3 border-2 ${config.bgColor} hover:shadow-lg transition-all`}
                        >
                          <div className="flex items-start gap-2">
                            <Icon className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`} />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-semibold text-foreground leading-tight mb-1">{cert.name}</h4>
                              {cert.date && (
                                <p className="text-xs text-muted-foreground mb-1">{cert.date}</p>
                              )}
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                  {cert.category}
                                </Badge>
                                <Badge className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30">
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
                <Card className="p-6 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm h-full flex flex-col items-center justify-center">
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
      </section>

      {/* TRAJETÓRIA Section */}
      <section id="trajetoria" className="w-full py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Trajetória
            </Badge>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Trajetória Profissional
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma visão geral de minha jornada profissional e crescimento contínuo.
            </p>
          </div>

          <Timeline items={timeline} />
        </div>
      </section>
    </>
  );
};
