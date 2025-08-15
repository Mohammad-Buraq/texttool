'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function PadLines() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    let width=20, align='right', ch=' '
    const m = text.match(/^width\s*=\s*(\d+)\s*(?:;\s*align\s*=\s*(left|right))?\s*(?:;\s*char\s*=\s*(.))?\s*\n([\s\S]*)$/i)
    if(m){ width=parseInt(m[1],10); if(m[2]) align=m[2]; if(m[3]) ch=m[3] }
    const payload = m ? m[4] : text
    output = payload.split(/\r?\n/).map(line=> align==='right'? line.padStart(width, ch) : line.padEnd(width,ch)).join('\n')

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`width=10; align=right; char=.
12
abc
hello`}
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

