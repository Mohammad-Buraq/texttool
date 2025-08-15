'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function StripHtmlTags(){
  const [input,setInput] = useState('<p>Hello <strong>world</strong></p>')
  const [preserveLinks,setPreserveLinks] = useState(false)

  const output = useMemo(()=>{
    if (preserveLinks){
      return input.replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)').replace(/<[^>]+>/g,'')
    }
    return input.replace(/<[^>]+>/g,'')
  },[input,preserveLinks])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={preserveLinks} onChange={e=>setPreserveLinks(e.target.checked)}/> Convert links to text (text + URL)
      </label>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="stripped.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}

