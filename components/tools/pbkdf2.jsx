'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function Pbkdf2Derivation(){
  const [password, setPassword] = useState('secret')
  const [salt, setSalt] = useState('thetexttool')
  const [iterations, setIterations] = useState(100000)
  const [hash, setHash] = useState('SHA-256')
  const [length, setLength] = useState(32) // bytes
  const [output, setOutput] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const enc = new TextEncoder()
        const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
        const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash, salt: enc.encode(salt), iterations: Math.max(1, parseInt(iterations||1,10)) }, keyMaterial, Math.max(1, parseInt(length||1,10))*8)
        const hex = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2,'0')).join('')
        if (!cancelled) setOutput(hex)
      } catch (e) {
        if (!cancelled) setOutput('Error: ' + (e?.message || e))
      }
    })()
    return () => { cancelled = true }
  }, [password, salt, iterations, hash, length])

  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => { setPassword(''); setSalt(''); setOutput('') }}>
      <div className="grid2">
        <div>
          <TextArea value={password} onChange={setPassword} placeholder="Password (paste here)" />
          <div className="mt-2 grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2">Salt
              <input className="input" value={salt} onChange={e=>setSalt(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Iterations
              <input className="input w-28" type="number" min="1" value={iterations} onChange={e=>setIterations(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Hash
              <select className="input" value={hash} onChange={e=>setHash(e.target.value)}>
                <option>SHA-256</option>
                <option>SHA-384</option>
                <option>SHA-512</option>
              </select>
            </label>
            <label className="flex items-center gap-2">Length (bytes)
              <input className="input w-28" type="number" min="1" value={length} onChange={e=>setLength(e.target.value)} />
            </label>
          </div>
        </div>
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2">
            <CopyButton text={output} />
            <DownloadButton text={output} />
            <ClearButton onClear={() => { setPassword(''); setSalt(''); setOutput('') }} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
