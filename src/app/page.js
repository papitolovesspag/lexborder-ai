"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Check,
  CheckCircle2,
  Copy,
  CheckCheck,
  ArrowRight,
  Mail,
  Phone,
  Building2,
  Sparkles,
  Cpu,
  FileSpreadsheet,
  Globe,
  Lock,
  Scale,
  TrendingUp,
  Menu,
  X,
  FileCheck2,
  AlertTriangle,
  Send,
  Zap,
  ChevronDown
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState("annual"); // 'monthly' | 'annual'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    volume: "100-500",
    message: "",
  });

  // Scrollytelling step state
  const [activeStep, setActiveStep] = useState(0);
  const stepsContainerRef = useRef(null);

  const handleCopy = (text, type) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2500);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full bg-cyan-600/15 blur-[140px]" />
        <div className="absolute top-[35%] right-[-12%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-indigo-600/15 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-purple-600/12 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. STICKY GLASSMORPHISM HEADER / NAVBAR
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#050B14]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#050B14] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                LexBorder
              </span>
              <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Header Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all active:scale-[0.98] cursor-pointer"
            >
              Request Demo
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/10 bg-[#050B14]/98 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4 flex flex-col">
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
                >
                  Contact
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full py-3 rounded-xl font-semibold text-center bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25"
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
         ───────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative pt-16 pb-20 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
            {/* Glowing Innovation Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-cyan-500/10"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Autonomous Global Trade Compliance Intelligence</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6"
            >
              Cross-Border Trade Compliance, Executed at{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Machine Speed.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10"
            >
              LexBorder AI automates Harmonized System (HS) code classification, multi-jurisdictional tariff calculation, and customs compliance certification across 190+ sovereign trade corridors.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            >
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore How It Works</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>Contact Founding Office</span>
              </button>
            </motion.div>
          </div>

          {/* Interactive Compliance Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-indigo-500/20 to-transparent shadow-2xl shadow-cyan-950/40"
          >
            <div className="rounded-[22px] bg-[#070D1E]/95 border border-white/10 backdrop-blur-2xl p-6 sm:p-8">
              {/* Card Header Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    MANIFEST AUDIT: #LB-8849-NL
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Engine Active</span>
                </div>
              </div>

              {/* Card Body Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                {/* Column 1: Document & SKU Analysis */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                      Manifest Extraction
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-medium">
                      Parsed in 0.38s
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400">Declared Item</p>
                      <p className="text-sm font-semibold text-white">
                        Lithium-Ion Energy Storage Modules
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Origin</span>
                        <span className="text-white font-medium">Shenzhen (CN)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Destination</span>
                        <span className="text-white font-medium">Rotterdam (NL)</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs text-cyan-300">
                      <span className="font-semibold block mb-0.5">Semantic Analysis:</span>
                      Classified under secondary electrochemical cells for industrial utility.
                    </div>
                  </div>
                </div>

                {/* Column 2: Harmonized System Classification */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      HS Auto-Classification
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 font-medium">
                      Confidence 99.8%
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400">Assigned 10-Digit TARIC</p>
                      <p className="text-xl font-mono font-bold text-cyan-300">
                        8507.60.00.00
                      </p>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                        <span className="text-slate-400">Chapter 85:</span>
                        <span>Electrical Machinery</span>
                      </div>
                      <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                        <span className="text-slate-400">Heading 07:</span>
                        <span>Electric Accumulators</span>
                      </div>
                      <div className="flex justify-between text-slate-300 py-1">
                        <span className="text-slate-400">Subheading 60:</span>
                        <span className="text-cyan-300 font-medium">Lithium-Ion</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Clearance Certification */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-purple-400" />
                        Tariff & Sanctions
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-medium">
                        Audit Passed
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-slate-400">MFN Base Duty:</span>
                        <span className="font-semibold text-white">2.7%</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-slate-400">Export Controls:</span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> No Embargo
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400">Audit Proof Hash:</span>
                        <span className="font-mono text-slate-400 text-[10px]">
                          0x4f92...a38b
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Ready for EDI Dispatch
                    </span>
                    <span className="text-[11px] text-slate-400">Latency: 1.14s</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Stat Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
              <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">190+</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Jurisdictions Supported</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mb-1">99.8%</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">HS Classification Accuracy</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-1">&lt; 1.2s</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Verification Latency</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center backdrop-blur-md">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">$4.2M+</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Customs Penalties Prevented</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HOW IT WORKS SECTION (SCROLLYTELLING PIPELINE)
         ───────────────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        ref={stepsContainerRef}
        className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold mb-4">
              Autonomous 3-Stage Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              How LexBorder AI Works
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Transform unstructured commercial cargo documentation into legally verified customs clearance certificates in three deterministic steps.
            </p>

            {/* Quick Step Buttons for mobile & desktop switching */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {[0, 1, 2].map((stepIdx) => (
                <button
                  key={stepIdx}
                  onClick={() => setActiveStep(stepIdx)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeStep === stepIdx
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/5"
                  }`}
                >
                  Step {stepIdx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Pipeline Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            {/* Step Selection List (Left Column) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Step 1 Card */}
              <div
                onClick={() => setActiveStep(0)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === 0
                    ? "bg-white/[0.04] border-cyan-500/50 shadow-xl shadow-cyan-950/30"
                    : "bg-white/[0.01] border-white/5 hover:border-white/15 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Phase 01
                  </span>
                  <div className={`w-3 h-3 rounded-full ${activeStep === 0 ? "bg-cyan-400 shadow-[0_0_8px_#06b6d4]" : "bg-slate-700"}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Document Ingestion &amp; HS Auto-Classification
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Upload commercial invoices, packing lists, or technical specs. Our vision-language pipeline decomposes physical and chemical attributes, resolving precise 6, 8, and 10-digit Harmonized System codes with 99.8% audit certainty.
                </p>
              </div>

              {/* Step 2 Card */}
              <div
                onClick={() => setActiveStep(1)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === 1
                    ? "bg-white/[0.04] border-indigo-500/50 shadow-xl shadow-indigo-950/30"
                    : "bg-white/[0.01] border-white/5 hover:border-white/15 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Phase 02
                  </span>
                  <div className={`w-3 h-3 rounded-full ${activeStep === 1 ? "bg-indigo-400 shadow-[0_0_8px_#6366f1]" : "bg-slate-700"}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Real-Time Regulatory &amp; Tariff Matrix
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  The classification is instantly evaluated against 190+ sovereign schedules, bilateral trade pacts (USMCA, AfCFTA, CPTPP), anti-dumping orders, and global OFAC/EU sanctions lists to guarantee total regulatory compliance.
                </p>
              </div>

              {/* Step 3 Card */}
              <div
                onClick={() => setActiveStep(2)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === 2
                    ? "bg-white/[0.04] border-purple-500/50 shadow-xl shadow-purple-950/30"
                    : "bg-white/[0.01] border-white/5 hover:border-white/15 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Phase 03
                  </span>
                  <div className={`w-3 h-3 rounded-full ${activeStep === 2 ? "bg-purple-400 shadow-[0_0_8px_#a855f7]" : "bg-slate-700"}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Automated Clearance &amp; Compliance Certification
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Outputs EDI/XML-ready customs declarations and cryptographic audit certificates. Customs brokers and logistics operators obtain friction-free clearance with verifiable legal audit shielding.
                </p>
              </div>
            </div>

            {/* Dynamic Stage Canvas (Right Column) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl">
                <div className="rounded-[22px] bg-[#070D1E] p-6 sm:p-8 min-h-[460px] flex flex-col justify-between overflow-hidden relative">
                  {/* Ambient Stage Lighting */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Stage Dynamic View Based on activeStep */}
                  {activeStep === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                            <FileSpreadsheet className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Invoice Parsing Engine</p>
                            <p className="text-xs text-slate-400">OCR &amp; Entity Decomposition</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          Active Ingestion
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                          <span className="text-slate-500 block mb-1">RAW DESCRIPTION:</span>
                          <span className="text-slate-200">
                            &quot;Brushless DC servo-actuator 24V with integrated planetary gearbox, model AG-900.&quot;
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span className="text-slate-500 block mb-1">VOLTAGE &amp; OUTPUT:</span>
                            <span className="text-cyan-400 font-semibold">24V DC / &lt; 37.5W</span>
                          </div>
                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span className="text-slate-500 block mb-1">INTENDED USE:</span>
                            <span className="text-cyan-400 font-semibold">Industrial Robotics</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-cyan-300 font-bold">ASSIGNED HS CODE:</span>
                            <span className="text-emerald-400 font-bold text-sm">8501.31.00</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans">
                            Motors and electric generators of an output not exceeding 37.5 W. Validated against WCO General Rules of Interpretation 1 &amp; 6.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Bilateral Regulatory Matrix</p>
                            <p className="text-xs text-slate-400">Multi-Jurisdiction Tariff Calc</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          Cross-Referenced
                        </span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                          <span className="text-slate-300 font-medium">United States (HTS 8501.31)</span>
                          <span className="font-mono text-white">MFN 2.8% • USMCA 0.0%</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                          <span className="text-slate-300 font-medium">European Union (TARIC)</span>
                          <span className="font-mono text-white">Base 2.7% • CBAM Exempt</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                          <span className="text-slate-300 font-medium">United Kingdom (UK Global)</span>
                          <span className="font-mono text-white">Base 2.0% • Preferential 0%</span>
                        </div>
                        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                          <div className="flex items-center gap-2 text-indigo-300 font-bold mb-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>Export Control &amp; Sanctions Screening</span>
                          </div>
                          <p className="text-[11px] text-slate-300 font-light">
                            Party names and intermediate consignees verified against OFAC SDN, BIS Entity List, and EU Consolidated Financial Sanctions. Zero matches flagged.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <FileCheck2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Audit Shield Certificate</p>
                            <p className="text-xs text-slate-400">Cryptographically Sealed</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          CLEARED
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> CERTIFICATE OF VERIFICATION
                            </span>
                            <span className="text-[10px] text-emerald-400">PASS</span>
                          </div>
                          <p className="text-[11px] text-slate-300 font-sans mb-3">
                            Document manifest and dual-use classification verified under WCO standards. Ready for electronic transmission to port customs authority.
                          </p>
                          <div className="p-2 rounded bg-black/40 text-[10px] text-slate-400 break-all font-mono">
                            SHA-256: 7e2f1809bdc5417e29bb31f9076fdbb8932ca4d83
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span className="text-slate-400 block text-[10px]">EDI FORMAT</span>
                            <span className="text-white font-medium">CUSDEC / EDIFACT</span>
                          </div>
                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span className="text-slate-400 block text-[10px]">RISK SCORE</span>
                            <span className="text-emerald-400 font-medium">0.02 (Negligible)</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Stage Footer Status */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      Sub-second latency across 190+ jurisdictions
                    </span>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire about API integration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. REALISTIC PRICING SECTION
         ───────────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-semibold mb-4">
              Predictable Enterprise Value
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              Transparent, Scalable Pricing
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-8">
              Select the optimal plan for your international trade volume. Every tier includes automated compliance updates and jurisdiction matrices.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Tier 1: Starter */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all backdrop-blur-md">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                  <p className="text-slate-400 text-sm font-light">
                    For growing importers, single-lane freight operators, and specialized merchants.
                  </p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">
                      ${billingCycle === "annual" ? "159" : "199"}
                    </span>
                    <span className="text-slate-400 text-sm">/ month</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {billingCycle === "annual" ? "Billed annually ($1,908/yr)" : "Billed monthly"}
                  </p>
                </div>

                <div className="space-y-3.5 mb-8 text-sm">
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>250 Monthly Automated Clearance Scans</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Harmonized System (HS) 6-digit Auto-Classification</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Standard Tariff &amp; Duty Rate Lookup (50 Jurisdictions)</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Automated Commercial Invoice Validation</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Standard Export Sanctions Screening</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Email Support (24h SLA)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                Inquire for Starter
              </button>
            </div>

            {/* Tier 2: Professional (Featured) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0E1A38] to-[#070D1E] border-2 border-cyan-500/50 flex flex-col justify-between relative shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-cyan-500/30">
                Most Popular
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                  <p className="text-slate-300 text-sm font-light">
                    Engineered for high-volume freight forwarders and multi-national trade operators.
                  </p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-cyan-300">
                      ${billingCycle === "annual" ? "479" : "599"}
                    </span>
                    <span className="text-slate-400 text-sm">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {billingCycle === "annual" ? "Billed annually ($5,748/yr)" : "Billed monthly"}
                  </p>
                </div>

                <div className="space-y-3.5 mb-8 text-sm">
                  <div className="flex items-start gap-3 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span className="font-semibold">Unlimited Automated Clearance Filings</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Deep 8 &amp; 10-digit HS Classification with Discrepancy Detection</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Full 190+ Country Tariff &amp; FTA Matrix (USMCA, AfCFTA, CPTPP)</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Real-Time Denied Party &amp; Export Control (EAR/ITAR) Watchlists</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Full REST &amp; Webhook API Access</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Automated Customs Broker Hand-off (EDI / XML)</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>Priority 24/7 Technical Support &amp; 1-Hour SLA</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                Inquire for Professional
              </button>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-purple-500/30 transition-all backdrop-blur-md">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                  <p className="text-slate-400 text-sm font-light">
                    For global conglomerates, customs brokerages, and sovereign supply networks.
                  </p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">
                      Custom
                    </span>
                    <span className="text-slate-400 text-sm">/ $1,999+</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Custom deployment SLA &amp; dedicated infrastructure
                  </p>
                </div>

                <div className="space-y-3.5 mb-8 text-sm">
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <span className="font-semibold">Dedicated Compliance Model Fine-Tuning</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <span>On-Premise / Sovereign Data Residency &amp; Air-Gapped Option</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <span>Unlimited API Throughput &amp; Multi-Tenant Organizations</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <span>Deep ERP/WMS Integrations (SAP, Oracle, CargoWise)</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <span>Dedicated Trade Compliance Legal Counsel Review</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <span>99.99% Uptime Guarantee with Named Solutions Architect</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer"
              >
                Contact Enterprise Office
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ABOUT US SECTION (STRICTLY ONE FOUNDER: GABRIEL)
         ───────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs sm:text-sm font-semibold mb-4">
              Founding Leadership &amp; Vision
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              Meet the Founder
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Engineering the next frontier of borderless global commerce through deterministic AI.
            </p>
          </div>

          {/* Founder Profile Card */}
          <div className="max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-purple-500/20 border border-white/10 shadow-2xl backdrop-blur-2xl">
            <div className="rounded-[22px] bg-[#070D1E]/90 p-6 sm:p-10 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Founder Image Column */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative group w-full max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-950/50">
                    <Image
                      src="/images/gabriel.jpg"
                      alt="Gabriel - Founder of LexBorder AI"
                      fill
                      priority
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="p-3 rounded-xl bg-[#050B14]/80 backdrop-blur-md border border-white/10 text-center">
                        <span className="font-extrabold text-white text-base block">
                          Gabriel
                        </span>
                        <span className="text-xs text-cyan-400 font-medium">
                          Founder &amp; Chief Architect
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder Biography Column */}
                <div className="md:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                      Gabriel
                    </h3>
                    <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                      Founder &amp; Chief Architect, LexBorder AI
                    </p>
                  </div>

                  {/* Biography Paragraphs */}
                  <p>
                    Gabriel founded LexBorder AI to dismantle the single greatest drag on international commerce: the labyrinth of archaic customs regimes, volatile tariff structures, and agonizing documentation delays that cost global enterprises hundreds of billions annually. Observing how supply chains frequently grind to a halt over simple tariff classification errors and jurisdictional nuances, Gabriel set out to construct an intelligent, software-defined border layer.
                  </p>

                  <p>
                    As the sole founder and technical visionary, Gabriel spearheaded the development of LexBorder AI&apos;s proprietary compliance inference engine. By harmonizing global trade jurisprudence, multi-national HS code databases, and real-time customs duty schedules with fine-tuned natural language intelligence, the platform autonomously validates shipments, drafts compliant documentation, and flags embargo risks in seconds.
                  </p>

                  <p>
                    Under Gabriel&apos;s leadership, LexBorder AI is setting the new benchmark for borderless enterprise commerce. His mission is relentless: empowering modern enterprises, freight forwarders, and agile global merchants to expand fearlessly across every international frontier with institutional-grade regulatory assurance.
                  </p>

                  {/* Highlights Grid */}
                  <div className="pt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-cyan-400 font-bold block text-lg">190+</span>
                      <span className="text-slate-400">Jurisdictions Modeled</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-indigo-400 font-bold block text-lg">Deterministic</span>
                      <span className="text-slate-400">Trade Jurisprudence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CONTACT US SECTION (STRICTLY ONLY GABRIEL EMAIL & PHONE)
         ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-semibold mb-4">
              Direct Inquiries
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              Contact Founding Office
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Connect directly with Gabriel for enterprise pilots, strategic logistics partnerships, or custom compliance deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            {/* Contact Cards (Left Column) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Email Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all backdrop-blur-md">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Official Email
                </span>
                <span className="text-lg sm:text-xl font-bold text-white break-all block mb-4">
                  gabriel@lexborderai.site
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:gabriel@lexborderai.site"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Open Email Client</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy("gabriel@lexborderai.site", "email")}
                    className="p-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer inline-flex items-center gap-1.5"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 transition-all backdrop-blur-md">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Telephone / Direct Line
                </span>
                <span className="text-lg sm:text-xl font-bold text-white block mb-4">
                  +2349075737269
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+2349075737269"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Call Direct Line</span>
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy("+2349075737269", "phone")}
                    className="p-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer inline-flex items-center gap-1.5"
                    title="Copy Phone"
                  >
                    {copiedPhone ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Consultation Request Form (Right Column) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-slate-400 text-sm mb-6 font-light">
                  Inquiries route directly to Gabriel for confidential evaluation.
                </p>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="text-lg font-bold text-white">Inquiry Received</p>
                    <p className="text-slate-300 text-sm font-light">
                      Thank you for reaching out. Gabriel will review your compliance inquiry and respond via <span className="text-cyan-400 font-mono font-medium">gabriel@lexborderai.site</span> shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your corporate work email"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Company / Logistics Group
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Global Freight Corp"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Monthly Manifest Volume
                        </label>
                        <select
                          value={formData.volume}
                          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 text-white text-sm focus:outline-none transition-colors"
                        >
                          <option value="1-100" className="bg-[#050B14]">1 - 100 Scans / Month</option>
                          <option value="100-500" className="bg-[#050B14]">100 - 500 Scans / Month</option>
                          <option value="500-2500" className="bg-[#050B14]">500 - 2,500 Scans / Month</option>
                          <option value="2500+" className="bg-[#050B14]">2,500+ Scans (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Inquiry &amp; Trade Corridor Details
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your compliance challenges, tariff lanes, or ERP integration requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Message to Founding Office</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. MODERN FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#030712] py-14 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-[#050B14] rounded-[7px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">
                LexBorder AI
              </span>
              <p className="text-xs text-slate-500">
                Autonomous Global Trade Compliance Intelligence
              </p>
            </div>
          </div>

          {/* Anchor Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Clean Copyright */}
          <div className="text-center md:text-right text-xs text-slate-500">
            <p>© {new Date().getFullYear()} LexBorder AI. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Global Trade Compliance &amp; Customs Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
