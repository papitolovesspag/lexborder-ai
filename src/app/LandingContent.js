"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Globe, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function LandingContent() {
  return (
    <main className="min-h-screen bg-[#050B14] text-slate-200 font-sans flex flex-col overflow-hidden relative">
      {/* Dynamic Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[150px]" 
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="h-20 border-b border-white/10 flex items-center justify-between px-6 lg:px-12 bg-[#0A1128]/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-sm">LexBorder</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide">
          <Link href="#features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How it Works</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/api/auth/signin" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors hidden sm:block">Log In</Link>
          <Link href="/api/auth/signin" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#050B14] border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all group-hover:border-transparent">
              Start Free
            </div>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-md shadow-2xl"
        >
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Powered by Next-Gen AI</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl leading-[1.1] mb-8 text-white drop-shadow-2xl"
        >
          Global Trade Compliance, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500">
            Automated by AI.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed font-light"
        >
          Navigate complex international tariffs, draft compliant contracts, and manage cross-border risks seamlessly with LexBorder's intelligent AI workflow.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link href="/api/auth/signin" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
              Launch Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link href="/pricing" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/10 transition-all backdrop-blur-md">
            View Pricing
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">Enterprise-Grade Infrastructure</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light">Everything you need to scale your cross-border operations securely and efficiently.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Lock}
              title="Bank-Grade Security"
              description="Your data is protected with enterprise-level encryption. Sign in securely via Google, Microsoft, or Apple."
              delay={0}
            />
            <FeatureCard 
              icon={Globe}
              title="Real-Time Tariffs"
              description="Instant access to the latest international tariff codes and tax schedules across 190+ countries."
              delay={0.2}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="AI Compliance Checks"
              description="Our specialized AI engine scans your shipments against global regulatory frameworks instantly."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 px-6 lg:px-12 relative z-10 bg-[#050B14]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">How LexBorder Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light">A seamless workflow from compliance check to successful cross-border transaction.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-blue-500/0 z-0"></div>

            <StepCard 
              number="1"
              title="Connect Your Data"
              description="Link your supply chain data securely or upload documents directly to the dashboard."
              delay={0}
            />
            <StepCard 
              number="2"
              title="AI Analysis"
              description="Our specialized models cross-reference millions of global trade regulations in seconds."
              delay={0.2}
            />
            <StepCard 
              number="3"
              title="Compliant Execution"
              description="Get instant green-lights, auto-generated customs forms, and risk mitigations."
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-slate-500 text-sm bg-white/5 backdrop-blur-xl">
        <p>© {new Date().getFullYear()} LexBorder AI. All rights reserved. Global Trade Compliance & Customs Intelligence.</p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-light text-lg">{description}</p>
    </motion.div>
  );
}

function StepCard({ number, title, description, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center relative z-10"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1 flex items-center justify-center shadow-xl shadow-purple-500/20 mb-8">
        <div className="w-full h-full bg-[#0A1128] rounded-full flex items-center justify-center">
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{number}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-light text-lg">{description}</p>
    </motion.div>
  );
}
