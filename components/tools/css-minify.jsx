'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function CssMinify(){
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''
    output = text
      .replace(/\/\*[\s\S]*?\*\//g,'')                // remove /* comments */
      .replace(/\s+/g,' ')                             // collapse whitespace
      .replace(/\s*([{};:,>+~])\s*/g,'$1')            // trim around tokens
      .replace(/;}/g,'}')                              // drop trailing ;
      .trim()
  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }

  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`/* comment */
body { color: red; }`}
        />
        <div>
          {/* FIX: close the onChange handler AND the component */}
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

