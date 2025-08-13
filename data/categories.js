// data/categories.js
export const CATEGORIES = [
  { slug: 'line-tools', name: 'Line Tools', tags: ['lines','sort','filter','wrap'], description: 'Sorting, deduping, filtering, numbering, wrapping and more for line-based text.' },
  { slug: 'word-tools', name: 'Word Tools', tags: ['words','case','slug'], description: 'Word-level transforms such as case, filtering, sorting, and joining.' },
  { slug: 'character-tools', name: 'Character Tools', tags: ['chars','char','character','escape'], description: 'Character counters, Unicode helpers, escaping and encoding aids.' },
  { slug: 'cleaning-tools', name: 'Cleaning Tools', tags: ['clean','spaces','html'], description: 'Remove unwanted content, normalize spacing, sanitize pasted text.' },
  { slug: 'formatting-tools', name: 'Formatting Tools', tags: ['format','align','list','wrap'], description: 'Reformat, align, wrap, indent, and style text for clarity.' },
  { slug: 'encoding-and-decoding', name: 'Encoding & Decoding', tags: ['encode','decode','base64','url'], description: 'Offline encoding/decoding utilities: Base64, URL, entities, and more.' },
  { slug: 'conversion-tools', name: 'Conversion Tools', tags: ['convert','csv','json','html','markdown','xml','yaml'], description: 'Convert between CSV, JSON, Markdown, HTML, YAML, XML and more.' },
  { slug: 'extraction-tools', name: 'Extraction Tools', tags: ['extract','regex','data'], description: 'Pull emails, URLs, hashtags, numbers, and other patterns from text.' },
  { slug: 'counting-and-analysis', name: 'Counting & Analysis', tags: ['count','analyze','stats'], description: 'Word/char counts, frequencies, readability, distances and similarity.' },
  { slug: 'generators', name: 'Generators', tags: ['generate','random','lorem'], description: 'Lorem ipsum, passwords, UUIDs, lists and synthetic text/data.' },
  { slug: 'minify-and-beautify', name: 'Minify & Beautify', tags: ['beautify','minify','pretty'], description: 'Pretty-print or compact code, CSV, JSON, HTML, CSS and more.' },
  { slug: 'fun-and-novelty', name: 'Fun & Novelty', tags: ['fun','style','novelty'], description: 'Playful effects like Pig Latin, leet, emoji replacers, and more.' },
];

export function getAllCategories(){ return CATEGORIES; }
export function getCategoryBySlug(slug){ return CATEGORIES.find(c=>c.slug===slug); }
