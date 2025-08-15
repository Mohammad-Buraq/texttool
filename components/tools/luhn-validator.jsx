'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function LuhnValidator() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const s = text.replace(/\D+/g,'')
    if(!s) output = ''
    else {
      let sum=0, alt=false
      for(let i=s.length-1;i>=0;i--){
        let n = s.charCodeAt(i)-48
        if(alt){ n*=2; if(n>9) n-=9 }
        sum+=n; alt=!alt
      }
      output = (sum%10===0) ? 'Valid (Luhn passes)' : 'Invalid (Luhn fails)'
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
          placeholder={`4539511619543483`}
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

