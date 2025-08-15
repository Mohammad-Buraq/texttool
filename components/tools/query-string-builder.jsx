'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function QueryStringBuilder() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const s = text.trim()
    if(!s) output = ''
    else if(/^\??[\w\W]*=/.test(s)){
      const u = new URL('http://x/?'+s.replace(/^\?/,'').trim())
      const pairs=[]; u.searchParams.forEach((v,k)=>pairs.push(k+'='+v))
      output = pairs.join('\n')
    }else{
      const params = new URLSearchParams()
      for(const line of s.split(/\r?\n/)){
        if(!line.trim()) continue
        const [k,v=''] = line.split('=')
        params.append(k.trim(), v.trim())
      }
      output = params.toString()
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
          placeholder={`a=1
b=two
b=2`}
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

