'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function UrlParser() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    try{
      const u = new URL(text.trim())
      const params = {}; u.searchParams.forEach((v,k)=>{ if(params[k]==null) params[k]=v; else if(Array.isArray(params[k])) params[k].push(v); else params[k]=[params[k],v] })
      output = JSON.stringify({ href: u.href, protocol: u.protocol, host: u.host, hostname: u.hostname, port: u.port, pathname: u.pathname, search: u.search, hash: u.hash, params }, null, 2)
    }catch(e){
      output = text.trim()==='' ? '' : ('Error: ' + e.message)
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
          placeholder={`https://example.com:8080/a/b?x=1&x=2#hash`}
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

