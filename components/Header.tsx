"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Tính năng", href: "#features" },
  { label: "Thông số", href: "#specs" },
  { label: "Liên hệ", href: "#newsletter" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[40] border-b border-border-subtle"
      style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 92%, transparent)" }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <Link
          href="#"
          className="font-heading text-xl font-extrabold tracking-wider text-text-primary transition-opacity duration-200 hover:opacity-80"
        >
          HELI<span className="text-accent-cyan">CORP</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-accent-cyan"
            >
              {link.label}
            </a>
          ))}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-surface hover:text-accent-cyan"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}
          <a
            href="#newsletter"
            className="rounded-lg bg-card-cta px-7 py-3.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-cyan hover:text-text-cta-hover"
            style={{ borderRadius: "8px", padding: "14px 28px" }}
          >
            Trải nghiệm ngay
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={mobileOpen}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-text-primary"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-text-primary"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-text-primary"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full border-b border-border-subtle bg-bg-primary px-6 pb-6 pt-4 md:hidden"
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-text-muted transition-colors duration-200 hover:text-accent-cyan"
                >
                  {link.label}
                </a>
              ))}
              {mounted && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-text-muted">Giao diện</span>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-surface text-text-muted transition-colors hover:text-accent-cyan"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
              <a
                href="#newsletter"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-block rounded-lg bg-card-cta text-center text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-cyan hover:text-text-cta-hover"
                style={{ borderRadius: "8px", padding: "14px 28px" }}
              >
                Trải nghiệm ngay
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
