import { useState } from 'react';
import { Leaf, Recycle, Ban, Sparkles } from 'lucide-react';
import type { WasteCategory } from '../data/wasteData';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  category?: WasteCategory;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  category,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  const renderFallbackIcon = () => {
    if (category === 'biodegradable') {
      return <Leaf className="w-8 h-8 text-[#0F766E]" aria-hidden="true" />;
    }
    if (category === 'recyclable') {
      return <Recycle className="w-8 h-8 text-[#BE185D]" aria-hidden="true" />;
    }
    if (category === 'non-biodegradable') {
      return <Ban className="w-8 h-8 text-[#9F1239]" aria-hidden="true" />;
    }
    return <Sparkles className="w-8 h-8 text-[#DB2777]" aria-hidden="true" />;
  };

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-[#FDF2F8] via-[#FCE7F3] to-[#FFF1F2] border border-[#FBCFE8] ${className}`}
      >
        <div className="w-14 h-14 rounded-2xl bg-white/90 border border-[#FBCFE8] flex items-center justify-center shadow-xs">
          {renderFallbackIcon()}
        </div>
        <p className="text-sm font-medium text-[#6B4C5B] max-w-[22ch] leading-snug">
          {fallbackTitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
