import { useState } from "react";
import { RadialMenu } from "@/components/RadialMenu";
import { LeftInfoPanel } from "@/components/LeftInfoPanel";
import { HeroSection } from "@/components/HeroSection";
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
        {/* Portfolio Overview Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-3">Visão Geral do Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore minhas habilidades técnicas através do gráfico de radar interativo e descubra mais sobre minhas certificações e experiências profissionais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Panel - Info */}
            <div className="lg:col-span-3">
              <LeftInfoPanel selectedSection={selectedSection} />
            </div>

            {/* Center - Skills Radar */}
            <div className="lg:col-span-9 flex items-center justify-center">
              <RadialMenu />
            </div>
          </div>
        </section>

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
