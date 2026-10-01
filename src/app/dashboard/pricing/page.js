"use client";

import { Check, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export default function DashboardPricingPage() {
  notFound();
  const { data: session } = useSession();
  const currentPlan = session?.user?.plan || "FREE";

  return (
    <div className="pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Upgrade your plan</h1>
        <p className="text-slate-500">You are currently on the <span className="font-semibold">{currentPlan}</span> plan. Upgrade to unlock unlimited AI compliance checks.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
        {/* Free Tier */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel p-8 rounded-[2rem] flex flex-col hover:bg-[var(--panel-bg)] transition-colors group relative overflow-hidden"
        >
          <h2 className="text-2xl font-bold mb-2">Starter</h2>
          <p className="text-slate-500 mb-8 font-light">Perfect for testing the platform locally.</p>
          <div className="text-5xl font-black mb-10">$0 <span className="text-lg font-medium text-slate-500 tracking-normal">/mo</span></div>
          
          <ul className="space-y-4 mb-10 flex-1">
            <PricingFeature text="5 AI Tariff Checks per month" />
            <PricingFeature text="Access to global trade database" />
            <PricingFeature text="Standard community support" />
            <PricingFeature text="1 User account" />
          </ul>
          
          <button 
            disabled={currentPlan === "FREE"}
            className="block text-center w-full py-3 rounded-full border border-[var(--panel-border-heavy)] font-bold hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentPlan === "FREE" ? "Current Plan" : "Downgrade"}
          </button>
        </motion.div>

        {/* Premium Tier */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel-heavy p-8 rounded-[2rem] border-purple-500/30 relative flex flex-col group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none"></div>
          <div className="absolute top-0 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-b-lg text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-1 z-20">
            <Star className="w-3.5 h-3.5 fill-white" /> Most Popular
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Enterprise AI</h2>
          <p className="text-slate-400 mb-8 font-light">For teams doing serious cross-border trade.</p>
          <div className="text-5xl font-black mb-10">$99 <span className="text-lg font-medium text-slate-500 tracking-normal">/mo</span></div>
          
          <ul className="space-y-4 mb-10 flex-1 relative z-10">
            <PricingFeature text="Unlimited AI Compliance Checks" />
            <PricingFeature text="Automated Document & Contract Drafting" />
            <PricingFeature text="Real-time Custom Alerts" />
            <PricingFeature text="Priority 24/7 Support" />
            <PricingFeature text="Full API Access" />
          </ul>
          
          <button 
            disabled={currentPlan === "ENTERPRISE"}
            className="relative w-full group/btn z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-75 group-hover/btn:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-xl">
              {currentPlan === "ENTERPRISE" ? "Current Plan" : "Upgrade Now"} <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function PricingFeature({ text }) {
  return (
    <li className="flex items-start gap-4">
      <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 shadow-inner">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className="font-medium text-[var(--foreground)] opacity-80">{text}</span>
    </li>
  );
}
