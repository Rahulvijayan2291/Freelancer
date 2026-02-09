import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Award, Briefcase, CheckCircle, User, Layers, Cpu, Send, ExternalLink } from 'lucide-react';

// --- PERSONAL DATA ---
const data = {
  name: "Keerthi Hephzibah Kodavalli",
  fullName: "Keerthi Hephzibah Kodavalli",
  title: "Supplier Quality Engineer",
  subtitle: "ISO 13485 & 9001 Expert | Medical Devices",
  location: "Andhra Pradesh, India",
  email: "hephzibahk25@gmail.com",
  phone: "9100503973",
  linkedin: "https://www.linkedin.com/in/keerthi-hephzibah-kodavalli-a1028b216/",
  resumeLink: "https://drive.google.com/file/d/1SxNjfbNdtwOx357TGzRHLU-3ixVuHyWU/view?usp=sharing",
  summary: "Results-driven Supplier Quality Engineer with over 2.5+ years of experience in the Medical Device industry. Expert in executing PPAP reviews, managing Approved Supplier Lists (ASL), and driving CAPA/NCR closures.",
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
    "Core Competencies": ["Supplier Quality", "PPAP & FAI", "CAPA Management", "Risk Analysis (ISO 14971)", "Audit Readiness"],
    "Tools & Software": ["Agile PLM", "Minitab", "Smartsheet", "MS Excel (Advanced)", "AWS Cloud"],
    "Compliance": ["ISO 13485", "ISO 9001:2015", "FDA 21 CFR Part 820 Awareness"]
  },
  education: [
    {
      degree: "B.Tech - Electronics & Communication",
      school: "Swarnandhra College of Engineering",
      year: "2018 - 2022"
    }
  ]
};

// --- COMPONENTS ---

