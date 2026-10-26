"use client";

import { useState, useEffect, useRef } from "react";
import { ThinkingOrb } from 'thinking-orbs';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7}},
};

const staggerContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6}},
};

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function StaggerList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#1E1C17]"
    >
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Thinking Orbs */}
        <ThinkingOrb
            state="solving"
            theme="auto"      
            size={64}
            speed={1.5}          // multiplier on the preset's baked speed
            paused={false}       // freeze on the current frame
            aria-label="Analysing repository…"  // overrides the per-state default
            />

        <motion.div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white font-bold text-2xl tracking-widest"
          >
            BGS
          </motion.div>
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#E8A85A] tracking-[0.3em] text-xs uppercase mt-2"
          >
            Chargement...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#2C2A25] font-sans">
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen key="splash" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center px-6 bg-linear-to-br from-[#5C6B2E] to-[#1E1C17] text-white">
        <div className="max-w-3xl">
          <FadeUp>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              L&apos;Excellence au service de votre projet.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 font-light">
              Une approche sur-mesure pour répondre aux défis complexes de votre entreprise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a onClick={() => scrollTo("services")} className="bg-white text-[#2C2A25] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#E8A85A] transition-colors">
                Découvrir nos expertises
              </a>
              <a onClick={() => scrollTo("contact")} className="border border-white/40 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                Nous contacter
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-4xl text-brand-secondary font-bold mb-4">Nos Domaines d&apos;Intervention</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Nous accompagnons nos clients à chaque étape avec des solutions adaptées à leurs besoins spécifiques.</p>
          </FadeUp>

          <StaggerList className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Conseil Stratégique", desc: "Analyse et définition de votre trajectoire de croissance." },
              { title: "Accompagnement Technique", desc: "Mise en œuvre de solutions robustes et évolutives." },
              { title: "Gestion de Projet", desc: "Pilotage rigoureux pour garantir le respect de vos objectifs." }
            ].map((service, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="p-8 border rounded-xl bg-[#FAF7F0] hover:shadow-xl shadow-brand-secondary/15 transition-shadow">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <FadeUp>
              <h2 className="text-3xl text-brand-primary font-bold mb-6">Pourquoi choisir BGS Expertise ?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Notre mission est d&apos;apporter une valeur ajoutée concrète à votre activité. Forts d&apos;une expérience solide, nous allions rigueur méthodologique et créativité pour surmonter vos obstacles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chaque projet est unique. C&apos;est pourquoi nous privilégions une écoute active pour co-construire des solutions qui vous ressemblent.
              </p>
            </FadeUp>
          </div>
          <div className="bg-[#EDE8DB] h-80 rounded-2xl flex items-center justify-center border border-white/20">
            <p className="text-gray-400 italic">[Image ou Illustration]</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp >
            <div className="">
              <h2 className="text-4xl text-brand-secondary font-bold mb-4">Prêt à lancer votre projet ?</h2>
              <p className="text-gray-600 mb-12">Contactez-nous pour une première consultation.</p>
            </div>
            <form
              method="POST"
              className="mx-auto grid max-w-lg grid-cols-1 gap-4 rounded-lg p-6 sm:grid-cols-2 text-justify"
            >
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-secondary" >
                  Nom et Prénom
                </label>

                <input
                  className="mt-1 p-1.5 w-full rounded-lg bg-brand-secondary text-brand-primary focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  id="name"
                  type="text"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-secondary">
                  E-mail
                </label>

                <input
                  className="mt-1 p-1.5 w-full rounded-lg bg-brand-secondary text-brand-primary focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  id="email"
                  type="email"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-secondary">
                  Téléphone
                </label>

                <input
                  className="mt-1 p-1.5 w-full rounded-lg bg-brand-secondary text-brand-primary focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  id="phone"
                  type="tel"
                  placeholder=""
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-secondary">
                  Description de votre projet
                </label>

                <textarea
                  className="mt-1 p-1.5 w-full resize-none rounded-lg bg-brand-secondary text-brand-primary focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  id="message"
                  rows={4}
                  placeholder=""
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button
                  className="block w-full rounded-lg border bg-brand-accent px-12 py-3 text-sm font-medium text-brand-primary transition-colors hover:bg-transparent hover:text-brand-accent dark:hover:bg-brand-accent dark:hover:text-brand-primary focus:outline-none focus:ring active:text-brand-accent"
                  type="submit"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
