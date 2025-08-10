'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function slugify(s){
  return s.normalize('NFKD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-zA-Z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase()
}

export default function Slugify(){
  const [input,setInput] = useState('Café del Mar — Summer 2025!')
  const output = slugify(input)
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="slug.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
