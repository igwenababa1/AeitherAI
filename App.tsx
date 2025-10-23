
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/Hero';
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
import CodeGenerationSection from './components/CodeGenerationSection';
import PlaygroundTransition from './components/PlaygroundTransition';

function App() {
  const [showPlayground, setShowPlayground] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedTemplatePrompt, setSelectedTemplatePrompt] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLaunchPlayground = (prompt: string = '') => {
    setSelectedTemplatePrompt(prompt);
    if (showPlayground) return; // Prevent re-triggering if already open
    setShowPlayground(false);
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    setShowPlayground(true);
  };

  const handleClosePlayground = () => {
    setShowPlayground(false);
    setSelectedTemplatePrompt(''); // Clear prompt on close
  };
  
  const handleTemplateSelect = (prompt: string) => {
    handleLaunchPlayground(prompt);
  };
  
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="bg-dark-bg text-slate-300">
      <Header 
        onLaunchPlayground={() => handleLaunchPlayground()} 
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />
      <main>
        <HeroSection onLaunchPlayground={() => handleLaunchPlayground()} />
        <VisionSection onLaunchPlayground={() => handleLaunchPlayground()} />
        <FeatureSection />
        <ReplitSection />
        <BuildAISection />
        <WorkflowSection />
        <AIStudioSection onLaunchPlayground={() => handleLaunchPlayground()} />
        <CodeGenerationSection />
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
      {isTransitioning && <PlaygroundTransition onAnimationEnd={handleTransitionEnd} />}
      {showPlayground && <AIPlaygroundSection onClose={handleClosePlayground} initialPrompt={selectedTemplatePrompt} />}
    </div>
  );
}

export default App;
