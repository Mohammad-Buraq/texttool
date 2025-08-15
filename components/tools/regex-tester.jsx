'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RegexTester() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const m = text.match(/^\/(.*)\/(\w*)\n([\s\S]*)$/)
    if(!m){ output = '/pattern/flags\ntext' }
    else {
      const re=new RegExp(m[1],m[2]); const s=m[3]; const matches=[]; let x
      while((x=re.exec(s))){ matches.push({match:x[0], index:x.index, groups:x.slice(1)}); if(!re.global) break }
      output = JSON.stringify(matches,null,2)
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
          placeholder={`/(\w+)=(\d+)/g
x=1
y=22`}
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

