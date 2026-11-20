import { useMemo, useState } from 'react';
import { Search, X, ArrowRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import {
  CATEGORY_PROFILES,
  WASTE_ITEMS,
  type WasteCategory,
  type WasteItem,
} from '../data/wasteData';
import { CategoryIcon } from './CategoryIcon';

interface ItemEncyclopediaProps {
  activeCategory: 'all' | WasteCategory;
  onSelectCategory: (category: 'all' | WasteCategory) => void;
}

const FILTER_OPTIONS: Array<{ id: 'all' | WasteCategory; label: string }> = [
  { id: 'all', label: 'All Items' },
  { id: 'biodegradable', label: 'Biodegradable' },
  { id: 'recyclable', label: 'Recyclable' },
  { id: 'non-biodegradable', label: 'Non-Biodegradable' },
];

const QUICK_TRICKY_IDS = [
  'greasy-pizza-box',
  'disposable-coffee-cup',
  'thermal-receipt',
  'tetra-pak',
  'aa-batteries',
];

export function ItemEncyclopedia({
  activeCategory,
  onSelectCategory,
}: ItemEncyclopediaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trickyOnly, setTrickyOnly] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>(WASTE_ITEMS[0].id);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return WASTE_ITEMS.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (trickyOnly && !item.isTricky) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      return (
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.material.toLowerCase().includes(normalizedQuery) ||
        item.preparation.toLowerCase().includes(normalizedQuery) ||
        CATEGORY_PROFILES[item.category].name.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [activeCategory, trickyOnly, searchQuery]);

  const activeItem: WasteItem = useMemo(() => {
    const foundInFiltered = filteredItems.find((item) => item.id === selectedItemId);
    if (foundInFiltered) return foundInFiltered;
    if (filteredItems.length > 0) return filteredItems[0];
    return WASTE_ITEMS.find((item) => item.id === selectedItemId) ?? WASTE_ITEMS[0];
  }, [filteredItems, selectedItemId]);

  const activeProfile = CATEGORY_PROFILES[activeItem.category];

  const handleQuickLookup = (itemId: string) => {
    onSelectCategory('all');
    setTrickyOnly(false);
    setSearchQuery('');
    setSelectedItemId(itemId);
  };

  return (
    <section
      id="item-guide"
      aria-labelledby="item-guide-heading"
      className="py-16 md:py-20 border-t border-[#F5D0DE]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#BE185D] tracking-wide mb-2">
              Household Item Directory · {WASTE_ITEMS.length} Common Materials
            </p>
            <h2
              id="item-guide-heading"
              className="font-display text-3xl md:text-4xl font-bold text-[#2D1320] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Look up any item before you toss it
            </h2>
            <p className="text-[#6B4C5B] text-base leading-relaxed mt-3">
              Search everyday household items or select a category to check bin placement, preparation steps, and contamination risks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTrickyOnly((prev) => !prev)}
              aria-pressed={trickyOnly}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                trickyOnly
                  ? 'bg-[#DB2777] text-white border-[#DB2777]'
                  : 'bg-white text-[#2D1320] border-[#F5D0DE] hover:border-[#F472B6] hover:bg-[#FDF2F8]'
              }`}
            >
              {trickyOnly ? 'Showing Tricky Items' : 'Filter Tricky Edge Cases'}
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#F5D0DE] rounded-2xl p-5 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search
                className="w-4 h-4 text-[#9D6B82] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="waste-search-input" className="sr-only">
                Search waste items by name or material
              </label>
              <input
                id="waste-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items like pizza box, coffee cup, receipt, aluminum..."
                className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-xl bg-[#FFF9FB] border border-[#F5D0DE] text-sm text-[#2D1320] placeholder:text-[#9D6B82] focus:border-[#DB2777] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-[#6B4C5B] hover:bg-[#FCE7F3] cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div
              role="tablist"
              aria-label="Filter items by waste category"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#FDF2F6] border border-[#F5D0DE] rounded-xl"
            >
              {FILTER_OPTIONS.map((option) => {
                const isSelected = activeCategory === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onSelectCategory(option.id)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#DB2777] text-white'
                        : 'text-[#6B4C5B] hover:text-[#2D1320] hover:bg-white/70'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#F5D0DE]/70 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6B4C5B]">
            <span className="font-medium text-[#2D1320]">Quick tricky lookups:</span>
            {QUICK_TRICKY_IDS.map((id) => {
              const found = WASTE_ITEMS.find((i) => i.id === id);
              if (!found) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleQuickLookup(id)}
                  className="text-[#BE185D] hover:text-[#9D174D] underline underline-offset-4 decoration-[#F9A8D4] cursor-pointer py-1"
                >
                  {found.name.split(' (')[0]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 text-xs text-[#6B4C5B]">
              <span className="tabular-nums">
                Showing {filteredItems.length} of {WASTE_ITEMS.length} items
              </span>
              {(searchQuery || activeCategory !== 'all' || trickyOnly) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSelectCategory('all');
                    setTrickyOnly(false);
                  }}
                  className="text-[#BE185D] hover:underline cursor-pointer font-medium"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white border border-[#F5D0DE] rounded-2xl p-10 text-center">
                <p className="font-display text-lg font-semibold text-[#2D1320] mb-2">
                  No matching items found
                </p>
                <p className="text-sm text-[#6B4C5B] mb-5">
                  Try searching a broader term like &ldquo;paper&rdquo;, &ldquo;plastic&rdquo;, or &ldquo;peel&rdquo;, or reset active filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSelectCategory('all');
                    setTrickyOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#DB2777] text-white text-sm font-semibold hover:bg-[#BE185D] transition-colors cursor-pointer"
                >
                  Show All Items
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredItems.map((item) => {
                  const profile = CATEGORY_PROFILES[item.category];
                  const isSelected = activeItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItemId(item.id)}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#FDF2F8] border-[#DB2777] ring-1 ring-[#DB2777]'
                          : 'bg-white border-[#F5D0DE] hover:border-[#F472B6] hover:bg-[#FFFDFD]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                          <span className={`inline-flex items-center gap-1.5 font-semibold ${profile.accentText}`}>
                            <CategoryIcon category={item.category} className="w-3.5 h-3.5" />
                            <span>{profile.name}</span>
                          </span>
                          {item.isTricky && (
                            <span className="text-[#9D174D] font-medium">
                              Commonly mis-sorted
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-base font-semibold text-[#2D1320] leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#6B4C5B] mt-1">{item.material}</p>
                      </div>

                      <div className="pt-2 border-t border-[#F5D0DE]/60 flex items-center justify-between text-xs text-[#6B4C5B]">
                        <span className="font-mono tabular-nums">{item.decompositionTime}</span>
                        <span className="inline-flex items-center gap-1 text-[#BE185D] font-medium">
                          Inspect
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <aside
            aria-label="Selected item details"
            className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-[#F5D0DE] rounded-2xl p-6 md:p-7"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-[#6B4C5B] mb-2">
              <CategoryIcon category={activeItem.category} className="w-4 h-4" />
              <span className={`font-semibold ${activeProfile.accentText}`}>
                {activeProfile.name}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeProfile.binAction}</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-[#2D1320] leading-tight mb-2">
              {activeItem.name}
            </h3>

            <p className="text-xs text-[#6B4C5B] mb-5">
              Material composition: <span className="font-medium text-[#2D1320]">{activeItem.material}</span>
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-xl bg-[#FDF2F6] border border-[#F5D0DE]">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#6B4C5B] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#BE185D]" aria-hidden="true" />
                  <span>Breakdown Window</span>
                </div>
                <p className="font-mono text-sm font-medium text-[#2D1320] tabular-nums">
                  {activeItem.decompositionTime}
                </p>
              </div>
              <div>
                <div className="text-xs text-[#6B4C5B] mb-1">Recommended Stream</div>
                <p className="text-sm font-semibold text-[#2D1320]">
                  {activeProfile.shortLabel}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-[#2D1320] mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" aria-hidden="true" />
                  <span>How to Prepare</span>
                </h4>
                <p className="text-[#6B4C5B] leading-relaxed">{activeItem.preparation}</p>
              </div>

              <div className="pt-3 border-t border-[#F5D0DE]/70">
                <h4 className="font-semibold text-[#2D1320] mb-1">Why It Belongs Here</h4>
                <p className="text-[#6B4C5B] leading-relaxed">{activeItem.whyItBelongs}</p>
              </div>

              <div className="pt-3 border-t border-[#F5D0DE]/70">
                <h4 className="flex items-center gap-2 font-semibold text-[#9F1239] mb-1">
                  <AlertCircle className="w-4 h-4 text-[#9F1239] shrink-0" aria-hidden="true" />
                  <span>Common Mistake to Avoid</span>
                </h4>
                <p className="text-[#6B4C5B] leading-relaxed">{activeItem.commonMistake}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
