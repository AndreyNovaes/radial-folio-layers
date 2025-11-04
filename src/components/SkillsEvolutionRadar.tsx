import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillsEvolution, type SkillEvolution } from "@/data/portfolioData";

type YearType = "2024" | "2025" | "meta";

interface SkillsEvolutionRadarProps {
  skills?: SkillEvolution[];
  showCard?: boolean;
}

export const SkillsEvolutionRadar = ({
  skills = skillsEvolution,
  showCard = true
}: SkillsEvolutionRadarProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const selectedYear: YearType = "2025";

  const centerX = 300;
  const centerY = 300;
  const maxRadius = 200;
  const minRadius = 40;

  // Responsive font size based on viewport
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const baseFontSize = isMobile ? 20 : 16;
  const hoverFontSize = isMobile ? 24 : 18;

  const handleSkillHover = (skillLabel: string | null) => {
    setHoveredSkill(skillLabel);
  };

  // Use all skills (only hard skills now)
  const filteredSkills = skills;

  // Calculate points for the radar chart
  const getRadarPoints = (year: YearType) => {
    const angleStep = (2 * Math.PI) / filteredSkills.length;
    return filteredSkills.map((skill, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const value = skill[year];
      const radius = minRadius + (maxRadius - minRadius) * (value / 100);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, angle, radius, skill, value };
    });
  };

  const currentPoints = getRadarPoints(selectedYear);
  const comparisonPoints = selectedYear !== "2024" ? getRadarPoints("2024") : null;
  const metaPoints = getRadarPoints("meta");

  const currentPolygon = currentPoints.map(p => `${p.x},${p.y}`).join(' ');
  const comparisonPolygon = comparisonPoints ? comparisonPoints.map(p => `${p.x},${p.y}`).join(' ') : null;
  const metaPolygon = metaPoints.map(p => `${p.x},${p.y}`).join(' ');

  const cardContent = (
    <>
      {/* SVG Radar Chart */}
      <div className="relative w-full aspect-square max-w-[700px] mx-auto">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="currentFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="metaFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background glow */}
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={maxRadius + 50} 
            fill="url(#radarGlow)" 
            className="animate-pulse"
            style={{ animationDuration: "6s" }}
          />

          {/* Concentric circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={minRadius + (maxRadius - minRadius) * ratio}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeOpacity={0.2 + i * 0.1}
              strokeDasharray="4 4"
            />
          ))}

          {/* Axis lines */}
          {currentPoints.map((point, index) => (
            <line
              key={`axis-${index}`}
              x1={centerX}
              y1={centerY}
              x2={centerX + maxRadius * Math.cos(point.angle)}
              y2={centerY + maxRadius * Math.sin(point.angle)}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
          ))}

          {/* Meta polygon (sempre visível como referência) */}
          <polygon
            points={metaPolygon}
            fill="url(#metaFill)"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            strokeDasharray="5 5"
            strokeLinejoin="round"
          />

          {/* Comparison polygon (2024) */}
          {comparisonPolygon && (
            <polygon
              points={comparisonPolygon}
              fill="hsl(var(--muted))"
              fillOpacity="0.1"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              strokeLinejoin="round"
              strokeDasharray="3 3"
            />
          )}

          {/* Current polygon */}
          <polygon
            points={currentPolygon}
            fill="url(#currentFill)"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-all duration-700"
            filter="url(#glow)"
          />

          {/* Data points and labels */}
          {currentPoints.map((point, index) => {
            const isHovered = hoveredSkill === point.skill.label;
            const labelRadius = maxRadius + 40;
            const labelX = centerX + labelRadius * Math.cos(point.angle);
            const labelY = centerY + labelRadius * Math.sin(point.angle);
            
            return (
              <g
                key={index}
                onMouseEnter={() => handleSkillHover(point.skill.label)}
                onMouseLeave={() => handleSkillHover(null)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Hover glow */}
                {isHovered && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="20"
                    fill={point.skill.color}
                    fillOpacity="0.2"
                    className="animate-pulse"
                  />
                )}
                
                {/* Data point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? "7" : "5"}
                  fill={point.skill.color}
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />

                {/* Skill label */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={labelX > centerX ? "start" : labelX < centerX ? "end" : "middle"}
                  dominantBaseline="middle"
                  className={`font-semibold transition-all duration-300 ${
                    isHovered ? "fill-primary" : "fill-foreground"
                  }`}
                  style={{ fontSize: isHovered ? `${hoverFontSize}px` : `${baseFontSize}px`, fontWeight: 700 }}
                >
                  {point.skill.label}
                </text>

                {/* Value on hover */}
                {isHovered && (
                  <text
                    x={labelX}
                    y={labelY + 16}
                    textAnchor={labelX > centerX ? "start" : labelX < centerX ? "end" : "middle"}
                    className="font-bold fill-primary"
                    style={{ fontSize: isMobile ? "16px" : "13px" }}
                  >
                    {point.value}%
                  </text>
                )}
              </g>
            );
          })}

          {/* Center label */}
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r={minRadius}
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              filter="url(#glow)"
            />
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-base font-bold fill-primary"
            >
              2025
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Ano</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-0.5 bg-muted-foreground opacity-40" style={{ borderTop: "1px dashed" }} />
          <span className="text-xs text-muted-foreground">Base</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-0.5 bg-accent opacity-30" style={{ borderTop: "1px dashed" }} />
          <span className="text-xs text-muted-foreground">Meta</span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 text-center">
        <Badge variant="outline" className="text-xs">
          {filteredSkills.length} Hard Skills
        </Badge>
      </div>
    </>
  );

  if (showCard) {
    return (
      <Card className="relative w-full p-6 bg-gradient-to-br from-card/50 to-background border-border/50 backdrop-blur-sm">
        {cardContent}
      </Card>
    );
  }

  return <div className="w-full">{cardContent}</div>;
};
