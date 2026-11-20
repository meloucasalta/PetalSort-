import { useMemo, useState } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import {
  CATEGORY_PROFILES,
  WASTE_ITEMS,
  type WasteCategory,
} from '../data/wasteData';
import { CategoryIcon } from './CategoryIcon';

type PracticeMode = 'all' | 'tricky';

const BIN_ORDER: WasteCategory[] = ['biodegradable', 'recyclable', 'non-biodegradable'];

export function SortingPracticeLab() {
  const [mode, setMode] = useState<PracticeMode>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<WasteCategory | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const deck = useMemo(() => {
    const base = mode === 'tricky' ? WASTE_ITEMS.filter((item) => item.isTricky) : WASTE_ITEMS;
    // Deterministic curated order alternating tricky and everyday materials
    return [...base].sort((a, b) => a.name.localeCompare(b.name));
  }, [mode]);

  const safeIndex = currentIndex % deck.length;
  const currentItem = deck[safeIndex];
  const isAnswered = selectedChoice !== null;
  const isCorrect = selectedChoice === currentItem.category;
  const accuracy = attempts > 0 ? Math.round((correctCount / attempts) * 100) : 0;

  const handleModeChange = (nextMode: PracticeMode) => {
    setMode(nextMode);
    setCurrentIndex(0);
    setSelectedChoice(null);
  };

  const handleChooseBin = (choice: WasteCategory) => {
    if (isAnswered) return;
    setSelectedChoice(choice);
    setAttempts((prev) => prev + 1);
    if (choice === currentItem.category) {
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setAttempts(0);
    setCorrectCount(0);
    setStreak(0);
  };

  const correctProfile = CATEGORY_PROFILES[currentItem.category];

  return (
    <section
      id="sorting-lab"
      aria-labelledby="sorting-lab-heading"
      className="py-16 md:py-20 border-t border-[#F5D0DE] bg-[#FDF2F6]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#BE185D] tracking-wide mb-2">
              Interactive Practice Sandbox · Immediate Bin Feedback
            </p>
            <h2
              id="sorting-lab-heading"
              className="font-display text-3xl md:text-4xl font-bold text-[#2D1320] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Test your sorting instincts
            </h2>
            <p className="text-[#6B4C5B] text-base leading-relaxed mt-3">
              Pick the correct waste stream for each household item and see how preparation or mixed materials affect real sorting lines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Practice difficulty mode"
              className="flex items-center gap-1 p-1 bg-white border border-[#F5D0DE] rounded-xl"
            >
              <button
                type="button"
                onClick={() => handleModeChange('all')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'all'
                    ? 'bg-[#DB2777] text-white'
                    : 'text-[#6B4C5B] hover:text-[#2D1320]'
                }`}
              >
                All Items ({WASTE_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('tricky')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'tricky'
                    ? 'bg-[#DB2777] text-white'
                    : 'text-[#6B4C5B] hover:text-[#2D1320]'
                }`}
              >
                Tricky Edge Cases
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#F5D0DE] text-sm font-medium text-[#2D1320] hover:bg-[#FFF9FB] hover:border-[#F472B6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-[#BE185D]" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Stage: Active Item & 3 Bin Choices */}
          <div className="lg:col-span-7 bg-white border border-[#F5D0DE] rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 text-xs text-[#6B4C5B] mb-6">
                <span className="font-mono tabular-nums">
                  Item {safeIndex + 1} / {deck.length}
                </span>
                <span>
                  {currentItem.isTricky ? 'Tricky Household Item' : 'Everyday Material'}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF9FB] border border-[#F5D0DE] mb-6">
                <p className="text-xs font-medium text-[#BE185D] mb-2">
                  Material: {currentItem.material}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2D1320] leading-snug">
                  {currentItem.name}
                </h3>
                <p className="text-sm text-[#6B4C5B] mt-2">
                  Which bin should this item go into?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BIN_ORDER.map((binId) => {
                  const profile = CATEGORY_PROFILES[binId];
                  const isUserPick = selectedChoice === binId;
                  const isRightBin = currentItem.category === binId;

                  let buttonStyle =
                    'bg-white border-[#F5D0DE] hover:border-[#DB2777] hover:bg-[#FDF2F8] text-[#2D1320]';

                  if (isAnswered) {
                    if (isRightBin) {
                      buttonStyle =
                        'bg-[#F0FDFA] border-[#0F766E] text-[#0F766E] ring-1 ring-[#0F766E]';
                    } else if (isUserPick && !isRightBin) {
                      buttonStyle =
                        'bg-[#FFF1F2] border-[#9F1239] text-[#9F1239] ring-1 ring-[#9F1239]';
                    } else {
                      buttonStyle = 'bg-[#FFF9FB] border-[#F5D0DE] text-[#9D6B82] opacity-70';
                    }
                  }

                  return (
                    <button
                      key={binId}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleChooseBin(binId)}
                      className={`min-h-[84px] p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        isAnswered ? 'cursor-default' : 'cursor-pointer'
                      } ${buttonStyle}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <CategoryIcon category={binId} className="w-5 h-5" />
                        {isAnswered && isRightBin && (
                          <CheckCircle2 className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
                        )}
                        {isAnswered && isUserPick && !isRightBin && (
                          <XCircle className="w-4 h-4 text-[#9F1239]" aria-hidden="true" />
                        )}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-sm leading-tight">
                          {profile.name}
                        </div>
                        <div className="text-xs opacity-80 mt-0.5">{profile.shortLabel}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#F5D0DE] flex items-center justify-between gap-4">
              <div className="text-xs text-[#6B4C5B]">
                {isAnswered
                  ? isCorrect
                    ? 'Sorted accurately.'
                    : `Correct stream: ${correctProfile.name}`
                  : 'Select one of the three waste categories above.'}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[42px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DB2777] text-white text-sm font-semibold hover:bg-[#BE185D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{isAnswered ? 'Next Item' : 'Skip Item'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Concept & Feedback Deck */}
          <div className="lg:col-span-5 bg-white border border-[#F5D0DE] rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-3 gap-3 pb-6 mb-6 border-b border-[#F5D0DE]">
                <div>
                  <div className="text-xs text-[#6B4C5B] mb-1">Sorted</div>
                  <div className="font-mono text-2xl font-medium text-[#2D1320] tabular-nums">
                    {attempts}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#6B4C5B] mb-1">Accuracy</div>
                  <div className="font-mono text-2xl font-medium text-[#BE185D] tabular-nums">
                    {attempts > 0 ? `${accuracy}%` : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#6B4C5B] mb-1">Streak</div>
                  <div className="font-mono text-2xl font-medium text-[#0F766E] tabular-nums">
                    {streak}
                  </div>
                </div>
              </div>

              {!isAnswered ? (
                <div className="space-y-4">
                  <h4 className="font-display text-lg font-semibold text-[#2D1320]">
                    Quick Decision Rule
                  </h4>
                  <p className="text-sm text-[#6B4C5B] leading-relaxed">
                    Before choosing a bin, ask two questions:
                  </p>
                  <ul className="space-y-2.5 text-sm text-[#6B4C5B]">
                    <li className="p-3 rounded-xl bg-[#FFF9FB] border border-[#F5D0DE]">
                      <span className="font-semibold text-[#2D1320]">1. Is it pure organic plant or food matter?</span>{' '}
                      If yes and free of plastic coatings, choose Biodegradable.
                    </li>
                    <li className="p-3 rounded-xl bg-[#FFF9FB] border border-[#F5D0DE]">
                      <span className="font-semibold text-[#2D1320]">2. Is it single-material, clean, and rigid?</span>{' '}
                      Clean glass, metal, cardboard, and #1/#2 bottles belong in Recyclable.
                    </li>
                    <li className="p-3 rounded-xl bg-[#FFF9FB] border border-[#F5D0DE]">
                      <span className="font-semibold text-[#2D1320]">3. Is it fused layers, foam, or film?</span>{' '}
                      Mixed wrappers and Styrofoam go to Non-Biodegradable.
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0" aria-hidden="true" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#9F1239] shrink-0" aria-hidden="true" />
                    )}
                    <h4 className="font-display text-lg font-semibold text-[#2D1320]">
                      {isCorrect ? 'Correct placement' : `Belongs in ${correctProfile.name}`}
                    </h4>
                  </div>

                  <p className="text-sm text-[#6B4C5B] leading-relaxed">
                    {currentItem.whyItBelongs}
                  </p>

                  <div className="p-4 rounded-xl bg-[#FFF9FB] border border-[#F5D0DE] space-y-2 text-sm">
                    <div className="font-semibold text-[#2D1320]">Preparation Step</div>
                    <p className="text-[#6B4C5B] leading-relaxed">{currentItem.preparation}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] space-y-1 text-sm">
                    <div className="font-semibold text-[#9F1239]">Watch Out For</div>
                    <p className="text-[#6B4C5B] leading-relaxed">{currentItem.commonMistake}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F5D0DE] flex items-center justify-between text-xs text-[#6B4C5B]">
              <span>Decomposition if landfilled</span>
              <span className="font-mono font-medium text-[#2D1320] tabular-nums">
                {currentItem.decompositionTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
