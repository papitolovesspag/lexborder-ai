"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10 rounded-xl bg-white/5" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-[var(--panel-border)] transition-colors overflow-hidden group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 0 : 30,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "backOut" }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-[var(--foreground)]" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === "light" ? 0 : -30,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "backOut" }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-[var(--foreground)]" />
      </motion.div>
    </button>
  );
}
