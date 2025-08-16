'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function decodeEscapes(s){
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_,h)=>String.fromCharCode(parseInt(h,16)))
          .replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
}
function Radios({mode,setMode}){
  return (
    <div className="mt-2 flex items-center gap-6 flex-wrap">
      {['NFC','NFD','NFKC','NFKD'].map(x=>(
        <label key={x} className="inline-flex items-center gap-2 cursor-pointer">
          <input type="radio" name="u-norm" checked={mode===x} onChange={()=>setMode(x)} />
          <span>{x}</span>
        </label>
      ))}
    </div>
  )
}
export default function UnicodeNormalizer(){
  const [input,setInput]=useState("Cafe\u0301  (you can also paste: Cafe\\u0301)")
  const [mode,setMode]=useState('NFC')
  const [unesc,setUnesc]=useState(false)
  let output=''
  try{
    if(typeof ''.normalize !== 'function') throw new Error('normalize() not supported in this environment')
    const src = unesc ? decodeEscapes(input||'') : (input||'')
    output = src.normalize(mode)
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <Radios mode={mode} setMode={setMode} />
          <label className="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" checked={unesc} onChange={e=>setUnesc(e.target.checked)} />
            <span>Unescape \uXXXX, \n, \t</span>
          </label>
        </div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>{setInput('')}}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
