'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

// v5
function Radios({mode,setMode}){
  return (
    <div className="mt-2 flex items-center gap-6">
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="qs-mode-v5" checked={mode==='build'} onChange={()=>setMode('build')}/><span>Build (v5)</span></label>
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="qs-mode-v5" checked={mode==='parse'} onChange={()=>setMode('parse')}/><span>Parse (v5)</span></label>
    </div>
  )
}
function buildQS(lines){
  const params=new URLSearchParams()
  for(const l of (lines||'').split(/\r?\n/)){
    if(!l.trim()) continue
    const i=l.indexOf('='); const k=i>=0? l.slice(0,i).trim():l.trim(); const v=i>=0? l.slice(i+1):''
    params.append(k, v)
  }
  return params.toString()
}
function parseQS(q){
  const s=(q||'').replace(/^\?/, ''); const p=new URLSearchParams(s); const out=[]
  for(const [k,v] of p.entries()) out.push(k+'='+v)
  return out.join('\n')
}
export default function QueryStringBuilderParser(){
  const [input,setInput]=useState('key1=va l 1\nkey2=two')
  const [mode,setMode]=useState('build')
  let output=''
  try{
    output = mode==='build' ? buildQS(input) : parseQS(input)
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <Radios mode={mode} setMode={setMode} />
        </div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
