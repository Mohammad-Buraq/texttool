
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function RemoveDuplicateWords() {
  const [input, setInput] = useState('')

  const output = (() => {
  const seen = new Set()
  const out = []
  for (const w of input.match(/\b[\w'-]+\b/g) || []) {
    const key = w.toLowerCase()
    if (!seen.has(key)) { seen.add(key); out.push(w) }
  }
  return out.join(' ')
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="remove-duplicate-words.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
