'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function ChecksumHash() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const text = input || ''

    async function digest(algo, s){
      const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(s))
      return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')
    }
    const m = text.match(/^algo\s*=\s*(SHA-1|SHA-256|SHA-384|SHA-512)\s*\n([\s\S]*)$/i)
    const algo = (m?.[1] || 'SHA-256').toUpperCase()
    const payload = m ? m[2] : text
    const hex = await digest(algo, payload)
    if(!cancelled) setOutput(hex)

      } catch (e) {
        if (!cancelled) setOutput('Error: ' + (e?.message || e))
      }
    })()
    return () => { cancelled = true }
  }, [input])

  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`algo=SHA-256
text to hash`}
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

