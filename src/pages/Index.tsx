import { useState } from "react";
import { SkillsEvolutionRadar } from "@/components/SkillsEvolutionRadar";
import { LeftInfoPanel } from "@/components/LeftInfoPanel";
import { HeroSection } from "@/components/HeroSection";
import { Timeline } from "@/components/Timeline";
import { CertificationsGoals } from "@/components/CertificationsGoals";
import { MyStory } from "@/components/MyStory";
import { profileData, timeline, certifications } from "@/data/portfolioData";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<{
    id: string;
    label: string;
    layer: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        name={profileData.name}
        title={profileData.title}
        bio={profileData.bio}
        skills={profileData.skills}
        email={profileData.email}
        linkedin={profileData.linkedin}
        github={profileData.github}
        imageUrl={profileData.imageUrl}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* My Story Section */}
        <MyStory />

        {/* Skills Evolution Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Evolução de Competências</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Da fundação em 2024 ao presente em 2025, visualize minha jornada de crescimento contínuo.
              Compare hard skills técnicas e soft skills comportamentais ao longo do tempo.
            </p>
          </div>

          <div className="flex justify-center">
            <SkillsEvolutionRadar />
          </div>
        </section>

        {/* Timeline Section */}
        <div className="mt-12">
          <Timeline items={timeline} />
        </div>

        {/* Certifications & Goals */}
        <div className="mt-16">
          <CertificationsGoals certifications={certifications} />
        </div>
      </main>
    </div>
  );
};

export default Index;
