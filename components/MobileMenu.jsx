'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // close on outside click / escape
  useEffect(() => {
    function onDocClick(e){ if (open && panelRef.current && !panelRef.current.contains(e.target)) setOpen(false) }
    function onEsc(e){ if (open && e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onDocClick); document.removeEventListener('keydown', onEsc); }
  }, [open]);

  return (
    <div className="relative sm:hidden">
      <button
        onClick={()=>setOpen(o=>!o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm"
      >
        {open ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} Menu
      </button>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="absolute right-0 z-40 mt-2 w-60 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl p-2"
        >
          <ul className="text-sm">
            <li><Link onClick={()=>setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900" href="/categories">Categories</Link></li>
            <li><Link onClick={()=>setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900" href="/about">About</Link></li>
            <li><Link onClick={()=>setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900" href="/contact">Contact</Link></li>
          </ul>

          <div className="my-2 border-t border-gray-200 dark:border-gray-800" />

          {/* Dark Mode inside the menu */}
          <div className="px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
