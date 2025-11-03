import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { MyStory } from "@/components/MyStory";
import { Projects } from "@/components/Projects";
import { Articles } from "@/components/Articles";
import { profileData } from "@/data/portfolioData";

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
      <main className="w-full">
        {/* SOBRE Section */}
        <MyStory />

        {/* PROJETOS Section */}
        <Projects />

        {/* ARTIGOS Section */}
        <Articles />

        {/* CONTATO Section */}
        <ContactForm />
      </main>
    </div>
  );
};

export default Index;
