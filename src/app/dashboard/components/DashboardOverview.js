"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from "recharts";
import { 
  ShieldCheck, ShieldAlert, FileText, Activity, 
  ArrowUpRight, ArrowDownRight, Plus, Clock, CheckCircle, AlertTriangle, Crown, X 
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel-heavy p-3 rounded-lg text-sm z-50 relative">
        <p className="font-semibold mb-1 text-[var(--foreground)]">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-slate-400 capitalize">{entry.name}: <span className="font-semibold text-[var(--foreground)]">{entry.value}</span></p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardOverview({ user, stats, recentChecks, chartData }) {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartColors = {
    primary: theme === "light" ? "#3b82f6" : "#60a5fa", // Blue
    secondary: theme === "light" ? "#8b5cf6" : "#a78bfa", // Purple
    grid: theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
    text: theme === "light" ? "#64748b" : "#94a3b8",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const handleNewCheck = () => {
    // Limit logic: If user is FREE and has 5 or more checks, block them.
    if (user?.plan === "FREE" && stats.totalChecks >= 5) {
      setShowUpgradeModal(true);
    } else {
      // Proceed to new check (mock navigation)
      console.log("Proceed to new check flow");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h1>
          <p className="text-slate-500 mt-1">Here's your trade compliance overview for today.</p>
        </div>
        <button 
          onClick={handleNewCheck}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 w-fit"
        >
          <Plus className="w-5 h-5" /> New Tariff Check
        </button>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants} className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-16 h-16 text-blue-500" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500">Total Checks</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalChecks}</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-emerald-500">
            <ArrowUpRight className="w-4 h-4" /> <span>12% this week</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500">Compliance Rate</h3>
          </div>
          <p className="text-3xl font-bold">{stats.complianceRate}%</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-emerald-500">
            <ArrowUpRight className="w-4 h-4" /> <span>2% this week</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldAlert className="w-16 h-16 text-amber-500" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500">Flagged Issues</h3>
          </div>
          <p className="text-3xl font-bold">{stats.flaggedChecks}</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-red-500">
            <ArrowUpRight className="w-4 h-4" /> <span>1 new issue</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-16 h-16 text-purple-500" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <FileText className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500">Active Documents</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalDocuments}</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-slate-400">
            <span>2 pending review</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Compliance Trend
            </h2>
          </div>
          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: chartColors.text, fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: chartColors.text, fontSize: 12 }} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent', stroke: chartColors.grid, strokeWidth: 2 }} />
                  <Line 
                    type="monotone" 
                    dataKey="checks" 
                    name="Total Checks"
                    stroke={chartColors.secondary} 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="compliant" 
                    name="Compliant"
                    stroke={chartColors.primary} 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-2xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" /> Recent Checks
            </h2>
            <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">View All</button>
          </div>
          
          <div className="flex-1 space-y-4">
            {recentChecks.length > 0 ? recentChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--panel-border)] transition-colors border border-transparent hover:border-[var(--panel-border)]">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    check.status === "COMPLIANT" ? "bg-emerald-500/10 text-emerald-500" : 
                    check.status === "FLAGGED" ? "bg-red-500/10 text-red-500" : 
                    "bg-amber-500/10 text-amber-500"
                  }`}>
                    {check.status === "COMPLIANT" ? <CheckCircle className="w-4 h-4" /> : 
                     check.status === "FLAGGED" ? <AlertTriangle className="w-4 h-4" /> : 
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">HS Code: {check.hsCode}</p>
                    <p className="text-xs text-slate-500">Destination: {check.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    check.status === "COMPLIANT" ? "bg-emerald-500/10 text-emerald-500" : 
                    check.status === "FLAGGED" ? "bg-red-500/10 text-red-500" : 
                    "bg-amber-500/10 text-amber-500"
                  }`}>
                    {check.status}
                  </span>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
                <ShieldCheck className="w-10 h-10 mb-2 opacity-20" />
                No recent checks found
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Upgrade Paywall Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel-heavy p-8 rounded-3xl max-w-md w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-purple-500/20 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">Limit Reached</h2>
              <p className="text-center text-slate-400 mb-8 font-light">
                You've reached your limit of 5 AI Tariff Checks on the Starter plan. Upgrade to unlock unlimited checks and automated workflows.
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => router.push("/dashboard/pricing")}
                  className="w-full relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition-all shadow-xl">
                    Proceed to Pricing
                  </div>
                </button>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full py-3.5 rounded-xl border border-[var(--panel-border-heavy)] font-medium hover:bg-[var(--panel-bg)] transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
