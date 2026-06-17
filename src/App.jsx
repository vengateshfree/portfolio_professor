import { useState, useEffect } from 'react'
import {
  GraduationCap,
  Briefcase,
  Award,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Search,
  BookOpen,
  Cpu,
  Database,
  Globe,
  Menu,
  X,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Bookmark,
  AwardIcon,
  HelpCircle,
  FileCheck
} from 'lucide-react'

// Data definitions
const roles = [
  "Sensor Networks",
  "5G/6G",
  "AI & ML Research",
  "Data Analytics"
]

const publications = [
  {
    title: "Ensemble Machine Learning Approach for Pre-IVF Prediction",
    journal: "Journal of Information Technology Management",
    year: "2026",
    category: "AI/ML",
    link: "https://www.scopus.com",
    abstract: "Proposes a novel ensemble classifier technique using voting models to significantly improve accuracy metrics for early-stage IVF outcome predictions."
  },
  {
    title: "Hybrid Deep Learning Model for IVF Outcome Prediction",
    journal: "Journal of Information Technology Management",
    year: "2026",
    category: "AI/ML",
    link: "https://www.scopus.com",
    abstract: "Combines CNN and sequential LSTM neural layers to extract temporal clinical features, enhancing multi-class classification limits."
  },
  {
    title: "Data Compression Framework for WSN Using S-CAE",
    journal: "SN Computer Science",
    year: "2023",
    category: "WSN",
    link: "https://www.scopus.com",
    abstract: "Introduces Stacked Convolutional Autoencoders (S-CAE) to compress sensor streams locally, cutting network energy consumption by 42%."
  },
  {
    title: "Balancing Web Application Workload Using CPU-GPU Architecture",
    journal: "SN Computer Science",
    year: "2024",
    category: "Systems & Cloud",
    link: "https://www.scopus.com",
    abstract: "Designs a workload-balancing daemon that dynamically offloads data serialization and database operations across heterogeneous CPU-GPU clusters."
  }
]

const patents = [
  {
    id: 1,
    title: "German Patent – AI Based Smart Agriculture System",
    description: "An integrated cloud-based system that leverages machine learning and wireless sensor nodes to analyze real-time soil moisture, local weather, and crop health metrics, dynamically triggering micro-irrigation systems.",
    type: "German Patent",
    status: "Granted / Registered"
  },
  {
    id: 2,
    title: "Automatic Railway Gate Control Using Cloud-Based System",
    description: "An automated safety mechanism designed to control railway crossings using IoT proximity sensors and real-time cloud data pipelines, mitigating collision risks and local traffic delays.",
    type: "Indian Patent",
    status: "Published"
  },
  {
    id: 3,
    title: "Barbie with Brains: Interactive Robot",
    description: "An educational AI-powered interactive robotics framework integrated with natural language processing and computer vision to promote active conversational learning for children.",
    type: "Indian Patent",
    status: "Published"
  },
  {
    id: 4,
    title: "Human Agility Identification Using CNN & LSTM",
    description: "A deep learning framework combining convolutional networks for spatial feature extraction and LSTM networks for temporal pose sequence estimation, designed for sports analytics and physical therapy.",
    type: "Indian Patent",
    status: "Published"
  },
  {
    id: 5,
    title: "Digital Security Authentication Using Machine Learning",
    description: "An adaptive biometric and behavioral authentication protocol that utilizes machine learning classifiers to run background risk analysis and verify secure endpoints.",
    type: "Indian Patent",
    status: "Published"
  },
  {
    id: 6,
    title: "Cloud-Based Air Quality Monitoring System",
    description: "A distributed sensor network for municipal monitoring that aggregates particulate matter and gaseous metrics to cloud dashboards, generating predictive air-quality forecasts.",
    type: "Indian Patent",
    status: "Published"
  }
]

