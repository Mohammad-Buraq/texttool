'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function Radios({mode,setMode}){
  return (
    <div className="mt-2 flex items-center gap-6">
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="jx" checked={mode==='json2xml'} onChange={()=>setMode('json2xml')}/><span>JSON → XML</span></label>
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="jx" checked={mode==='xml2json'} onChange={()=>setMode('xml2json')}/><span>XML → JSON</span></label>
    </div>
  )
}
function objToXml(obj, name='root'){
  if(obj===null || obj===undefined) return `<${name}/>`
  if(Array.isArray(obj)){
    return obj.map(v=>objToXml(v,name)).join('')
  }
  if(typeof obj!=='object') return `<${name}>${String(obj)}</${name}>`
  const attrs = obj['@'] && typeof obj['@']==='object' ? Object.entries(obj['@']).map(([k,v])=>` ${k}="${String(v)}"`).join('') : ''
  const keys = Object.keys(obj).filter(k=>k!=='@' && k!=='#text')
  const children = keys.map(k=>objToXml(obj[k], k)).join('')
  const text = obj['#text']? String(obj['#text']) : ''
  if(!children && !text) return `<${name}${attrs}/>`
  return `<${name}${attrs}>${text}${children}</${name}>`
}
function xmlToObj(xml){
  const P=new DOMParser().parseFromString(xml,'application/xml')
  if(P.querySelector('parsererror')) throw new Error('Invalid XML')
  function walk(el){
    if(el.nodeType===Node.TEXT_NODE) return el.nodeValue
    const obj={}
    if(el.attributes && el.attributes.length){
      obj['@']={}; for(const a of el.attributes){ obj['@'][a.name]=a.value }
    }
    const kids=[...el.childNodes]
    const textOnly = kids.every(n=>n.nodeType===Node.TEXT_NODE)
    if(textOnly){
      const txt=kids.map(n=>n.nodeValue).join('').trim()
      if(txt) obj['#text']=txt
      return obj['@']||txt ? obj : ''
    }
    for(const k of kids){
      if(k.nodeType===Node.TEXT_NODE){ const t=k.nodeValue.trim(); if(t){ obj['#text']=(obj['#text']||'')+t } continue }
      const name=k.nodeName
      const v=walk(k)
      if(obj[name]===undefined) obj[name]=v
      else if(Array.isArray(obj[name])) obj[name].push(v)
      else obj[name]=[obj[name], v]
    }
    return obj
  }
  const root=P.documentElement
  const top={}
  top[root.nodeName]=walk(root)
  return top
}
export default function JsonXml(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('json2xml')
  let output=''
  try{
    if(mode==='json2xml'){
      if(!input.trim()) output=''
      else{
        let obj=JSON.parse(input)
        if(typeof obj==='object' && !Array.isArray(obj) && Object.keys(obj).length===1){
          const k=Object.keys(obj)[0]
          output=objToXml(obj[k], k)
        }else{
          output=objToXml(obj,'root')
        }
      }
    }else{
      if(!input.trim()) output=''
      else{
        output = JSON.stringify(xmlToObj(input), null, 2)
      }
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} placeholder={'{"note":{"@":{"to":"Bob"},"#text":"Hello"}}'} />
          <Radios mode={mode} setMode={setMode}/>
        </div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
