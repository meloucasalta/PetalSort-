import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import {
  CATEGORY_PROFILES,
  HERO_IMAGE,
  WASTE_ITEMS,
  type WasteCategory,
} from './data/wasteData';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { CategoryIcon } from './components/CategoryIcon';
import { ItemEncyclopedia } from './components/ItemEncyclopedia';
import { SortingPracticeLab } from './components/SortingPracticeLab';
import { DecompositionTimeline } from './components/DecompositionTimeline';

const CATEGORY_ORDER: WasteCategory[] = [
  'biodegradable',
  'recyclable',
  'non-biodegradable',
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | WasteCategory>('all');

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreCategory = (category: WasteCategory) => {
    setActiveCategory(category);
    scrollToSection('item-guide');
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FFF9FB] text-[#2D1320]">
      <Header onJumpToPractice={() => scrollToSection('sorting-lab')} />

      <main className="flex-1">
        {/* Hero Split */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs font-medium text-[#BE185D] tracking-wide mb-3">
                  Practical Household Reference · 3 Waste Streams
                </p>

                <h1
                  className="font-display text-4xl sm:text-5xl font-bold text-[#2D1320] tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Sort everyday waste with clarity and zero guesswork
                </h1>

                <p className="text-base md:text-lg text-[#6B4C5B] leading-relaxed mt-5 max-w-[54ch]">
                  Understand what belongs in Biodegradable organics, clean Recyclable streams, and Non-Biodegradable disposal—with instant item lookup, preparation rules, and hands-on sorting practice.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('item-guide')}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#DB2777] text-white text-sm font-semibold hover:bg-[#BE185D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Browse Item Guide</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('sorting-lab')}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#BE185D] hover:text-[#9D174D] underline underline-offset-4 decoration-[#F9A8D4] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Try Sorting Practice
                  </button>
                </div>

                <div className="mt-10 pt-6 border-t border-[#F5D0DE] grid grid-cols-3 gap-4 max-w-lg">
                  <div>
                    <div className="font-mono text-xl font-medium text-[#2D1320] tabular-nums">
                      3 Streams
                    </div>
                    <div className="text-xs text-[#6B4C5B] mt-0.5">Core waste bins</div>
                  </div>
                  <div>
                    <div className="font-mono text-xl font-medium text-[#2D1320] tabular-nums">
                      {WASTE_ITEMS.length} Items
                    </div>
                    <div className="text-xs text-[#6B4C5B] mt-0.5">Searchable guide</div>
                  </div>
                  <div>
                    <div className="font-mono text-xl font-medium text-[#2D1320] tabular-nums">
                      100% Free
                    </div>
                    <div className="text-xs text-[#6B4C5B] mt-0.5">No sign-in required</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full min-h-[280px] rounded-2xl overflow-hidden border border-[#F5D0DE] bg-[#FDF2F6]">
                  <ResilientImage
                    src={HERO_IMAGE.src}
                    alt={HERO_IMAGE.alt}
                    fallbackTitle="Biodegradable, Recyclable, and Non-Biodegradable Sorting Visual"
                    className="w-full h-full lg:h-full object-cover aspect-[16/10] lg:aspect-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Core Waste Categories */}
        <section
          id="overview"
          aria-labelledby="overview-heading"
          className="py-16 md:py-20 border-t border-[#F5D0DE] bg-[#FDF2F6]"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-medium text-[#BE185D] tracking-wide mb-2">
                The Three Streams · Core Principles
              </p>
              <h2
                id="overview-heading"
                className="font-display text-3xl md:text-4xl font-bold text-[#2D1320] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Biodegradable, Recyclable, or Non-Biodegradable
              </h2>
              <p className="text-[#6B4C5B] text-base leading-relaxed mt-3">
                Each waste category follows a distinct recovery or containment pathway. Click any category below to filter matching items in the directory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORY_ORDER.map((categoryId) => {
                const profile = CATEGORY_PROFILES[categoryId];
                const itemCount = WASTE_ITEMS.filter(
                  (item) => item.category === categoryId,
                ).length;

                return (
                  <article
                    key={categoryId}
                    className="bg-white border border-[#F5D0DE] rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] w-full overflow-hidden border-b border-[#F5D0DE] bg-[#FFF9FB]">
                        <ResilientImage
                          src={profile.image}
                          alt={profile.imageAlt}
                          fallbackTitle={`${profile.name} Examples`}
                          category={categoryId}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 text-xs mb-2">
                          <span className={`inline-flex items-center gap-1.5 font-semibold ${profile.accentText}`}>
                            <CategoryIcon category={categoryId} className="w-4 h-4" />
                            <span>{profile.binAction}</span>
                          </span>
                          <span className="font-mono text-[#6B4C5B] tabular-nums">
                            {itemCount} items
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold text-[#2D1320] mb-2">
                          {profile.name}
                        </h3>

                        <p className="text-sm text-[#6B4C5B] leading-relaxed mb-4">
                          {profile.description}
                        </p>

                        <div className="py-3 px-3.5 rounded-xl bg-[#FFF9FB] border border-[#F5D0DE] mb-4">
                          <div className="text-xs text-[#6B4C5B] mb-0.5">
                            Typical breakdown time
                          </div>
                          <div className="font-mono text-sm font-medium text-[#2D1320] tabular-nums">
                            {profile.decompositionRange}
                          </div>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div>
                            <div className="font-semibold text-[#2D1320] mb-1.5">
                              Examples included
                            </div>
                            <ul className="space-y-1 text-[#6B4C5B]">
                              {profile.acceptedExamples.map((ex) => (
                                <li key={ex} className="flex items-start gap-2">
                                  <Check
                                    className="w-3.5 h-3.5 text-[#0F766E] mt-0.5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-[#F5D0DE]/60">
                            <div className="font-semibold text-[#2D1320] mb-1.5">
                              Keep separate
                            </div>
                            <ul className="space-y-1 text-[#6B4C5B]">
                              {profile.avoidExamples.map((ex) => (
                                <li key={ex} className="flex items-start gap-2">
                                  <X
                                    className="w-3.5 h-3.5 text-[#9F1239] mt-0.5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <button
                        type="button"
                        onClick={() => handleExploreCategory(categoryId)}
                        className="w-full min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#F5D0DE] bg-[#FFF9FB] text-sm font-semibold text-[#BE185D] hover:bg-[#DB2777] hover:text-white hover:border-[#DB2777] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Filter {profile.name} Items</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Searchable Item Guide */}
        <ItemEncyclopedia
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Interactive Practice Lab */}
        <SortingPracticeLab />

        {/* Interactive Decomposition Timeline */}
        <DecompositionTimeline />
      </main>

      <footer className="border-t border-[#F5D0DE] bg-[#FDF2F6] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6B4C5B]">
          <div>
            <span className="font-display text-sm font-bold text-[#2D1320]">PetalSort</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Biodegradable, Non-Biodegradable &amp; Recyclable Sorting Reference</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#overview" className="hover:text-[#BE185D] transition-colors">
              Overview
            </a>
            <a href="#item-guide" className="hover:text-[#BE185D] transition-colors">
              Item Guide
            </a>
            <a href="#sorting-lab" className="hover:text-[#BE185D] transition-colors">
              Sorting Lab
            </a>
            <a href="#timeline" className="hover:text-[#BE185D] transition-colors">
              Timeline
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
