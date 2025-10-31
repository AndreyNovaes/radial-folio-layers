import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LeftInfoPanelProps {
  selectedSection: {
    id: string;
    label: string;
    layer: string;
  } | null;
}

import { radialSections } from "@/data/portfolioData";

const sectionData: Record<string, {
  title: string;
  category: string;
  overview: string;
  details: string[];
}> = {
  ...radialSections,
  default: {
    title: "Visão Geral do Portfolio",
    category: "GERAL",
    overview: "Explore as certificações de teste e especializações disponíveis no framework ISTQB, alinhadas com meus objetivos profissionais.",
    details: [
      "Múltiplos níveis de certificação disponíveis",
      "Padrões reconhecidos pela indústria",
      "Comunidade global de testes",
      "Desenvolvimento profissional contínuo"
    ]
  }
};

export const LeftInfoPanel = ({ selectedSection }: LeftInfoPanelProps) => {
  const data = selectedSection 
    ? sectionData[selectedSection.id] || sectionData.default
    : sectionData.default;

  return (
    <Card className="p-6 h-full bg-card shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="space-y-4">
        <div>
          <Badge className="mb-2 bg-primary text-primary-foreground">{data.category}</Badge>
          <h2 className="text-2xl font-bold text-foreground">{data.title}</h2>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Overview</h3>
            <p className="text-foreground leading-relaxed">{data.overview}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Key Topics</h3>
            <ul className="space-y-2">
              {data.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
          Learn More →
        </button>
      </div>
    </Card>
  );
};
