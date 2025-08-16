'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RegexReplace(){
  const [input,setInput]=useState('User 123 has 456 points.')
  const [pattern,setPattern]=useState('\\d+')
  const [flags,setFlags]=useState('g')
  const [repl,setRepl]=useState('#')
  let output=''
  try{
    const re=new RegExp(pattern, flags||'')
    output = (input||'').replace(re, repl)
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">Pattern
              <input className="input" value={pattern} onChange={e=>setPattern(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Flags
              <input className="input w-24" value={flags} onChange={e=>setFlags(e.target.value)} placeholder="gim" />
            </label>
            <label className="flex items-center gap-2">Replace
              <input className="input" value={repl} onChange={e=>setRepl(e.target.value)} />
            </label>
          </div>
        </div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>{setInput('')}}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