const skills = {
  programming: ["C", "C++", "Python", "C# .NET", "OpenGL", "Matlab"],
  cloud: ["AWS", "Azure", "Docker", "Power BI", "Tableau", "Git"],
  databases: ["Oracle", "SQL Server", "MySQL"],
  web: ["HTML", "ASP", "XML", "CSS (Tailwind)", "JavaScript (React)"]
}

const experience = [
  {
    role: "Head of Department",
    institution: "School of Computing & IT, REVA University",
    duration: "Sep 2023 - Present",
    badge: "Leadership & Administration",
    details: [
      "Overseeing academic execution, curriculum upgrades, and strategic vision for B.Tech CS & IT streams.",
      "Cultivating industry ties, facilitating placements, and managing university board review tasks.",
      "Directing student advisory councils, research initiatives, and laboratory hardware investments."
    ]
  },
  {
    role: "Associate Professor",
    institution: "REVA University",
    duration: "Jan 2023 - Present",
    badge: "Advanced Instruction",
    details: [
      "Lecturing post-graduate and doctoral courses in Artificial Intelligence, Deep Neural Models, and Cloud Systems.",
      "Advising student project teams building machine learning systems for biomedical applications.",
      "Reviewing and publishing peer-reviewed manuscripts in high-impact Scopus indexed journals."
    ]
  },
  {
    role: "Assistant Professor",
    institution: "REVA Institute of Technology & Management",
    duration: "2010 - 2020",
    badge: "Core Pedagogy",
    details: [
      "Instructed core programming, databases, and algorithms curricula to undergraduate engineering bodies.",
      "Managed administrative programs including internal examinations scheduling and student research symposiums.",
      "Co-developed frameworks for communication systems and network routing optimizations."
    ]
  }
]

