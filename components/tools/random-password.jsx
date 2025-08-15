'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RandomPassword() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    let length=16, sets='uldr', excludeSimilar=true
    const meta = text.match(/^length\s*=\s*(\d+)\s*(?:;\s*sets\s*=\s*([a-z]+))?\s*(?:;\s*similar\s*=\s*(true|false))?/i)
    if(meta){ length=parseInt(meta[1],10); if(meta[2]) sets=meta[2]; if(meta[3]) excludeSimilar=(meta[3]!=='false') }
    const sources = { u:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', l:'abcdefghijklmnopqrstuvwxyz', d:'0123456789', r:'!@#$%^&*()-_=+[]{};:,.<>/?' }
    let chars = sets.split('').map(k=>sources[k]||'').join('')
    if(excludeSimilar){ chars = chars.replace(/[O0Il1|]/g,'') }
    if(!chars) throw new Error('No character sets selected')
    let out=''; const rnd = new Uint8Array(length); crypto.getRandomValues(rnd)
    for(let i=0;i<length;i++){ out += chars[rnd[i] % chars.length] }
    output = out

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`length=20; sets=uldr; similar=false`}
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

