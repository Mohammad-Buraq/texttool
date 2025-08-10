'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function toBase64(str){ return btoa(unescape(encodeURIComponent(str))) }
function fromBase64(str){ return decodeURIComponent(escape(atob(str))) }

export default function Base64(){
  const [input,setInput] = useState('Hello, Base64 👋')
  const [mode,setMode] = useState('encode')

  const output = useMemo(()=>{
    try{ return mode==='encode' ? toBase64(input) : fromBase64(input) }
    catch(e){ return 'Invalid Base64' }
  },[input,mode])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="flex gap-4 items-center mb-2">
        <label className="flex items-center gap-2"><input type="radio" name="m" checked={mode==='encode'} onChange={()=>setMode('encode')}/> Encode</label>
        <label className="flex items-center gap-2"><input type="radio" name="m" checked={mode==='decode'} onChange={()=>setMode('decode')}/> Decode</label>
      </div>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename={`base64-${mode}.txt`}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
