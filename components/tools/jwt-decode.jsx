'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function JwtDecode() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    function b64urlToStr(s){
      s = s.replace(/-/g,'+').replace(/_/g,'/')
      const pad = s.length % 4; if(pad) s += '='.repeat(4-pad)
      return decodeURIComponent(escape(atob(s)))
    }
    const parts = text.trim().split('.')
    if(parts.length<2) throw new Error('Supply a JWT: header.payload.signature')
    let out = { header: {}, payload: {}, signature: parts[2]||'' }
    try { out.header = JSON.parse(b64urlToStr(parts[0])) } catch(e){ out.header = { error: 'Bad header' } }
    try { out.payload = JSON.parse(b64urlToStr(parts[1])) } catch(e){ out.payload = { error: 'Bad payload' } }
    output = JSON.stringify(out, null, 2)

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`eyJhbGciOi...`}
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

