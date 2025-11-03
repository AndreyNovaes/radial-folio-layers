import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimelineItem } from "@/data/portfolioData";

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="relative pl-20">
              {/* Bolinha na linha do tempo */}
              <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg" />

              <Card className="p-6 bg-gradient-to-br from-card to-muted/20 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                      {item.period}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">{item.company}</p>
                  </div>

                  <p className="text-foreground leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-primary/50 text-foreground hover:bg-primary/10 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
