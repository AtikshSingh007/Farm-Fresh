import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, ArrowRight, Shield, TrendingUp, Users, MapPin,
  Star, CheckCircle, ChevronRight, Wheat, BarChart3, Truck,
  Globe, Phone as PhoneIcon, IndianRupee
} from 'lucide-react';

/* ─── Static Data ─────────────────────────────────────────────────────────── */
const stats = [
  { value: '10,000+', label: 'Farmers Onboarded',         icon: Wheat },
  { value: '₹50 Cr+', label: 'Distress Sales Prevented',  icon: IndianRupee },
  { value: '500+',    label: 'Verified Bulk Buyers',       icon: Users },
  { value: '28',      label: 'States Covered',             icon: MapPin },
];

const features = [
  {
    Icon: Shield, color: 'emerald',
    title: 'Price Protection',
    desc: 'Real-time Mandi price alerts prevent distress selling. We route bulk buyers to your listing the moment local prices crash below your minimum.',
  },
  {
    Icon: Users, color: 'blue',
    title: 'Group Pooling',
    desc: 'Small farmers combine supply to meet bulk order requirements. A single village can now fulfill a restaurant chain\'s monthly order.',
  },
  {
    Icon: BarChart3, color: 'amber',
    title: 'Live Analytics',
    desc: 'Track views, offers, and market price comparisons on your dashboard. Know exactly when to sell for maximum profit.',
  },
  {
    Icon: Truck, color: 'purple',
    title: 'Logistics Tracking',
    desc: 'End-to-end shipment tracking from farm gate to buyer warehouse with real-time status updates for all parties.',
  },
  {
    Icon: Globe, color: 'rose',
    title: 'Multi-lingual',
    desc: 'Available in Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, Gujarati, and Punjabi — no language barrier, ever.',
  },
  {
    Icon: PhoneIcon, color: 'teal',
    title: 'Phone-First Login',
    desc: 'No email required. Log in with your mobile number — designed for rural India\'s connectivity reality.',
  },
];

const featureColorMap = {
  emerald: { bg: 'bg-emerald-50 border-emerald-100', icon: 'text-emerald-600' },
  blue:    { bg: 'bg-blue-50 border-blue-100',       icon: 'text-blue-600'    },
  amber:   { bg: 'bg-amber-50 border-amber-100',     icon: 'text-amber-600'   },
  purple:  { bg: 'bg-purple-50 border-purple-100',   icon: 'text-purple-600'  },
  rose:    { bg: 'bg-rose-50 border-rose-100',       icon: 'text-rose-600'    },
  teal:    { bg: 'bg-teal-50 border-teal-100',       icon: 'text-teal-600'    },
};

const steps = [
  { num: '01', title: 'Register for Free',    desc: 'Create your account as a farmer or bulk buyer in under 2 minutes. No documents needed to start.' },
  { num: '02', title: 'List Your Produce',    desc: 'Add crops with quantity, price, and harvest date. Upload a photo to attract more buyers.' },
  { num: '03', title: 'Get Verified Offers',  desc: 'Receive direct bids from restaurants, retailers, and food processors. No middlemen, no hidden cuts.' },
  { num: '04', title: 'Get Paid Securely',    desc: 'Payment is escrowed before dispatch and released only on confirmed delivery. 100% protected.' },
];

