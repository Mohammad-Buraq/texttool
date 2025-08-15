'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RemoveDuplicateLines() {
  // JS version (no TypeScript generics)
  const [input, setInput] = useState('One\nTwo\nTwo\nthree\nThree')
  const [keep, setKeep] = useState('first')         // 'first' | 'last'
  const [caseSensitive, setCaseSensitive] = useState(false)

  const output = useMemo(() => {
    const lines = input.split(/\r?\n/)
    const key = (s) => (caseSensitive ? s : s.toLowerCase())

    if (keep === 'first') {
      const seen = new Set()
      const out = []
      for (const l of lines) {
        const k = key(l)
        if (!seen.has(k)) { seen.add(k); out.push(l) }
      }
      return out.join('\n')
    } else {
      // keep last
      const last = new Map()
      lines.forEach(l => last.set(key(l), l))
      return Array.from(last.values()).join('\n')
    }
  }, [input, keep, caseSensitive])

  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="flex gap-4 items-center flex-wrap mb-2">
        <label className="flex items-center gap-2">
          <input type="radio" name="keep" checked={keep === 'first'} onChange={() => setKeep('first')} />
          Keep first
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="keep" checked={keep === 'last'} onChange={() => setKeep('last')} />
          Keep last
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} />
          Case sensitive
        </label>
      </div>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} />
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="deduped.txt" />
            <ClearButton onClear={() => setInput('')} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

