import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github } from "lucide-react";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  email?: string;
  linkedin?: string;
  github?: string;
  imageUrl?: string;
  onEmailClick?: () => void;
}

export const HeroSection = ({ name, title, bio, skills, email, linkedin, github, imageUrl, onEmailClick }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card/30 to-background border-b border-border/50 pt-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left animate-slide-up-fade">
            <div className="space-y-5">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                {name}
              </h1>
              
              <p className="text-xl lg:text-3xl text-primary font-semibold tracking-wide">
                {title}
              </p>
              
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {bio}
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {email && (
                <button
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/25"
                  onClick={() => {
                    onEmailClick?.();
                  }}
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-semibold">Email</span>
                </button>
              )}
              {linkedin && (
                <a
                  href={`https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-card/50 backdrop-blur-sm border border-border/70 text-foreground rounded-lg hover:bg-card hover:border-primary/30 transition-all hover:scale-105 shadow-lg"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-semibold">LinkedIn</span>
                </a>
              )}
              {github && (
                <a
                  href={`https://${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-card/50 backdrop-blur-sm border border-border/70 text-foreground rounded-lg hover:bg-card hover:border-primary/30 transition-all hover:scale-105 shadow-lg"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-semibold">GitHub</span>
                </a>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Arsenal Técnico
              </h3>
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-primary/40 bg-primary/10 text-foreground hover:bg-primary/20 hover:border-primary/60 transition-all hover:scale-105 px-3 py-1.5 text-sm font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <style>{`
              @keyframes float-pulse {
                0%, 100% {
                  transform: translateY(0px) scale(1);
                }
                50% {
                  transform: translateY(-12px) scale(1.02);
                }
              }
              @keyframes border-pulse {
                0%, 100% {
                  opacity: 0.5;
                }
                50% {
                  opacity: 1;
                }
              }
              .animate-float-pulse {
                animation: float-pulse 4s ease-in-out infinite;
              }
              .animate-border-pulse {
                animation: border-pulse 3s ease-in-out infinite;
              }
            `}</style>
            <div className="relative animate-float-pulse">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

              {/* Image container */}
              <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                {/* Animated border rings */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-border-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-4 rounded-full border border-accent/30 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />

                {/* Image */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-primary/60 shadow-2xl shadow-primary/30 bg-gradient-to-br from-card to-muted">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/80 via-accent/60 to-secondary/80 flex items-center justify-center">
                      <span className="text-7xl lg:text-9xl font-bold text-background drop-shadow-2xl">
                        {name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
