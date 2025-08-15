'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function EpochConverter() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const t = text.trim()
    if(!t){ output = '' }
    else if(/^\d{9,}$/.test(t)){ 
      const n = Number(t)
      const ms = (t.length>10) ? n : n*1000
      const d = new Date(ms)
      output = d.toISOString()
    } else {
      const d = new Date(t)
      if(String(d) === 'Invalid Date') throw new Error('Invalid date input')
      output = Math.floor(d.getTime()/1000).toString()
    }

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`1723728000
or
2025-08-15T00:00:00Z`}
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

