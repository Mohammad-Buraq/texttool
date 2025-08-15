'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function UnicodeNormalizer() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const m = text.match(/^form\s*=\s*(NFC|NFD|NFKC|NFKD)\s*\n([\s\S]*)$/i)
    const form = (m?.[1] || 'NFC')
    const payload = m ? m[2] : text
    output = payload.normalize(form.toUpperCase())

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`form=NFC
Café`}
        />
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2">
            <CopyButton text={output} />
            <DownloadButton text={output} />
            <ClearButton onClear={() => setInput('')} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

