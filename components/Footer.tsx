import React from 'react';
import { LayersIcon } from './icons/LayersIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GitHubIcon } from './icons/GitHubIcon';

const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Team', href: '#team' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: TwitterIcon },
    { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
    { name: 'GitHub', href: '#', icon: GitHubIcon },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center gap-2 text-white text-xl font-bold">
              <LayersIcon className="w-6 h-6 text-cyan-400" />
              <span>AetherWorks</span>
            </a>
            <p className="mt-2 text-sm text-slate-400 max-w-xs">The Unified Platform for Building with AI.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-slate-200 uppercase">Quick Links</h2>
              <ul className="text-slate-400">
                {footerLinks.map((link) => (
                  <li key={link.name} className="mb-4">
                    <a href={link.href} className="hover:text-cyan-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-slate-200 uppercase">Legal</h2>
              <ul className="text-slate-400">
                <li className="mb-4">
                  <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-slate-800 sm:mx-auto" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-slate-500 sm:text-center">
            © {new Date().getFullYear()} <a href="#" className="hover:underline">AetherWorks™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} className="text-slate-400 hover:text-white">
                <social.icon className="w-5 h-5" />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;