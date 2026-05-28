/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Offer } from '../types';
import { Eye, MapPin } from 'lucide-react';

interface OfferCardProps {
  offer: Offer;
  onSelect: (offer: Offer) => void;
  index: number;
  key?: React.Key;
}

export default function OfferCard({ offer, onSelect, index }: OfferCardProps) {
  return (
    <motion.div
      id={`offer-card-${offer.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full bg-white border border-gray-100 hover:border-gold-500 hover:shadow-2xl transition-all duration-500 overflow-hidden"
      style={{ boxShadow: '0 10px 30px -15px rgba(13, 31, 60, 0.05)' }}
    >
      {/* Property Image Container */}
      <div className="relative w-full overflow-hidden aspect-[16/10] bg-navy-900">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
        
        {/* Absolute Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 text-[10px] font-sans font-semibold tracking-wider text-navy-900 bg-gold-500 uppercase">
            {offer.tag}
          </span>
        </div>

        {/* Floating action overlay for screen reader or click */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-navy-950/40 transition-opacity duration-350 z-10">
          <div className="bg-white/90 backdrop-blur-sm text-navy-900 p-3 rounded-full scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <Eye className="w-5 h-5 text-gold-500" />
          </div>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-sans font-medium tracking-widest text-gold-500 uppercase">
            {offer.categoryLabel}
          </span>
          <span className="text-[11px] font-sans font-light tracking-wide text-gray-400">
            {offer.dateLabel}
          </span>
        </div>

        <h3 className="font-serif text-lg md:text-xl font-semibold leading-snug text-navy-900 group-hover:text-gold-500 transition-colors duration-300 mb-3 line-clamp-2">
          {offer.title}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
          <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
          <span className="line-clamp-1 font-sans font-normal text-xs">{offer.location}</span>
        </div>

        <p className="text-gray-600 text-sm font-sans font-light leading-relaxed mb-6 line-clamp-3">
          {offer.shortDescription}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8 mt-auto">
          {offer.pills.map((pill, pIndex) => (
            <span
              key={pIndex}
              className="inline-block px-2.5 py-1 text-[11px] font-sans font-light text-navy-800 border border-navy-800/20 bg-navy-800/[0.02]"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Button Trigger */}
        <button
          id={`view-details-btn-${offer.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(offer);
          }}
          className="w-full text-center py-3 border border-gold-500 font-sans text-xs font-semibold uppercase tracking-wider text-navy-900 hover:text-white hover:bg-gold-500 transition-all duration-300"
        >
          Zobacz szczegóły
        </button>
      </div>
      
      {/* Golden Highlight Border on hover */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}
