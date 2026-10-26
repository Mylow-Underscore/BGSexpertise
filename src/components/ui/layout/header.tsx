"use client"

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";


export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="">
      <nav className="">
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-foreground backdrop-blur-md border-b border-[#EDE8DB]" : "bg-transparent"}`}
            style={{ background: scrolled ? "var(--background)" : "transparent", backdropFilter: scrolled ? "blur(8px)" : "none", borderColor: scrolled ? "var(--accent)" : "transparent" }}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 0.92 }}
            transition={{ duration: 0.7, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between h-16 text-sm font-medium px-4 md:px-8">
            <button
                onClick={() => scrollTo("hero")}
                className="text-lg font-bold tracking-wide transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif", color: scrolled ? "#5C6B2E" : "#ffffff" }}
            >
                BGS EXPERTISE
            </button>

            <div className="hidden md:flex items-center gap-8">
                {[
                  { label: "Acceuil", id: "hero" },
                  { label: "Nos services", id: "services" },
                  { label: "À Propos", id: "about" },
                ].map(({ label, id }) => (
                    <button
                        key={label}
                        onClick={() => scrollTo(id)}
                        className="cursor-pointer text-xs font-bold uppercase tracking-widest transition-colors duration-200"
                        style={{ color: scrolled ? "#6B6660" : "rgba(255,255,255,0.8)" }}
                    >
                        {label}
                    </button>
                ))}
                <motion.button onClick={() => scrollTo("contact")} className="bg-[#1E1C17] hover:bg-[#5C6B2E] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors cursor-pointer">
                    Contact
                </motion.button>
            </div>

            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className={`block w-6 h-0.5 ${scrolled ? "bg-[#2C2A25]" : "bg-white"}`}
                    animate={{ rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0, y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0, opacity: menuOpen && i === 1 ? 0 : 1 }}
                    transition={{ duration: 0.22 }}
                />
                ))}
            </button>
            </div>

            <AnimatePresence>
            {menuOpen && (
                <motion.div
                className="md:hidden bg-[#FAF7F0] border-t border-[#EDE8DB] px-6 py-4 flex flex-col gap-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                >
                {[
                    { label: "Accueil", id: "hero" },
                    { label: "À propos", id: "apropos" },
                    { label: "Carte", id: "carte" },
                ].map(({ label, id }) => (
                    <button key={label} onClick={() => scrollTo(id)} className="text-sm font-bold uppercase tracking-widest text-left text-[#6B6660]">
                        {label}
                    </button>
                ))}
                <motion.button onClick={() => scrollTo("contact")} className="bg-[#1E1C17] hover:bg-[#5C6B2E] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors cursor-pointer">
                    Contact
                </motion.button>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.nav>
      </nav>
    </header>
  )
}

