import { useState } from "react";
import { Card } from "@/components/ui/card";

interface RadialSection {
  id: string;
  label: string;
  color: string;
  layer: "core" | "advanced" | "specialist" | "expert";
}

interface RadialMenuProps {
  onSectionSelect: (section: RadialSection) => void;
  selectedSection: string | null;
}

const sections: RadialSection[] = [
  // Core level
  { id: "ta", label: "TA", color: "bg-core", layer: "core" },
  { id: "tm", label: "TM", color: "bg-supporting", layer: "core" },
  
  // Advanced level
  { id: "tta", label: "TTA", color: "bg-advanced", layer: "advanced" },
  { id: "ttae", label: "TTAE", color: "bg-supporting", layer: "advanced" },
  
  // Specialist level
  { id: "game", label: "Game", color: "bg-specialist", layer: "specialist" },
  { id: "gt", label: "GT", color: "bg-specialist", layer: "specialist" },
  { id: "aut", label: "AUT", color: "bg-specialist", layer: "specialist" },
  { id: "ut", label: "UT", color: "bg-specialist", layer: "specialist" },
  { id: "sec", label: "SEC", color: "bg-specialist", layer: "specialist" },
  { id: "pt", label: "PT", color: "bg-specialist", layer: "specialist" },
  { id: "at", label: "AT", color: "bg-specialist", layer: "specialist" },
  
  // Expert level
  { id: "tm-mtrt", label: "TM-MTrT", color: "bg-advanced", layer: "expert" },
  { id: "tm-stm", label: "TM-STM", color: "bg-advanced", layer: "expert" },
  { id: "tm-otm", label: "TM-OTM", color: "bg-supporting", layer: "expert" },
  { id: "itp-atp", label: "ITP-ATP", color: "bg-advanced", layer: "expert" },
  { id: "itp-itpa", label: "ITP-ITPA", color: "bg-advanced", layer: "expert" },
];

export const RadialMenu = ({ onSectionSelect, selectedSection }: RadialMenuProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleClick = (section: RadialSection) => {
    onSectionSelect(section);
  };

  return (
    <Card className="relative w-full max-w-2xl aspect-square p-8 bg-card shadow-lg">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Center Circle - CTFL */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-supporting flex items-center justify-center border-8 border-primary z-20">
            <span className="text-4xl font-bold text-primary">CTFL</span>
          </div>
        </div>

        {/* Inner Ring - CORE */}
        <div className="absolute inset-12 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border-8 border-advanced flex items-center justify-center">
            <span className="text-xl font-semibold text-advanced">CORE</span>
          </div>
        </div>

        {/* Middle Ring - ADVANCED */}
        <div className="absolute inset-6 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full border-8 border-primary flex items-center justify-center">
            <span className="text-xl font-semibold text-primary absolute top-16">ADVANCED</span>
          </div>
        </div>

        {/* Outer Ring - SPECIALIST */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-8 border-specialist flex items-center justify-center">
            <span className="text-xl font-semibold text-specialist absolute bottom-24">SPECIALIST</span>
          </div>
        </div>

        {/* Interactive Sections */}
        <div className="absolute inset-0 flex items-center justify-center">
          {sections.map((section, index) => {
            const angle = (index / sections.length) * 360;
            const isSelected = selectedSection === section.id;
            const isHovered = hoveredSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`absolute px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  section.color
                } ${
                  isSelected ? "scale-110 shadow-lg ring-2 ring-ring" : ""
                } ${
                  isHovered ? "scale-105 shadow-md" : ""
                } hover:shadow-lg`}
                style={{
                  transform: `rotate(${angle}deg) translateY(-${
                    section.layer === "core" ? "140" :
                    section.layer === "advanced" ? "180" :
                    section.layer === "specialist" ? "220" : "260"
                  }px) rotate(-${angle}deg)`,
                }}
              >
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Expert Label */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-semibold text-expert">EXPERT</span>
        </div>
      </div>
    </Card>
  );
};
