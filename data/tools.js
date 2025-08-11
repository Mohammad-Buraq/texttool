/* Registry for 50 working tools with SEO + Long descriptions + Consistent FAQs */
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

const addFaqs = (name, extras = []) => ([
  ...defaultFaqs(name),
  ...extras
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

/* ----------------- Long description components (existing 20) ----------------- */
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
function Long_Uppercase(){ return (<><h2>About Uppercase</h2><p>Convert text to UPPERCASE for headings, labels, or emphasis. Unicode-aware.</p></>); }
function Long_Lowercase(){ return (<><h2>About Lowercase</h2><p>Convert text to lowercase for normalization and comparisons. Works on large inputs.</p></>); }
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

/* ----------------- Long description components (new 30) ----------------- */
function Long_ReverseText(){ return (<><h2>About Reverse Text</h2><p>Reverse the entire string character-by-character. Useful for quick checks, palindromes, and playful effects.</p></>); }
function Long_ReverseLines(){ return (<><h2>About Reverse Lines</h2><p>Flip the order of lines without touching line contents. Handy for logs and lists.</p></>); }
function Long_ShuffleLines(){ return (<><h2>About Shuffle Lines</h2><p>Randomize line order using a Fisher–Yates shuffle for unbiased results.</p></>); }
function Long_RandomLinePicker(){ return (<><h2>About Random Line Picker</h2><p>Pick one or more random lines from your list without repetition.</p></>); }
function Long_DedentText(){ return (<><h2>About Dedent Text</h2><p>Remove the smallest common indentation across all lines—great for pasted code.</p></>); }
function Long_IndentText(){ return (<><h2>About Indent Text</h2><p>Add tabs or spaces to the start of each line to match style or improve readability.</p></>); }
function Long_PrefixLines(){ return (<><h2>About Prefix Lines</h2><p>Prepend a custom string to each line—add quotes, bullets, or Markdown syntax in bulk.</p></>); }
function Long_SuffixLines(){ return (<><h2>About Suffix Lines</h2><p>Append a custom string to every line—useful for quickly adding punctuation or markers.</p></>); }
function Long_TrimWhitespace(){ return (<><h2>About Trim Whitespace</h2><p>Strip leading and trailing whitespace from the entire text.</p></>); }
function Long_TrimEachLine(){ return (<><h2>About Trim Each Line</h2><p>Trim spaces from the start and end of every line—clean ragged pastes.</p></>); }
function Long_RemoveDuplicateWords(){ return (<><h2>About Remove Duplicate Words</h2><p>Remove repeated words while keeping the first occurrence.</p></>); }
function Long_UniqueWords(){ return (<><h2>About Unique Words</h2><p>Extract, lowercase, and sort unique words to see your vocabulary at a glance.</p></>); }
function Long_SortUniqueLines(){ return (<><h2>About Sort Unique Lines</h2><p>Combine “dedupe lines” and “sort lines” in one step.</p></>); }
function Long_SortWords(){ return (<><h2>About Sort Words</h2><p>Alphabetize all detected words for quick comparison or lexicon prep.</p></>); }
function Long_ExtractUrls(){ return (<><h2>About Extract URLs</h2><p>Find and deduplicate HTTP/HTTPS links from any snippet for quick auditing.</p></>); }
function Long_ExtractEmails(){ return (<><h2>About Extract Emails</h2><p>Extract and deduplicate email addresses with a pragmatic pattern.</p></>); }
function Long_ExtractNumbers(){ return (<><h2>About Extract Numbers</h2><p>Pull out integers, decimals, and negatives—perfect for scraping numeric data.</p></>); }
function Long_ExtractHashtags(){ return (<><h2>About Extract Hashtags</h2><p>Collect unique hashtags (Unicode-aware) from social posts or notes.</p></>); }
function Long_FindAndReplace(){ return (<><h2>About Find &amp; Replace</h2><p>Search for a substring and replace it—optionally case-insensitive and replace-all.</p></>); }
function Long_RegexReplace(){ return (<><h2>About Regex Replace</h2><p>Run a JavaScript regular expression search/replace—powerful batch text edits.</p></>); }
function Long_Rot13(){ return (<><h2>About ROT13</h2><p>Apply the classic ROT13 substitution cipher for quick obfuscation.</p></>); }
function Long_CaesarCipher(){ return (<><h2>About Caesar Cipher</h2><p>Shift letters by a configurable amount (N). Educational and handy for puzzles.</p></>); }
function Long_MorseCodeEncodeDecode(){ return (<><h2>About Morse Code</h2><p>Convert text to Morse and back for basic Latin letters and digits.</p></>); }
function Long_CsvToJson(){ return (<><h2>About CSV → JSON</h2><p>Turn simple CSV (no quoted commas) into a JSON array for quick prototyping.</p></>); }
function Long_JsonToCsv(){ return (<><h2>About JSON → CSV</h2><p>Flatten a JSON array of objects into a CSV table with headers.</p></>); }
function Long_MarkdownToHtml(){ return (<><h2>About Markdown → HTML</h2><p>Convert basic Markdown features into HTML without a server roundtrip.</p></>); }
function Long_HtmlToMarkdown(){ return (<><h2>About HTML → Markdown</h2><p>Simplify HTML into Markdown equivalents for portability.</p></>); }
function Long_RemoveDuplicateParagraphs(){ return (<><h2>About Remove Duplicate Paragraphs</h2><p>Dedupe repeated paragraphs while preserving spacing between blocks.</p></>); }
function Long_InvertCase(){ return (<><h2>About Invert Case</h2><p>Swap UPPER↔lower case for each letter—great for stylistic toggles.</p></>); }
function Long_ChunkText(){ return (<><h2>About Chunk Text</h2><p>Split long text into fixed-size chunks for uploads, SMS, or batching.</p></>); }

/* ----------------- Registry (50 tools) ----------------- */
const registry = [
  /* ---------- Original 20 with consistent FAQs ---------- */
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
    faqs: addFaqs('Remove Duplicate Lines', [
      { q: 'Does order change when deduping?', a: 'You can choose to keep the first or last occurrence. The rest are removed while preserving the chosen item’s position.' },
      { q: 'How big can my input be?', a: 'It runs in your browser; practical limits depend on your device and memory (multi-MB is usually fine).' },
    ]),
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
    faqs: addFaqs('Remove Empty Lines', [
      { q: 'Does it remove whitespace-only lines?', a: 'Yes. Lines with only spaces or tabs are removed.' },
      { q: 'Will it affect non-breaking spaces?', a: 'Only standard whitespace is targeted; unusual spacing characters are preserved unless trimmed by the browser.' },
    ]),
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
    faqs: addFaqs('Sort Lines', [
      { q: 'Is sorting stable?', a: 'Yes—equal items keep their relative order. Use case-insensitive mode for mixed-case data.' },
      { q: 'Does it do natural sort?', a: 'Sorting uses localeCompare; numbers within strings sort lexically, not numerically.' },
    ]),
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
    faqs: addFaqs('Add Line Numbers', [
      { q: 'Can I change padding?', a: 'Yes—choose zero-padding width, start number, and separator.' },
      { q: 'Will it renumber empty lines?', a: 'Yes; numbering is applied line-by-line as-is.' },
    ]),
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
    faqs: addFaqs('Uppercase', [
      { q: 'Is it Unicode-aware?', a: 'Yes—works with most scripts supported by the browser.' },
      { q: 'Does it change spacing or punctuation?', a: 'No—only letter case changes.' },
    ]),
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
    faqs: addFaqs('Lowercase', [
      { q: 'Is it Unicode-aware?', a: 'Yes—works with most scripts supported by the browser.' },
      { q: 'Does it alter numbers or symbols?', a: 'No—only letters are affected.' },
    ]),
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
    faqs: addFaqs('Title Case', [
      { q: 'Which small words are skipped?', a: 'Common short words like “and”, “of”, “the” in mid-title. First/last words are capitalized.' },
      { q: 'Locale support?', a: 'General English conventions; results for other languages may vary.' },
    ]),
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
    faqs: addFaqs('Sentence Case', [
      { q: 'How are sentences detected?', a: 'Basic punctuation heuristics (.?!). Complex edge-cases may need manual tweaks.' },
      { q: 'Acronyms and proper nouns?', a: 'They remain as typed unless the first letter is changed by sentence start.' },
    ]),
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
    faqs: addFaqs('Slugify', [
      { q: 'Does it remove accents?', a: 'Yes—accents and diacritics are stripped when possible.' },
      { q: 'Spaces and punctuation?', a: 'Spaces become dashes; many symbols are removed.' },
    ]),
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
    faqs: addFaqs('Remove Punctuation', [
      { q: 'Will numbers and letters remain?', a: 'Yes—letters, digits, and spaces are preserved.' },
      { q: 'What about emojis?', a: 'Emojis are symbols and may be removed.' },
    ]),
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
    faqs: addFaqs('Remove Numbers', [
      { q: 'Does it remove decimals and negatives?', a: 'Yes—digits in any position are removed when enabled.' },
      { q: 'Affects IDs and timestamps?', a: 'Yes—use with care if you need those preserved.' },
    ]),
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
    faqs: addFaqs('Line Counter', [
      { q: 'What is a non-empty line?', a: 'Any line with at least one non-whitespace character.' },
      { q: 'Different newline styles?', a: 'Handles LF and CRLF automatically.' },
    ]),
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
    faqs: addFaqs('Word Frequency', [
      { q: 'Are words normalized?', a: 'Yes—lowercased; punctuation stripped. You can toggle stopwords.' },
      { q: 'Can I export the list?', a: 'Yes—copy to clipboard or download the output.' },
    ]),
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
    faqs: addFaqs('URL Encode/Decode', [
      { q: 'Spaces use + or %20?', a: 'We use standard percent-encoding (%20). Some forms also accept + for spaces.' },
      { q: 'Will it double-encode?', a: 'No—it decodes before encoding when needed to avoid double-encoding.' },
    ]),
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
    faqs: addFaqs('Base64 Encode/Decode', [
      { q: 'Is this for binary files?', a: 'This tool targets text. For binary files, use a file-specific encoder/decoder.' },
      { q: 'URL-safe Base64?', a: 'Not by default; you can replace +/ with -_ if needed.' },
    ]),
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
    faqs: addFaqs('Strip HTML Tags', [
      { q: 'Does it keep link text?', a: 'Yes—optionally include the URL in parentheses.' },
      { q: 'Removes scripts/styles?', a: 'Yes—tags are stripped; this is a simple sanitizer, not a full HTML parser.' },
    ]),
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
    faqs: addFaqs('Remove Line Breaks', [
      { q: 'Keep paragraph gaps?', a: 'You can configure how to treat blank-line gaps before joining.' },
      { q: 'CSV-friendly joining?', a: 'Use a comma+space as the separator for quick list building.' },
    ]),
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
    faqs: addFaqs('Remove Extra Spaces', [
      { q: 'Does it affect tabs/newlines?', a: 'No—this tool focuses on spaces unless configured otherwise.' },
      { q: 'Will it change punctuation spacing?', a: 'It collapses runs of spaces; punctuation remains as-is.' },
    ]),
  }),
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
    faqs: addFaqs('Wrap / Unwrap Lines', [
      { q: 'Does it wrap at words or characters?', a: 'You can choose word-aware wrapping or strict character width.' },
      { q: 'Paragraph handling?', a: 'Blank-line paragraph gaps are preserved when wrapping.' },
    ]),
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
    faqs: addFaqs('Word / Char / Sentence / Paragraph Counter', [
      { q: 'How accurate are sentence counts?', a: 'Heuristic based on punctuation; edge-cases (abbreviations) may vary.' },
      { q: 'Reading-time estimate?', a: 'Uses a common baseline of ~200 words per minute.' },
    ]),
  }),

  /* ---------- New tools (30) with consistent FAQs ---------- */
  R({
    slug: 'reverse-text', name: 'Reverse Text',
    description: 'Reverse the full text string.',
    component: dynamic(() => import('../components/tools/reverse-text.jsx')),
    tags: ['transform'], Icon: Wand2,
    seoTitle: 'Reverse Text — Online', seoDescription: 'Reverse any text string instantly in your browser.',
    Long: Long_ReverseText,
    faqs: addFaqs('Reverse Text', [
      { q: 'Does it handle emoji and accents?', a: 'It reverses code units; most characters work, but some complex graphemes may render differently.' },
      { q: 'Will it change spacing?', a: 'Only order is reversed; characters stay unchanged.' },
    ]),
  }),
  R({
    slug: 'reverse-lines', name: 'Reverse Lines',
    description: 'Reverse the order of lines.',
    component: dynamic(() => import('../components/tools/reverse-lines.jsx')),
    tags: ['lines','transform'], Icon: ListOrdered,
    seoTitle: 'Reverse Lines — Online', seoDescription: 'Reverse line order quickly, 100% browser-based.',
    Long: Long_ReverseLines,
    faqs: addFaqs('Reverse Lines', [
      { q: 'Does each line’s content change?', a: 'No—only the order of lines is reversed.' },
      { q: 'Handles large files?', a: 'Yes—memory-limited by your device/browser.' },
    ]),
  }),
  R({
    slug: 'shuffle-lines', name: 'Shuffle Lines',
    description: 'Randomize line order (Fisher–Yates).',
    component: dynamic(() => import('../components/tools/shuffle-lines.jsx')),
    tags: ['lines','randomize'], Icon: ListOrdered,
    seoTitle: 'Shuffle Lines — Randomize Order', seoDescription: 'Randomize the order of lines using Fisher–Yates shuffle.',
    Long: Long_ShuffleLines,
    faqs: addFaqs('Shuffle Lines', [
      { q: 'Is the shuffle unbiased?', a: 'Yes—Fisher–Yates produces a uniform random permutation.' },
      { q: 'Repeatability?', a: 'Not seeded; refresh to reshuffle.' },
    ]),
  }),
  R({
    slug: 'random-line-picker', name: 'Random Line Picker',
    description: 'Pick one or more random lines.',
    component: dynamic(() => import('../components/tools/random-line-picker.jsx')),
    tags: ['lines','randomize','pick'], Icon: Wand2,
    seoTitle: 'Random Line Picker — Choose Random Lines', seoDescription: 'Select random lines from a list without uploading your data.',
    Long: Long_RandomLinePicker,
    faqs: addFaqs('Random Line Picker', [
      { q: 'Does it pick duplicates?', a: 'No—picks are without replacement for the requested count.' },
      { q: 'Empty lines?', a: 'Blank lines are ignored when picking.' },
    ]),
  }),
  R({
    slug: 'dedent-text', name: 'Dedent Text',
    description: 'Remove common leading indentation.',
    component: dynamic(() => import('../components/tools/dedent-text.jsx')),
    tags: ['indent','format'], Icon: ListOrdered,
    seoTitle: 'Dedent Text — Remove Leading Indent', seoDescription: 'Strip shared indentation from code blocks or pasted text.',
    Long: Long_DedentText,
    faqs: addFaqs('Dedent Text', [
      { q: 'Tabs vs spaces?', a: 'Common indentation is detected by leading whitespace length; mixed indentation may behave differently.' },
      { q: 'Affects blank lines?', a: 'Blank lines are preserved but not counted for indent minimum.' },
    ]),
  }),
  R({
    slug: 'indent-text', name: 'Indent Text',
    description: 'Indent each line by spaces or tabs.',
    component: dynamic(() => import('../components/tools/indent-text.jsx')),
    tags: ['indent','format','lines'], Icon: ListOrdered,
    seoTitle: 'Indent Text — Tabs or Spaces', seoDescription: 'Indent lines by a chosen width using spaces or tabs.',
    Long: Long_IndentText,
    faqs: addFaqs('Indent Text', [
      { q: 'Can I choose tabs?', a: 'Yes—toggle tabs or spaces and set the width.' },
      { q: 'Number of lines affected?', a: 'Every line in the input is indented equally.' },
    ]),
  }),
  R({
    slug: 'prefix-lines', name: 'Prefix Lines',
    description: 'Add a prefix to each line.',
    component: dynamic(() => import('../components/tools/prefix-lines.jsx')),
    tags: ['lines','format'], Icon: ListOrdered,
    seoTitle: 'Prefix Lines — Add Prefix', seoDescription: 'Quickly add a custom prefix to every line.',
    Long: Long_PrefixLines,
    faqs: addFaqs('Prefix Lines', [
      { q: 'Supports multi-character prefixes?', a: 'Yes—any string is allowed.' },
      { q: 'Affects blank lines?', a: 'Yes—prefix is added to blank lines too.' },
    ]),
  }),
  R({
    slug: 'suffix-lines', name: 'Suffix Lines',
    description: 'Add a suffix to each line.',
    component: dynamic(() => import('../components/tools/suffix-lines.jsx')),
    tags: ['lines','format'], Icon: ListOrdered,
    seoTitle: 'Suffix Lines — Add Suffix', seoDescription: 'Append a custom suffix to all lines in one click.',
    Long: Long_SuffixLines,
    faqs: addFaqs('Suffix Lines', [
      { q: 'Add punctuation to every line?', a: 'Yes—append any string (e.g., semicolons, commas).' },
      { q: 'Trailing spaces?', a: 'Your suffix is appended exactly as typed.' },
    ]),
  }),
  R({
    slug: 'trim-whitespace', name: 'Trim Whitespace',
    description: 'Trim leading/trailing whitespace.',
    component: dynamic(() => import('../components/tools/trim-whitespace.jsx')),
    tags: ['clean','spaces'], Icon: Filter,
    seoTitle: 'Trim Whitespace — Clean Text', seoDescription: 'Remove leading and trailing whitespace instantly.',
    Long: Long_TrimWhitespace,
    faqs: addFaqs('Trim Whitespace', [
      { q: 'Does it change internal spacing?', a: 'No—only trims the edges of the whole text.' },
      { q: 'CRLF vs LF?', a: 'Newlines are preserved as-is.' },
    ]),
  }),
  R({
    slug: 'trim-each-line', name: 'Trim Each Line',
    description: 'Trim spaces from every line.',
    component: dynamic(() => import('../components/tools/trim-each-line.jsx')),
    tags: ['clean','lines','spaces'], Icon: Filter,
    seoTitle: 'Trim Each Line — Remove Edge Spaces', seoDescription: 'Trim whitespace from the start and end of every line.',
    Long: Long_TrimEachLine,
    faqs: addFaqs('Trim Each Line', [
      { q: 'Does it collapse inner spaces?', a: 'No—only leading/trailing spaces on each line are trimmed.' },
      { q: 'Blank lines?', a: 'Blank lines remain blank.' },
    ]),
  }),
  R({
    slug: 'remove-duplicate-words', name: 'Remove Duplicate Words',
    description: 'Remove repeated words, keeping first occurrence.',
    component: dynamic(() => import('../components/tools/remove-duplicate-words.jsx')),
    tags: ['clean','words'], Icon: Filter,
    seoTitle: 'Remove Duplicate Words — Keep First', seoDescription: 'Delete duplicate words (case-insensitive) and keep the first.',
    Long: Long_RemoveDuplicateWords,
    faqs: addFaqs('Remove Duplicate Words', [
      { q: 'Case sensitivity?', a: 'By default case-insensitive; toggle in the tool if provided.' },
      { q: 'What counts as a word?', a: 'Letters/digits/underscore and common apostrophes/hyphens.' },
    ]),
  }),
  R({
    slug: 'unique-words', name: 'Unique Words',
    description: 'List unique words (lowercased, sorted).',
    component: dynamic(() => import('../components/tools/unique-words.jsx')),
    tags: ['analyze','words','count'], Icon: Sigma,
    seoTitle: 'Unique Words — Extract & Sort', seoDescription: 'Extract unique words, normalize case, and sort alphabetically.',
    Long: Long_UniqueWords,
    faqs: addFaqs('Unique Words', [
      { q: 'Are results sorted?', a: 'Yes—alphabetically after lowercasing.' },
      { q: 'Duplicates with punctuation?', a: 'Punctuation is stripped before comparison.' },
    ]),
  }),
  R({
    slug: 'sort-unique-lines', name: 'Sort Unique Lines',
    description: 'Unique + alphabetical sort in one step.',
    component: dynamic(() => import('../components/tools/sort-unique-lines.jsx')),
    tags: ['lines','sort','dedupe'], Icon: ListOrdered,
    seoTitle: 'Sort Unique Lines — Dedupe & Sort', seoDescription: 'Remove duplicate lines and sort the rest alphabetically.',
    Long: Long_SortUniqueLines,
    faqs: addFaqs('Sort Unique Lines', [
      { q: 'Stable after dedupe?', a: 'Duplicates are removed, then the remainder is sorted.' },
      { q: 'Reverse order?', a: 'Use the descending option (if available) to flip the result.' },
    ]),
  }),
  R({
    slug: 'sort-words', name: 'Sort Words',
    description: 'Sort words A→Z.',
    component: dynamic(() => import('../components/tools/sort-words.jsx')),
    tags: ['words','sort'], Icon: Type,
    seoTitle: 'Sort Words — Alphabetical', seoDescription: 'Sort all words in the text alphabetically (locale-aware).',
    Long: Long_SortWords,
    faqs: addFaqs('Sort Words', [
      { q: 'Locale aware?', a: 'Yes—uses the browser’s localeCompare.' },
      { q: 'Numbers inside words?', a: 'Sorting is lexical, not numeric.' },
    ]),
  }),
  R({
    slug: 'extract-urls', name: 'Extract URLs',
    description: 'Find and list all URLs.',
    component: dynamic(() => import('../components/tools/extract-urls.jsx')),
    tags: ['extract','urls'], Icon: Link,
    seoTitle: 'Extract URLs — Find Links', seoDescription: 'Extract and deduplicate all web links from your text.',
    Long: Long_ExtractUrls,
    faqs: addFaqs('Extract URLs', [
      { q: 'Which schemes are supported?', a: 'http and https.' },
      { q: 'Duplicates?', a: 'Results are deduplicated automatically.' },
    ]),
  }),
  R({
    slug: 'extract-emails', name: 'Extract Emails',
    description: 'Find and list email addresses.',
    component: dynamic(() => import('../components/tools/extract-emails.jsx')),
    tags: ['extract','emails'], Icon: Link,
    seoTitle: 'Extract Emails — Find Addresses', seoDescription: 'Extract and deduplicate email addresses from text.',
    Long: Long_ExtractEmails,
    faqs: addFaqs('Extract Emails', [
      { q: 'Validation strictness?', a: 'Uses a pragmatic pattern for typical emails; not a full RFC validator.' },
      { q: 'Duplicates?', a: 'Results are deduplicated automatically.' },
    ]),
  }),
  R({
    slug: 'extract-numbers', name: 'Extract Numbers',
    description: 'List all numbers (ints/floats).',
    component: dynamic(() => import('../components/tools/extract-numbers.jsx')),
    tags: ['extract','numbers'], Icon: Sigma,
    seoTitle: 'Extract Numbers — Integers & Floats', seoDescription: 'Pull out all numbers (including decimals and negatives).',
    Long: Long_ExtractNumbers,
    faqs: addFaqs('Extract Numbers', [
      { q: 'Thousands separators?', a: 'Not parsed; digits are extracted as sequences (e.g., 1,234 → 1 and 234).' },
      { q: 'Scientific notation?', a: 'Basic pattern; 1e5 may not be recognized as a single number.' },
    ]),
  }),
  R({
    slug: 'extract-hashtags', name: 'Extract Hashtags',
    description: 'List unique hashtags (Unicode-aware).',
    component: dynamic(() => import('../components/tools/extract-hashtags.jsx')),
    tags: ['extract','hashtags'], Icon: Type,
    seoTitle: 'Extract Hashtags — Unique List', seoDescription: 'Extract and dedupe hashtags, with Unicode support.',
    Long: Long_ExtractHashtags,
    faqs: addFaqs('Extract Hashtags', [
      { q: 'Unicode support?', a: 'Yes—letters/digits/underscore across many scripts.' },
      { q: 'Duplicates?', a: 'Results are deduplicated automatically.' },
    ]),
  }),
  R({
    slug: 'find-and-replace', name: 'Find & Replace',
    description: 'Simple find/replace with flags.',
    component: dynamic(() => import('../components/tools/find-and-replace.jsx')),
    tags: ['search','replace'], Icon: Wand2,
    seoTitle: 'Find and Replace — Text', seoDescription: 'Find and replace text (case-insensitive and replace-all options).',
    Long: Long_FindAndReplace,
    faqs: addFaqs('Find & Replace', [
      { q: 'Regex or plain text?', a: 'This uses plain-text search with optional flags. Use Regex Replace for patterns.' },
      { q: 'Replace all?', a: 'Yes—enable “replace all” to change every match.' },
    ]),
  }),
  R({
    slug: 'regex-replace', name: 'Regex Replace',
    description: 'Search/replace using a RegExp.',
    component: dynamic(() => import('../components/tools/regex-replace.jsx')),
    tags: ['regex','replace','advanced'], Icon: Braces,
    seoTitle: 'Regex Replace — Online', seoDescription: 'Use JavaScript regular expressions to transform text.',
    Long: Long_RegexReplace,
    faqs: addFaqs('Regex Replace', [
      { q: 'Which flags can I use?', a: 'Standard JS flags: g, i, m, s, u, y.' },
      { q: 'Backreferences?', a: 'Yes—use $1, $2, etc. in the replacement string.' },
    ]),
  }),
  R({
    slug: 'rot13', name: 'ROT13',
    description: 'ROT13 encoder/decoder.',
    component: dynamic(() => import('../components/tools/rot13.jsx')),
    tags: ['encode','cipher'], Icon: Braces,
    seoTitle: 'ROT13 — Encode/Decode', seoDescription: 'Apply ROT13 to any text instantly in your browser.',
    Long: Long_Rot13,
    faqs: addFaqs('ROT13', [
      { q: 'Is ROT13 secure?', a: 'No—ROT13 is for obfuscation, not cryptographic security.' },
      { q: 'Round-trippable?', a: 'Yes—applying ROT13 twice returns the original.' },
    ]),
  }),
  R({
    slug: 'caesar-cipher', name: 'Caesar Cipher',
    description: 'Shift letters by N (classic cipher).',
    component: dynamic(() => import('../components/tools/caesar-cipher.jsx')),
    tags: ['encode','cipher'], Icon: Braces,
    seoTitle: 'Caesar Cipher — Shift Text', seoDescription: 'Encode text with a configurable Caesar shift.',
    Long: Long_CaesarCipher,
    faqs: addFaqs('Caesar Cipher', [
      { q: 'Case sensitive?', a: 'Yes—uppercase and lowercase are handled separately.' },
      { q: 'Is it secure?', a: 'No—this is a simple substitution cipher for learning or puzzles.' },
    ]),
  }),
  R({
    slug: 'morse-code-encode-decode', name: 'Morse Code Encode/Decode',
    description: 'Convert text ↔ Morse code.',
    component: dynamic(() => import('../components/tools/morse-code-encode-decode.jsx')),
    tags: ['encode','morse'], Icon: Braces,
    seoTitle: 'Morse Code — Encode/Decode', seoDescription: 'Convert text to Morse and back (common Latin letters & digits).',
    Long: Long_MorseCodeEncodeDecode,
    faqs: addFaqs('Morse Code Encode/Decode', [
      { q: 'Supported characters?', a: 'Latin letters A–Z, digits 0–9, and space → /.' },
      { q: 'Word separators?', a: 'Spaces in text become / in Morse; slashes decode back to spaces.' },
    ]),
  }),
  R({
    slug: 'csv-to-json', name: 'CSV → JSON',
    description: 'Convert simple CSV to JSON array.',
    component: dynamic(() => import('../components/tools/csv-to-json.jsx')),
    tags: ['convert','csv','json'], Icon: Braces,
    seoTitle: 'CSV to JSON — Converter', seoDescription: 'Turn a simple CSV into a JSON array instantly.',
    Long: Long_CsvToJson,
    faqs: addFaqs('CSV → JSON', [
      { q: 'Quoted commas?', a: 'This simple converter does not support quoted fields with commas.' },
      { q: 'Header row required?', a: 'Yes—the first line is treated as headers.' },
    ]),
  }),
  R({
    slug: 'json-to-csv', name: 'JSON → CSV',
    description: 'Convert JSON array to CSV.',
    component: dynamic(() => import('../components/tools/json-to-csv.jsx')),
    tags: ['convert','json','csv'], Icon: Braces,
    seoTitle: 'JSON to CSV — Converter', seoDescription: 'Export a JSON array as CSV with header row.',
    Long: Long_JsonToCsv,
    faqs: addFaqs('JSON → CSV', [
      { q: 'Input format?', a: 'A JSON array of objects, e.g., [{"name":"Ada","age":33}].' },
      { q: 'Missing fields?', a: 'Missing keys are left blank in their CSV cells.' },
    ]),
  }),
  R({
    slug: 'markdown-to-html', name: 'Markdown → HTML',
    description: 'Lightweight Markdown to HTML.',
    component: dynamic(() => import('../components/tools/markdown-to-html.jsx')),
    tags: ['convert','markdown','html'], Icon: Braces,
    seoTitle: 'Markdown to HTML — Converter', seoDescription: 'Convert simple Markdown features to HTML.',
    Long: Long_MarkdownToHtml,
    faqs: addFaqs('Markdown → HTML', [
      { q: 'Which syntax is supported?', a: 'Headings, bold, italics, links, and basic paragraphs.' },
      { q: 'Full CommonMark?', a: 'This is a lightweight mapper, not a full spec implementation.' },
    ]),
  }),
  R({
    slug: 'html-to-markdown', name: 'HTML → Markdown',
    description: 'Simplify HTML into Markdown.',
    component: dynamic(() => import('../components/tools/html-to-markdown.jsx')),
    tags: ['convert','html','markdown'], Icon: Braces,
    seoTitle: 'HTML to Markdown — Converter', seoDescription: 'Convert basic HTML tags into Markdown equivalents.',
    Long: Long_HtmlToMarkdown,
    faqs: addFaqs('HTML → Markdown', [
      { q: 'Supported tags?', a: 'Common tags like h1–h3, strong/b, em/i, a, br, p, li.' },
      { q: 'Removes unknown tags?', a: 'Unrecognized tags are stripped.' },
    ]),
  }),
  R({
    slug: 'remove-duplicate-paragraphs', name: 'Remove Duplicate Paragraphs',
    description: 'Dedupe repeated paragraphs.',
    component: dynamic(() => import('../components/tools/remove-duplicate-paragraphs.jsx')),
    tags: ['clean','paragraphs','dedupe'], Icon: ListOrdered,
    seoTitle: 'Remove Duplicate Paragraphs — Dedupe Blocks', seoDescription: 'Remove repeated paragraphs while preserving spacing.',
    Long: Long_RemoveDuplicateParagraphs,
    faqs: addFaqs('Remove Duplicate Paragraphs', [
      { q: 'How are paragraphs detected?', a: 'Separated by one or more blank lines.' },
      { q: 'Whitespace-insensitive?', a: 'Whitespace at paragraph edges is trimmed before comparison.' },
    ]),
  }),
  R({
    slug: 'invert-case', name: 'Invert Case',
    description: 'Swap UPPER↔lower for each letter.',
    component: dynamic(() => import('../components/tools/invert-case.jsx')),
    tags: ['case','transform'], Icon: Type,
    seoTitle: 'Invert Case — Swap Upper/Lower', seoDescription: 'Flip the case of every letter in your text.',
    Long: Long_InvertCase,
    faqs: addFaqs('Invert Case', [
      { q: 'Affects non-letters?', a: 'No—only alphabetic characters change case.' },
      { q: 'Accented letters?', a: 'Most accented letters invert as supported by the browser.' },
    ]),
  }),
  R({
    slug: 'chunk-text', name: 'Chunk Text',
    description: 'Split text into fixed-size chunks.',
    component: dynamic(() => import('../components/tools/chunk-text.jsx')),
    tags: ['split','format'], Icon: ListOrdered,
    seoTitle: 'Chunk Text — Split by Length', seoDescription: 'Divide text into fixed-length chunks for easier handling.',
    Long: Long_ChunkText,
    faqs: addFaqs('Chunk Text', [
      { q: 'Word-safe splitting?', a: 'This version splits by character length; words may break at boundaries.' },
      { q: 'Custom separators?', a: 'Yes—choose the joiner inserted between chunks.' },
    ]),
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
