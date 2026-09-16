import { useState, useEffect, useRef, FormEvent } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Headphones,
  BarChart3,
  GraduationCap,
  Share2,
  Search,
  ChevronRight,
  X,
  ArrowRight,
  Clock,
  Building2,
  Handshake,
  HelpCircle,
  User,
} from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa'

type Page = 'home' | 'services' | 'about' | 'contact'
type InquiryType = 'support' | 'partnership' | 'booking' | 'general' | null

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Inquiry Modal ─── */
function InquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'choose' | 'form'>('choose')
  const [type, setType] = useState<InquiryType>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) {
      setStep('choose')
      setType(null)
      setSent(false)
    }
  }, [open])

  if (!open) return null

  const options = [
    { id: 'support' as const, icon: Headphones, label: 'Customer Support', desc: 'Need help with an existing service' },
    { id: 'booking' as const, icon: Building2, label: 'Book a Service', desc: 'Start outsourcing with All Access' },
    { id: 'partnership' as const, icon: Handshake, label: 'Partnership', desc: 'Explore collaboration opportunities' },
    { id: 'general' as const, icon: HelpCircle, label: 'General Inquiry', desc: 'Ask us anything else' },
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {sent ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <MessageCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-display text-2xl font-medium mb-2">Message received</h3>
            <p className="text-gray-500 text-sm mb-6">
              Thank you. Our team will get back to you shortly.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        ) : step === 'choose' ? (
          <div className="p-8">
            <h3 className="font-display text-2xl font-medium mb-1">How can we help you</h3>
            <p className="text-gray-500 text-sm mb-6">Select one option and we will guide you from there</p>
            <div className="space-y-3">
              {options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setType(o.id)
                    setStep('form')
                  }}
                  className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:text-white transition">
                    <o.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{o.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{o.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-2 group-hover:text-gray-600" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <button
              type="button"
              onClick={() => setStep('choose')}
              className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1"
            >
              ← Back
            </button>
            <h3 className="font-display text-xl font-medium mb-1 capitalize">
              {type === 'booking' ? 'Book a service' : type === 'support' ? 'Support request' : type === 'partnership' ? 'Partnership inquiry' : 'General inquiry'}
            </h3>
            <p className="text-gray-500 text-sm mb-6">Fill in the details and we will respond soon</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Full name</label>
                <input
                  required
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Work email</label>
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone number</label>
                <input
                  type="tel"
                  placeholder="07XX XXX XXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us more about what you need"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white font-medium rounded-full text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                Send request <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar({
  page,
  setPage,
  onOpenInquiry,
}: {
  page: Page
  setPage: (p: Page) => void
  onOpenInquiry: () => void
}) {
  const [open, setOpen] = useState(false)
  const link = (id: Page, label: string) => (
    <button
      onClick={() => {
        setPage(id)
        setOpen(false)
      }}
      className={`text-sm font-medium px-3 py-2 rounded-lg transition ${
        page === id ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center h-[72px]">
          <button onClick={() => setPage('home')} className="flex items-center">
            <img src="/logo.png" alt="All Access" className="h-14 w-auto object-contain" />
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {link('home', 'Home')}
            {link('services', 'Services')}
            {link('about', 'About')}
            {link('contact', 'Contact')}
            <button
              onClick={onOpenInquiry}
              className="ml-4 px-5 py-2.5 text-sm font-semibold bg-black text-white rounded-full hover:bg-gray-800 transition flex items-center gap-2"
            >
              Get started
            </button>
          </nav>
          <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1 pb-5 animate-fade-in">
            {link('home', 'Home')}
            {link('services', 'Services')}
            {link('about', 'About')}
            {link('contact', 'Contact')}
            <button
              onClick={() => {
                onOpenInquiry()
                setOpen(false)
              }}
              className="mt-3 w-full px-5 py-2.5 text-sm font-semibold bg-black text-white rounded-full"
            >
              Get started
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

/* ─── Home ─── */
function Home({ setPage, onOpenInquiry }: { setPage: (p: Page) => void; onOpenInquiry: () => void }) {
  const hero = useInView(0.05)
  const services = useInView()
  const people = useInView()
  const stats = useInView()
  const partners = useInView()
  const cta = useInView()

  const serviceItems = [
    { icon: Phone, title: 'Call Center Operations', desc: 'Inbound and outbound professional call handling with dedicated agents.' },
    { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Fast trackable customer engagement through dedicated business channels.' },
    { icon: Headphones, title: 'Customer Care Management', desc: 'Unified support across phone WhatsApp email and social platforms.' },
    { icon: Share2, title: 'Social Media Communication', desc: 'Professional community management and brand consistent responses.' },
    { icon: Search, title: 'Market Research', desc: 'Product research customer insights and actionable market analysis.' },
    { icon: GraduationCap, title: 'CX Training', desc: 'Practical customer experience programs for growing teams in East Africa.' },
  ]

  return (
    <>
      {/* Hero – full viewport */}
      <section className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div
          ref={hero.ref}
          className={`relative max-w-6xl mx-auto px-5 py-16 sm:py-24 w-full ${hero.visible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-[0.22em] mb-5">
            Customer Experience Outsourcing
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.12] max-w-2xl text-white mb-6">
            Professional support that connects businesses with their customers
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
            All Access delivers call center operations WhatsApp support social media management and customer experience training across Tanzania and East Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenInquiry}
              className="px-8 py-3.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage('services')}
              className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition"
            >
              Explore services
            </button>
          </div>
        </div>
      </section>

      {/* Services preview – full viewport */}
      <section className="py-20 sm:py-28 bg-white">
        <div ref={services.ref} className={`max-w-6xl mx-auto px-5 w-full ${services.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-gray-900 mb-3">
              Solutions built for growing businesses
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              From call centers to market intelligence we help organizations deliver consistent customer experiences.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceItems.map((s, i) => (
              <div
                key={s.title}
                className={`group p-6 sm:p-7 rounded-2xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300 ${services.visible ? 'animate-fade-up' : ''}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage('services')}
              className="inline-flex items-center gap-2 px-7 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition shadow-sm"
            >
              View all services <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Our people – full viewport */}
      <section className="py-20 sm:py-28 bg-gray-950 text-white overflow-hidden">
        <div ref={people.ref} className={`max-w-6xl mx-auto px-5 w-full ${people.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-3xl sm:text-4xl font-medium mb-5 leading-snug">
                Trained agents focused on real conversations
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Every interaction is handled with professionalism and care. Our team works from a modern office in Kariakoo Dar es Salaam ready to support your customers across phone WhatsApp and social channels.
              </p>
              <button
                onClick={() => setPage('about')}
                className="px-6 py-3 border border-white/25 rounded-full text-sm font-semibold hover:bg-white/10 transition"
              >
                Learn about us
              </button>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <img
                  src="/agent-man.png"
                  alt="All Access support agent"
                  className="rounded-2xl object-cover w-full h-56 sm:h-72 lg:h-80 shadow-xl"
                />
              </div>
              <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12">
                <img
                  src="/agent-woman.png"
                  alt="All Access customer care agent"
                  className="rounded-2xl object-cover w-full h-56 sm:h-72 lg:h-80 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us – simple clear points */}
      <section className="py-20 sm:py-28 bg-white border-y border-gray-100">
        <div ref={stats.ref} className={`max-w-6xl mx-auto px-5 w-full ${stats.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-gray-900 mb-3">
              Why businesses choose All Access
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
              Practical benefits that help your team focus on what matters most
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Always available', desc: 'Standard hours plus optional 24 hour coverage when you need it' },
              { title: 'Multi channel support', desc: 'Phone WhatsApp email and social handled in one place' },
              { title: 'Clear reporting', desc: 'Regular updates so you know how customers are being served' },
              { title: 'Local and ready', desc: 'Based in Dar es Salaam and built for East African businesses' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl border border-gray-100 bg-gray-50/80 hover:bg-white hover:shadow-md transition ${stats.visible ? 'animate-fade-up' : ''}`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <p className="font-semibold text-gray-900 mb-2 text-[15px]">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners – full viewport */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div ref={partners.ref} className={`max-w-6xl mx-auto px-5 w-full ${partners.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-gray-900 mb-3">
              Strategic clients and partners
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Trusted by organizations that value reliable customer experience
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Usiri Transportation', logo: '/usiritransportation.png' },
              { name: 'Usiri Car Rental', logo: '/usiri car rentals.png' },
              { name: 'Usiri Bus Tickets', logo: '/usiri bus ticket.png' },
              { name: 'Sema Call', logo: '/semacall.png' },
            ].map((p, i) => (
              <div
                key={p.name}
                className={`bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 flex flex-col items-center justify-center gap-4 min-h-[140px] sm:min-h-[160px] hover:shadow-lg hover:border-gray-200 transition duration-300 ${partners.visible ? 'animate-fade-up' : ''}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-full h-16 sm:h-20 flex items-center justify-center bg-gray-950 rounded-xl px-3 py-2">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-snug">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA – full viewport */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
        <div ref={cta.ref} className={`max-w-3xl mx-auto px-5 text-center w-full ${cta.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="font-display text-3xl sm:text-4xl font-medium mb-5">
            Ready to strengthen your customer relationships
          </h2>
          <p className="text-gray-400 mb-10 text-base leading-relaxed">
            Let us handle the conversations so you can focus on growing your business.
          </p>
          <button
            onClick={onOpenInquiry}
            className="px-8 py-3.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-100 transition inline-flex items-center gap-2"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </>
  )
}

/* ─── Services (black gradient) ─── */
function Services() {
  const list = [
    {
      icon: Phone,
      title: 'Call Center Operations',
      points: [
        'Inbound and outbound professional call handling',
        'Dedicated agents with clear escalation paths',
        'Quality monitoring and performance reporting',
      ],
    },
    {
      icon: Headphones,
      title: 'Customer Care Management',
      points: [
        'Unified support across phone WhatsApp email and social',
        'Inquiry handling and complaint management',
        'Customer follow ups and resolution tracking',
      ],
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Customer Support',
      points: [
        'Dedicated business WhatsApp channels',
        'Fast trackable and personal engagement',
        'Integration ready workflows',
      ],
    },
    {
      icon: Share2,
      title: 'Social Media Communication',
      points: [
        'Professional community management',
        'Response handling on major platforms',
        'Brand consistent messaging',
      ],
    },
    {
      icon: BarChart3,
      title: 'Market Research and Intelligence',
      points: [
        'Product and customer behavior research',
        'Market space and share analysis',
        'Consumer feedback analysis and reports',
      ],
    },
    {
      icon: GraduationCap,
      title: 'Customer Experience Training',
      points: [
        'Practical programs for mid sized teams',
        'Soft skills and service excellence',
        'Ongoing coaching and improvement',
      ],
    },
  ]

  return (
    <div className="bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white min-h-screen">
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-5 text-center animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl font-medium mb-4">What we offer</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Reliable technology driven and customer centered solutions for businesses across Tanzania and East Africa.
          </p>
        </div>
      </section>
      <section className="pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 gap-6">
            {list.map((s, i) => (
              <div
                key={s.title}
                className="p-7 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-fade-up backdrop-blur-sm"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center mb-5">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-4">{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── About ─── */
function About() {
  const overview = useInView()
  const vision = useInView()
  const timelineRef = useInView()
  const teamRef = useInView()
  const hours = useInView()

  const timeline = [
    { year: '2025', title: 'Company established', desc: 'All Access launched to bridge communication gaps for businesses in Tanzania.' },
    { year: '2026', title: 'Service expansion', desc: 'Added WhatsApp support social media management and market research capabilities.' },
    { year: 'Today', title: 'Growing with clients', desc: 'Supporting partners across East Africa with reliable multi channel customer care.' },
  ]

  const team = [
    { name: 'Director / C.E.O', role: 'Leadership', img: null },
    { name: 'Operations Manager', role: 'Operations', img: null },
    { name: 'Support Lead', role: 'Customer Support', img: '/agent-man.png' },
    { name: 'Care Specialist', role: 'Customer Experience', img: '/agent-woman.png' },
    { name: 'Training Coach', role: 'Learning and Development', img: null },
    { name: 'Support Agent', role: 'Frontline Support', img: null },
  ]

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-20 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-5 text-center animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl font-medium mb-5">About All Access</h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We help businesses in Tanzania and East Africa deliver professional customer experiences without building large in house teams.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-24">
        <div ref={overview.ref} className={`max-w-3xl mx-auto px-5 ${overview.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-gray-900 mb-5">Who we are</h2>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-6">
            All Access is a customer experience and communication outsourcing company. We work as a B2B partner so organizations can outsource support operations and stay focused on their core work.
          </p>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            From our office in Kariakoo Dar es Salaam we provide call center services WhatsApp support social media communication market research and practical CX training.
          </p>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div ref={vision.ref} className={`max-w-5xl mx-auto px-5 ${vision.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className={`p-7 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm ${vision.visible ? 'animate-fade-up' : ''}`}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Vision</h3>
              <p className="text-gray-800 leading-relaxed">
                To become the leading customer experience and communication outsourcing company in Tanzania and East Africa.
              </p>
            </div>
            <div className={`p-7 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm ${vision.visible ? 'animate-fade-up' : ''}`} style={{ animationDelay: '100ms' }}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Mission</h3>
              <p className="text-gray-800 leading-relaxed">
                To empower businesses through professional customer service innovative communication systems and data driven solutions.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-5 text-center">Core values</h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {['Professionalism', 'Innovation', 'Integrity', 'Customer Satisfaction', 'Accountability', 'Teamwork', 'Excellence'].map((v, i) => (
                <span
                  key={v}
                  className={`px-4 py-2 rounded-full bg-white border border-gray-100 text-sm font-medium text-gray-800 shadow-sm ${vision.visible ? 'animate-fade-up' : ''}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24">
        <div ref={timelineRef.ref} className="max-w-3xl mx-auto px-5">
          <h2 className={`font-display text-2xl sm:text-3xl font-medium text-gray-900 mb-10 text-center ${timelineRef.visible ? 'animate-fade-up' : 'opacity-0'}`}>
            Our journey
          </h2>
          <div className="relative space-y-0">
            <div className="absolute left-4 sm:left-5 top-3 bottom-3 w-px bg-gray-200" />
            {timeline.map((t, i) => (
              <div
                key={`${t.year}-${t.title}`}
                className={`relative flex gap-5 sm:gap-7 pb-10 last:pb-0 ${timelineRef.visible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 z-10 text-xs font-semibold">
                  {i + 1}
                </div>
                <div className="pt-0.5 sm:pt-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{t.year}</p>
                  <h3 className="font-semibold text-gray-900 mb-1">{t.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div ref={teamRef.ref} className={`max-w-5xl mx-auto px-5 ${teamRef.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-gray-900 mb-3 text-center">Our team</h2>
          <p className="text-gray-500 text-sm text-center mb-10 max-w-md mx-auto">
            People who handle your customer conversations with care and consistency
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {team.map((m, i) => (
              <div
                key={m.name}
                className={`group text-center ${teamRef.visible ? 'animate-fade-up' : ''}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="overflow-hidden rounded-xl mb-3 aspect-square bg-gray-100 border border-gray-100 flex items-center justify-center">
                  {m.img ? (
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                      <User className="w-10 h-10 sm:w-11 sm:h-11 mb-1" />
                      <span className="text-[10px] uppercase tracking-wider">Photo</span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{m.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office hours */}
      <section className="py-16 sm:py-24">
        <div ref={hours.ref} className={`max-w-3xl mx-auto px-5 ${hours.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-gray-900 mb-8 text-center">When we work</h2>
          <div className="p-7 sm:p-9 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Standard hours</p>
                <p className="text-gray-600 text-sm mt-1">8:00 AM to 5:00 PM Monday to Friday</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Headphones className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Premium coverage</p>
                <p className="text-gray-600 text-sm mt-1">24 hour support available on request</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Contact (black gradient) ─── */
function Contact() {
  return (
    <div className="bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white min-h-screen">
      <section className="pt-16 sm:pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-5 text-center animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl font-medium mb-4">Let us talk</h1>
          <p className="text-gray-400 max-w-md mx-auto">
            We respond quickly and professionally. Share your needs and we will get back to you.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact details */}
            <div className="space-y-8 animate-fade-up">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-1.5">Address</p>
                  <p className="text-gray-200 leading-relaxed text-sm">
                    Kamata Kariakoo GSM Plaza Second Floor
                    <br />
                    Dar es Salaam Tanzania
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-1.5">Phone</p>
                  <a href="tel:+255782580803" className="text-gray-200 hover:text-white transition text-sm">
                    0782 580 803
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-1.5">Email</p>
                  <a href="mailto:info@allaccess.co.tz" className="text-gray-200 hover:text-white transition text-sm">
                    info@allaccess.co.tz
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-4">Follow us</p>
                <div className="flex gap-3">
                  {[
                    { Icon: FaWhatsapp, href: 'https://wa.me/255782580803', label: 'WhatsApp' },
                    { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
                    { Icon: FaTwitter, href: '#', label: 'Twitter' },
                    { Icon: FaInstagram, href: '#', label: 'Instagram' },
                    { Icon: FaFacebookF, href: '#', label: 'Facebook' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transition"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form – labeled */}
            <form
              className="space-y-5 animate-fade-up delay-100 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <h2 className="font-display text-xl sm:text-2xl font-medium text-white mb-1">Send a message</h2>
                <p className="text-gray-400 text-sm">We usually reply within one business day</p>
              </div>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition placeholder:text-gray-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition placeholder:text-gray-500"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition resize-none placeholder:text-gray-500"
                  placeholder="How can we help your business"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                Send message <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Footer ─── */
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="All Access" className="h-14 w-auto object-contain mb-4" />
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Customer experience and communication outsourcing for businesses across Tanzania and East Africa.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">Navigate</p>
            <div className="space-y-2.5">
              {(['home', 'services', 'about', 'contact'] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="block text-sm text-gray-600 hover:text-black transition capitalize"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">Contact</p>
            <div className="space-y-2.5 text-sm text-gray-600">
              <p>Kamata Kariakoo GSM Plaza</p>
              <p>Second Floor Dar es Salaam</p>
              <a href="tel:+255782580803" className="block hover:text-black transition">0782 580 803</a>
              <a href="mailto:info@allaccess.co.tz" className="block hover:text-black transition">info@allaccess.co.tz</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-4">Social</p>
            <div className="flex gap-2.5">
              {[
                { Icon: FaWhatsapp, href: 'https://wa.me/255782580803', label: 'WhatsApp' },
                { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
                { Icon: FaTwitter, href: '#', label: 'Twitter' },
                { Icon: FaInstagram, href: '#', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} All Access. All rights reserved.</p>
          <p>Tanzania and East Africa</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [inquiryOpen, setInquiryOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar page={page} setPage={setPage} onOpenInquiry={() => setInquiryOpen(true)} />
      <main className="flex-1">
        {page === 'home' && <Home setPage={setPage} onOpenInquiry={() => setInquiryOpen(true)} />}
        {page === 'services' && <Services />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
      </main>
      <Footer setPage={setPage} />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  )
}
