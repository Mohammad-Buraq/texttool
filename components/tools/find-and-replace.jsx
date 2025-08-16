'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function FindAndReplace(){
  const [input,setInput]=useState('User Bob and user bob.')
  const [find,setFind]=useState('bob')
  const [repl,setRepl]=useState('Alice')
  const [ci,setCi]=useState(true)
  const [all,setAll]=useState(true)
  let output=''
  try{
    const src=input||''
    if(find===''){
      output=src
    }else{
      if(all){
        const re=new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), ci?'gi':'g')
        output = src.replace(re, repl)
      }else{
        const i = ci ? src.toLowerCase().indexOf(find.toLowerCase()) : src.indexOf(find)
        output = i<0 ? src : src.slice(0,i) + repl + src.slice(i+find.length)
      }
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">Find
              <input className="input" value={find} onChange={e=>setFind(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Replace
              <input className="input" value={repl} onChange={e=>setRepl(e.target.value)} />
            </label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={ci} onChange={e=>setCi(e.target.checked)} /> Case-insensitive</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={all} onChange={e=>setAll(e.target.checked)} /> Replace all</label>
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
