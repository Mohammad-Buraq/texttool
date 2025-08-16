'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

// v5
export default function KeepLinesMatchingRegex(){
  const [input,setInput]=useState('ok line\nError occurred\nwarn: check\nfinal ok')
  const [pattern,setPattern]=useState('ERROR|WARN')
  const [flags,setFlags]=useState('i')
  let output=''
  try{
    const fl=(flags||'').replace(/g/g,'')
    const re = pattern ? new RegExp(pattern, fl) : null
    const kept = re ? (input||'').split(/\r?\n/).filter(l=>{ re.lastIndex=0; return re.test(l) }) : []
    output = kept.join('\n')
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <div className="mt-2 flex gap-4 items-center flex-wrap">
            <label className="flex items-center gap-2">Pattern
              <input value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="ERROR|WARN (v5)" />
            </label>
            <label className="flex items-center gap-2">Flags
              <input value={flags} onChange={e=>setFlags(e.target.value)} placeholder="i" style={{width:'4.5rem'}}/>
            </label>
          </div>
        </div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
