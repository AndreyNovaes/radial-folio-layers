import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  imageUrl?: string;
}

export const ProfileCard = ({ name, title, bio, skills, imageUrl }: ProfileCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30 shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-foreground">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">{name}</h2>
          <p className="text-sm text-primary font-semibold uppercase tracking-wider">{title}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          {bio}
        </p>

        {/* Skills/Motivations */}
        <div className="w-full space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase text-center">
            Key Skills
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill, index) => (
              <Badge 
                key={index}
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
