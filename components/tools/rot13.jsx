'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function Radios({ mode, setMode }) {
  return (
    <div className="mt-2 flex items-center gap-6">
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input type="radio" name="mode" checked={mode==='encode'} onChange={()=>setMode('encode')} />
        <span>Encode</span>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input type="radio" name="mode" checked={mode==='decode'} onChange={()=>setMode('decode')} />
        <span>Decode</span>
      </label>
    </div>
  )
}

function rot13(s){
  return (s||'').replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0)-base+13)%26)+base)
  })
}

export default function ROT13(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('encode') // symmetric
  let output=''
  try{ output = rot13(input||'') }catch(e){ output='Error: '+(e?.message||e) }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} placeholder="hello world" />
          <Radios mode={mode} setMode={setMode} />
        </div>
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={() => setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
