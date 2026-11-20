import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onJumpToPractice: () => void;
}

export function Header({ onJumpToPractice }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Item Guide', href: '#item-guide' },
    { label: 'Sorting Lab', href: '#sorting-lab' },
    { label: 'Timeline', href: '#timeline' },
  ];

  const handleMobileAction = () => {
    setMobileMenuOpen(false);
    onJumpToPractice();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9FB]/95 backdrop-blur-sm border-b border-[#F5D0DE]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#2D1320] hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0"
        >
          PetalSort
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B4C5B]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#BE185D] hover:underline underline-offset-4 decoration-[#F472B6] transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onJumpToPractice}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#DB2777] text-white text-sm font-semibold hover:bg-[#BE185D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Practice Sorting
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#F5D0DE] bg-white text-[#2D1320] hover:bg-[#FDF2F8] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F5D0DE] bg-white px-6 py-4 space-y-3">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[#2D1320] hover:text-[#BE185D] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleMobileAction}
            className="w-full py-2.5 px-4 rounded-xl bg-[#DB2777] text-white text-sm font-semibold hover:bg-[#BE185D] transition-colors cursor-pointer whitespace-nowrap"
          >
            Practice Sorting
          </button>
        </div>
      )}
    </header>
  );
}
