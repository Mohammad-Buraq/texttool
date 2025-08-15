'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function sentenceCase(s){
  return s.replace(/(^|[.!?]\s+)([a-z\u00C0-\u024F])/g, (m,prefix,ch)=> prefix + ch.toUpperCase())
}

export default function SentenceCase(){
  const [input,setInput] = useState('hello world. this is great! are you ready? yes.')
  const output = sentenceCase(input.toLowerCase())
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="sentence-case.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}

