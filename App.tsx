import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import TechSpecSection from './components/TechSpecSection';
import WorkflowSection from './components/WorkflowSection';
import PricingSection from './components/PricingSection';
import DocsSection from './components/DocsSection';
import AboutSection from './components/AboutSection';
import AdvancedFeaturesSection from './components/AdvancedFeaturesSection';
import AIPlaygroundSection from './components/AIPlaygroundSection';
import IntegrationsSection from './components/IntegrationsSection';
import BuildAISection from './components/BuildAISection';
import PythonAISection from './components/PythonAISection';
import TemplatesSection from './components/TemplatesSection';
import TestimonialsSection from './components/TestimonialsSection';
import TeamSection from './components/TeamSection';

function App() {
  const [showPlayground, setShowPlayground] = useState(false);

  const handleLaunchPlayground = () => {
    setShowPlayground(true);
  };

  const handleClosePlayground = () => {
    setShowPlayground(false);
  };

  return (
    <div className="bg-slate-900 text-slate-300">
      <Header />
      <main>
        <Hero onLaunchPlayground={handleLaunchPlayground} />
        <FeatureSection />
        <BuildAISection />
        <PythonAISection />
        <TemplatesSection />
        <IntegrationsSection />
        <WorkflowSection />
        <AdvancedFeaturesSection />
        <TechSpecSection />
        <PricingSection />
        <TestimonialsSection />
        <TeamSection />
        <AboutSection />
        <DocsSection />
      </main>
      {showPlayground && <AIPlaygroundSection onClose={handleClosePlayground} />}
    </div>
  );
}

export default App;
