"use client";

import Link from "next/link";
import { Check, ArrowLeft, Star } from "lucide-react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";

export default function PricingPage() {
  notFound();
  return (
    <main className="min-h-screen bg-[#050B14] text-slate-200 font-sans flex flex-col overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 150, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[140px]" 
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <nav className="h-20 flex items-center px-6 lg:px-12 backdrop-blur-md border-b border-white/10 z-50">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </nav>

      <section className="py-24 px-6 max-w-6xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white drop-shadow-lg">
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-20 max-w-2xl mx-auto font-light">
            Start for free to test our compliance engine, then upgrade to unlock full API limits and advanced GenAI drafting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto text-left">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-10 rounded-[2.5rem] border border-white/10 bg-[#0A1128]/60 backdrop-blur-2xl shadow-xl flex flex-col hover:bg-white/5 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-3xl font-bold mb-2 text-white">Starter</h2>
            <p className="text-slate-400 mb-8 font-light">Perfect for testing the platform locally.</p>
            <div className="text-6xl font-black mb-10 text-white drop-shadow-md">$0 <span className="text-lg font-medium text-slate-500 tracking-normal">/mo</span></div>
            
            <ul className="space-y-5 mb-10 flex-1">
              <PricingFeature text="5 AI Tariff Checks per month" />
              <PricingFeature text="Access to global trade database" />
              <PricingFeature text="Standard community support" />
              <PricingFeature text="1 User account" />
            </ul>
            
            <Link href="/api/auth/signin" className="block text-center w-full py-4 rounded-full border border-white/20 font-bold text-white hover:bg-white hover:text-black transition-all shadow-lg">
              Get Started Free
            </Link>
          </motion.div>

          {/* Premium Tier */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-10 rounded-[2.5rem] border border-purple-500/50 bg-[#0A1128]/80 backdrop-blur-2xl shadow-2xl shadow-purple-500/10 relative flex flex-col group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none"></div>
            <div className="absolute top-0 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-b-xl text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-1.5 z-20">
              <Star className="w-3.5 h-3.5 fill-white" /> Most Popular
            </div>
            
            <h2 className="text-3xl font-bold mb-2 text-white">Enterprise AI</h2>
            <p className="text-slate-400 mb-8 font-light">For teams doing serious cross-border trade.</p>
            <div className="text-6xl font-black mb-10 text-white drop-shadow-md">$99 <span className="text-lg font-medium text-slate-500 tracking-normal">/mo</span></div>
            
            <ul className="space-y-5 mb-10 flex-1 relative z-10">
              <PricingFeature text="Unlimited AI Compliance Checks" />
              <PricingFeature text="Automated Document & Contract Drafting" />
              <PricingFeature text="Real-time Custom Alerts" />
              <PricingFeature text="Priority 24/7 Support" />
              <PricingFeature text="Full API Access" />
            </ul>
            
            <button className="relative w-full group/btn z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-75 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-xl">
                Upgrade Now
              </div>
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function PricingFeature({ text }) {
  return (
    <li className="flex items-start gap-4">
      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className="text-slate-300 font-medium">{text}</span>
    </li>
  );
}
