import { useState } from "react";
import { RadialMenu } from "@/components/RadialMenu";
import { LeftInfoPanel } from "@/components/LeftInfoPanel";
import { ProfileCard } from "@/components/ProfileCard";

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
                <h1 className="text-xl font-bold text-foreground">Professional Portfolio</h1>
                <p className="text-xs text-muted-foreground">ISTQB® Persona: Mateo</p>
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
              name="Mateo"
              title="Software Product Manager"
              bio="Mateo has studied computer science and has been programming since then. Starting as a simple programmer he is now responsible for the entire software product lifecycle. He has always been to build quality systems, but he also wants to be fast on the market and make money."
              skills={[
                "Build Quality In",
                "Leadership",
                "DevOps",
                "Agile",
                "Test Strategy"
              ]}
            />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 p-6 bg-card rounded-lg shadow-md border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            About This Portfolio
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This interactive portfolio showcases the ISTQB certification framework through an 
            innovative radial visualization. Click on any certification level to explore detailed 
            information about the specific testing specialization, requirements, and career paths. 
            The framework represents comprehensive testing knowledge from foundational concepts 
            through expert-level specializations.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
