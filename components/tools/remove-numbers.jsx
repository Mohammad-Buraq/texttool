'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RemoveNumbers(){
  const [input,setInput] = useState('v2 release on 09/21/2025 at 10:45')
  const [insideWords,setInsideWords] = useState(true)
  const output = insideWords ? input.replace(/[0-9]+/g,'') : input.replace(/\b[0-9]+\b/g,'')
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={insideWords} onChange={e=>setInsideWords(e.target.checked)}/> Remove digits inside words
      </label>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="no-numbers.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}

