import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Certification } from "@/data/portfolioData";
import { CheckCircle2, Clock, Target, Calendar } from "lucide-react";

interface CertificationsGoalsProps {
  certifications: Certification[];
}

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

export const CertificationsGoals = ({ certifications }: CertificationsGoalsProps) => {
  const groupedCerts = {
    year2025: certifications.filter(c => c.year === 2025),
    year2026: certifications.filter(c => c.year === 2026)
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Certificações & Objetivos</h2>
        <p className="text-muted-foreground">Minha evolução contínua em QA e Testing</p>
      </div>

      {/* 2025 - Certificações Conquistadas */}
      {groupedCerts.year2025.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            2025 - Certificações Conquistadas
          </h3>
          <div className="grid gap-4">
            {groupedCerts.year2025.map((cert) => {
              const config = statusConfig[cert.status];
              const Icon = config.icon;
              return (
                <Card key={cert.id} className={`p-4 border-2 ${config.bgColor} hover:shadow-lg transition-all`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${config.color}`} />
                        <h4 className="font-semibold text-foreground">{cert.name}</h4>
                      </div>
                      {cert.date && (
                        <p className="text-sm text-muted-foreground">{cert.date}</p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-col">
                      <Badge variant="outline" className="border-primary/50">
                        {cert.category}
                      </Badge>
                      <Badge className="bg-emerald-500/20 text-emerald-700 border border-emerald-500/50">
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* 2026 - Próximos Objetivos */}
      {groupedCerts.year2026.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            2026 - Próximos Objetivos
          </h3>
          <div className="grid gap-4">
            {groupedCerts.year2026.map((cert) => {
              const config = statusConfig[cert.status];
              const Icon = config.icon;
              return (
                <Card key={cert.id} className={`p-4 border-2 ${config.bgColor} hover:shadow-lg transition-all`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${config.color}`} />
                        <h4 className="font-semibold text-foreground">{cert.name}</h4>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                      <Badge variant="outline" className="border-primary/50">
                        {cert.category}
                      </Badge>
                      <Badge className="bg-amber-500/20 text-amber-700 border border-amber-500/50">
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
