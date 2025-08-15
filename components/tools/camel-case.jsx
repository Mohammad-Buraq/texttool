'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function CamelCase() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    function tokenize(s){ return (s||'').replace(/[^A-Za-z0-9]+/g,' ').trim().split(/\s+/) }
    const words = tokenize(text); output = words.map((w,i)=> i? (w[0].toUpperCase()+w.slice(1).toLowerCase()) : w.toLowerCase()).join('')

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`Hello, WORLD example`}
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

