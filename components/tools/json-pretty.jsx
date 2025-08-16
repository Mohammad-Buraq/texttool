'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function JsonPretty(){
  const [input,setInput]=useState('')
  let output=''
  try{
    if(!input.trim()) output=''
    else output = JSON.stringify(JSON.parse(input), null, 2)
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={'{"a":1,"b":[2,3]}'}/> 
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
