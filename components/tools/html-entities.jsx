'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function encodeHtml(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}
function decodeHtml(s){
  const named = s.replace(/&(amp|lt|gt|quot|apos);/g,(m,k)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[k]))
  return named.replace(/&#(x?[0-9A-Fa-f]+);/g,(m,hex)=>{
    const isHex = /^x/i.test(hex); const num = parseInt(isHex? hex.slice(1):hex, isHex?16:10); return String.fromCodePoint(num||0)
  })
}
function Radios({ mode, setMode }){
  return (
    <div className="mt-2 flex items-center gap-6">
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="mode" checked={mode==='encode'} onChange={()=>setMode('encode')}/><span>Encode</span></label>
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="mode" checked={mode==='decode'} onChange={()=>setMode('decode')}/><span>Decode</span></label>
    </div>
  )
}
export default function HtmlEntities(){
  const [input,setInput]=useState(''); const [mode,setMode]=useState('encode')
  let output=''
  try{
    output = mode==='encode'? encodeHtml(input) : decodeHtml(input)
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <div><TextArea value={input} onChange={setInput} placeholder={'<a href="/">x & y</a>'}/><Radios mode={mode} setMode={setMode}/></div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
