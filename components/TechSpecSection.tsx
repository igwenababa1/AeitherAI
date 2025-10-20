import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const TechSpecSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="technical" 
      ref={ref}
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2020&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
      <div className={`container mx-auto px-6 relative z-10 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Technical Specification & Architecture</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            A look "under the hood" at the robust, scalable architecture powering AetherWorks.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 glow-on-hover">
            <h3 className="text-xl font-bold text-violet-400 mb-3">Resource Management</h3>
            <p className="text-slate-400">
              "Unlimited" is achieved through a cloud-native architecture on Kubernetes, with intelligent resource pooling and auto-scaling. Fair-use policies prevent abuse, ensuring high availability for all while delivering unmatched power.
            </p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 glow-on-hover">
            <h3 className="text-xl font-bold text-violet-400 mb-3">AI Engine Orchestration</h3>
            <p className="text-slate-400">
              A unified API gateway intelligently routes requests to either Claude or GPT-4o. Developers can also specify the desired model per-task, providing ultimate flexibility for code generation, debugging, and optimization tasks.
            </p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 glow-on-hover">
            <h3 className="text-xl font-bold text-violet-400 mb-3">The "Project" Container</h3>
            <p className="text-slate-400">
              Each Project is a logically isolated namespace, encapsulating apps, databases, and deployments. Shared services like message queues and environment variables are securely managed within the Project's context.
            </p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 glow-on-hover">
            <h3 className="text-xl font-bold text-violet-400 mb-3">RBAC Implementation</h3>
            <p className="text-slate-400">
              Permissions are enforced at the API gateway level, mapping roles to specific actions on resources like Git repos, deployments, and environment variables, ensuring granular control and security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecSection;