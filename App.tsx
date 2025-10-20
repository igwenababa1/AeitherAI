import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import TemplatesSection from './components/TemplatesSection';
import AIPlaygroundSection from './components/AIPlaygroundSection';
import TestimonialsSection from './components/TestimonialsSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import BuildAISection from './components/BuildAISection';
import PythonAISection from './components/PythonAISection';
import IntegrationsSection from './components/IntegrationsSection';
import AIAgentsSection from './components/AIAgentsSection';
import GlobalInfrastructureSection from './components/GlobalInfrastructureSection';
import VisionSection from './components/VisionSection';


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
    <div className="bg-slate-900 text-slate-300">
      <Header onLaunchPlayground={() => handleLaunchPlayground()} />
      <main>
        <Hero onLaunchPlayground={() => handleLaunchPlayground()} />
        <VisionSection onLaunchPlayground={() => handleLaunchPlayground()} />
        <FeatureSection />
        <AIAgentsSection />
        <BuildAISection />
        <TemplatesSection onTemplateSelect={handleTemplateSelect} />
        <PythonAISection />
        <IntegrationsSection />
        <GlobalInfrastructureSection />
        <TestimonialsSection />
        <TeamSection />
      </main>
      <Footer />
      {showPlayground && <AIPlaygroundSection onClose={handleClosePlayground} initialPrompt={selectedTemplatePrompt} />}
    </div>
  );
}

export default App;