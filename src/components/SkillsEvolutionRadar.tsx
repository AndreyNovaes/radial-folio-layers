import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillsEvolution, type SkillEvolution } from "@/data/portfolioData";

type YearType = "2024" | "2025" | "meta";

interface SkillsEvolutionRadarProps {
  skills?: SkillEvolution[];
}

export const SkillsEvolutionRadar = ({ skills = skillsEvolution }: SkillsEvolutionRadarProps) => {
  const [selectedYear, setSelectedYear] = useState<YearType>("2025");
  const [showSoftSkills, setShowSoftSkills] = useState(true);
  const [showHardSkills, setShowHardSkills] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const centerX = 300;
  const centerY = 300;
  const maxRadius = 200;
  const minRadius = 40;

  // Filter skills based on selection
  const filteredSkills = skills.filter(skill => {
    if (skill.isSoftSkill && !showSoftSkills) return false;
    if (!skill.isSoftSkill && !showHardSkills) return false;
    return true;
  });

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

  const yearLabels: Record<YearType, string> = {
    "2024": "2024 - Fundação",
    "2025": "2025 - Presente",
    "meta": "Próximo Nível"
  };

  return (
    <Card className="relative w-full max-w-[700px] p-8 bg-gradient-to-br from-card/50 to-background border-border/50 backdrop-blur-sm">
      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(yearLabels) as YearType[]).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedYear === year
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {yearLabels[year]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setShowHardSkills(!showHardSkills)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              showHardSkills
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Hard Skills
          </button>
          <button
            onClick={() => setShowSoftSkills(!showSoftSkills)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              showSoftSkills
                ? "bg-secondary/20 text-secondary-foreground border border-secondary/30"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Soft Skills
          </button>
        </div>
      </div>

      {/* SVG Radar Chart */}
      <div className="relative w-full aspect-square max-w-[600px] mx-auto">
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
                onMouseEnter={() => setHoveredSkill(point.skill.label)}
                onMouseLeave={() => setHoveredSkill(null)}
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
                  className={`text-xs font-semibold transition-all duration-300 ${
                    isHovered ? "fill-primary" : "fill-foreground"
                  }`}
                  style={{ fontSize: isHovered ? "12px" : "10px" }}
                >
                  {point.skill.label}
                </text>

                {/* Value on hover */}
                {isHovered && (
                  <>
                    <text
                      x={labelX}
                      y={labelY + 14}
                      textAnchor={labelX > centerX ? "start" : labelX < centerX ? "end" : "middle"}
                      className="text-xs font-bold fill-primary"
                    >
                      {point.value}%
                    </text>
                    {point.skill.isSoftSkill && (
                      <text
                        x={labelX}
                        y={labelY + 26}
                        textAnchor={labelX > centerX ? "start" : labelX < centerX ? "end" : "middle"}
                        className="text-[9px] fill-muted-foreground"
                      >
                        soft skill
                      </text>
                    )}
                  </>
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
              y={centerY - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-bold fill-primary"
            >
              {yearLabels[selectedYear].split(' - ')[0]}
            </text>
            <text
              x={centerX}
              y={centerY + 8}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-muted-foreground"
            >
              {yearLabels[selectedYear].split(' - ')[1]}
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Ano Selecionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-muted-foreground opacity-40" style={{ borderTop: "2px dashed" }} />
          <span className="text-xs text-muted-foreground">2024 (Base)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-accent opacity-30" style={{ borderTop: "2px dashed" }} />
          <span className="text-xs text-muted-foreground">Meta Futura</span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          <Badge variant="outline" className="mr-2">
            {filteredSkills.filter(s => !s.isSoftSkill).length} Hard Skills
          </Badge>
          <Badge variant="outline">
            {filteredSkills.filter(s => s.isSoftSkill).length} Soft Skills
          </Badge>
        </p>
      </div>
    </Card>
  );
};
