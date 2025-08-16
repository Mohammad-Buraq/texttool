'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function PadLines(){
  const [input,setInput]=useState('1\n22\n333')
  const [side,setSide]=useState('left')
  const [width,setWidth]=useState(5)
  const [ch,setCh]=useState('0')
  let output=''
  try{
    const text=input||''
    const w=parseInt(width||0,10)
    const c=String(ch||' ').slice(0,1) || ' '
    output = text.split(/\r?\n/).map(l => side==='left' ? String(l).padStart(w, c) : String(l).padEnd(w, c)).join('\n')
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            <label className="inline-flex items-center gap-2">Side
              <select className="input" value={side} onChange={e=>setSide(e.target.value)}>
                <option value="left">left</option>
                <option value="right">right</option>
              </select>
            </label>
            <label className="inline-flex items-center gap-2">Width
              <input className="input w-24" type="number" min="0" value={width} onChange={e=>setWidth(e.target.value)} />
            </label>
            <label className="inline-flex items-center gap-2">Char
              <input className="input w-16" maxLength={1} value={ch} onChange={e=>setCh(e.target.value)} />
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
