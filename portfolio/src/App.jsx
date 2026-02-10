import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Award, Briefcase, CheckCircle, User, Layers, Cpu, Send, FileBadge, UserCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Torus, RoundedBox, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. TYPEWRITER EFFECT ---
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 50)));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-blue-400 font-mono font-bold tracking-wider">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

// --- 2. CINEMATIC NAME ANIMATION (FIXED MOBILE SIZING) ---
const CinematicName = ({ text }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.5 } }),
  };
  const child = {
    visible: { opacity: 1, x: 0, y: 0, z: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, x: () => Math.random() * 800 - 400, y: () => Math.random() * 600 - 300, scale: 3, filter: "blur(10px)" },
  };

  return (
    <motion.h1
      // UPDATED CLASSNAMES: Reduced base font size to text-3xl and gap to gap-x-2 for mobile to prevent splitting
      className="text-3xl sm:text-5xl md:text-7xl text-white font-signature mb-2 transform -rotate-2 leading-tight flex flex-wrap gap-x-2 md:gap-x-3 justify-center md:justify-start"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// --- 3. 3D TILT CARD ---
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rY = ((mouseX - width / 2) / width) * 12;
    const rX = ((mouseY - height / 2) / height) * -12;
    setRotateY(rY);
    setRotateX(rX);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setOpacity(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
      className={cn("relative transition-all duration-200 ease-out will-change-transform h-full", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0 rounded-2xl"
        style={{ opacity, background: `radial-gradient(600px circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 40%)` }}
      />
      <div className="relative z-10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 h-full shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
};

// --- 4. 3D SCENE & BOT ---
const QualityBot = ({ scrollY }) => {
  const group = useRef();
  const ring = useRef();
  const eye = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const scrollPixel = scrollY.current;
    const scrollProgress = scrollPixel / (document.body.scrollHeight - window.innerHeight);

    let x = 0, y = 0, z = 0;
    if (scrollPixel < 100) { x = 0; y = -0.5; z = 3; }
    else if (scrollProgress < 0.2) { x = 3; y = 0; z = 0; }
    else if (scrollProgress < 0.4) { x = -3; y = 0; z = 0; }
    else if (scrollProgress < 0.7) { x = 2.5; y = 0.5; z = 0; }
    else { x = 0; y = -1; z = 2; }

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y, 0.05);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, 0.05);

    const mouseX = (state.pointer.x * Math.PI) / 8;
    const mouseY = (state.pointer.y * Math.PI) / 8;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouseX, 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouseY, 0.1);

    if (ring.current) {
      ring.current.rotation.z += 0.01;
      ring.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    if (eye.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      eye.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox args={[1, 1, 1]} radius={0.2} smoothness={4}><meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} /></RoundedBox>
        <RoundedBox args={[0.8, 0.6, 0.1]} radius={0.05} smoothness={4} position={[0, 0.1, 0.51]}><meshStandardMaterial color="#0f172a" metalness={1} roughness={0} /></RoundedBox>
        <Sphere ref={eye} args={[0.15, 32, 32]} position={[0, 0.1, 0.55]}><meshBasicMaterial color="#3b82f6" toneMapped={false} /><pointLight distance={3} intensity={4} color="#3b82f6" /></Sphere>
        <Cylinder args={[0.1, 0.1, 0.3]} position={[0.6, 0, 0]} rotation={[0, 0, 1.57]}><meshStandardMaterial color="#475569" /></Cylinder>
        <Cylinder args={[0.1, 0.1, 0.3]} position={[-0.6, 0, 0]} rotation={[0, 0, 1.57]}><meshStandardMaterial color="#475569" /></Cylinder>
        <group ref={ring}>
          <Torus args={[1.3, 0.03, 16, 100]} rotation={[1.5, 0, 0]}><meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} toneMapped={false} /></Torus>
        </group>
        <Cylinder args={[0.3, 0.1, 0.8]} position={[0, -1.2, 0]}><meshStandardMaterial color="#334155" /></Cylinder>
        <Torus args={[0.4, 0.1, 16, 32]} position={[0, -0.9, 0]} rotation={[1.5, 0, 0]}><meshStandardMaterial color="#64748b" /></Torus>
      </Float>
    </group>
  );
};

const Scene = ({ scrollY }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={2} color="#3b82f6" />
      <QualityBot scrollY={scrollY} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </>
  );
};