const education = [
  {
    degree: "Ph.D. in Computer Science",
    specialization: "Computer Science & Engineering",
    institution: "VTU, Belagavi",
    year: "2022",
    details: "Completed doctoral thesis focusing on machine learning predictive systems."
  },
  {
    degree: "M.Tech in CSE",
    specialization: "Computer Science & Engineering",
    institution: "NMIT, Bengaluru",
    year: "2010",
    details: "Graduated with 72.33% distinction honors."
  },
  {
    degree: "B.E. in ISE",
    specialization: "Information Science & Engineering",
    institution: "BCET, Bengaluru",
    year: "2008",
    details: "Graduated with 63.06% first-class scoring."
  }
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('experience')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openPatentId, setOpenPatentId] = useState(null)

  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    let timer
    const fullText = roles[roleIndex]

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1))
        setTypingSpeed(45)
      }, typingSpeed)
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1))
        setTypingSpeed(85)
      }, typingSpeed)
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      setTypingSpeed(150)
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, roleIndex])

  // Filter publications
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Submit Contact Form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
      setFormState({ name: '', email: '', subject: '', message: '' })
      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000)
    }, 1200)
  }

  const togglePatent = (id) => {
    setOpenPatentId(openPatentId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative selection:bg-indigo-500 selection:text-white pb-16">

      {/* Background Graphic Meshes */}
      <div className="absolute top-0 right-0 w-[55%] h-[650px] bg-gradient-to-bl from-indigo-100/50 via-sky-100/20 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-[350px] -left-20 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel shadow-xs">
        <div className="max-w-6xl mx-auto px-6 py-4.5 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-indigo-950 flex items-center justify-center text-white shadow-md shadow-indigo-950/10 group-hover:scale-105 transition-all">
              <GraduationCap className="h-5.5 w-5.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">Dr. Lithin Kumble</span>
              <span className="text-[10px] text-slate-400 font-bold -mt-0.5 tracking-widest uppercase">REVA University HoD</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
            <a href="#about" className="text-slate-600 hover:text-indigo-600 transition-colors">About</a>
            <a href="#academic" className="text-slate-600 hover:text-indigo-600 transition-colors">Academic</a>
            <a href="#research" className="text-slate-600 hover:text-indigo-600 transition-colors">Research</a>
            <a href="#awards" className="text-slate-600 hover:text-indigo-600 transition-colors">Awards</a>
            <a href="#contact" className="px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl shadow-md shadow-indigo-950/10 hover:shadow-indigo-950/20 transition-all hover:-translate-y-0.5">Contact Me</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-650"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl animate-fade-in">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-indigo-600 font-bold uppercase tracking-wider text-xs">About</a>
            <a href="#academic" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-indigo-600 font-bold uppercase tracking-wider text-xs">Academic</a>
            <a href="#research" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-indigo-600 font-bold uppercase tracking-wider text-xs">Research</a>
            <a href="#awards" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-indigo-600 font-bold uppercase tracking-wider text-xs">Awards</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-center bg-indigo-950 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md">Contact Me</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-24 px-6 z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">

          {/* Hero Content Left */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-50 border border-indigo-100/60 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest rounded-lg">
              <Sparkles className="h-3 w-3 text-indigo-500" /> REVA University, Bengaluru
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                Dr. Lithin Kumble
              </h1>
              <p className="text-lg md:text-xl font-bold text-indigo-650">
                Associate Professor & Head of Department
              </p>
            </div>

            {/* Professional Typewriter Subtitle */}
            <p className="text-xl md:text-2xl font-bold text-slate-800 pl-0.5 tracking-tight">
              Specializing in <span className="text-indigo-650 font-black">{currentText}</span>
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              Academic administrator and research scientist directing computer systems operations at the School of Computing & IT. Spearheading projects in healthcare AI, autoencoder data compression, and Wireless Sensor Networks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#contact" className="px-6 py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-md shadow-indigo-950/10 hover:shadow-indigo-950/20 transition-all hover:-translate-y-0.5 text-xs uppercase tracking-wider">
                Contact Me
              </a>
              <a href="#research" className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 rounded-xl shadow-3xs transition-all hover:-translate-y-0.5 text-xs uppercase tracking-wider">
                Publications
              </a>
            </div>

            {/* Clean inline Academic Identifiers as button badges */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
              <a
                href="https://www.scopus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xs text-slate-700 hover:text-indigo-750 font-semibold transition-all hover:-translate-y-0.5 shadow-3xs"
              >
                <span className="font-extrabold text-indigo-900">Scopus ID</span>
                <span>57202369316</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              </a>
              <a
                href="https://orcid.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-xl text-xs text-slate-700 hover:text-indigo-750 font-semibold transition-all hover:-translate-y-0.5 shadow-3xs"
              >
                <span className="font-extrabold text-indigo-900">ORCID ID</span>
                <span>0000-0002-6995-0800</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Hero Right: Clean Circular Profile Frame */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-slate-200/80 ring-1 ring-slate-200 flex items-center justify-center bg-white group hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/avatar.png"
                alt="Dr. Lithin Kumble"
                className="w-full h-full object-cover scale-[1.02]"
              />
            </div>

            {/* Institution Badge */}
            <div className="mt-6 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5">School of Computing & IT</p>
              <p className="text-sm font-black text-slate-900">REVA University, Bengaluru</p>
            </div>
          </div>

        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 px-6 relative z-10 border-t border-slate-200/50 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1.5">Executive Summary</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Academic Leadership</h2>
            <div className="h-1 w-12 bg-indigo-600 rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">

            {/* Quick Metrics Grid */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4">
              {[
                { val: "16.3", label: "Years Experience", icon: Briefcase, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
                { val: "25+", label: "Papers & Patents", icon: Award, color: "text-sky-600 bg-sky-50 border-sky-100" },
                { val: "2.5", label: "Years HoD CS&IT", icon: GraduationCap, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                { val: "1k+", label: "Students Guided", icon: Cpu, color: "text-amber-600 bg-amber-50 border-amber-100" }
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/70 rounded-2xl p-5 hover:shadow-lg hover:shadow-indigo-950/5 hover:border-indigo-600/20 hover:-translate-y-0.5 transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-xl border ${metric.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                    </div>

                    <p className="text-3xl font-black text-slate-900 tracking-tight mb-1">{metric.val}</p>
                    <p className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest leading-normal">{metric.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Intro Text */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-800 leading-snug">
                Pioneering education and data research frameworks inside computer engineering.
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Dr. Lithin Kumble is an academic administrator, researcher, and educational leader with over 16.3 years of experience in higher education management. He currently serves as Associate Professor and Head of Department (HoD) for B.Tech Computer Science & Information Technology at REVA University, Bengaluru.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Throughout his career, Dr. Kumble has established research workflows integrating deep learning algorithms into health monitoring analytics, agricultural automation, and wireless networks, translating complex computer frameworks into viable engineering solutions.
              </p>

              {/* Highlight Research Areas */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Key Research Domains</p>
                <div className="flex flex-wrap gap-2">
                  {["Artificial Intelligence", "Machine Learning", "Deep Learning", "Healthcare AI", "Wireless Sensor Networks", "5G/6G Networks", "Data Analytics"].map((item) => (
                    <span key={item} className="bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Panel (Tabbed Profile Dashboard) */}
      <section id="academic" className="py-24 px-6 relative z-10 border-t border-slate-200/60 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1.5">Profile Dashboard</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Experience & Credentials</h2>
            <div className="h-1 w-12 bg-indigo-600 rounded-full mt-4 mb-8"></div>

            {/* Tab toggles */}
            <div className="inline-flex bg-slate-200/60 border border-slate-300/40 p-1.5 rounded-2xl gap-1">
              {[
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'skills', label: 'Skills & Tech', icon: Cpu }
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${isActive
                        ? 'bg-indigo-950 text-white shadow-md shadow-indigo-950/10'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive display board */}
          <div className="glass-card rounded-3xl p-8 border border-slate-200/60">

            {/* Experience timeline */}
            {activeTab === 'experience' && (
              <div className="space-y-12 pl-2 relative border-l-2 border-slate-200/60 ml-2">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 group">

                    {/* Glowing Node Dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-4 border-indigo-950 group-hover:scale-110 transition-transform shadow-xs"></div>

                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      {/* Duration & Badge info */}
                      <div className="md:col-span-3 space-y-1.5">
                        <span className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100/60 text-indigo-750 text-[10px] font-bold uppercase rounded-lg">
                          {exp.duration}
                        </span>
                        <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest pl-0.5">{exp.badge}</p>
                      </div>

                      {/* Role & Achievements Card */}
                      <div className="md:col-span-9 bg-white hover:bg-slate-50/20 border border-slate-200/60 hover:border-indigo-600/35 hover:shadow-lg hover:shadow-indigo-950/5 rounded-2xl p-6 transition-all duration-300">
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-650 transition-colors leading-tight">{exp.role}</h3>
                        <p className="text-xs font-bold text-indigo-700 mb-4">{exp.institution}</p>

                        <ul className="space-y-3 pt-4 border-t border-slate-100">
                          {exp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                              <div className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                <FileCheck className="h-3.5 w-3.5" />
                              </div>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Education layout */}
            {activeTab === 'education' && (
              <div className="grid md:grid-cols-3 gap-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl hover:border-indigo-600/20 relative overflow-hidden group border border-slate-200">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-600/5 to-transparent -mr-4 -mt-4 rounded-bl-full group-hover:scale-110 transition-transform"></div>

                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                      <GraduationCap className="h-5.5 w-5.5" />
                    </div>

                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Calendar className="h-3 w-3" /> Completed in {edu.year}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">{edu.degree}</h3>
                    <p className="text-xs font-bold text-indigo-600 mb-2">{edu.specialization}</p>
                    <p className="text-xs text-slate-500 font-semibold mb-4">{edu.institution}</p>
                    <p className="text-xs text-slate-650 border-t border-slate-100 pt-4 leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Technical skills dashboard */}
            {activeTab === 'skills' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Languages */}
                <div className="glass-card p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Cpu className="h-4.5 w-4.5" /></div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.programming.map(skill => (
                      <span key={skill} className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:border-indigo-600/30 hover:text-indigo-750 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cloud & Analytics */}
                <div className="glass-card p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Globe className="h-4.5 w-4.5" /></div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Cloud & Analytics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.cloud.map(skill => (
                      <span key={skill} className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:border-indigo-600/30 hover:text-indigo-750 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div className="glass-card p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Database className="h-4.5 w-4.5" /></div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Databases</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.databases.map(skill => (
                      <span key={skill} className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:border-indigo-600/30 hover:text-indigo-750 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Web Technologies */}
                <div className="glass-card p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><FileText className="h-4.5 w-4.5" /></div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Web Architectures</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.web.map(skill => (
                      <span key={skill} className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:border-indigo-600/30 hover:text-indigo-750 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* Research Showcase */}
      <section id="research" className="py-24 px-6 relative z-10 border-t border-slate-200/60 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1.5">Intellectual Contributions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Research & Inventions</h2>
            <div className="h-1 w-12 bg-indigo-600 rounded-full mt-4 mb-4"></div>
            <p className="text-slate-500 text-sm">Indexed academic research publications and active patent disclosures.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">

            {/* Publications Catalog - Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-105 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="h-5.5 w-5.5 text-indigo-650" />
                  <span>Journal Publications</span>
                </h3>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  {filteredPublications.length} Found
                </span>
              </div>

              {/* Search & filters */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search publications by title keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-2xs"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {['All', 'AI/ML', 'WSN', 'Systems & Cloud'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border transition-all ${selectedCategory === cat
                          ? 'bg-indigo-950 border-indigo-950 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Publications Cards */}
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub, idx) => (
                    <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-200 hover:shadow-lg transition-all flex justify-between gap-4 group">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[9px] font-bold uppercase rounded-md tracking-wider">
                            {pub.category}
                          </span>
                          <span className="text-[10px] text-slate-450 font-bold">{pub.year}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-650 transition-colors leading-snug">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-slate-500 italic">
                          {pub.journal}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                          {pub.abstract}
                        </p>
                      </div>

                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-650 hover:border-indigo-650 transition-colors self-center shadow-2xs"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-xs font-semibold">No journal entries found matching criteria.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Patent accordions - Right */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Award className="h-5.5 w-5.5 text-indigo-650" />
                  <span>Patent Publications</span>
                </h3>
              </div>

              <div className="space-y-3">
                {patents.map((pat) => {
                  const isOpen = openPatentId === pat.id
                  return (
                    <div
                      key={pat.id}
                      className={`border rounded-2xl transition-all overflow-hidden ${isOpen
                          ? 'border-indigo-650 bg-indigo-50/10 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-350'
                        }`}
                    >
                      <button
                        onClick={() => togglePatent(pat.id)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-slate-800"
                      >
                        <div className="space-y-1.5 pr-4">
                          <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase rounded-md tracking-wider ${pat.type.startsWith('German')
                              ? 'bg-amber-50 text-amber-800 border border-amber-200/50'
                              : 'bg-indigo-50 text-indigo-800 border border-indigo-200/50'
                            }`}>
                            {pat.type}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{pat.title}</h4>
                        </div>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-indigo-600 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {pat.description}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            <Bookmark className="h-3.5 w-3.5 text-indigo-600" />
                            <span>Status: <strong className="text-indigo-700">{pat.status}</strong></span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-24 px-6 relative z-10 border-t border-slate-200/60 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1.5">Accreditation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Honors & Achievements</h2>
            <div className="h-1 w-12 bg-indigo-600 rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Favorite Faculty Award",
                subtitle: "REVA ITM | 2012",
                desc: "Awarded by student polls for excellence in classroom engagement, mentorship accessibility, and instructional pedagogy.",
                badge: "Pedagogical Excellence",
                bg: "from-amber-500/10 to-transparent",
                border: "border-amber-200"
              },
              {
                title: "Best Performance Award",
                subtitle: "VTU Staff Cricket Tournament",
                desc: "Honored for outstanding sportsmanship and athletic coordination during the annual VTU inter-college matches.",
                badge: "Sportsmanship Award",
                bg: "from-indigo-500/10 to-transparent",
                border: "border-indigo-200"
              },
              {
                title: "Data Consultant",
                subtitle: "Boston IT Solutions",
                desc: "Invited research advisor setting analytics pipeline setups and machine learning model integrations.",
                badge: "Corporate Advisor",
                bg: "from-sky-500/10 to-transparent",
                border: "border-sky-200"
              },
              {
                title: "Global Conference Chair",
                subtitle: "GCITC",
                desc: "Appointed general session chair and paper reviewer governing international research symposium panels.",
                badge: "Conference Chair",
                bg: "from-teal-500/10 to-transparent",
                border: "border-teal-200"
              },
              {
                title: "Life Member",
                subtitle: "Computer Society of India",
                desc: "Awarded lifetime credential for active contributions in regional computing chapters and public forums.",
                badge: "CSI Lifetime Member",
                bg: "from-rose-500/10 to-transparent",
                border: "border-rose-200"
              }
            ].map((award, idx) => (
              <div key={idx} className={`glass-card p-6 rounded-2xl border ${award.border} flex flex-col justify-between relative overflow-hidden group`}>
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${award.bg} blur-xl opacity-40 group-hover:scale-125 transition-transform`}></div>

                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-500 text-[9px] font-bold uppercase tracking-wider rounded-lg border border-slate-200">
                    <AwardIcon className="h-3 w-3 text-indigo-650" /> {award.badge}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">{award.title}</h3>
                    <p className="text-xs font-bold text-indigo-650">{award.subtitle}</p>
                  </div>
                  <p className="text-xs text-slate-555 leading-relaxed">{award.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10 border-t border-slate-200/60 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1.5">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Inquiry & Partnerships</h2>
            <div className="h-1 w-12 bg-indigo-600 rounded-full mt-4"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">

            {/* Contact Details Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card p-8 rounded-3xl border border-slate-200 space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Dr. Lithin Kumble</h3>
                  <p className="text-xs text-indigo-650 font-bold mt-1">Associate Professor & HOD</p>
                </div>

                <div className="space-y-5 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100/50">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Email</p>
                      <a href="mailto:lithinkumble@gmail.com" className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                        lithinkumble@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-750 flex items-center justify-center shrink-0 border border-indigo-100/50">
                      <Phone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Phone</p>
                      <a href="tel:+919900434957" className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                        +91-9900434957
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100/50">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Office Address</p>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        School of Computing & IT, REVA University, Yelahanka, Bengaluru - 560064
                      </p>
                    </div>
                  </div>

                  {/*   <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-750 flex items-center justify-center shrink-0 border border-indigo-100/50">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Residential Address</p>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        #304, Devisri Greens, Priyank Vilaas, Kattigenahalli, Yelahanka, Bengaluru - 560064
                      </p>
                    </div>
                  </div>  */}
                </div>
              </div>
            </div>

            {/* Form right */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-5">

                {formSubmitted && (
                  <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-5 py-4 rounded-2xl flex items-center gap-3.5 animate-fade-in">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-wider">Your inquiry message was delivered successfully. Dr. Lithin Kumble will respond shortly.</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Subject</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Research Collaboration / Consultation"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message details *</label>
                  <textarea
                    rows="5"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Provide details about your query..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 transition-all resize-none shadow-inner"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl shadow-lg shadow-indigo-950/10 flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-indigo-950/20'
                    }`}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 pt-12 pb-6 text-center z-10 relative">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <p className="text-xs font-bold text-slate-400">&copy; {new Date().getFullYear()} Dr. Lithin Kumble. All rights reserved.</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Associate Professor & HOD • School of Computing & IT • REVA University</p>
        </div>
      </footer>
    </div>
  )
}

export default App