const testimonials = [
  {
    name: 'Ramesh Patel', role: 'Onion Farmer, Nashik', initials: 'RP', color: 'bg-emerald-600',
    quote: 'Before Farm Fresh I was forced to sell at ₹4/kg when the Mandi was flooded. Last season I got ₹18/kg directly from a Mumbai restaurant chain.',
  },
  {
    name: 'Priya Sharma', role: 'Tomato Farmer, Kolar', initials: 'PS', color: 'bg-blue-600',
    quote: 'The price alert system saved my entire crop. When Mandi prices crashed, Farm Fresh immediately connected me with 3 buyers who paid fair price.',
  },
  {
    name: 'Suresh Reddy', role: 'Procurement Manager, FreshMart', initials: 'SR', color: 'bg-amber-600',
    quote: 'We source 60% of our vegetables through Farm Fresh. Quality is better, delivery is reliable, and we save 30% vs wholesale markets.',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[activeTestimonial];

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)' }}
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left – headline */}
            <div>
              <div className="inline-flex items-center space-x-2 border border-emerald-400/30 rounded-full px-4 py-1.5 mb-7" style={{ background: 'rgba(16,185,129,0.12)' }}>
                <span className="w-2 h-2 bg-emerald-400 rounded-full" style={{ animation: 'pulse 2s infinite' }} />
                <span className="text-emerald-300 text-sm font-medium">India's #1 Farm-to-Buyer Platform</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                Cut the Middleman.<br />
                <span className="text-emerald-400">Keep the Profit.</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed max-w-lg" style={{ color: 'rgba(209,250,229,0.8)' }}>
                Farm Fresh connects rural farmers directly with bulk buyers — restaurants, retailers, and food processors — eliminating exploitative middlemen and ending distress selling of agricultural produce across India.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                  style={{ background: '#22c55e', color: '#fff', boxShadow: '0 8px 24px rgba(22,163,74,0.35)' }}
                >
                  <Sprout className="w-5 h-5" />
                  <span>Start Selling Today</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(8px)' }}
                >
                  <span>Sign In</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {['Free to join', '10,000+ farmers', '₹0 commission on first sale'].map(badge => (
                  <div key={badge} className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(167,243,208,0.9)' }}>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – mock dashboard card */}
            <div className="hidden lg:block">
              <div
                className="rounded-2xl p-6 shadow-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>dashboard.farmfresh.in</span>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[['5', 'Active Listings'], ['1,204', 'Total Views'], ['3', 'Offers']].map(([v, l]) => (
                    <div key={l} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <p className="text-xl font-bold text-white">{v}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</p>
                    </div>
                  ))}
                </div>

                {/* Price alert */}
                <div className="rounded-xl p-3 mb-4 flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(252,165,165,0.3)' }}>
                  <span className="text-xl">🚨</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#fca5a5' }}>Distress Sale Alert</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Tomato Mandi ₹12/kg — routing 3 buyers to your listing now</p>
                  </div>
                </div>

                {/* Listing rows */}
                <div className="space-y-2">
                  {[
                    ['Onions', '500 kg · ₹28/kg', 'available'],
                    ['Tomatoes', '200 kg · ₹15/kg', 'pooling'],
                    ['Wheat', '2 quintals · ₹22/kg', 'available'],
                  ].map(([crop, meta, status]) => (
                    <div
                      key={crop}
                      className="flex justify-between items-center rounded-lg px-3 py-2.5"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                    >
                      <div>
                        <p className="text-white text-sm font-medium">{crop}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{meta}</p>
                      </div>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                        style={
                          status === 'available'
                            ? { background: 'rgba(16,185,129,0.25)', color: '#6ee7b7' }
                            : { background: 'rgba(59,130,246,0.25)', color: '#93c5fd' }
                        }
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 56L60 46.7C120 37.3 240 18.7 360 12C480 5.3 600 10.7 720 21.3C840 32 960 48 1080 48C1200 48 1320 32 1380 24L1440 16V56H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto mb-3 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-extrabold text-slate-900">{value}</p>
                <p className="text-sm text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem / Solution ────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">The Problem We Solve</span>
            <h2 className="mt-3 text-4xl font-extrabold text-slate-900 max-w-3xl mx-auto">India's farmers lose ₹92,000 Cr annually to middlemen</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              A farmer gets ₹5/kg for onions while the consumer pays ₹40/kg. The difference enriches a chain of 4–6 middlemen. We're ending this.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-red-700 mb-5">❌ The Broken Old Way</h3>
              <ul className="space-y-3">
                {[
                  'Farmer sells at Mandi for ₹5/kg — crisis price',
                  '4–6 intermediaries add their margins before consumer',
                  'Consumer pays ₹40/kg — 8× the farmer\'s income',
                  'Zero price discovery power for the farmer',
                  'Distress selling during bumper harvests destroys livelihoods',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-emerald-700 mb-5">✅ The Farm Fresh Way</h3>
              <ul className="space-y-3">
                {[
                  'Farmer lists at their own price with full control',
                  'Verified bulk buyers bid directly — no hidden fees',
                  'Farmer earns 3–4× more per kg on average',
                  'Real-time alerts prevent distress selling automatically',
                  'Secure escrow payment — money protected before dispatch',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Platform Features</span>
            <h2 className="mt-3 text-4xl font-extrabold text-slate-900">Everything a farmer needs to thrive</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ Icon, color, title, desc }) => {
              const c = featureColorMap[color];
              return (
                <div
                  key={title}
                  className={`rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-lg ${c.bg}`}
                >
                  <Icon className={`w-8 h-8 mb-4 ${c.icon}`} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="mt-3 text-4xl font-extrabold text-white">Get started in 4 steps</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className="relative">
                {/* Connector line (hidden on last item) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-px"
                    style={{ background: 'rgba(52,211,153,0.3)', transform: 'translateX(-50%)', width: 'calc(100% - 2rem)' }}
                  />
                )}
                <div className="text-7xl font-extrabold leading-none mb-2" style={{ color: 'rgba(255,255,255,0.07)' }}>
                  {num}
                </div>
                <div className="w-10 h-1 bg-emerald-400 rounded-full mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(167,243,208,0.7)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Success Stories</span>
            <h2 className="mt-3 text-4xl font-extrabold text-slate-900">Farmers are earning more</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 transition-all duration-500">
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xl ${t.color}`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 text-lg leading-relaxed mb-4">
                    "{t.quote}"
                  </blockquote>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Dot navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'w-6 h-2 bg-emerald-600' : 'w-2 h-2 bg-slate-300'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-12 shadow-2xl text-center"
            style={{ background: 'linear-gradient(135deg, #052e16 0%, #166534 100%)' }}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <Sprout className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to earn what you deserve?</h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(167,243,208,0.8)' }}>
              Join 10,000+ farmers already selling directly to buyers across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: '#22c55e', color: '#fff' }}
              >
                <Sprout className="w-5 h-5" />
                <span>Join as Farmer</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              >
                <Users className="w-5 h-5" />
                <span>Join as Buyer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-lg">Farm Fresh</span>
            </div>
            <p className="text-slate-400 text-sm text-center">
              © {new Date().getFullYear()} Farm Fresh. Built with ❤️ for India's farmers.
            </p>
            <div className="flex gap-6">
              <Link to="/login"    className="text-slate-400 hover:text-white text-sm transition-colors">Sign In</Link>
              <Link to="/register" className="text-slate-400 hover:text-white text-sm transition-colors">Register</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
