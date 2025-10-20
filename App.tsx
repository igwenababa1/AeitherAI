import React, { useState } from 'react';
import Header from './components/Header';
import VideoHeroSection from './components/VideoHeroSection';
import VisionSection from './components/VisionSection';
import FeatureSection from './components/FeatureSection';
import BuildAISection from './components/BuildAISection';
import WorkflowSection from './components/WorkflowSection';
import AIAgentsSection from './components/AIAgentsSection';
import PythonAISection from './components/PythonAISection';
import SolutionsSection from './components/SolutionsSection';
import AdvancedFeaturesSection from './components/AdvancedFeaturesSection';
import TechSpecSection from './components/TechSpecSection';
import IntegrationsSection from './components/IntegrationsSection';
import GlobalInfrastructureSection from './components/GlobalInfrastructureSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import TeamSection from './components/TeamSection';
import AboutSection from './components/AboutSection';
import DocsSection from './components/DocsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AIPlaygroundSection from './components/AIPlaygroundSection';
import AIStudioSection from './components/AIStudioSection';
import ReplitSection from './components/ReplitSection';

function App() {
  const [showPlayground, setShowPlayground] = useState(false);
  const [selectedTemplatePrompt, setSelectedTemplatePrompt] = useState('');

  const handleLaunchPlayground = (prompt: string = '') => {
    setSelectedTemplatePrompt(prompt);
    setShowPlayground(true);
  };

  const handleClosePlayground = () => {
    setShowPlayground(false);
    setSelectedTemplatePrompt(''); // Clear prompt on close
  };
  
  const handleTemplateSelect = (prompt: string) => {
    handleLaunchPlayground(prompt);
  };

  return (
    <div className="bg-dark-bg text-slate-300">
      <Header onLaunchPlayground={() => handleLaunchPlayground()} />
      <main>
        <VideoHeroSection onLaunchPlayground={() => handleLaunchPlayground()} />
        <VisionSection onLaunchPlayground={() => handleLaunchPlayground()} />
        <FeatureSection />
        <ReplitSection />
        <BuildAISection />
        <WorkflowSection />
        <AIStudioSection onLaunchPlayground={() => handleLaunchPlayground()} />
        <AIAgentsSection />
        <PythonAISection />
        <SolutionsSection onSolutionSelect={handleTemplateSelect} />
        <AdvancedFeaturesSection />
        <TechSpecSection />
        <IntegrationsSection />
        <GlobalInfrastructureSection />
        <PricingSection />
        <TestimonialsSection />
        <TeamSection />
        <AboutSection />
        <DocsSection />
        <CTASection onLaunchPlayground={() => handleLaunchPlayground()} />
      </main>
      <Footer />
      {showPlayground && <AIPlaygroundSection onClose={handleClosePlayground} initialPrompt={selectedTemplatePrompt} />}
    </div>
  );
}

export default App;