// --- PRELOADER ---
const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("SYSTEM BOOT");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 50);

    const textTimer = setInterval(() => {
      const texts = ["LOADING MODULES...", "OPTIMIZING 3D...", "INITIALIZING AI...", "WELCOME"];
      setText(texts[Math.floor(Math.random() * texts.length)]);
    }, 600);

    return () => { clearInterval(timer); clearInterval(textTimer); };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-blue-500 font-mono">
      <div className="w-64 h-0.5 bg-gray-900 rounded-full overflow-hidden mb-4 relative">
        <div className="h-full bg-blue-500 shadow-[0_0_20px_#3b82f6] transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between w-64 text-[10px] tracking-[0.2em] uppercase text-blue-400/80">
        <span>{text}</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
};

// --- DATA ---
const data = {
  name: "Keerthi Hephzibah",
  roles: ["Supplier Quality Engineer", "ISO 13485 Specialist", "Risk Mitigator", "Problem Solver"],
  subtitle: "Ensuring Excellence in Medical Devices",
  location: "Andhra Pradesh, India",
  email: "hephzibahk25@gmail.com",
  phone: "9100503973",
  linkedin: "https://www.linkedin.com/in/keerthi-hephzibah-kodavalli-a1028b216/",
  resumeLink: "https://drive.google.com/file/d/1SxNjfbNdtwOx357TGzRHLU-3ixVuHyWU/view?usp=sharing",

  // Replace these with your actual image paths
  heroImage: "/Gemini_Generated_Image_9h7cfg9h7cfg9h7c (1).png",
  aboutImage: "/Gemini_Generated_Image_otn0qpotn0qpotn0.png",
  summary: "Results-driven Supplier Quality Engineer with over 2.5+ years of experience in the Medical Device industry. Expert in executing PPAP reviews, managing Approved Supplier Lists (ASL), and driving CAPA/NCR closures. Proficient in ISO 13485 and ISO 9001 compliance, utilizing data-driven tools like Agile PLM and Minitab to enhance supplier performance.",
  experience: [
    {
      company: "Tata Consultancy Services (TCS)",
      role: "Supplier Quality Engineer",
      period: "Sep 2023 - Present",
      points: [
        "Orchestrated comprehensive PPAP reviews (PFMEA, Control Plans, MSA) ensuring strict ISO 13485 alignment.",
        "Managed the Non-Conformance Report (NCR) lifecycle, leading 8D and 5-Why investigations.",
        "Executed PLQIA and FLQIA assessments to proactively identify supply chain risks.",
        "Leveraged Agile PLM and Minitab to track quality metrics and generate performance reports."
      ]
    }
  ],
  skills: {
    "Core Competencies": ["Supplier Quality", "PPAP & FAI", "CAPA Management", "Risk Analysis"],
    "Tools & Software": ["Agile PLM", "Minitab", "Smartsheet", "AWS Cloud"],
    "Compliance": ["ISO 13485", "ISO 9001:2015", "FDA 21 CFR Part 820"]
  },
  certifications: [
    { name: "ISO 13485", desc: "Medical Devices QMS" },
    { name: "ISO 9001:2015", desc: "Quality Management" },
    { name: "AWS Cloud", desc: "Global Certification" }
  ]
};

// --- UI COMPONENTS ---

// *** FIXED NAV BUTTON: Now properly accepts 'data-nav-id' ***
const NavButton = ({ active, id, icon: Icon, label, onClick, "data-nav-id": dataNavId }) => (
  <button
    onClick={() => onClick(id)}
    data-nav-id={dataNavId} // Explicitly passing the data attribute here
    className={`flex items-center justify-center md:justify-start gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 flex-shrink-0 w-auto md:w-auto text-left mb-0 md:mb-1 backdrop-blur-md snap-start
      ${active === id
        ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/30 scale-105 border border-blue-400'
        : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
      }`}
  >
    <Icon size={20} className="shrink-0" />
    <span className="hidden md:inline font-medium">{label}</span>
  </button>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-8 md:mb-10 text-white">
    <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
    <div className="h-1 w-20 bg-blue-500 rounded-full mb-4 box-shadow-glow"></div>
    <p className="text-slate-300 text-base md:text-lg">{subtitle}</p>
  </div>
);

// --- SECTIONS ---

