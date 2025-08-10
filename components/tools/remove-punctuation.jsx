'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

const re = /[\p{P}\p{S}]+/gu

export default function RemovePunctuation(){
  const [input,setInput] = useState('Hello, world! @2025 #AI — 100% ready.')
  const output = input.replace(re,'')
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="no-punct.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
