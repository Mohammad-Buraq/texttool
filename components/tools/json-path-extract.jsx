'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function evalJsonPath(obj, path){
  path = (path||'').trim()
  if(!path || path[0]!=='$') throw new Error('Path must start with $')
  let i=1
  function readIdent(){
    const m = path.slice(i).match(/^[A-Za-z_][A-Za-z0-9_]*/)
    if(!m) return null
    i += m[0].length
    return m[0]
  }
  while(i<path.length){
    if(path[i]==='.') { i++; const key=readIdent(); if(!key) throw new Error('Invalid identifier'); obj = obj?.[key]; continue }
    if(path[i]==='['){
      i++
      if(path[i]==="'"){
        i++; let s=''; while(i<path.length && path[i]!=="'"){ s+=path[i++]; }
        if(path[i]!=="'") throw new Error('Unclosed quote'); i++; if(path[i]!==']') throw new Error('Missing ]'); i++; obj=obj?.[s]; continue
      } else {
        const m = path.slice(i).match(/^\d+/); if(!m) throw new Error('Index expected')
        i += m[0].length; if(path[i]!==']') throw new Error('Missing ]'); i++; obj = obj?.[parseInt(m[0],10)]; continue
      }
    }
    throw new Error('Unexpected token at '+i)
  }
  return obj
}
export default function JsonPathExtract(){
  const [input,setInput]=useState('')
  let output=''
  try{
    const m=(input||'').match(/^path\s*=\s*(.*)\n([\s\S]*)$/i)
    if(!m){ output='path=$.a.b[0]\n{"a":{"b":[42]}}' }
    else{
      const path=m[1].trim(); const obj=JSON.parse(m[2])
      const val = evalJsonPath(obj, path)
      output = typeof val==='undefined'? 'undefined' : JSON.stringify(val, null, 2)
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"path=$.a['x'][0]\n{\"a\":{\"x\":[1,2]}}"} /> 
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
