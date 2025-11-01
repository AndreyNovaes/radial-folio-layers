import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { myStory } from "@/data/portfolioData";
import { Zap, Target, Shield, TrendingUp } from "lucide-react";

export const MyStory = () => {
  const traits = [
    { icon: Zap, label: "Capacidade Analítica", value: "93.7%", color: "text-primary" },
    { icon: Target, label: "Facilitação", value: "93.7%", color: "text-core" },
    { icon: Shield, label: "Pensamento Criativo", value: "84.6%", color: "text-advanced" },
    { icon: TrendingUp, label: "Ambição", value: "80.0%", color: "text-specialist" }
  ];

  return (
    <section className="w-full py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Sobre Mim
          </Badge>
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {myStory.title}
          </h2>
          <p className="text-lg text-muted-foreground italic">
            {myStory.subtitle}
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm">
          <div className="prose prose-invert max-w-none">
            {myStory.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Perfil Psicológico (Big Five Assessment)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {traits.map((trait, index) => {
                const Icon = trait.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className={`${trait.color} opacity-80`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{trait.label}</div>
                      <div className="text-lg font-bold text-foreground">{trait.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center italic">
              Baseado em avaliações de Perfil Comportamental, Estilo de Trabalho e Motivação
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
