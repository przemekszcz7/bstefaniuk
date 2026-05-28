/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Mail, 
  Phone, 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Home, 
  Compass, 
  Info, 
  Send,
  MessageSquare,
  Award,
  ShieldCheck,
  Globe,
  UserCheck
} from 'lucide-react';
import { OFFERS, OFFICE_STATS, LOCATIONS } from './data';
import { Offer } from './types';
import OfferCard from './components/OfferCard';
import OfferModal from './components/OfferModal';

export default function App() {
  // Mobile menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Filter state
  const [activeFilter, setActiveFilter] = useState<'wszystkie' | 'mieszkanie' | 'dzialka' | 'dom'>('wszystkie');
  
  // Selected offer for detailed modal
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Copy success notification states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Scroll spy to handle color change on header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter the offers list based on category
  const filteredOffers = OFFERS.filter((offer) => {
    if (activeFilter === 'wszystkie') return true;
    return offer.category === activeFilter;
  });

  // Smooth scroll method
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Helper functions for easy clipboard copying without using browser popups
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('barbara.stefaniuk.nieruchomosci@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText('+48501234567');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  // Trigger inquiry from the details modal - opens the default email client with pre-filled content!
  const handleOfferInquiry = (propertyTitle: string) => {
    const subject = encodeURIComponent(`Zapytanie o ofertę: ${propertyTitle}`);
    const body = encodeURIComponent(`Dzień dobry,\n\nPiszę z zapytaniem w sprawie oferty: "${propertyTitle}". Proszę o kontakt w celu przedstawienia szczegółowych warunków.\n\nZ poważaniem,\n[Imię i Nazwisko]\n[Numer telefonu]`);
    
    // Redirect via mailto client
    window.location.href = `mailto:barbara.stefaniuk.nieruchomosci@gmail.com?subject=${subject}&body=${body}`;
    
    // Also scroll down to contact coordinates for references
    setTimeout(() => {
      scrollToSection('kontakt');
    }, 450);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1A1A2E] antialiased selection:bg-gold-500 selection:text-navy-950 font-sans">
      
      {/* 1. NAVIGATION BAR */}
      <nav 
        id="navbar-sticky"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-navy-900 shadow-xl border-gold-500/20 py-3' 
            : 'bg-navy-900 border-gold-500/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with monogram */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Monogram "BS" */}
            <div className="w-10 h-10 rounded-full border-2 border-gold-500 bg-navy-950 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500 font-serif">
              <span className="text-sm font-bold text-gold-500 group-hover:text-navy-950 tracking-wider">BS</span>
            </div>
            
            {/* Nav brand strings */}
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-wide text-white group-hover:text-gold-100 transition-colors leading-tight">
                Barbara Stefaniuk
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-500 font-medium">
                Nieruchomości
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-gold-500 transition-colors cursor-pointer"
            >
              Strona główna
            </button>
            <button 
              onClick={() => scrollToSection('o-mnie')}
              className="text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-gold-500 transition-colors cursor-pointer"
            >
              O mnie
            </button>
            <button 
              onClick={() => scrollToSection('oferty')}
              className="text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-gold-500 transition-colors cursor-pointer"
            >
              Oferty
            </button>
            <button 
              onClick={() => scrollToSection('obszar-dzialania')}
              className="text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-gold-500 transition-colors cursor-pointer"
            >
              Obszar działania
            </button>
            <button 
              onClick={() => scrollToSection('kontakt')}
              className="px-5 py-2.5 bg-transparent border border-gold-500 font-sans text-xs font-semibold uppercase tracking-wider text-gold-500 hover:bg-gold-500 hover:text-navy-950 transition-all duration-350 cursor-pointer"
            >
              Kontakt
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gold-500 focus:outline-none transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 top-[65px] z-30 bg-navy-900 border-t border-gold-500/10 px-6 py-12 flex flex-col md:hidden overflow-y-auto"
          >
            {/* Custom Background lines for mobile menu */}
            <div className="absolute inset-0 luxury-diagonal pointer-events-none opacity-20" />
            
            <div className="relative z-10 flex flex-col items-center gap-8 text-center my-auto">
              <div className="w-14 h-14 rounded-full border-2 border-gold-500 bg-navy-950 flex items-center justify-center font-serif mb-2">
                <span className="text-lg font-bold text-gold-500">BS</span>
              </div>
              
              <button 
                onClick={() => scrollToSection('home')}
                className="text-lg font-serif tracking-wider text-white hover:text-gold-500 transition-colors"
              >
                Strona główna
              </button>
              <span className="w-6 h-[1px] bg-gold-500/30" />
              
              <button 
                onClick={() => scrollToSection('o-mnie')}
                className="text-lg font-serif tracking-wider text-white hover:text-gold-500 transition-colors"
              >
                O mnie
              </button>
              <span className="w-6 h-[1px] bg-gold-500/30" />
              
              <button 
                onClick={() => scrollToSection('oferty')}
                className="text-lg font-serif tracking-wider text-white hover:text-gold-500 transition-colors"
              >
                Oferty
              </button>
              <span className="w-6 h-[1px] bg-gold-500/30" />
              
              <button 
                onClick={() => scrollToSection('obszar-dzialania')}
                className="text-lg font-serif tracking-wider text-white hover:text-gold-500 transition-colors"
              >
                Obszar działania
              </button>
              <span className="w-6 h-[1px] bg-gold-500/30" />
              
              <button 
                onClick={() => scrollToSection('kontakt')}
                className="w-full max-w-xs py-3 border border-gold-500 text-gold-500 font-semibold uppercase text-xs tracking-widest hover:bg-gold-500 hover:text-navy-900 transition-all duration-300"
              >
                Kontakt
              </button>

              <div className="mt-8 text-[11px] text-gray-400 font-sans font-light">
                <p className="mb-1">Barbara Stefaniuk Nieruchomości</p>
                <p>barbara.stefaniuk.nieruchomosci@gmail.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 2. HERO SECTION */}
      <section 
        id="home"
        className="relative min-h-screen bg-navy-900 flex items-center justify-center pt-24 pb-12 overflow-hidden"
      >
        {/* Luxury grid styling and diagonal patterns strictly matching prompt */}
        <div className="absolute inset-0 luxury-grid" />
        <div className="absolute inset-0 luxury-diagonal opacity-30" />
        
        {/* Abstract glowing focal point back of text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Elegant Monogram and Ring */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-16 rounded-full border-2 border-gold-500/80 bg-navy-950/90 flex items-center justify-center shadow-xl mb-6 font-serif"
          >
            <span className="text-base font-bold text-gold-500 tracking-wider">BS</span>
          </motion.div>

          {/* Golden decorative line */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-12 h-[2px] bg-gold-500 mb-8 origin-center"
          />

          {/* Heading strictly matching exact prompt strings */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-[1.1] mb-6 tracking-tight max-w-4xl"
          >
            Znajdź nieruchomość,<br />
            <span className="italic font-light text-gold-100">która stanie się Twoim domem.</span>
          </motion.h1>

          {/* Subtitle strictly matching prompt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-sm sm:text-base md:text-xl text-white/70 font-light tracking-wide max-w-3xl mb-12 leading-relaxed"
          >
            Profesjonalna obsługa kupna, sprzedaży i inwestycji — z doświadczeniem i zaangażowaniem.
          </motion.p>

          {/* CTA Buttons strictly matching prompt specs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md"
          >
            <button
              onClick={() => scrollToSection('oferty')}
              className="px-10 py-4 bg-gold-500 hover:bg-gold-700 text-navy-900 hover:text-white text-xs uppercase font-bold tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
            >
              Zobacz oferty
            </button>
            <button
              onClick={() => scrollToSection('kontakt')}
              className="px-10 py-4 bg-transparent border border-white/60 hover:border-gold-500 font-sans text-xs font-semibold uppercase tracking-widest text-white hover:text-gold-500 transition-all duration-300 cursor-pointer"
            >
              Skontaktuj się
            </button>
          </motion.div>

          {/* Animated Scroll Indicator strictly matching prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            onClick={() => scrollToSection('facts-bar')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 group"
          >
            <span className="text-[10px] uppercase font-sans tracking-widest text-gold-500/80 group-hover:text-gold-500 transition-colors">
              Przewiń
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full border border-gold-500/40 flex items-center justify-center p-1 text-gold-500 active:scale-95 transition-transform"
            >
              <ChevronDown className="w-4 h-4 shrink-0" />
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* 3. PASEK ZAUFANIA (Facts / Trust Bar) */}
      <div 
        id="facts-bar"
        className="bg-navy-950 border-y border-gold-500/15 py-6 flex items-center min-h-[80px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 lg:gap-16">
            
            <div className="flex items-center text-center md:text-left">
              <span className="text-white font-sans text-xs font-semibold uppercase tracking-[0.16em]">
                Profesjonalne doradztwo
              </span>
            </div>

            <div className="hidden md:block w-[1px] h-4 bg-gold-500/30" />

            <div className="flex items-center text-center md:text-left">
              <span className="text-white font-sans text-xs font-semibold uppercase tracking-[0.16em]">
                Bezpieczne transakcje
              </span>
            </div>

            <div className="hidden md:block w-[1px] h-4 bg-gold-500/30" />

            <div className="flex items-center text-center md:text-left">
              <span className="text-white font-sans text-xs font-semibold uppercase tracking-[0.16em]">
                Rynek pierwotny i wtórny
              </span>
            </div>

            <div className="hidden md:block w-[1px] h-4 bg-gold-500/30" />

            <div className="flex items-center text-center md:text-left">
              <span className="text-white font-sans text-xs font-semibold uppercase tracking-[0.16em]">
                Indywidualne podejście
              </span>
            </div>

          </div>
        </div>
      </div>


      {/* 4. OFERTY NIERUCHOMOŚCI */}
      <section 
        id="oferty"
        className="py-24 bg-white relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header section info */}
          <div className="text-center md:text-left max-w-3xl mb-16">
            <span className="inline-block text-xs uppercase font-sans font-bold tracking-widest text-gold-500 mb-3">
              AKTUALNE OFERTY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-navy-900 leading-tight mb-4">
              Wybrane nieruchomości
            </h2>
            <div className="w-16 h-[1px] bg-gold-500 mb-4 md:mx-0 mx-auto" />
            <p className="text-gray-500 font-sans font-light text-base leading-relaxed">
              Sprawdź dostępne oferty — każda z nich może być Twoim kolejnym krokiem.
            </p>
          </div>

          {/* Offer Category Filter strictly implemented using client state */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10 pb-4 border-b border-gray-100">
            <button
              onClick={() => setActiveFilter('wszystkie')}
              className={`px-6 py-2.5 font-sans font-semibold text-xs uppercase tracking-wider border transition-all duration-350 cursor-pointer ${
                activeFilter === 'wszystkie'
                  ? 'bg-gold-500 border-gold-500 text-navy-900'
                  : 'bg-white border-navy-800/10 hover:border-gold-500 text-navy-900'
              }`}
            >
              Wszystkie
            </button>
            
            <button
              onClick={() => setActiveFilter('mieszkanie')}
              className={`px-6 py-2.5 font-sans font-semibold text-xs uppercase tracking-wider border transition-all duration-350 cursor-pointer ${
                activeFilter === 'mieszkanie'
                  ? 'bg-gold-500 border-gold-500 text-navy-900'
                  : 'bg-white border-navy-800/10 hover:border-gold-500 text-navy-900'
              }`}
            >
              Mieszkania
            </button>

            <button
              onClick={() => setActiveFilter('dzialka')}
              className={`px-6 py-2.5 font-sans font-semibold text-xs uppercase tracking-wider border transition-all duration-350 cursor-pointer ${
                activeFilter === 'dzialka'
                  ? 'bg-gold-500 border-gold-500 text-navy-900'
                  : 'bg-white border-navy-800/10 hover:border-gold-500 text-navy-900'
              }`}
            >
              Działki inwestycyjne
            </button>

            <button
              onClick={() => setActiveFilter('dom')}
              className={`px-6 py-2.5 font-sans font-semibold text-xs uppercase tracking-wider border transition-all duration-350 cursor-pointer ${
                activeFilter === 'dom'
                  ? 'bg-gold-500 border-gold-500 text-navy-900'
                  : 'bg-white border-navy-800/10 hover:border-gold-500 text-navy-900'
              }`}
            >
              Domy
            </button>
          </div>

          {/* Offers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer, index) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onSelect={setSelectedOffer}
                index={index}
              />
            ))}
          </div>

        </div>
      </section>


      {/* 5. O MNIE SECTION */}
      <section 
        id="o-mnie"
        className="py-24 bg-cream relative overflow-hidden border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT Column — Monogram Avatar and real statistics */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col items-center"
            >
              {/* Premium Avatar Block */}
              <div className="relative mb-8 text-center">
                {/* Large outer artistic circle */}
                <div className="absolute inset-0 rounded-full border border-gold-500/20 scale-110 animate-pulse pointer-events-none" />
                
                {/* Visual Avatar Monogram */}
                <div className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] rounded-full bg-navy-900 border-4 border-gold-500 flex flex-col items-center justify-center shadow-2xl relative z-10">
                  <span className="font-serif text-5xl sm:text-6xl font-bold text-gold-500 tracking-widest select-none">
                    BS
                  </span>
                </div>
              </div>

              {/* Gold line under avatar */}
              <div className="w-16 h-[2.5px] bg-gold-500 mb-8" />

              {/* Statistics Panel with 3 beautiful mini-cards */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {OFFICE_STATS.map((stat, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-5 border border-gray-100 shadow-sm rounded-none text-center transform transition-transform hover:-translate-y-1 block relative overflow-hidden"
                  >
                    <div className={`font-serif font-semibold text-gold-500 border-b border-gray-50 pb-2 mb-2 tracking-tight ${
                      stat.number.length > 7
                        ? 'text-sm sm:text-xs md:text-sm lg:text-[11px] xl:text-xs'
                        : 'text-xl sm:text-2xl'
                    }`}>
                      {stat.number}
                    </div>
                    <p className="text-xs font-bold font-sans text-navy-900 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-normal font-sans font-light">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT Column — Text Block */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <span className="inline-block text-xs uppercase font-sans font-bold tracking-widest text-gold-500 mb-3">
                O MNIE
              </span>
              <div className="w-12 h-[1px] bg-gold-500 mb-5" />
              
              <h3 className="font-serif text-3xl sm:text-5xl font-normal text-navy-900 mb-6 leading-tight">
                Barbara Stefaniuk —<br />
                <span className="font-semibold text-gold-500">Twój zaufany agent nieruchomości.</span>
              </h3>

              <div className="space-y-6 text-gray-600 font-sans font-light text-sm sm:text-base leading-[1.9] mb-10">
                <p>
                  Pomagam klientom w zakupie, sprzedaży i wynajmie nieruchomości na terenie całej Polski. Specjalizuję się w ofertach mieszkaniowych, domach jednorodzinnych oraz terenach inwestycyjnych.
                </p>
                <p>
                  Wierzę, że każda transakcja nieruchomościowa to ważna decyzja życiowa — dlatego podchodzę do każdego klienta indywidualnie, dbając o bezpieczeństwo i komfort na każdym etapie współpracy.
                </p>
                <p>
                  Znajomość rynku, rzetelność i pełne zaangażowanie — to fundamenty mojej pracy.
                </p>
              </div>

              {/* Profile buttons with scroll controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('oferty')}
                  className="px-8 py-3.5 bg-gold-500 hover:bg-gold-700 text-navy-900 hover:text-white font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer text-center"
                >
                  Aktualne oferty
                </button>
                <button
                  onClick={() => scrollToSection('kontakt')}
                  className="px-8 py-3.5 bg-transparent border border-navy-800 text-navy-900 hover:bg-navy-900 hover:text-white font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer text-center"
                >
                  Napisz do mnie
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 6. OBSZAR DZIAŁANIA (Territory profile) */}
      <section 
        id="obszar-dzialania"
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs uppercase font-sans font-bold tracking-widest text-gold-500 mb-3">
              OBSZAR DZIAŁANIA
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-navy-900 mb-4 tracking-tight leading-tight">
              Działam na terenie całej Polski
            </h2>
            <div className="w-16 h-[1.5px] bg-gold-500 mx-auto mb-4" />
            <p className="text-gray-500 text-sm sm:text-base font-sans font-light">
              Specjalizuję się w ofertach z Warszawy i Mazowsza, Warmii i Mazur oraz innych atrakcyjnych lokalizacji inwestycyjnych w Polsce.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="bg-navy-800 hover:bg-navy-700 border-b-4 border-gold-500 p-8 text-white transition-all duration-300 shadow-lg group relative overflow-hidden flex flex-col h-full"
              >
                {/* Absolute overlay elements */}
                <div className="absolute right-0 bottom-0 translate-x-5 translate-y-5 opacity-[0.03] scale-150 text-white pointer-events-none">
                  <MapPin className="w-48 h-48" />
                </div>

                <div className="flex items-center justify-between mb-6">
                  {/* SVG Map Pin Location icon */}
                  <div className="p-3 bg-navy-950/50 border border-gold-500/20 text-gold-500">
                    <MapPin className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
                    Lokalny ekspert
                  </span>
                </div>

                <h4 className="font-serif text-xl font-semibold mb-2 text-white group-hover:text-gold-100 transition-colors">
                  {loc.title}
                </h4>
                
                <p className="text-xs font-sans text-gold-500 tracking-wide mb-4 font-light italic">
                  {loc.subtitle}
                </p>

                <p className="text-gray-300 font-sans text-xs leading-relaxed font-light mt-auto">
                  {loc.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Text banner with inline CTA strictly matching prompt details */}
          <div className="relative bg-navy-900 p-8 md:p-12 border border-gold-500/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden text-center md:text-left">
            {/* Subtle background luxury decoration */}
            <div className="absolute inset-0 luxury-diagonal opacity-15 pointer-events-none" />
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-48 h-48 bg-gold-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl">
              <span className="text-[10px] font-sans font-bold text-gold-500 tracking-widest uppercase mb-2 block">
                ZAPYTANIE SPECJALNE
              </span>
              <h3 className="font-serif text-xl sm:text-3xl text-white mb-2 leading-relaxed">
                Szukasz nieruchomości w konkretnej lokalizacji?<br />
                <span className="font-light italic text-gold-100">Zapytaj mnie — mam dostęp do ofert z całego kraju.</span>
              </h3>
              <p className="font-sans text-xs text-white/50 font-light max-w-xl">
                Dzięki szerokiej sieci kontaktów i współpracy międzyagencyjnej odnajduję rzadkie i poufne oferty pozarynkowe odpowiadające Twoim kryteriom.
              </p>
            </div>

            <button
              onClick={() => {
                const subject = encodeURIComponent('Zapytanie: Poszukiwanie nieruchomości w konkretnej lokalizacji');
                const body = encodeURIComponent('Dzień dobry,\n\nSzukam nieruchomości w określonej lokalizacji. Chciałbym/chciałabym omówić moje kryteria zakupu.\n\nZ poważaniem,\n[Imię i Nazwisko]\n[Numer telefonu]');
                window.location.href = `mailto:barbara.stefaniuk.nieruchomosci@gmail.com?subject=${subject}&body=${body}`;
                scrollToSection('kontakt');
              }}
              className="relative z-10 px-8 py-4 bg-gold-500 hover:bg-gold-700 text-navy-900 hover:text-white font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shrink-0 cursor-pointer shadow-lg"
            >
              Zapytaj o ofertę
            </button>
          </div>

        </div>
      </section>


      {/* 7. KONTAKT SECTION (Strict high-end custom designed underline form) */}
      <section 
        id="kontakt"
        className="py-24 bg-navy-900 text-white relative overflow-hidden"
      >
        {/* Background decorators */}
        <div className="absolute inset-0 luxury-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs uppercase font-sans font-bold tracking-widest text-gold-500 mb-3">
              KONTAKT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium leading-tight text-white mb-4">
              Porozmawiajmy o Twojej nieruchomości
            </h2>
            <div className="w-16 h-[1.5px] bg-gold-500 mb-4 mx-auto" />
            <p className="text-white/70 font-sans text-sm sm:text-base font-light">
              Bezpłatna konsultacja — bez zobowiązań. Napisz lub zadzwoń bezpośrednio.
            </p>
          </div>

          <div className="max-w-4xl mx-auto pb-6">
            
            {/* Description & Intro */}
            <div className="text-center mb-12">
              <p className="text-white/80 font-sans text-sm sm:text-base leading-[1.8] font-light max-w-2xl mx-auto">
                Niezależnie od tego, czy kupujesz swoje pierwsze mieszkanie, sprzedajesz dom czy szukasz terenu pod inwestycję — chętnie pomogę. Przeprowadzę Cię bezpiecznie przez całą procedurę i pomogę we wszelkich formalnościach prawnych oraz finansowych.
              </p>
              
              <div className="w-12 h-[2px] bg-gold-500 mx-auto mt-6" />
            </div>

            {/* Interactive Contact Details Symmetrical Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
              
              {/* Email address info card */}
              <a 
                href="mailto:barbara.stefaniuk.nieruchomosci@gmail.com"
                className="flex items-center gap-4 p-5 sm:p-6 border border-gold-500/10 bg-navy-950/40 hover:bg-navy-950/80 hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans font-semibold">📧 WYŚLIJ E-MAIL</p>
                  <p className="text-sm sm:text-base font-medium text-white group-hover:text-gold-100 transition-colors break-all mt-0.5">
                    barbara.stefaniuk.nieruchomosci@gmail.com
                  </p>
                </div>
              </a>

              {/* Telephone Contact info card */}
              <a 
                href="tel:+48501234567"
                className="flex items-center gap-4 p-5 sm:p-6 border border-gold-500/10 bg-navy-950/40 hover:bg-navy-950/80 hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans font-semibold">📱 ZADZWOŃ TERAZ</p>
                  <p className="text-sm sm:text-base font-medium text-white group-hover:text-gold-100 transition-colors font-sans mt-0.5">
                    +48 501 234 567
                  </p>
                </div>
              </a>

            </div>

            {/* Symmetrical Actionable Quick buttons with state hooks (no alert checks) */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto mb-12 px-4">
              <button
                onClick={copyEmailToClipboard}
                className="px-6 py-3.5 bg-transparent border border-gold-500/30 text-gold-500 hover:border-gold-500 hover:bg-gold-500/5 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer min-w-[220px] text-center"
              >
                {copiedEmail ? '✓ Skopiowano e-mail' : 'Kopiuj adres e-mail'}
              </button>
              <button
                onClick={copyPhoneToClipboard}
                className="px-6 py-3.5 bg-transparent border border-gold-500/30 text-gold-500 hover:border-gold-500 hover:bg-gold-500/5 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer min-w-[220px] text-center"
              >
                {copiedPhone ? '✓ Skopiowano numer' : 'Kopiuj numer telefonu'}
              </button>
            </div>

            {/* Symmetrical Trust Indicators / Badges */}
            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 text-xs sm:text-sm text-white/50">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>Dostępność telefoniczna: Pn - So, 8:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>Pełna polisa ubezpieczenia OC agenta pośrednictwa</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 8. FOOTER (Strictly styled, dark navy background) */}
      <footer 
        id="footer"
        className="bg-navy-950 text-white border-t border-gold-500/10 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            
            {/* Logo and company title in footer */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full border-2 border-gold-500 bg-navy-900 flex items-center justify-center font-serif">
                <span className="text-sm font-bold text-gold-500 tracking-wider">BS</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-base font-semibold tracking-wide text-white">
                  Barbara Stefaniuk
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold-500 font-medium">
                  Nieruchomości
                </span>
              </div>
            </div>

            {/* Horizontal Navigation Links strictly matching prompt requirements */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-xs font-semibold uppercase tracking-wider text-white/60">
              <button 
                onClick={() => scrollToSection('home')} 
                className="hover:text-gold-500 transition-colors cursor-pointer"
              >
                Strona główna
              </button>
              <button 
                onClick={() => scrollToSection('o-mnie')} 
                className="hover:text-gold-500 transition-colors cursor-pointer"
              >
                O mnie
              </button>
              <button 
                onClick={() => scrollToSection('oferty')} 
                className="hover:text-gold-500 transition-colors cursor-pointer"
              >
                Oferty
              </button>
              <button 
                onClick={() => scrollToSection('obszar-dzialania')} 
                className="hover:text-gold-500 transition-colors cursor-pointer"
              >
                Obszar działania
              </button>
              <button 
                onClick={() => scrollToSection('kontakt')} 
                className="hover:text-gold-500 transition-colors cursor-pointer"
              >
                Kontakt
              </button>
            </div>

          </div>

          {/* Golden Separator 1px */}
          <div className="w-full h-[1px] bg-gold-500/15 mb-8" />

          {/* Privacy claims and legal details */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-[11px] text-gray-500 font-sans font-light">
              © 2026 Barbara Stefaniuk Nieruchomości. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-[10px] text-gray-500 font-sans font-light max-w-md md:text-right leading-relaxed select-none">
              Strona informacyjna. Prezentowane oferty mają charakter informacyjny i nie stanowią oferty handlowej w rozumieniu Kodeksu Cywilnego.
            </p>
          </div>

        </div>
      </footer>


      {/* 9. OFFER SPECIFICATION MODAL LIGHTBOX */}
      <OfferModal
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
        onContactInquiry={handleOfferInquiry}
      />

    </div>
  );
}
