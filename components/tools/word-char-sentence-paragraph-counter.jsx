'use client';

import { useMemo, useState } from 'react';

/**
 * Word / Char / Sentence / Paragraph Counter
 * - Unicode-aware counting with sensible heuristics
 * - Live stats, optional reading-time estimate
 */
export default function WordCharSentenceParagraphCounter() {
  const [text, setText] = useState('');
  const [countEmojisAsWords, setCountEmojisAsWords] = useState(false);

  const stats = useMemo(() => {
    const t = text || '';

    // Words (tolerant of unicode letters/digits, splits on whitespace)
    // If counting emojis as words, treat standalone emoji clusters as tokens.
    const emojiRegex = /(\p{Extended_Pictographic}(?:\u200d\p{Extended_Pictographic})*)/u; // basic emoji cluster
    const tokens = t
      .trim()
      ? t
          .replace(countEmojisAsWords ? emojiRegex : /$/u, ' $1 ') // space out emojis if enabled
          .trim()
          .split(/\s+/)
      : [];

    const words = tokens.filter(Boolean).length;

    // Characters
    const charsWithSpaces = t.length;
    const charsNoSpaces = t.replace(/\s+/g, '').length;

    // Sentences: split on ., !, ? followed by space or EOL; ignore trailing empties
    const sentences = t.trim()
      ? t
          .split(/(?<=[.!?])\s+/)
          .filter(s => s.replace(/[\s.!?]+$/g, '').length > 0).length
      : 0;

    // Paragraphs: separated by blank lines
    const paragraphs = t.trim()
      ? t.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
      : 0;

    // Reading time @ ~200 wpm (seconds to nearest 5s)
    const minutes = words / 200;
    const readMin = Math.floor(minutes);
    const readSec = Math.round((minutes - readMin) * 60 / 5) * 5;

    // Avg word length
    const lettersOnly = tokens.join('').replace(/[^0-9A-Za-z\u00C0-\uFFFF]+/g, '');
    const avgWordLen = words ? (lettersOnly.length / words) : 0;

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readTime: `${readMin}m ${readSec}s`,
      avgWordLen: avgWordLen.toFixed(2),
    };
  }, [text, countEmojisAsWords]);

  const copy = async () => {
    try {
      const lines = [
        `Words: ${stats.words}`,
        `Characters (with spaces): ${stats.charsWithSpaces}`,
        `Characters (no spaces): ${stats.charsNoSpaces}`,
        `Sentences: ${stats.sentences}`,
        `Paragraphs: ${stats.paragraphs}`,
        `Avg word length: ${stats.avgWordLen}`,
        `Estimated reading time: ${stats.readTime}`,
      ].join('\n');
      await navigator.clipboard.writeText(lines);
    } catch {}
  };

  const clear = () => setText('');

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={countEmojisAsWords}
            onChange={(e) => setCountEmojisAsWords(e.target.checked)}
          />
        <span className="text-sm">Count standalone emojis as words</span>
        </label>
      </div>

      {/* Input / Output */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here…"
          rows={12}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent p-3 font-mono text-sm"
        />
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 text-sm">
          <ul className="space-y-2">
            <li><strong>Words:</strong> {stats.words}</li>
            <li><strong>Characters (with spaces):</strong> {stats.charsWithSpaces}</li>
            <li><strong>Characters (no spaces):</strong> {stats.charsNoSpaces}</li>
            <li><strong>Sentences:</strong> {stats.sentences}</li>
            <li><strong>Paragraphs:</strong> {stats.paragraphs}</li>
            <li><strong>Avg word length:</strong> {stats.avgWordLen}</li>
            <li><strong>Estimated reading time:</strong> {stats.readTime}</li>
          </ul>

          {/* How-to + tips (bullets & numbers, for on-page UX – the long SEO block lives in registry) */}
          <div className="mt-6">
            <h3 className="font-semibold">How to use</h3>
            <ol className="list-decimal list-inside space-y-1 mt-1">
              <li>Paste or type your text in the left box.</li>
              <li>Optionally enable emoji counting.</li>
              <li>Copy the stats or keep editing live.</li>
            </ol>
            <h3 className="font-semibold mt-4">Tips</h3>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Paragraphs are separated by an empty line.</li>
              <li>Sentences are split on “. ! ?” followed by a space or end of line.</li>
              <li>Reading time assumes ~200 words per minute.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
          Copy stats
        </button>
        <button onClick={clear} className="rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
          Clear
        </button>
      </div>
    </div>
  );
}
