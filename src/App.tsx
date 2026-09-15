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
            <h3 className="font-display text-2xl font-medium mb-1">How can we help</h3>
            <p className="text-gray-500 text-sm mb-6">Choose the option that best matches your need</p>
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
              <input
                required
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
              />
              <input
                required
                type="email"
                placeholder="Work email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
              />
              <textarea
                required
                rows={3}
                placeholder="Tell us more about what you need"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition resize-none"
              />
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
            <img src="/logo.png" alt="All Access" className="h-21 w-auto object-contain" />
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
      {/* Hero */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gray-950">
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
          className={`relative max-w-6xl mx-auto px-5 py-24 sm:py-32 w-full ${hero.visible ? 'animate-fade-up' : 'opacity-0'}`}
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

      {/* Services preview */}
      <section className="py-20 sm:py-28 bg-white">
        <div ref={services.ref} className={`max-w-6xl mx-auto px-5 ${services.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-14">
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

      {/* Our people */}
      <section className="py-20 sm:py-28 bg-gray-950 text-white overflow-hidden">
        <div ref={people.ref} className={`max-w-6xl mx-auto px-5 ${people.visible ? 'animate-fade-up' : 'opacity-0'}`}>
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
                  className="rounded-2xl object-cover w-full h-48 sm:h-64 lg:h-72 shadow-xl"
                />
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 hidden sm:block">
                  <p className="text-2xl font-display font-medium">24/7</p>
                  <p className="text-xs text-gray-400 mt-1">Premium support available</p>
                </div>
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

      {/* Stats */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
        <div ref={stats.ref} className={`max-w-6xl mx-auto px-5 ${stats.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { n: '24/7', l: 'Premium support' },
              { n: '7+', l: 'Service lines' },
              { n: 'B2B', l: 'Business focused' },
              { n: 'EA', l: 'East Africa reach' },
            ].map((item) => (
              <div key={item.l}>
                <p className="font-display text-3xl sm:text-4xl font-medium text-gray-900 mb-1">{item.n}</p>
                <p className="text-sm text-gray-500">{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div ref={partners.ref} className={`max-w-6xl mx-auto px-5 ${partners.visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-gray-900 mb-3">
              Strategic clients and partners
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Trusted by organizations that value reliable customer experience
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-10">
            {[
              'Usiri Transportation',
              'Usiri Car Rental',
              'Usiri Bus Tickets',
              'Sema Call',
            ].map((name) => (
              <div
                key={name}
                className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 flex flex-col items-center justify-center min-h-[110px] hover:shadow-md hover:border-gray-200 transition"
              >
                <p className="font-semibold text-gray-900 text-sm text-center">{name}</p>
                <p className="text-[11px] text-gray-400 mt-1.5 tracking-wide uppercase">Partner</p>
              </div>
            ))}
          </div>
       
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-black text-white">
        <div ref={cta.ref} className={`max-w-3xl mx-auto px-5 text-center ${cta.visible ? 'animate-fade-up' : 'opacity-0'}`}>
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

/* ─── Services ─── */
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
    <div className="bg-white">
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-5 text-center animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl font-medium mb-4 text-gray-900">What we offer</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
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
                className="p-7 sm:p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center mb-5">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-4">{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
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
  const timeline = [
    { year: 'Founded', title: 'Company established', desc: 'All Access launched to bridge communication gaps for businesses in Tanzania.' },
    { year: 'Growth', title: 'Service expansion', desc: 'Added WhatsApp support social media management and market research capabilities.' },
    { year: 'Today', title: 'Multi channel excellence', desc: 'Serving clients across East Africa with 24/7 premium options and CX training.' },
  ]

  const team = [
    { name: 'Support Lead', role: 'Operations', img: '/' },
    { name: 'Care Specialist', role: 'Customer Experience', img: '/' },
    { name: 'Training Coach', role: 'Learning and Development', img: '/' },
  ]

  return (
    <div className="bg-white">
      <section className="pt-16 sm:pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-5 text-center animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl font-medium mb-4 text-gray-900">All Access</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            A modern customer experience and communication outsourcing company serving Tanzania and East Africa.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-5 space-y-12 animate-fade-up">
          <div>
            <h2 className="font-display text-2xl font-medium text-gray-900 mb-4">Business overview</h2>
            <p className="text-gray-600 leading-relaxed">
              All Access was established to provide professional customer support and engagement solutions for businesses. We operate as a B2B service provider enabling organizations to outsource customer service operations while focusing on their core functions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Vision</h3>
              <p className="text-gray-800 leading-relaxed text-sm">
                To become the leading customer experience and communication outsourcing company in Tanzania and East Africa.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Mission</h3>
              <p className="text-gray-800 leading-relaxed text-sm">
                To empower businesses through professional customer service innovative communication systems and data driven customer experience solutions.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-4">Core values</h3>
            <div className="flex flex-wrap gap-2.5">
              {['Professionalism', 'Innovation', 'Integrity', 'Customer Satisfaction', 'Accountability', 'Teamwork', 'Excellence'].map((v) => (
                <span key={v} className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-gray-900 mb-10 text-center">Our journey</h2>
          <div className="space-y-0 relative">
            <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gray-200" />
            {timeline.map((t, i) => (
              <div key={t.year} className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 z-10 text-[10px] sm:text-xs font-semibold">
                  {i + 1}
                </div>
                <div className="pt-1">
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
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-gray-900 mb-10 text-center">Team members</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={m.name} className="group text-center animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-gray-100">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office hours */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto px-5">
          <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-8">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Standard operations</p>
                <p className="text-gray-600 text-sm">8:00 AM to 5:00 PM Monday to Friday</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Headphones className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Premium operations</p>
                <p className="text-gray-600 text-sm">24/7 support available</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Contact ─── */
function Contact() {
  return (
    <div className="bg-white">
      <section className="pt-16 sm:pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-5 text-center animate-fade-up">
          <h1 className="font-display text-4xl sm:text-5xl font-medium mb-4 text-gray-900">Let us talk</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            We respond quickly and professionally. Share your needs and we will get back to you.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-up">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-1">Address</p>
                  <p className="text-gray-800 leading-relaxed text-sm">
                    Kamata Kariakoo GSM Plaza Second Floor
                    <br />
                    Dar es Salaam Tanzania
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-1">Phone</p>
                  <a href="tel:+255782580803" className="text-gray-800 hover:text-black transition text-sm">
                    0782 580 803
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-1">Email</p>
                  <a href="mailto:info@allaccess.co.tz" className="text-gray-800 hover:text-black transition text-sm">
                    info@allaccess.co.tz
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-3">Follow us</p>
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
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form className="space-y-4 animate-fade-up delay-100" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Full name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition resize-none"
                  placeholder="How can we help your business"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white font-semibold rounded-full text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
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
            <img src="/logo.png" alt="All Access" className="h-21 w-auto object-contain mb-4" />
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
