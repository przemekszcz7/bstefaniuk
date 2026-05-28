/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Tag, Check, Calendar, Info } from 'lucide-react';
import { Offer } from '../types';

interface OfferModalProps {
  offer: Offer | null;
  onClose: () => void;
  onContactInquiry: (propertyTitle: string) => void;
}

export default function OfferModal({ offer, onClose, onContactInquiry }: OfferModalProps) {
  // Prevent page scroll when modal is open
  useEffect(() => {
    if (offer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [offer]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!offer) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="offer-detail-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-12 bg-navy-900/98 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        {/* Close Button in Top Right of the screen */}
        <button
          id="close-modal-btn-top-screen"
          onClick={onClose}
          className="fixed top-4 right-4 z-55 p-3 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white transition-all duration-300 shadow-2xl focus:outline-none"
          aria-label="Zamknij"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row my-auto max-h-[90vh] lg:max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Column: Visual Media Gallery */}
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto bg-navy-950 flex-shrink-0">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark bottom gradients on image for mobile layout */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
            
            {/* Absolute Badges on Image */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              <span className="inline-block px-4 py-1.5 text-xs font-sans font-bold tracking-widest text-navy-900 bg-gold-500 uppercase">
                {offer.tag}
              </span>
              <span className="inline-block px-3 py-1 text-[11px] font-sans font-medium tracking-wide text-white bg-navy-900/80 backdrop-blur-sm self-start">
                {offer.categoryLabel}
              </span>
            </div>

            {/* Elegant visual footer tag for large screens */}
            <div className="absolute bottom-6 left-6 hidden lg:block text-white">
              <p className="font-serif italic text-lg text-gold-100 mb-1">Barbara Stefaniuk</p>
              <p className="text-[11px] uppercase tracking-widest text-white/60">Ekskluzywne Doradztwo Nieruchomości</p>
            </div>
          </div>

          {/* Right Column: Descriptions and Specifics (Scrollable) */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 overflow-y-auto flex flex-col h-full bg-white">
            {/* Breadcrumb / Top Row */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-gold-500 tracking-wider font-semibold uppercase">
                <Tag className="w-3.5 h-3.5" />
                <span>{offer.categoryLabel}</span>
              </div>
              <span className="text-xs text-gray-400 font-sans">{offer.dateLabel}</span>
            </div>

            {/* Title & Price */}
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-900 mb-4 leading-tight">
              {offer.title}
            </h2>

            {/* Location Info */}
            <div className="flex items-start gap-2 text-gray-600 mb-6 font-sans">
              <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-navy-900">{offer.location}</p>
                <p className="text-xs text-gray-400">Oferta opiekowana przez licencjonowanego brokera</p>
              </div>
            </div>

            {/* Parameters Grid */}
            <div className="bg-cream p-5 mb-8 border-l-2 border-gold-500 grid grid-cols-2 gap-4">
              {offer.features.map((feature, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider font-sans">
                    {feature.label}
                  </span>
                  <span className="text-sm font-medium text-navy-900 font-sans">
                    {feature.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Heading Description */}
            <h4 className="font-serif text-lg font-semibold text-navy-900 mb-3 border-b border-gray-100 pb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-gold-500" />
              Szczegółowy opis nieruchomości
            </h4>

            {/* Full text with beautiful line-breaks */}
            <div className="text-gray-600 text-sm leading-relaxed space-y-4 mb-8 font-sans font-light">
              {offer.fullDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Bullet list of advantages */}
            <div className="bg-gray-50 p-6 rounded-none mb-8 border border-gray-100">
              <h5 className="font-sans font-semibold text-xs text-navy-900 uppercase tracking-widest mb-4">
                Kluczowe Atuty Oferty
              </h5>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 font-sans">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Wysoki zwrot z inwestycji</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Świetna lokalizacja</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Zweryfikowany stan prawny</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Pełna pomoc przy kredycie</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <button
                id="contact-for-this-property-btn"
                onClick={() => {
                  onContactInquiry(offer.title);
                  onClose();
                }}
                className="w-full text-center py-4 bg-gold-500 hover:bg-gold-700 text-navy-900 hover:text-white font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                Skontaktuj się w sprawie tej oferty
              </button>
              
              <p className="text-center text-[11px] text-gray-400 mt-3 font-sans font-light">
                Kliknięcie przeniesie Cię do bezpiecznego formularza kontaktowego.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
