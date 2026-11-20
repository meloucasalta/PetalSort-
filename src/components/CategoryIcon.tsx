import { Leaf, Recycle, Ban } from 'lucide-react';
import type { WasteCategory } from '../data/wasteData';

interface CategoryIconProps {
  category: WasteCategory;
  className?: string;
}

export function CategoryIcon({ category, className = 'w-4 h-4' }: CategoryIconProps) {
  if (category === 'biodegradable') {
    return <Leaf className={`${className} text-[#0F766E] shrink-0`} aria-hidden="true" />;
  }
  if (category === 'recyclable') {
    return <Recycle className={`${className} text-[#BE185D] shrink-0`} aria-hidden="true" />;
  }
  return <Ban className={`${className} text-[#9F1239] shrink-0`} aria-hidden="true" />;
}
