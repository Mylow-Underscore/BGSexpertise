'use client'

import { useRef } from "react";
import {
  motion,
  useInView,
} from "motion/react";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// const FacebookIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//   </svg>
// );

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 text-left" style={{ background: "#1E1C17" }}>
        <FadeUp>
          <div className="max-w-6xl mx-auto">
            <p className="text-white text-2xl italic mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              BGS EXPERTISE
            </p>
            <a href="https://maps.app.goo.gl/8TaWMW9V7nTLhDBB7" target="_blank" className="text-white/45 text-sm mb-6">
              75 Rte de Revel, 31400 Toulouse
            </a>
            {/* <div className="flex justify-center gap-5 mb-8">
              <motion.a
                href="https://www.facebook.com/cuisinedicietla?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55"
                whileHover={{ scale: 1.2, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FacebookIcon />
              </motion.a>
            </div> */}
            <div className="flex gap-4 mb-6 text-sm text-brand-info">
              {[
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/cgu", label: "CGU" },
                { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className=" hover:text-white/75 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
            <p className="text-white/20 text-xs">BGS EXPERTISE © {currentYear} · Tous droits réservés</p>
          </div>
        </FadeUp>
      </footer>
  )
}