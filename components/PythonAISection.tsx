import React, { useState } from 'react';
import { PythonIcon } from './icons/PythonIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { CodeBlock } from './CodeBlock';

interface PythonFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  code: string;
}

const features: PythonFeature[] = [
  {
    icon: PythonIcon,
    title: 'First-Class Python Support',
    description: 'Develop with any Python version in secure, containerized environments. Full support for pip and virtual environments.',
    code: `import numpy as np

# Create a simple numpy array
a = np.array([1, 2, 3, 4, 5])
print(f"Vector mean: {a.mean()}")`
  },
  {
    icon: CodeBracketIcon,
    title: 'Full-Stack Frameworks',
    description: 'Use our AI to generate and deploy projects with popular frameworks like Django, Flask, and FastAPI in minutes.',
    code: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from AetherWorks!'`
  },
  {
    icon: GeminiIcon,
    title: 'Google AI Integration',
    description: "Leverage the power of Google's Gemini models for text, image, and video generation directly within your Python applications.",
    code: `# Example using the Google AI Python SDK
import google.generativeai as genai

genai.configure(api_key="YOUR_AETHERWORKS_KEY")

# Generate content using the Gemini 2.5 Pro model
model = genai.GenerativeModel('gemini-2.5-pro')
response = model.generate_content(
    "Explain quantum computing in simple terms."
)

print(response.text)`
  },
  {
    icon: CpuChipIcon,
    title: 'Effortless Scalability',
    description: 'Deploy and scale your Python applications with our managed Kubernetes infrastructure and serverless functions.',
    code: `# AetherWorks Serverless Function
# File: functions/api.py

def handler(event, context):
    user_id = event['queryStringParameters']['id']
    return {
        "statusCode": 200,
        "body": f"Data for user: {user_id}"
    }`
  },
];

const FeatureCard: React.FC<PythonFeature & { isActive: boolean; onClick: () => void; }> = ({ icon: Icon, title, description, code, isActive, onClick }) => (
  <div className="card-3d-container h-full">
    <div 
      onClick={onClick}
      className={`bg-card-bg p-6 rounded-xl border card-3d cursor-pointer transition-all duration-300 ease-in-out ${isActive ? 'border-primary-blue' : 'border-border-color'}`}
    >
      <div className="bg-border-color rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary-blue" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-heading">{title}</h3>
      <p className="text-slate-400">{description}</p>
      {isActive && (
        <div className="mt-4 animate-fade-in">
          <CodeBlock language="python" code={code} />
        </div>
      )}
    </div>
  </div>
);

const PythonAISection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="python-ai" className="py-20 bg-dark-bg/70 animated-grid-background" ref={ref}>
        <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">The Ultimate Platform for <span className="text-primary-blue">Python &amp; AI/ML Ops</span></h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
                AetherWorks is optimized for Python developers, providing the tools and infrastructure to build, train, and deploy AI models and applications faster than ever.
            </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <div key={feature.title} style={{ transitionDelay: `${index * 100}ms`}} className={`section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                    <FeatureCard 
                        {...feature} 
                        isActive={activeIndex === index}
                        onClick={() => handleCardClick(index)}
                    />
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default PythonAISection;