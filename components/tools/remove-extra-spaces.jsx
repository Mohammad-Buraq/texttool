'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RemoveExtraSpaces(){
  const [input,setInput] = useState('  Too    many   spaces   here.  ')
  const [collapse,setCollapse] = useState(true)
  const output = useMemo(()=>{
    let s = input.replace(/\s+/g, collapse ? ' ' : ' ')
    s = s.replace(/^\s+|\s+$/g,'')
    return s
  },[input,collapse])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <label className="flex items-center gap-2 mb-2"><input type="checkbox" checked={collapse} onChange={e=>setCollapse(e.target.checked)}/> Collapse multiple spaces</label>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="no-extra-spaces.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}

