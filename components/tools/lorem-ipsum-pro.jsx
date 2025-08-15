'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function LoremIpsumPro() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    function lipsum(n=3){
      const w='lorem ipsum dolor sit amet consectetur adipiscing elit sed do'.split(' ')
      let out=[]
      for(let i=0;i<n;i++){
        let s=''
        const len = Math.floor(8+Math.random()*8)
        for(let j=0;j<len;j++){ s+=(j?' ':'')+w[Math.floor(Math.random()*w.length)] }
        s = s.charAt(0).toUpperCase()+s.slice(1)+'.'
        out.push(s)
      }
      return out.join('\n\n')
    }
    output = lipsum(3)

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`count paragraphs on the way`}
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

