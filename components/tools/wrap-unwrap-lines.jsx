'use client';

import { useMemo, useState } from 'react';

/**
 * Wrap / Unwrap Lines
 * - Wrap: hard-wrap lines to a specified width (word-aware or strict).
 * - Unwrap: remove line breaks intelligently (collapse single \n, keep paragraph gaps if desired).
 */
export default function WrapUnwrapLines() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('wrap');           // 'wrap' | 'unwrap'
  const [width, setWidth] = useState(80);             // wrap column
  const [wordAware, setWordAware] = useState(true);   // wrap at word boundaries
  const [keepParas, setKeepParas] = useState(true);   // unwrap: keep blank-line paragraphs

  // ---- processing -----------------------------------------------------------
  const output = useMemo(() => {
    if (!text) return '';

    if (mode === 'unwrap') {
      // Keep paragraph breaks (two+ newlines) but remove single line-breaks.
      if (keepParas) {
        return text
          .split(/\n{2,}/)                // split paragraphs
          .map(p =>
            p.replace(/\n+/g, ' ')        // collapse inner single breaks
             .replace(/\s{2,}/g, ' ')     // normalize spaces
             .trim()
          )
          .join('\n\n');
      }
      // Unwrap everything to one line
      return text.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
    }

    // WRAP
    const wrapLine = (line) => {
      if (!line) return '';
      const out = [];

      if (wordAware) {
        // Greedy word-aware wrap
        let current = '';
        line.split(/\s+/).forEach((word, i) => {
          const candidate = current ? current + ' ' + word : word;
          if (candidate.length <= width) {
            current = candidate;
          } else {
            if (current) out.push(current);
            // If a single word is longer than width, hard-split it.
            if (word.length > width) {
              for (let i = 0; i < word.length; i += width) {
                out.push(word.slice(i, i + width));
              }
              current = '';
            } else {
              current = word;
            }
          }
        });
        if (current) out.push(current);
      } else {
        // Strict character wrap
        for (let i = 0; i < line.length; i += width) {
          out.push(line.slice(i, i + width));
        }
      }
      return out.join('\n');
    };

    // Preserve paragraph breaks when wrapping
    return text
      .split(/\n{2,}/)
      .map(p =>
        p.split('\n').map(wrapLine).join('\n')
      )
      .join('\n\n');
  }, [text, mode, width, wordAware, keepParas]);

  // ---- helpers --------------------------------------------------------------
  const copy = async () => {
    try { await navigator.clipboard.writeText(output); } catch {}
  };
  const download = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: url,
      download: `${mode === 'wrap' ? 'wrapped' : 'unwrapped'}-text.txt`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  const clear = () => setText('');

  // ---- UI -------------------------------------------------------------------
  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="wu-mode"
                value="wrap"
                checked={mode === 'wrap'}
                onChange={() => setMode('wrap')}
              />
              <span>Wrap</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="wu-mode"
                value="unwrap"
                checked={mode === 'unwrap'}
                onChange={() => setMode('unwrap')}
              />
              <span>Unwrap</span>
            </label>
          </div>

          {mode === 'wrap' ? (
            <>
              <label className="flex items-center gap-2">
                <span className="text-sm">Width</span>
                <input
                  type="number"
                  min={10}
                  max={400}
                  value={width}
                  onChange={(e) => setWidth(Math.max(10, Math.min(400, Number(e.target.value) || 0)))}
                  className="w-20 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1"
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={wordAware}
                  onChange={(e) => setWordAware(e.target.checked)}
                />
                <span className="text-sm">Wrap at word boundaries</span>
              </label>
            </>
          ) : (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={keepParas}
                onChange={(e) => setKeepParas(e.target.checked)}
              />
              <span className="text-sm">Keep paragraph breaks</span>
            </label>
          )}
        </div>
      </div>

      {/* IO panes */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          rows={12}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent p-3 font-mono text-sm"
        />
        <textarea
          value={output}
          readOnly
          placeholder="Output"
          rows={12}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent p-3 font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
          Copy
        </button>
        <button onClick={download} className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700">
          Download
        </button>
        <button onClick={clear} className="rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
          Clear
        </button>
      </div>
    </div>
  );
}
