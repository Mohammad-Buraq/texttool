'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RemoveLinesMatching() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const m = text.match(/^re\s*=\s*\/(.*)\/(\w*)\s*\n([\s\S]*)$/)
    if(!m) output = 're=/pattern/flags\n<your text>'
    else {
      const [,p,flags,payload]=m
      const re = new RegExp(p, flags)
      output = payload.split(/\r?\n/).filter(line=> !re.test(line) ).join('\n')
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
          placeholder={`re=/debug/i
keep
DEBUG: noisy
stay`}
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