const NavButton = ({ active, id, icon: Icon, label, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 w-full md:w-auto text-left mb-2
      ${active === id
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 font-semibold'
        : 'text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-md font-medium'
      }`}
  >
    <Icon size={20} />
    <span className="hidden md:inline">{label}</span>
    {/* Mobile Icon Label */}
    <span className="md:hidden text-xs">{label}</span>
  </button>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-4xl font-bold text-slate-800 mb-2">{title}</h2>
    <div className="h-1 w-20 bg-blue-600 rounded-full mb-4"></div>
    <p className="text-slate-500 text-lg">{subtitle}</p>
  </div>
);

// --- SECTIONS ---

const HomeSection = () => (
  <div id="home" className="min-h-[90vh] flex flex-col justify-center py-20">
    <div className="glass p-8 md:p-16 rounded-3xl border-l-8 border-blue-600 shadow-2xl">
      <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6 tracking-wide">
        OPEN TO WORK
      </span>
      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
        Hello, I'm <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          {data.name}.
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
        {data.title} specializing in <span className="font-semibold text-slate-800">Medical Device Compliance</span> and <span className="font-semibold text-slate-800">Quality Assurance</span>.
      </p>

      <div className="flex flex-wrap gap-4">
        <a href={data.resumeLink} target="_blank" rel="noreferrer" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-3 shadow-xl cursor-pointer">
          <Download size={20} /> Download Resume
        </a>
        <a href={data.linkedin} target="_blank" rel="noreferrer" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all flex items-center gap-3">
          <Linkedin size={20} /> LinkedIn
        </a>
      </div>
    </div>
  </div>
);

const ExperienceSection = () => (
  <div id="experience" className="min-h-screen py-20 max-w-5xl">
    <SectionHeading title="Professional Journey" subtitle="My career path and key achievements." />

    <div className="space-y-12 relative">
      <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-300 hidden md:block"></div>

      {data.experience.map((job, index) => (
        <div key={index} className="relative md:pl-20">
          <div className="absolute left-[26px] top-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-md hidden md:block z-10"></div>

          <div className="glass p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300 group">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{job.role}</h3>
                <p className="text-lg font-medium text-slate-500 mt-1">{job.company}</p>
              </div>
              <span className="mt-2 md:mt-0 inline-block px-4 py-1 bg-slate-100 rounded-full text-slate-600 text-sm font-semibold">
                {job.period}
              </span>
            </div>
            <ul className="space-y-4">
              {job.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                  <CheckCircle size={18} className="text-blue-500 mt-1 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = () => (
  <div id="skills" className="min-h-screen py-20">
    <SectionHeading title="Technical Expertise" subtitle="Tools and methodologies I use to ensure quality." />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {Object.entries(data.skills).map(([category, items], idx) => (
        <div key={idx} className="glass p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-blue-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              {category.includes("Tools") ? <Cpu size={24} /> : category.includes("Risk") ? <Briefcase size={24} /> : <Award size={24} />}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{category}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {items.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-white border border-slate-100 rounded-lg text-slate-600 text-sm font-medium hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactSection = () => (
  <div id="contact" className="py-20 max-w-3xl mx-auto text-center pb-32">
    <div className="glass p-12 rounded-[2rem] border-t-4 border-blue-600 shadow-2xl">
      <h2 className="text-4xl font-bold text-slate-800 mb-6">Let's Connect</h2>
      <p className="text-slate-600 mb-10 text-lg">
        Currently seeking new opportunities in Supplier Quality Engineering.
      </p>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <a href={`mailto:${data.email}`} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email Me</p>
            <p className="text-slate-800 font-medium break-all">{data.email}</p>
          </div>
        </a>

        <a href={`tel:${data.phone}`} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-green-400 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Call Me</p>
            <p className="text-slate-800 font-medium">{data.phone}</p>
          </div>
        </a>

      </div>
      <div className="mt-6 flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">

        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">

          <MapPin size={18} />

        </div>

        <p className="text-slate-700 font-medium">{data.location}</p>

      </div>
    </div>
  </div>
);

// --- MAIN LAYOUT ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'contact'];

      // Calculate which section is closest to the top of the viewport
      const scrollPosition = window.scrollY + 300; // 300px offset triggers change earlier

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

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-600 bg-slate-50 selection:bg-blue-200">

      {/* ANIMATED BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">

        {/* SIDEBAR NAVIGATION (Updated for Visibility) */}
        <nav className="fixed md:sticky bottom-4 md:top-0 left-0 right-0 md:w-80 md:h-screen z-50 p-4 md:p-8 flex justify-center md:justify-start items-center md:items-start pointer-events-none">
          {/* Changed 'glass-dark' to 'glass' and fixed text colors */}
          <div className="glass w-[95%] md:w-full rounded-2xl md:rounded-3xl p-2 md:p-8 flex md:flex-col justify-between md:justify-start gap-1 md:gap-2 shadow-2xl border-white/40 pointer-events-auto">

            {/* Profile Snippet */}
            <div className="hidden md:flex flex-col items-center mb-8 text-center pt-2 border-b border-slate-100 pb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-blue-500/30">
                KH
              </div>
              {/* FIXED: Text colors are now dark slate, not white */}
              <h2 className="text-slate-800 font-bold text-xl">{data.name}</h2>
              <p className="text-slate-500 text-xs uppercase tracking-widest mt-2 font-semibold">Supplier Quality Engineer</p>
            </div>

            {/* Navigation Buttons */}
            <NavButton active={activeSection} id="home" icon={User} label="Overview" onClick={scrollTo} />
            <NavButton active={activeSection} id="experience" icon={Layers} label="Experience" onClick={scrollTo} />
            <NavButton active={activeSection} id="skills" icon={Cpu} label="Expertise" onClick={scrollTo} />
            <NavButton active={activeSection} id="contact" icon={Send} label="Contact" onClick={scrollTo} />
          </div>
        </nav>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 px-6 md:px-12 md:ml-4 pb-24 md:pb-0">
          <HomeSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}