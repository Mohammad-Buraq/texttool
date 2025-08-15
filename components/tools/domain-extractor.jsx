'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function DomainExtractor() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const urls = Array.from(text.matchAll(/https?:\/\/[\w.-]+(?::\d+)?[^\s"]*/g)).map(m=>m[0])
    const set = new Set(urls.map(u=>{ try{ return new URL(u).hostname.toLowerCase() }catch(e){ return null } }).filter(Boolean))
    output = Array.from(set).sort().join('\n')

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`Visit https://one.example.com/a and http://two.example.net:8080/ .`}
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

