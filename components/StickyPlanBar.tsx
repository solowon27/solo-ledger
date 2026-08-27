'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Appears once the hero's CTA has scrolled out of view, and hides
// again near the footer/planner section so it never fights the
// in-page CTA. Give users a way back to the calculator without
// scrolling up.
export function StickyPlanBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#planner');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show once the planner section has been scrolled past upward
        // (i.e. we're below it), hide once it's back in view.
        setVisible(entry.boundingClientRect.top < 0 && !entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
          <p className="hidden text-sm text-slate-600 sm:block">
            Still deciding what to charge?
          </p>
          <a
            href="#planner"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto"
          >
            Build your plan
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
