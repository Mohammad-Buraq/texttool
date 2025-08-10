'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

const smallWords = new Set(['a','an','and','as','at','but','by','for','in','nor','of','on','or','per','the','to','vs','via'])

function titleCase(str){
  return str.split(/\s+/).map((w,i,arr)=>{
    const lower = w.toLowerCase()
    if (i!==0 && i!==arr.length-1 && smallWords.has(lower)) return lower
    return lower.replace(/^[\p{L}\p{N}]/u, ch => ch.toUpperCase())
  }).join(' ')
}

export default function TitleCase(){
  const [input,setInput] = useState('')
  const output = titleCase(input)
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="war and peace"/>
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="War and Peace"/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="title-case.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
