"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Tính năng", href: "#features" },
  { label: "Thông số", href: "#specs" },
  { label: "Liên hệ", href: "#newsletter" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[40] border-b border-border-subtle"
      style={{ backgroundColor: "rgba(11, 16, 29, 0.92)" }}
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
          <a
            href="#newsletter"
            className="rounded-lg bg-card-cta px-7 py-3.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-cyan hover:text-black"
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
              <a
                href="#newsletter"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-block rounded-lg bg-card-cta text-center text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-cyan hover:text-black"
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
