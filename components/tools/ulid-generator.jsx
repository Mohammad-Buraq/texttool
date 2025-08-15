'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function UlidGenerator() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    let count=1
    const m = text.match(/^count\s*=\s*(\d+)/i)
    if(m) count = Math.min(1000, Math.max(1, parseInt(m[1],10)))
    const ALPH='0123456789ABCDEFGHJKMNPQRSTVWXYZ'
    function encodeTime(t){
      let out=''
      for(let i=0;i<10;i++){ out = ALPH[t % 32] + out; t = Math.floor(t/32) }
      return out
    }
    function encodeRand(){
      let out=''; const r = new Uint8Array(16); crypto.getRandomValues(r)
      for(const b of r){ out += ALPH[b % 32] }
      return out
    }
    function ulid(){ return encodeTime(Date.now()) + encodeRand() }
    output = Array.from({length:count},()=>ulid()).join('\n')

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`count=5`}
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

