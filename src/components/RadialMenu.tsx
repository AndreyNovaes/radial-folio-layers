import { useState } from "react";
import { Card } from "@/components/ui/card";

interface SkillData {
  label: string;
  value: number; // 0-100
  color: string;
}

interface RadialMenuProps {
  skills?: SkillData[];
  onSectionSelect?: (section: any) => void;
  selectedSection?: string | null;
}

const defaultSkills: SkillData[] = [
  { label: "Automação", value: 95, color: "hsl(var(--primary))" },
  { label: "API Testing", value: 90, color: "hsl(var(--core))" },
  { label: "Performance", value: 85, color: "hsl(var(--advanced))" },
  { label: "CI/CD", value: 88, color: "hsl(var(--specialist))" },
  { label: "Testes Manuais", value: 92, color: "hsl(var(--expert))" },
  { label: "Selenium", value: 90, color: "hsl(var(--supporting))" },
  { label: "Playwright", value: 93, color: "hsl(var(--primary))" },
  { label: "Cypress", value: 87, color: "hsl(var(--core))" },
];

export const RadialMenu = ({ skills = defaultSkills }: RadialMenuProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const centerX = 300;
  const centerY = 300;
  const maxRadius = 200;
  const minRadius = 40;

  // Calculate points for the radar chart
  const getRadarPoints = () => {
    const angleStep = (2 * Math.PI) / skills.length;
    return skills.map((skill, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const radius = minRadius + (maxRadius - minRadius) * (skill.value / 100);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, angle, radius, skill };
    });
  };

  const radarPoints = getRadarPoints();
  const polygonPoints = radarPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <Card className="relative w-full max-w-[600px] aspect-square p-8 bg-gradient-to-br from-card to-muted/20 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-[550px] max-h-[550px]">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
              
              <filter id="skillGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Background glow */}
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={maxRadius + 50} 
              fill="url(#radarGlow)" 
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />

            {/* Concentric circles (grid) */}
            {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={minRadius + (maxRadius - minRadius) * ratio}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="4 4"
              />
            ))}

            {/* Axis lines from center to each skill point */}
            {radarPoints.map((point, index) => (
              <line
                key={`axis-${index}`}
                x1={centerX}
                y1={centerY}
                x2={centerX + maxRadius * Math.cos(point.angle)}
                y2={centerY + maxRadius * Math.sin(point.angle)}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeOpacity="0.2"
              />
            ))}

            {/* Radar polygon (skill area) */}
            <polygon
              points={polygonPoints}
              fill="url(#radarFill)"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinejoin="round"
              className="transition-all duration-500"
              filter="url(#skillGlow)"
            />

            {/* Data points and labels */}
            {radarPoints.map((point, index) => {
              const isHovered = hoveredSkill === point.skill.label;
              const labelRadius = maxRadius + 30;
              const labelX = centerX + labelRadius * Math.cos(point.angle);
              const labelY = centerY + labelRadius * Math.sin(point.angle);
              
              return (
                <g
                  key={index}
                  onMouseEnter={() => setHoveredSkill(point.skill.label)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="cursor-pointer transition-all duration-300"
                >
                  {/* Hover glow effect */}
                  {isHovered && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="15"
                      fill={point.skill.color}
                      fillOpacity="0.2"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Data point */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isHovered ? "8" : "6"}
                    fill={point.skill.color}
                    stroke="hsl(var(--card))"
                    strokeWidth="2"
                    filter="url(#skillGlow)"
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
                    style={{ fontSize: isHovered ? "13px" : "11px" }}
                  >
                    {point.skill.label}
                  </text>

                  {/* Percentage on hover */}
                  {isHovered && (
                    <text
                      x={labelX}
                      y={labelY + 15}
                      textAnchor={labelX > centerX ? "start" : labelX < centerX ? "end" : "middle"}
                      className="text-xs font-bold fill-primary animate-fade-in"
                    >
                      {point.skill.value}%
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
                filter="url(#skillGlow)"
              />
              <text
                x={centerX}
                y={centerY - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold fill-primary"
              >
                Skills
              </text>
              <text
                x={centerX}
                y={centerY + 10}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-muted-foreground"
              >
                Radar
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
        {[
          { label: "0-25%", color: "bg-red-500/70" },
          { label: "25-50%", color: "bg-orange-500/70" },
          { label: "50-75%", color: "bg-yellow-500/70" },
          { label: "75-100%", color: "bg-green-500/70" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
