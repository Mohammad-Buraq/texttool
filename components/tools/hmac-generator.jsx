'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function HmacGenerator(){
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const text = input || ''
        const m = text.match(/^key\s*=\s*(.*)\n(?:algo\s*=\s*(SHA-256|SHA-384|SHA-512)\s*\n)?([\s\S]*)$/i)
        if (!m) { if (!cancelled) setOutput('key=<secret>\nalgo=SHA-256\n<text>'); return }
        const [, key, algoMaybe, payload] = m
        const algo = (algoMaybe || 'SHA-256').toUpperCase()

        const enc = new TextEncoder()
        const cryptoKey = await crypto.subtle.importKey(
          'raw',
          enc.encode(key),
          { name: 'HMAC', hash: { name: algo } },
          false,
          ['sign']
        )
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(payload || ''))
        const hex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('')
        if (!cancelled) setOutput(hex)
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
          placeholder={`key=secret
algo=SHA-256
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
