

import React from 'react';
import { BuildingStorefrontIcon } from './icons/BuildingStorefrontIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const PricingSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="pricing" className="py-20 bg-dark-bg/70" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Target Audience & Monetization</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Built for ambitious teams with a pricing model that scales with your success.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left font-heading">Primary Audiences</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <LightBulbIcon className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Startup Studios & Indie Hackers</h4>
                  <p className="text-slate-400">For builders who need to ship fast, iterate, and scale without worrying about infrastructure or per-seat costs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <BuildingStorefrontIcon className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Digital Agencies</h4>
                  <p className="text-slate-400">Manage all client projects in one place with unlimited collaborators, streamlining workflows and boosting profitability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-primary-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Enterprise Innovation Teams</h4>
                  <p className="text-slate-400">A secure, powerful sandbox for rapid prototyping and deploying internal tools or new ventures at enterprise scale.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-3d-container">
            <div className="card-3d bg-card-bg border border-accent-violet rounded-xl p-8 shadow-2xl shadow-purple-500/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left font-heading">Disruptive Pricing Model</h3>
              <h4 className="text-2xl font-bold text-accent-violet mb-3 font-heading">Project-Based Pricing</h4>
              <p className="text-slate-400 mb-4">
                Instead of confusing tiers and per-user fees, you pay a flat, predictable rate for each active "Project". This model provides cost certainty while aligning our success with yours.
              </p>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-center gap-3">✓ <span className="font-semibold">Unlimited</span> Apps per Project</li>
                <li className="flex items-center gap-3">✓ <span className="font-semibold">Unlimited</span> Collaborators</li>
                <li className="flex items-center gap-3">✓ Generous compute, storage, and AI usage included</li>
                <li className="flex items-center gap-3">✓ Pay-as-you-go for massive-scale bandwidth</li>
              </ul>
              <a href="#pricing" className="block text-center w-full mt-6 bg-gradient-to-r from-accent-violet to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105">
                View Pricing Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;