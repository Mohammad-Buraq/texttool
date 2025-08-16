'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function Radios({mode,setMode}){
  return (
    <div className="mt-2 flex items-center gap-6">
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="jy" checked={mode==='json2yaml'} onChange={()=>setMode('json2yaml')}/><span>JSON → YAML</span></label>
      <label className="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="jy" checked={mode==='yaml2json'} onChange={()=>setMode('yaml2json')}/><span>YAML → JSON</span></label>
    </div>
  )
}
function toYaml(val, indent=''){
  if(val===null) return 'null'
  if(typeof val==='boolean' || typeof val==='number') return String(val)
  if(typeof val==='string'){
    if(/[:\-\[\]\{\},#\n\r]/.test(val)) return JSON.stringify(val)
    return val
  }
  if(Array.isArray(val)){
    if(!val.length) return '[]'
    return val.map(v=>`${indent}- ${toYaml(v, indent+'  ').replace(/\n/g, '\n'+indent+'  ')}`).join('\n')
  }
  const keys=Object.keys(val||{})
  if(!keys.length) return '{}'
  return keys.map(k=>{
    const v=val[k]; const rendered=toYaml(v, indent+'  ')
    if(typeof v==='object' && v!==null && (Array.isArray(v) ? v.length>0 : Object.keys(v).length>0)){
      return `${indent}${k}:\n${rendered.replace(/^/gm, indent+'  ')}`
    }
    return `${indent}${k}: ${rendered}`
  }).join('\n')
}
function fromYaml(y){
  // Very small subset: 2-space indents, maps and lists, scalars (number/bool/null/strings)
  const lines=(y||'').replace(/\t/g,'  ').split(/\r?\n/)
  let i=0
  function parseBlock(indent){
    const obj={}, arr=[]
    let isArray=null
    while(i<lines.length){
      let line=lines[i]
      if(!line.trim()){ i++; continue }
      const curIndent = line.match(/^ */)[0].length
      if(curIndent < indent) break
      if(curIndent > indent) throw new Error('Invalid indentation at line '+(i+1))
      line=line.trim()
      if(line.startsWith('- ')){
        if(isArray===false) throw new Error('Mixed mapping and sequence')
        isArray=true
        const rest=line.slice(2)
        if(rest.includes(': ')){
          // Inline map entry after dash
          const idx=rest.indexOf(': ')
          const key=rest.slice(0,idx).trim()
          const valStr=rest.slice(idx+2)
          const node={}
          node[key]=parseScalar(valStr)
          i++
          // Parse nested block
          const child=parseBlock(indent+2)
          Object.assign(node, child.node)
          arr.push(node)
        }else if(rest){
          arr.push(parseScalar(rest))
          i++
          // Nested block after dash
          const child=parseBlock(indent+2)
          if(child.kind==='map'||child.kind==='list'){
            if(child.kind==='list') arr[arr.length-1]=[arr[arr.length-1], ...child.node]
            else if(child.kind==='map') Object.assign(arr[arr.length-1] = (typeof arr[arr.length-1]==='object'? arr[arr.length-1]:{}), child.node)
          }
        }else{
          i++
          const child=parseBlock(indent+2)
          if(child.kind==='list') arr.push(...child.node)
          else arr.push(child.node)
        }
      }else{
        if(isArray===true) throw new Error('Mixed mapping and sequence')
        isArray=false
        const idx=line.indexOf(':')
        if(idx<0) throw new Error('Expected ":" in mapping at line '+(i+1))
        const key=line.slice(0,idx).trim()
        const rest=line.slice(idx+1).trim()
        if(rest){
          obj[key]=parseScalar(rest); i++
        }else{
          i++
          const child=parseBlock(indent+2)
          obj[key]=child.node
        }
      }
    }
    return {kind: isArray===true? 'list': (isArray===false? 'map':'empty'), node: isArray===true? arr : (isArray===false? obj : {})}
  }
  function parseScalar(s){
    if(/^null$/i.test(s)) return null
    if(/^(true|false)$/i.test(s)) return /^true$/i.test(s)
    if(/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s)
    if(/^["']/.test(s)) { try { return JSON.parse(s) } catch { return s } }
    return s
  }
  return parseBlock(0).node
}
export default function JsonYaml(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('json2yaml')
  let output=''
  try{
    if(mode==='json2yaml'){
      if(!input.trim()) output=''
      else output = toYaml(JSON.parse(input))
    }else{
      if(!input.trim()) output=''
      else output = JSON.stringify(fromYaml(input), null, 2)
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} placeholder={'{"name":"Ada","skills":["math","logic"]}'} />
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
