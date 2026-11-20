import { useMemo, useState } from 'react';
import {
  CATEGORY_PROFILES,
  WASTE_ITEMS,
  type WasteCategory,
} from '../data/wasteData';
import { CategoryIcon } from './CategoryIcon';

type TimelineFilter = 'all' | WasteCategory;

const MAX_LOG_SCALE = Math.log10(1000000 + 1);

export function DecompositionTimeline() {
  const [filter, setFilter] = useState<TimelineFilter>('all');

  const timelineItems = useMemo(() => {
    const filtered =
      filter === 'all'
        ? WASTE_ITEMS
        : WASTE_ITEMS.filter((item) => item.category === filter);

    return [...filtered]
      .sort((a, b) => a.decompositionYears - b.decompositionYears)
      .slice(0, 12);
  }, [filter]);

  const computeBarWidth = (years: number) => {
    // Logarithmic scale so 2 weeks (0.06 yrs) and 1,000,000 years both remain legible
    const normalized = Math.log10(Math.max(years, 0.05) * 20 + 1) / Math.log10(1000000 * 20 + 1);
    return Math.min(100, Math.max(8, Math.round(normalized * 100)));
  };

  const getBarColor = (category: WasteCategory) => {
    if (category === 'biodegradable') return 'bg-[#0F766E]';
    if (category === 'recyclable') return 'bg-[#DB2777]';
    return 'bg-[#9F1239]';
  };

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="py-16 md:py-20 border-t border-[#F5D0DE]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#BE185D] tracking-wide mb-2">
              Persistence Comparison · Logarithmic Time Scale
            </p>
            <h2
              id="timeline-heading"
              className="font-display text-3xl md:text-4xl font-bold text-[#2D1320] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              How long materials linger if landfilled
            </h2>
            <p className="text-[#6B4C5B] text-base leading-relaxed mt-3">
              Organic waste returns to soil in weeks, while unrecycled glass, aluminum, and synthetic plastics persist for centuries.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter timeline by category"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#FDF2F6] border border-[#F5D0DE] rounded-xl"
          >
            {(
              [
                { id: 'all', label: 'All Streams' },
                { id: 'biodegradable', label: 'Biodegradable' },
                { id: 'recyclable', label: 'Recyclable' },
                { id: 'non-biodegradable', label: 'Non-Biodegradable' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? 'bg-[#DB2777] text-white'
                    : 'text-[#6B4C5B] hover:text-[#2D1320]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#F5D0DE] rounded-2xl p-6 md:p-8">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 mb-4 border-b border-[#F5D0DE] text-xs font-medium text-[#6B4C5B]">
            <div className="col-span-4">Material Item</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-4">Relative Persistence Scale</div>
            <div className="col-span-2 text-right">Estimated Time</div>
          </div>

          <div className="divide-y divide-[#F5D0DE]/60">
            {timelineItems.map((item) => {
              const profile = CATEGORY_PROFILES[item.category];
              const widthPercent = computeBarWidth(item.decompositionYears);
              return (
                <div
                  key={item.id}
                  className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center"
                >
                  <div className="sm:col-span-4">
                    <div className="font-medium text-sm text-[#2D1320]">{item.name}</div>
                    <div className="text-xs text-[#6B4C5B]">{item.material}</div>
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-1.5 text-xs font-semibold">
                    <CategoryIcon category={item.category} className="w-3.5 h-3.5" />
                    <span className={profile.accentText}>{profile.name}</span>
                  </div>

                  <div className="sm:col-span-4">
                    <div
                      className="w-full h-2.5 rounded-full bg-[#FDF2F6] overflow-hidden"
                      aria-hidden="true"
                    >
                      <div
                        className={`h-full rounded-full ${getBarColor(item.category)} transition-all duration-300`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:text-right font-mono text-xs font-medium text-[#2D1320] tabular-nums">
                    {item.decompositionTime}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 pt-4 border-t border-[#F5D0DE] text-xs text-[#6B4C5B] leading-relaxed">
            Note: Scale uses logarithmic compression ({Math.round(MAX_LOG_SCALE)} orders of magnitude) so multi-week organics and million-year materials can be compared side by side. Recycling keeps aluminum, steel, and glass circulating instead of occupying landfill space.
          </p>
        </div>
      </div>
    </section>
  );
}