// 1. HOME SECTION (RESPONSIVE FIX: Photo visible on mobile)
const HomeSection = () => (
  <div id="home" className="min-h-[90vh] flex flex-col justify-center py-12 md:py-20 relative z-10 pointer-events-none">
    {/* IMPORT SIGNATURE FONT */}
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      .font-signature { font-family: 'Great Vibes', cursive; }
    `}</style>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pointer-events-auto max-w-6xl mx-auto w-full px-4">

      {/* PHOTO CIRCLE: Ordered FIRST on mobile (order-1), second on Desktop (md:order-2) */}
      <div className="order-1 md:order-2 md:col-span-3 flex justify-center md:justify-start md:-ml-28 relative z-20 mt-4 md:mt-0">
        <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full border-[4px] md:border-[6px] border-[#84cc16] overflow-hidden shadow-2xl bg-slate-800 relative group">
          <img
            src={data.heroImage}
            alt="Profile"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

      {/* GLASS CARD: Ordered SECOND on mobile (order-2) */}
      <div className="order-2 md:order-1 md:col-span-9 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col justify-center min-h-[300px] md:min-h-[350px]">

        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs md:text-sm font-bold mb-4 tracking-wide border border-blue-500/30">
            OPEN TO WORK
          </span>

          {/* SIGNATURE NAME */}
          <div className="mb-2">
            <CinematicName text={data.name} />
          </div>

          <div className="h-px w-24 bg-white/20 my-4"></div>

          {/* TYPEWRITER ROLE */}
          <div className="text-white text-lg md:text-xl font-light mb-8">
            I am a <Typewriter words={data.roles} /> <br />
            <span className="opacity-80 text-sm md:text-base text-slate-300">{data.subtitle}</span>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href={data.resumeLink} target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20">
              <Download size={16} /> Download Resume
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-sm shadow-lg">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
);

// 2. ABOUT SECTION
const AboutSection = () => (
  <div id="about" className="min-h-screen py-12 md:py-20 relative z-10">
    <SectionHeading title="About Me" subtitle="A glimpse into my professional world." />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* LEFT: WORKING PHOTO */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
        <TiltCard className="rounded-[2rem] overflow-hidden p-0 h-[300px] md:h-[400px] border-0">
          <img src={data.aboutImage} alt="Working" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Current Focus</p>
            <p className="text-white text-sm">Optimizing Supply Chain Compliance</p>
          </div>
        </TiltCard>
      </div>

      {/* RIGHT: TEXT CONTENT */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <UserCircle className="text-blue-500" /> Professional Summary
        </h3>
        <p className="text-slate-300 leading-loose text-lg">
          {data.summary}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 text-center">
            <h4 className="text-3xl font-bold text-blue-400 mb-1">2.5+</h4>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Years Exp.</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 text-center">
            <h4 className="text-3xl font-bold text-purple-400 mb-1">100%</h4>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Audit Readiness</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ExperienceSection = () => (
  <div id="experience" className="min-h-screen py-12 md:py-20 max-w-5xl relative z-10">
    <SectionHeading title="Professional Journey" subtitle="My career path and key achievements." />
    <div className="space-y-12 relative">
      <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-700 hidden md:block"></div>
      {data.experience.map((job, index) => (
        <div key={index} className="relative md:pl-20">
          <div className="absolute left-[26px] top-6 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 shadow-md hidden md:block z-10"></div>
          <TiltCard className="group">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.role}</h3>
                <p className="text-base md:text-lg font-medium text-slate-400 mt-1">{job.company}</p>
              </div>
              <span className="mt-2 md:mt-0 inline-block px-4 py-1 bg-slate-800 rounded-full text-slate-300 text-xs md:text-sm font-semibold w-fit border border-slate-700">
                {job.period}
              </span>
            </div>
            <ul className="space-y-4">
              {job.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 leading-relaxed text-sm md:text-base">
                  <CheckCircle size={18} className="text-blue-500 mt-1 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = () => (
  <div id="skills" className="min-h-screen py-12 md:py-20 relative z-10">
    <SectionHeading title="Technical Expertise" subtitle="Tools and methodologies I use to ensure quality." />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
      {Object.entries(data.skills).map(([category, items], idx) => (
        <TiltCard key={idx}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
              {category.includes("Tools") ? <Cpu size={24} /> : category.includes("Risk") ? <Briefcase size={24} /> : <Award size={24} />}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">{category}</h3>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {items.map((skill, i) => (
              <span key={i} className="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-xs md:text-sm font-medium hover:border-blue-500 hover:text-white transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </TiltCard>
      ))}
    </div>
  </div>
);

const CertificationsSection = () => (
  <div id="certifications" className="min-h-[50vh] py-12 md:py-20 relative z-10">
    <SectionHeading title="Certifications" subtitle="Global standards and qualifications." />
    <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/10 relative overflow-hidden">
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.certifications.map((cert, i) => (
            <TiltCard key={i} className="bg-white/5 border-white/10 hover:bg-white/10">
              <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center mb-4 text-yellow-400">
                <FileBadge size={20} />
              </div>
              <p className="font-bold text-lg md:text-xl mb-2 text-white">{cert.name}</p>
              <p className="text-slate-400 text-sm">{cert.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContactSection = () => (
  <div id="contact" className="py-12 md:py-20 max-w-3xl mx-auto text-center pb-32 relative z-10">
    <div className="bg-slate-900/60 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border-t-4 border-blue-600 shadow-2xl border-x border-b border-white/10">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Connect</h2>
      <p className="text-slate-300 mb-10 text-base md:text-lg">
        Currently seeking new opportunities in Supplier Quality Engineering.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <a href={`mailto:${data.email}`} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500 transition-all group">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:text-white transition-colors shrink-0">
            <Mail size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email Me</p>
            <p className="text-slate-200 font-medium truncate">{data.email}</p>
          </div>
        </a>
        <a href={`tel:${data.phone}`} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-green-500 transition-all group">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 group-hover:text-white transition-colors shrink-0">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Call Me</p>
            <p className="text-slate-200 font-medium">{data.phone}</p>
          </div>
        </a>
      </div>
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
            <MapPin size={16} />
          </div>
          <p className="text-slate-300 font-medium">{data.location}</p>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN LAYOUT ---

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      const sections = ['home', 'about', 'experience', 'skills', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- AUTO SCROLL SIDEBAR LOGIC (FIXED) ---
  useEffect(() => {
    // Finds the button in the sidebar that matches the current active section
    const activeBtn = document.querySelector(`button[data-nav-id="${activeSection}"]`);
    if (activeBtn) {
      // Scrolls that button into view smoothly, centered
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      <div className={`min-h-screen font-sans text-slate-200 bg-slate-950 selection:bg-blue-500 selection:text-white overflow-x-hidden transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>

        {/* 3D SCENE BACKGROUND */}
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Scene scrollY={scrollY} />
          </Canvas>
        </div>

        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row relative z-10">

          {/* SIDEBAR NAVIGATION - FIXED & SCROLLABLE */}
          <nav className="fixed md:fixed bottom-4 md:top-0 left-0 right-0 md:w-80 md:h-screen z-50 p-4 md:p-8 flex justify-center md:justify-start items-center md:items-start pointer-events-none md:pointer-events-auto">
            {/* UPDATED: Added flex-col and min-h-0 to parent to allow proper scrolling */}
            <div className="w-[95%] md:w-full rounded-2xl md:rounded-3xl p-2 md:p-8 flex md:flex-col justify-between md:justify-start gap-1 md:gap-4 shadow-2xl border border-white/10 pointer-events-auto bg-slate-900/80 backdrop-blur-xl md:h-auto md:max-h-[90vh] md:min-h-0 overflow-hidden">

              {/* Profile Snippet */}
              <div className="hidden md:flex flex-col items-center mb-0 text-center pt-2 border-b border-white/10 pb-6 shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-blue-500/30">
                  KH
                </div>
                <h2 className="text-white font-bold text-xl">{data.name}</h2>
                <p className="text-slate-400 text-xs uppercase tracking-widest mt-2 font-semibold">Quality Engineer</p>
                <div className="flex items-center gap-2 mt-4 text-slate-400 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  <MapPin size={14} />
                  <span>{data.location}</span>
                </div>
              </div>

              {/* Navigation Buttons - FIXED: Now passes data-nav-id correctly */}
              <div className="flex md:flex-col w-full md:flex-1 justify-between md:justify-start gap-1 overflow-x-auto md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <NavButton active={activeSection} id="home" icon={User} label="Overview" onClick={scrollTo} data-nav-id="home" />
                <NavButton active={activeSection} id="about" icon={UserCircle} label="About" onClick={scrollTo} data-nav-id="about" />
                <NavButton active={activeSection} id="experience" icon={Layers} label="Experience" onClick={scrollTo} data-nav-id="experience" />
                <NavButton active={activeSection} id="skills" icon={Cpu} label="Expertise" onClick={scrollTo} data-nav-id="skills" />
                <NavButton active={activeSection} id="certifications" icon={FileBadge} label="Certifications" onClick={scrollTo} data-nav-id="certifications" />
                <NavButton active={activeSection} id="contact" icon={Send} label="Contact" onClick={scrollTo} data-nav-id="contact" />
              </div>
            </div>
          </nav>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 px-4 md:px-12 md:ml-80 pb-32 md:pb-0 w-full">
            <HomeSection />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <CertificationsSection />
            <ContactSection />
          </main>
        </div>
      </div>
    </>
  );
}