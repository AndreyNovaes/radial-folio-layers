import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { MyStory } from "@/components/MyStory";
import { Articles } from "@/components/Articles";
import { ContactSticker } from "@/components/ContactSticker";
import { ContactModal } from "@/components/ContactModal";
import { profileData } from "@/data/portfolioData";

const Index = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showContactSticker, setShowContactSticker] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContactClick={() => setShowContactModal(true)} />

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
        onEmailClick={() => setShowContactModal(true)}
      />

      {/* Contact Sticker */}
      {profileData.email && (
        <ContactSticker
          email={profileData.email}
          triggerVisible={showContactSticker}
          onTriggerOpen={() => setShowContactModal(true)}
          onTrigger={() => setShowContactSticker(false)}
        />
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      {/* Main Content */}
      <main className="w-full">
        {/* SOBRE Section */}
        <MyStory />

        {/* ARTIGOS Section */}
        <Articles />
      </main>
    </div>
  );
};

export default Index;
