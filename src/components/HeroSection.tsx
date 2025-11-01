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
}

export const HeroSection = ({ name, title, bio, skills, email, linkedin, github, imageUrl }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 border-b border-border">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-block">
                <Badge variant="outline" className="border-primary/50 text-primary mb-4">
                  Disponível para Oportunidades
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight">
                {name}
              </h1>
              
              <p className="text-xl lg:text-2xl text-primary font-semibold">
                {title}
              </p>
              
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {bio}
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              )}
              {linkedin && (
                <a
                  href={`https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-muted transition-all hover:scale-105 shadow-md"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              )}
              {github && (
                <a
                  href={`https://${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-muted transition-all hover:scale-105 shadow-md"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Principais Habilidades
              </h3>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              
              {/* Image container */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-6xl lg:text-8xl font-bold text-primary-foreground">
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
