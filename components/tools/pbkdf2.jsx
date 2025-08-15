'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function Pbkdf2Derivation() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const text = input || ''

        const m = text.match(
          /^password\s*=\s*(.*)\n(?:salt\s*=\s*(.*)\n)?(?:iter\s*=\s*(\d+)\n)?(?:hash\s*=\s*(SHA-256|SHA-384|SHA-512)\n)?(?:length\s*=\s*(\d+)\n)?/i
        )

        if (!m) {
          if (!cancelled) {
            setOutput('password=<pwd>\nsalt=<salt>\niter=100000\nhash=SHA-256\nlength=32\n')
          }
          return
        }

        const [, pwd, saltRaw = 'salt', iterRaw = '100000', hashAlgRaw = 'SHA-256', lenRaw = '32'] = m
        const iterations = parseInt(iterRaw, 10) || 100000
        const hashAlg = (hashAlgRaw || 'SHA-256').toUpperCase()
        const byteLen = (parseInt(lenRaw, 10) || 32) * 8

        const enc = new TextEncoder()

        // Import base key
        const baseKey = await crypto.subtle.importKey(
          'raw',
          enc.encode(pwd),
          'PBKDF2',
          false,
          ['deriveBits']
        )

        // Derive bits
        const bits = await crypto.subtle.deriveBits(
          {
            name: 'PBKDF2',
            salt: enc.encode(saltRaw),
            iterations,
            hash: hashAlg
          },
          baseKey,
          byteLen
        )

        const hex = Array.from(new Uint8Array(bits))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')

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
          placeholder={`password=secret
salt=thetexttool
iter=100000
hash=SHA-256
length=32`}
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
