/* Registry for 20 working tools with SEO + Long descriptions */
import dynamic from 'next/dynamic';
import {
  ListOrdered,
  Filter,
  CaseUpper,
  CaseLower,
  Type,
  Link,
  Sigma,
  Braces,
  TextQuote,
  Wand2
} from 'lucide-react';

/* ----------------- Helpers ----------------- */
const defaultFaqs = (name) => ([
  { q: `Is ${name} free?`, a: `${name} runs entirely in your browser and is free to use.` },
  { q: `Do you store my text?`, a: "No. We never upload or store your text." }
]);

const R = ({
  slug, name, description, component, tags = [], Icon = Wand2,
  seoTitle, seoDescription, Long, faqs
}) => ({
  slug, name, description, tags, Icon,
  component,
  seoTitle, seoDescription,
  Long,
  faqs: faqs && faqs.length ? faqs : defaultFaqs(name),
});

/* ----------------- Long description components ----------------- */
function Long_RemoveDuplicateLines(){
  return (
    <>
      <h2>About Remove Duplicate Lines</h2>
      <p>Quickly deduplicate lines while keeping your formatting intact. Works fully in your browser—no uploads.</p>
      <h3>Key features</h3>
      <ul>
        <li><strong>Keep first or last</strong> duplicate</li>
        <li>Case sensitivity toggle</li>
        <li>Instant results for large texts</li>
      </ul>
      <h3>How to use</h3>
      <ol><li>Paste text</li><li>Choose first/last + case option</li><li>Copy or download result</li></ol>
      <h3>Common uses</h3>
      <ul><li>Clean email/URL lists</li><li>Process logs</li><li>Prep CSV-like data</li></ul>
    </>
  );
}
function Long_RemoveEmptyLines(){
  return (
    <>
      <h2>About Remove Empty Lines</h2>
      <p>Delete blank or whitespace-only lines to make your text compact and easier to scan.</p>
      <h3>How it helps</h3>
      <ul><li>Normalize pasted content</li><li>Pre-process before sorting or deduping</li></ul>
      <h3>Steps</h3>
      <ol><li>Paste text</li><li>Click remove</li><li>Copy or download</li></ol>
    </>
  );
}
function Long_SortLines(){
  return (
    <>
      <h2>About Sort Lines</h2>
      <p>Sort lines alphabetically with optional case sensitivity and Z→A reverse.</p>
      <h3>Tips</h3>
      <ul><li>Sort then dedupe for tidy lists</li><li>Use case-insensitive for mixed case data</li></ul>
    </>
  );
}
function Long_AddLineNumbers(){
  return (
    <>
      <h2>About Add Line Numbers</h2>
      <p>Prefix each line with a padded number—great for code reviews, transcripts, and lists.</p>
      <h3>Usage</h3>
      <ol><li>Paste text</li><li>Choose padding</li><li>Copy/download</li></ol>
    </>
  );
}
function Long_Uppercase(){
  return (<><h2>About Uppercase</h2><p>Convert text to UPPERCASE for headings, labels, or emphasis. Unicode-aware.</p></>);
}
function Long_Lowercase(){
  return (<><h2>About Lowercase</h2><p>Convert text to lowercase for normalization and comparisons. Works on large inputs.</p></>);
}
function Long_TitleCase(){
  return (
    <>
      <h2>About Title Case</h2>
      <p>Smart title casing that avoids capitalizing small words mid-title (like “and”, “of”).</p>
      <h3>Use cases</h3>
      <ul><li>Article/book titles</li><li>Headings</li></ul>
    </>
  );
}
function Long_SentenceCase(){
  return (
    <>
      <h2>About Sentence Case</h2>
      <p>Capitalize the first letter of each sentence while keeping other text lowercased.</p>
      <h3>Good for</h3>
      <ul><li>Docs clean-up</li><li>Chat exports</li></ul>
    </>
  );
}
function Long_Slugify(){
  return (
    <>
      <h2>About Slugify</h2>
      <p>Create clean, URL-friendly slugs by removing accents and symbols, then lowercasing.</p>
      <h3>Examples</h3>
      <ul><li>“Café del Mar 2025” → <code>cafe-del-mar-2025</code></li></ul>
    </>
  );
}
function Long_RemovePunctuation(){
  return (
    <>
      <h2>About Remove Punctuation</h2>
      <p>Strip punctuation and symbols while keeping letters, digits, and spaces intact.</p>
      <h3>When to use</h3>
      <ul><li>Tokenization pre-processing</li><li>Clean noisy text</li></ul>
    </>
  );
}
function Long_RemoveNumbers(){
  return (
    <>
      <h2>About Remove Numbers</h2>
      <p>Delete digits from text, with an option to also remove numbers inside words.</p>
      <h3>Use cases</h3>
      <ul><li>Remove timestamps, IDs</li><li>Prep for textual analysis</li></ul>
    </>
  );
}
function Long_LineCounter(){
  return (
    <>
      <h2>About Line Counter</h2>
      <p>Count total and non-empty lines to understand text structure at a glance.</p>
      <h3>Tip</h3>
      <ul><li>Use before/after clean-ups to verify changes</li></ul>
    </>
  );
}
function Long_WordFrequency(){
  return (
    <>
      <h2>About Word Frequency</h2>
      <p>List words by frequency with an optional stopword filter. Great for quick keyword checks.</p>
      <h3>Workflow</h3>
      <ol><li>Paste text</li><li>Toggle stopwords</li><li>Export list</li></ol>
    </>
  );
}
function Long_UrlEncodeDecode(){
  return (
    <>
      <h2>About URL Encode/Decode</h2>
      <p>Safely percent-encode or decode query strings and parameters for web use.</p>
      <h3>Examples</h3>
      <ul><li><code>hello world</code> → <code>hello%20world</code></li></ul>
    </>
  );
}
function Long_Base64(){
  return (
    <>
      <h2>About Base64 Encode/Decode</h2>
      <p>Convert text to/from Base64 with full Unicode support (emoji, accents, etc.).</p>
      <h3>Note</h3>
      <ul><li>For binary files, use a dedicated file encoder (future tool)</li></ul>
    </>
  );
}
function Long_StripHtmlTags(){
  return (
    <>
      <h2>About Strip HTML Tags</h2>
      <p>Remove HTML tags from a snippet. Optionally convert links to “text (URL)”.</p>
      <h3>Great for</h3>
      <ul><li>Copying from CMS/editors</li><li>Turning HTML emails into plain text</li></ul>
    </>
  );
}
function Long_RemoveLineBreaks(){
  return (
    <>
      <h2>About Remove Line Breaks</h2>
      <p>Join lines with a custom separator (space, comma, etc.) to flatten paragraphs.</p>
      <h3>Tip</h3>
      <ul><li>Use a comma+space to build CSV-like strings quickly</li></ul>
    </>
  );
}
function Long_RemoveExtraSpaces(){
  return (
    <>
      <h2>About Remove Extra Spaces</h2>
      <p>Trim leading/trailing spaces and collapse multiple spaces into one.</p>
      <h3>When to use</h3>
      <ul><li>Normalize text before comparisons</li><li>Clean pasted content</li></ul>
    </>
  );
}

