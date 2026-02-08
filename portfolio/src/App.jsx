import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Award, Briefcase, CheckCircle, ChevronRight } from 'lucide-react';

// --- DATA FROM RESUME ---
const portfolioData = {
  personalInfo: {
    name: "KEERTHI HEPHZIBAH KODAVALLI",
    title: "Supplier Quality Engineer | ISO 13485 & 9001 Expert",
    location: "Mogalthur, Andhra Pradesh, India",
    email: "hephzibahk25@gmail.com",
    phone: "9100503973",
    linkedin: "https://www.linkedin.com/in/keerthi-hephzibah-kodavalli-a1028b216/", // Update this!
    resumeLink: "https://drive.google.com/file/d/11ZgsU0TZuLk2kgxUcIYysK3hNt2GmrvU/view?usp=sharing"
  },
  summary: "Results-driven Supplier Quality Engineer with over 2.5+ years of experience in the Medical Device industry. Expert in executing PPAP reviews, managing Approved Supplier Lists (ASL), and driving CAPA/NCR closures. Committed to ensuring product integrity through rigorous root-cause analysis and precise documentation control.",
  experience: [
    {
      company: "Tata Consultancy Services (TCS)",
      role: "Supplier Quality Engineer",
      period: "Sep 2023 - Present",
      achievements: [
        "Orchestrated comprehensive PPAP reviews (PFMEA, Control Plans, MSA) to ensure strict ISO 13485 alignment.",
        "Managed the Non-Conformance Report (NCR) lifecycle, leading 8D and 5-Why investigations to drive CAPA implementations.",
        "Executed PLQIA and FLQIA assessments to proactively identify supply chain risks.",
        "Maintained the Approved Supplier List (ASL) ensuring 100% audit readiness.",
        "Leveraged Agile PLM and Minitab to track quality metrics and generate performance reports."
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech - Electronics and Communication Engineering",
      school: "Swarnandhra College of Engineering and Technology",
      year: "2018 - 2022"
    }
  ],
  skills: {
    "Quality Assurance": ["PPAP", "FAI", "MSA", "SPC", "PFMEA", "Control Plans", "APQP"],
    "Risk & Compliance": ["ISO 13485", "ISO 9001:2015", "ISO 14971", "FLQIA/PLQIA"],
    "Problem Solving": ["Root Cause Analysis", "8D Methodology", "5 Whys", "NCR", "CAPA"],
    "Tools": ["Agile PLM", "Minitab", "Smartsheet", "MS Excel (Advanced)"]
  },
  certifications: [
    "ISO 13485: Medical Devices Quality Management Systems",
    "ISO 9001:2015: Quality Management Systems",
    "AWS Cloud: Global Certification"
  ]
};

// --- COMPONENTS ---

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
    {children}
  </h2>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600">

      {/* HEADER / HERO */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white pb-20 pt-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{portfolioData.personalInfo.name}</h1>
              <p className="text-xl text-blue-200 mb-6 font-light">{portfolioData.personalInfo.title}</p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <a href={`mailto:${portfolioData.personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={16} /> {portfolioData.personalInfo.email}
                </a>
                <span className="flex items-center gap-2">
                  <Phone size={16} /> {portfolioData.personalInfo.phone}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> {portfolioData.personalInfo.location}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Linkedin size={20} /> LinkedIn
              </a>
              <a
                href={portfolioData.personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 backdrop-blur-sm cursor-pointer"
              >
                <Download size={20} /> Resume
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 -mt-10 pb-20">

        {/* SUMMARY CARD */}
        <Card className="mb-12">
          <p className="text-lg leading-relaxed text-slate-700">
            {portfolioData.summary}
          </p>
        </Card>

        {/* SKILLS GRID */}
        <section className="mb-16">
          <SectionTitle>Technical Expertise</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(portfolioData.skills).map(([category, items]) => (
              <Card key={category} className="h-full">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">{category}</h3>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className="text-green-500 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section className="mb-16">
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="space-y-8">
            {portfolioData.experience.map((job, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-50"></div>

                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-slate-800">{job.role}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 mt-1">
                    <span className="font-semibold text-blue-600 flex items-center gap-2">
                      <Briefcase size={16} /> {job.company}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{job.period}</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-3">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <ChevronRight size={18} className="text-blue-400 mt-1 shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS & EDUCATION */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, index) => (
                <Card key={index} className="flex items-start gap-4 p-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{cert.split(":")[0]}</h4>
                    <p className="text-sm text-slate-500 mt-1">{cert.split(":")[1] || "Global Certification"}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Education</SectionTitle>
            {portfolioData.education.map((edu, index) => (
              <Card key={index} className="h-full">
                <h3 className="text-xl font-bold text-slate-800">{edu.degree}</h3>
                <p className="text-blue-600 font-medium mt-2">{edu.school}</p>
                <p className="text-slate-500 mt-4 text-sm bg-slate-100 inline-block px-3 py-1 rounded-full">
                  Class of {edu.year.split("-")[1].trim()}
                </p>
              </Card>
            ))}
          </section>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}