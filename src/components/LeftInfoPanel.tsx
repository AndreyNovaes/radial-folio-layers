import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LeftInfoPanelProps {
  selectedSection: {
    id: string;
    label: string;
    layer: string;
  } | null;
}

const sectionData: Record<string, {
  title: string;
  category: string;
  overview: string;
  details: string[];
}> = {
  ta: {
    title: "Test Analyst (TA)",
    category: "CORE",
    overview: "The Test Analyst certification focuses on the technical aspects of testing, including test design techniques and test analysis.",
    details: [
      "Advanced test design techniques",
      "Risk-based testing approaches",
      "Defect taxonomies and analysis",
      "Test data preparation"
    ]
  },
  tm: {
    title: "Test Manager (TM)",
    category: "CORE",
    overview: "The Test Manager certification covers test management, test process improvement, and people skills required for effective test management.",
    details: [
      "Test planning and estimation",
      "Risk management strategies",
      "Team leadership and communication",
      "Test metrics and reporting"
    ]
  },
  tta: {
    title: "Technical Test Analyst (TTA)",
    category: "ADVANCED",
    overview: "The Technical Test Analyst certification provides advanced knowledge in technical testing aspects.",
    details: [
      "White-box testing techniques",
      "Static and dynamic analysis",
      "Security and performance testing",
      "Technical test automation"
    ]
  },
  ttae: {
    title: "Test Technical Analyst Expert (TTAE)",
    category: "ADVANCED",
    overview: "Expert-level technical testing covering advanced automation and architecture.",
    details: [
      "Test architecture design",
      "Advanced automation frameworks",
      "Performance optimization",
      "DevOps integration"
    ]
  },
  game: {
    title: "Game Testing",
    category: "SPECIALIST",
    overview: "Specialized certification for testing video games and interactive entertainment software.",
    details: [
      "Game mechanics testing",
      "Platform-specific testing",
      "User experience validation",
      "Performance in gaming environments"
    ]
  },
  aut: {
    title: "Automotive Software Testing",
    category: "SPECIALIST",
    overview: "Specialized knowledge for testing automotive software systems and embedded systems.",
    details: [
      "Safety-critical systems",
      "AUTOSAR compliance",
      "Embedded systems testing",
      "ISO 26262 standards"
    ]
  },
  default: {
    title: "Portfolio Overview",
    category: "GENERAL",
    overview: "Explore the comprehensive testing certifications and specializations available in the ISTQB framework.",
    details: [
      "Multiple certification levels available",
      "Industry-recognized standards",
      "Global testing community",
      "Continuous professional development"
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
