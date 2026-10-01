"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, notFound } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Tariff Checks", href: "/dashboard/tariff-checks", icon: ShieldCheck },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Upgrade", href: "/dashboard/pricing", icon: Star },
];

export default function DashboardLayout({ children }) {
  notFound();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      {/* Dynamic Background */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="hidden md:flex flex-col h-full glass-panel border-r border-t-0 border-b-0 border-l-0 z-40 relative transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between h-20">
          {isSidebarOpen ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl tracking-tight">LexBorder</span>
            </motion.div>
          ) : (
            <ShieldCheck className="w-8 h-8 text-blue-500 mx-auto" />
          )}
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 bg-[var(--background)] border border-[var(--panel-border)] rounded-full p-1 shadow-sm hover:bg-[var(--panel-bg)] transition-colors z-50"
        >
          {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto overflow-x-hidden no-scrollbar">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-500 font-medium" 
                    : "text-[var(--foreground)] hover:bg-[var(--panel-border)]"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-500" : "text-slate-400 group-hover:text-[var(--foreground)]"}`} />
                {isSidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                    {link.name}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Log out</motion.span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Topbar & Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-lg">LexBorder</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm glass-panel-heavy p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                        isActive 
                          ? "bg-blue-500/10 text-blue-500 font-medium" 
                          : "hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto"
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative pt-16 md:pt-0">
        <header className="hidden md:flex h-20 items-center justify-end px-8 z-10 w-full">
          <ThemeToggle />
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar relative z-10">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
