'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function SuffixLines(){
  const [input,setInput]=useState('')
  let output=''
  try{
    const m=(input||'').match(/^suffix\s*=\s*(.*)\n(?:includeEmpty\s*=\s*(yes|no)\n)?([\s\S]*)$/i)
    if(!m){
      output='suffix=;\nincludeEmpty=no\na\nb\n\nc'
    }else{
      const suffix=m[1]
      const includeEmpty=(m[2]||'no').toLowerCase()==='yes'
      const text=m[3]||''
      output = text.split(/\r?\n/).map(l=> (l===''&&!includeEmpty) ? '' : l + suffix ).join('\n')
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"suffix=;\nincludeEmpty=no\na\nb\n\nc"}/> 
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
