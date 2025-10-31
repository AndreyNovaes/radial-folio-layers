import { useState } from "react";
import { Card } from "@/components/ui/card";

interface RadialSection {
  id: string;
  label: string;
  color: string;
  layer: "core" | "advanced" | "specialist" | "expert";
  angle: number;
}

interface RadialMenuProps {
  onSectionSelect: (section: RadialSection) => void;
  selectedSection: string | null;
}

const sections: RadialSection[] = [
  // Core level - 2 sections
  { id: "ta", label: "TA", color: "hsl(var(--core))", layer: "core", angle: 0 },
  { id: "tm", label: "TM", color: "hsl(var(--supporting))", layer: "core", angle: 180 },
  
  // Advanced level - 2 sections
  { id: "tta", label: "TTA", color: "hsl(var(--advanced))", layer: "advanced", angle: 90 },
  { id: "ttae", label: "TTAE", color: "hsl(var(--supporting))", layer: "advanced", angle: 270 },
  
  // Specialist level - 7 sections
  { id: "game", label: "Game", color: "hsl(var(--specialist))", layer: "specialist", angle: 0 },
  { id: "gt", label: "GT", color: "hsl(var(--specialist))", layer: "specialist", angle: 51 },
  { id: "aut", label: "AUT", color: "hsl(var(--specialist))", layer: "specialist", angle: 102 },
  { id: "ut", label: "UT", color: "hsl(var(--specialist))", layer: "specialist", angle: 153 },
  { id: "sec", label: "SEC", color: "hsl(var(--specialist))", layer: "specialist", angle: 204 },
  { id: "pt", label: "PT", color: "hsl(var(--specialist))", layer: "specialist", angle: 255 },
  { id: "at", label: "AT", color: "hsl(var(--specialist))", layer: "specialist", angle: 306 },
  
  // Expert level - 5 sections
  { id: "tm-mtrt", label: "TM-MTrT", color: "hsl(var(--expert))", layer: "expert", angle: 0 },
  { id: "tm-stm", label: "TM-STM", color: "hsl(var(--expert))", layer: "expert", angle: 72 },
  { id: "tm-otm", label: "TM-OTM", color: "hsl(var(--expert))", layer: "expert", angle: 144 },
  { id: "itp-atp", label: "ITP-ATP", color: "hsl(var(--expert))", layer: "expert", angle: 216 },
  { id: "itp-itpa", label: "ITP-ITPA", color: "hsl(var(--expert))", layer: "expert", angle: 288 },
];

const layerConfig = {
  core: { radius: 120, ringRadius: 100, strokeWidth: 3 },
  advanced: { radius: 160, ringRadius: 140, strokeWidth: 3 },
  specialist: { radius: 200, ringRadius: 180, strokeWidth: 3 },
  expert: { radius: 240, ringRadius: 220, strokeWidth: 3 }
};

export const RadialMenu = ({ onSectionSelect, selectedSection }: RadialMenuProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const centerX = 300;
  const centerY = 300;

  const getPositionOnCircle = (angle: number, radius: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  const handleClick = (section: RadialSection) => {
    onSectionSelect(section);
  };

  return (
    <Card className="relative w-full max-w-[600px] aspect-square p-4 bg-gradient-to-br from-card to-muted/20 shadow-2xl overflow-hidden">
      <svg 
        viewBox="0 0 600 600" 
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
      >
        <defs>
          {/* Gradientes para as camadas */}
          <radialGradient id="centerGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          
          {/* Filtros de sombra */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r="250" 
          fill="url(#centerGlow)" 
          className="animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        {/* Anéis das camadas */}
        {Object.entries(layerConfig).map(([layer, config]) => (
          <circle
            key={layer}
            cx={centerX}
            cy={centerY}
            r={config.ringRadius}
            fill="none"
            stroke={`hsl(var(--${layer}))`}
            strokeWidth={config.strokeWidth}
            strokeOpacity="0.3"
            className="transition-all duration-500"
          />
        ))}

        {/* Centro - CTFL */}
        <g>
          <circle
            cx={centerX}
            cy={centerY}
            r="70"
            fill="hsl(var(--primary))"
            fillOpacity="0.15"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            filter="url(#glow)"
            className="transition-all duration-300"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="60"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-3xl font-bold"
            fill="hsl(var(--primary))"
          >
            CTFL
          </text>
        </g>

        {/* Labels das camadas */}
        <text
          x={centerX}
          y={centerY - 95}
          textAnchor="middle"
          className="text-xs font-semibold uppercase tracking-wider"
          fill="hsl(var(--core))"
          fillOpacity="0.7"
        >
          Core
        </text>
        <text
          x={centerX}
          y={centerY - 135}
          textAnchor="middle"
          className="text-xs font-semibold uppercase tracking-wider"
          fill="hsl(var(--advanced))"
          fillOpacity="0.7"
        >
          Advanced
        </text>
        <text
          x={centerX}
          y={centerY - 175}
          textAnchor="middle"
          className="text-xs font-semibold uppercase tracking-wider"
          fill="hsl(var(--specialist))"
          fillOpacity="0.7"
        >
          Specialist
        </text>
        <text
          x={centerX}
          y={centerY - 215}
          textAnchor="middle"
          className="text-xs font-semibold uppercase tracking-wider"
          fill="hsl(var(--expert))"
          fillOpacity="0.7"
        >
          Expert
        </text>

        {/* Seções interativas */}
        {sections.map((section) => {
          const config = layerConfig[section.layer];
          const pos = getPositionOnCircle(section.angle, config.radius);
          const isSelected = selectedSection === section.id;
          const isHovered = hoveredSection === section.id;
          const scale = isSelected ? 1.15 : isHovered ? 1.1 : 1;

          return (
            <g 
              key={section.id}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => handleClick(section)}
              style={{ 
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                transformOrigin: `${pos.x}px ${pos.y}px`
              }}
            >
              {/* Glow effect quando hover/selected */}
              {(isHovered || isSelected) && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="22"
                  fill={section.color}
                  fillOpacity="0.2"
                  className="animate-pulse"
                />
              )}
              
              {/* Círculo do botão */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="18"
                fill={isSelected ? section.color : "hsl(var(--card))"}
                stroke={section.color}
                strokeWidth={isSelected ? "3" : "2"}
                filter={isHovered || isSelected ? "url(#glow)" : ""}
                className="transition-all duration-300"
              />
              
              {/* Texto do label */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold pointer-events-none"
                fill={isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
              >
                {section.label}
              </text>

              {/* Linha conectando ao anel */}
              <line
                x1={centerX + (config.ringRadius * Math.cos((section.angle - 90) * Math.PI / 180))}
                y1={centerY + (config.ringRadius * Math.sin((section.angle - 90) * Math.PI / 180))}
                x2={pos.x}
                y2={pos.y}
                stroke={section.color}
                strokeWidth={isSelected ? "2" : "1"}
                strokeOpacity={isHovered || isSelected ? "0.5" : "0.2"}
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>
    </Card>
  );
};