/* NEW long descriptions */
function Long_WrapUnwrapLines(){
  return (
    <>
      <h2>About Wrap / Unwrap Lines</h2>
      <p>Hard-wrap text to a column width or unwrap line breaks. Keep paragraph gaps, wrap at words, or use strict character wrapping—all in your browser.</p>
      <h3>Common uses</h3>
      <ul>
        <li>Reflow prose for code reviews and diffs</li>
        <li>Fix broken line-breaks from PDFs</li>
        <li>Prepare text to match style guides</li>
      </ul>
      <h3>How to use</h3>
      <ol><li>Paste text</li><li>Choose Wrap or Unwrap</li><li>Adjust width / options</li><li>Copy or Download</li></ol>
    </>
  );
}
function Long_WordCharSentenceParagraphCounter(){
  return (
    <>
      <h2>About Word / Char / Sentence / Paragraph Counter</h2>
      <p>Live statistics for your text with Unicode-aware word counting and a quick reading-time estimate.</p>
      <h3>Shows</h3>
      <ul>
        <li>Words, characters (with/without spaces)</li>
        <li>Sentences and paragraphs</li>
        <li>Average word length and reading time</li>
      </ul>
    </>
  );
}

/* ----------------- Registry (20 tools) ----------------- */
const registry = [
  // 6 originals
  R({
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    description: 'Dedupe lines (keep first/last, case sensitivity).',
    component: dynamic(() => import('../components/tools/remove-duplicate-lines.jsx')),
    tags: ['clean','lines','dedupe'],
    Icon: ListOrdered,
    seoTitle: 'Remove Duplicate Lines — Fast, Free, Privacy-First',
    seoDescription: 'Instantly remove duplicate lines. Keep first or last, with case sensitivity. 100% browser-based.',
    Long: Long_RemoveDuplicateLines,
    faqs: [
      { q: 'Is the Remove Duplicate Lines tool free?', a: 'Yes, it is completely free and runs in your browser.' },
      { q: 'Does it upload my text?', a: 'No. Processing happens locally and nothing is stored.' },
    ],
  }),
  R({
    slug: 'remove-empty-lines',
    name: 'Remove Empty Lines',
    description: 'Delete blank/whitespace-only lines.',
    component: dynamic(() => import('../components/tools/remove-empty-lines.jsx')),
    tags: ['clean','lines'],
    Icon: Filter,
    seoTitle: 'Remove Empty Lines — Clean Blank Lines Online',
    seoDescription: 'Delete blank or whitespace-only lines instantly. Free, private, and in-browser.',
    Long: Long_RemoveEmptyLines,
    faqs: [
      { q: 'Does it remove whitespace-only lines?', a: 'Yes, lines with only spaces or tabs are removed.' },
      { q: 'Is my text uploaded?', a: 'No, everything runs in your browser.' },
    ],
  }),
  R({
    slug: 'sort-lines',
    name: 'Sort Lines',
    description: 'Sort lines A→Z / Z→A; case sensitivity toggle.',
    component: dynamic(() => import('../components/tools/sort-lines.jsx')),
    tags: ['lines','sort'],
    Icon: ListOrdered,
    seoTitle: 'Sort Lines — A→Z / Z→A, Case-Sensitive',
    seoDescription: 'Sort lines alphabetically with optional case sensitivity and reverse order.',
    Long: Long_SortLines,
    faqs: [
      { q: 'Can I sort Z→A?', a: 'Yes, enable reverse/descending.' },
      { q: 'What about numeric parts?', a: 'Sorting uses localeCompare with numeric awareness for natural order.' },
    ],
  }),
  R({
    slug: 'add-line-numbers',
    name: 'Add Line Numbers',
    description: 'Prefix lines with padded numbering.',
    component: dynamic(() => import('../components/tools/add-line-numbers.jsx')),
    tags: ['lines','format'],
    Icon: ListOrdered,
    seoTitle: 'Add Line Numbers — Number Each Line',
    seoDescription: 'Prefix lines with padded numbering for code, lists, and transcripts.',
    Long: Long_AddLineNumbers,
    faqs: [
      { q: 'Can I change padding?', a: 'Yes, choose the digit width you need.' },
      { q: 'Does formatting change my text?', a: 'Only a numeric prefix is added to each line.' },
    ],
  }),
  R({
    slug: 'uppercase',
    name: 'Uppercase',
    description: 'Convert text to UPPERCASE.',
    component: dynamic(() => import('../components/tools/uppercase.jsx')),
    tags: ['case'],
    Icon: CaseUpper,
    seoTitle: 'Uppercase Converter — UPPERCASE Text',
    seoDescription: 'Convert any text to uppercase instantly. Free, private, in-browser.',
    Long: Long_Uppercase,
  }),
  R({
    slug: 'lowercase',
    name: 'Lowercase',
    description: 'Convert text to lowercase.',
    component: dynamic(() => import('../components/tools/lowercase.jsx')),
    tags: ['case'],
    Icon: CaseLower,
    seoTitle: 'Lowercase Converter — lowercase text',
    seoDescription: 'Convert any text to lowercase instantly. Free, private, in-browser.',
    Long: Long_Lowercase,
  }),

  // Batch A (12)
  R({
    slug: 'title-case',
    name: 'Title Case',
    description: 'Smart title casing with small-word handling.',
    component: dynamic(() => import('../components/tools/title-case.jsx')),
    tags: ['case'],
    Icon: Type,
    seoTitle: 'Title Case Converter — Smart Title Casing',
    seoDescription: 'Convert text to title case while skipping small words in the middle.',
    Long: Long_TitleCase,
  }),
  R({
    slug: 'sentence-case',
    name: 'Sentence Case',
    description: 'Capitalize the first letter of sentences.',
    component: dynamic(() => import('../components/tools/sentence-case.jsx')),
    tags: ['case'],
    Icon: Type,
    seoTitle: 'Sentence Case Converter — Capitalize Sentences',
    seoDescription: 'Capitalize the first letter of sentences. Great for cleaning pasted text.',
    Long: Long_SentenceCase,
  }),
  R({
    slug: 'slugify',
    name: 'Slugify',
    description: 'Create clean URL slugs from text.',
    component: dynamic(() => import('../components/tools/slugify.jsx')),
    tags: ['case','slug'],
    Icon: Link,
    seoTitle: 'Slugify — Clean URL Slug Generator',
    seoDescription: 'Turn titles into clean, URL-friendly slugs. Removes accents and symbols.',
    Long: Long_Slugify,
  }),
  R({
    slug: 'remove-punctuation',
    name: 'Remove Punctuation',
    description: 'Strip punctuation and symbols safely.',
    component: dynamic(() => import('../components/tools/remove-punctuation.jsx')),
    tags: ['clean'],
    Icon: TextQuote,
    seoTitle: 'Remove Punctuation — Strip Symbols',
    seoDescription: 'Remove punctuation and symbols from text instantly. Free and private.',
    Long: Long_RemovePunctuation,
  }),
  R({
    slug: 'remove-numbers',
    name: 'Remove Numbers',
    description: 'Delete digits (option to keep digits inside words).',
    component: dynamic(() => import('../components/tools/remove-numbers.jsx')),
    tags: ['clean'],
    Icon: Filter,
    seoTitle: 'Remove Numbers — Delete Digits from Text',
    seoDescription: 'Strip digits from text with an option to remove numbers inside words.',
    Long: Long_RemoveNumbers,
  }),
  R({
    slug: 'line-counter',
    name: 'Line Counter',
    description: 'Count total and non-empty lines.',
    component: dynamic(() => import('../components/tools/line-counter.jsx')),
    tags: ['count','lines'],
    Icon: Sigma,
    seoTitle: 'Line Counter — Count Lines Online',
    seoDescription: 'Count total and non-empty lines. Perfect for logs and lists.',
    Long: Long_LineCounter,
  }),
  R({
    slug: 'word-frequency',
    name: 'Word Frequency',
    description: 'List words by frequency; stopwords toggle.',
    component: dynamic(() => import('../components/tools/word-frequency.jsx')),
    tags: ['count','analyze'],
    Icon: Sigma,
    seoTitle: 'Word Frequency Counter — Top Words',
    seoDescription: 'See most frequent words with optional stopword removal.',
    Long: Long_WordFrequency,
  }),
  R({
    slug: 'url-encode-decode',
    name: 'URL Encode/Decode',
    description: 'Encode or decode URL strings safely.',
    component: dynamic(() => import('../components/tools/url-encode-decode.jsx')),
    tags: ['encode'],
    Icon: Link,
    seoTitle: 'URL Encode / Decode — Online',
    seoDescription: 'Percent-encode or decode URLs and query strings safely in your browser.',
    Long: Long_UrlEncodeDecode,
  }),
  R({
    slug: 'base64-encode-decode',
    name: 'Base64 Encode/Decode',
    description: 'Convert to/from Base64 (Unicode-safe).',
    component: dynamic(() => import('../components/tools/base64-encode-decode.jsx')),
    tags: ['encode'],
    Icon: Braces,
    seoTitle: 'Base64 Encode / Decode — Unicode Safe',
    seoDescription: 'Convert text to/from Base64 with Unicode support. Private and offline.',
    Long: Long_Base64,
  }),
  R({
    slug: 'strip-html-tags',
    name: 'Strip HTML Tags',
    description: 'Remove HTML tags; optional link conversion.',
    component: dynamic(() => import('../components/tools/strip-html-tags.jsx')),
    tags: ['clean','html'],
    Icon: Braces,
    seoTitle: 'Strip HTML Tags — HTML to Plain Text',
    seoDescription: 'Remove HTML tags and optionally convert links to “text (URL)”.',
    Long: Long_StripHtmlTags,
  }),
  R({
    slug: 'remove-line-breaks',
    name: 'Remove Line Breaks',
    description: 'Join lines with a custom separator.',
    component: dynamic(() => import('../components/tools/remove-line-breaks.jsx')),
    tags: ['clean','lines'],
    Icon: Filter,
    seoTitle: 'Remove Line Breaks — Join Lines',
    seoDescription: 'Flatten text by joining lines with your own separator.',
    Long: Long_RemoveLineBreaks,
  }),
  R({
    slug: 'remove-extra-spaces',
    name: 'Remove Extra Spaces',
    description: 'Trim and collapse extra whitespace.',
    component: dynamic(() => import('../components/tools/remove-extra-spaces.jsx')),
    tags: ['clean','spaces'],
    Icon: Filter,
    seoTitle: 'Remove Extra Spaces — Trim & Collapse',
    seoDescription: 'Trim edges and collapse multiple spaces into one. Clean, consistent text.',
    Long: Long_RemoveExtraSpaces,
  }),

  // NEW (2)
  R({
    slug: 'wrap-unwrap-lines',
    name: 'Wrap / Unwrap Lines',
    description: 'Wrap text to a width or unwrap line breaks. Keep paragraph gaps.',
    component: dynamic(() => import('../components/tools/wrap-unwrap-lines.jsx')),
    tags: ['lines','format','wrap','unwrap'],
    Icon: ListOrdered,
    seoTitle: 'Wrap / Unwrap Lines — Reflow or Flatten Text',
    seoDescription: 'Hard-wrap text to a column width or unwrap line breaks. Word-aware wrapping, paragraph preservation, and strict character wrap.',
    Long: Long_WrapUnwrapLines,
  }),
  R({
    slug: 'word-char-sentence-paragraph-counter',
    name: 'Word / Char / Sentence / Paragraph Counter',
    description: 'Live counts with reading time and averages.',
    component: dynamic(() => import('../components/tools/word-char-sentence-paragraph-counter.jsx')),
    tags: ['count','analyze','stats'],
    Icon: Sigma,
    seoTitle: 'Word, Character, Sentence & Paragraph Counter — Live Stats',
    seoDescription: 'Count words, characters, sentences, and paragraphs with average word length and reading time. Unicode-aware and private.',
    Long: Long_WordCharSentenceParagraphCounter,
  }),
];

/* ----------------- Exports ----------------- */
export function getAllTools(){ return registry; }
export function getToolBySlug(slug){ return registry.find(t=>t.slug===slug); }
export function getRelatedTools(slug){
  const me = getToolBySlug(slug); if (!me) return [];
  const score = t => (t.slug===slug? -1 : t.tags.filter(x=>me.tags.includes(x)).length);
  return [...registry].sort((a,b)=>score(b)-score(a)).filter(t=>t.slug!==slug);
}
export default registry;
