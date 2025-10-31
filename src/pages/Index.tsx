import { useState } from "react";
import { RadialMenu } from "@/components/RadialMenu";
import { LeftInfoPanel } from "@/components/LeftInfoPanel";
import { ProfileCard } from "@/components/ProfileCard";
import { Timeline } from "@/components/Timeline";
import { CertificationsGoals } from "@/components/CertificationsGoals";
import { profileData, timeline, certifications } from "@/data/portfolioData";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<{
    id: string;
    label: string;
    layer: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Portfolio Profissional</h1>
                <p className="text-xs text-muted-foreground">{profileData.name} - {profileData.title}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Info */}
          <div className="lg:col-span-3">
            <LeftInfoPanel selectedSection={selectedSection} />
          </div>

          {/* Center - Radial Menu */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <RadialMenu 
              onSectionSelect={setSelectedSection}
              selectedSection={selectedSection?.id || null}
            />
          </div>

          {/* Right Panel - Profile */}
          <div className="lg:col-span-3">
            <ProfileCard
              name={profileData.name}
              title={profileData.title}
              bio={profileData.bio}
              skills={profileData.skills}
              email={profileData.email}
              linkedin={profileData.linkedin}
              github={profileData.github}
              imageUrl={profileData.imageUrl}
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-12">
          <Timeline items={timeline} />
        </div>

        {/* Certifications & Goals */}
        <div className="mt-12">
          <CertificationsGoals certifications={certifications} />
        </div>

        {/* About Section */}
        <div className="mt-12 p-6 bg-card rounded-lg shadow-md border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Sobre Este Portfolio
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Este portfolio interativo apresenta o framework de certificações ISTQB através de uma 
            visualização radial inovadora. Clique em qualquer nível de certificação para explorar 
            informações detalhadas sobre especializações, requisitos e caminhos de carreira em testes. 
            O framework representa conhecimento abrangente em testes, desde conceitos fundamentais 
            até especializações de nível expert.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
