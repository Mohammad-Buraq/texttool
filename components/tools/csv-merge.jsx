'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function parseCSV(text, delim=',') {
  const rows = []
  const lines = (text || '').split(/\r?\n/)
  for (const line of lines) {
    if(line.trim()==='' && rows.length===0) continue
    const row = []
    let i=0, cur='', inq=false
    while(i<line.length){
      const ch=line[i]
      if(inq){
        if(ch === '"' && line[i+1] === '"'){ cur+='"'; i+=2; continue }
        if(ch === '"'){ inq=false; i++; continue }
        cur+=ch; i++; continue
      }else{
        if(ch === '"'){ inq=true; i++; continue }
        if(ch === delim){ row.push(cur); cur=''; i++; continue }
        cur+=ch; i++; continue
      }
    }
    row.push(cur); rows.push(row)
  }
  return rows
}
function toCSV(rows, delim=','){
  return rows.map(r=>r.map(v=>{
    v=String(v ?? '')
    return /["\n\r,\t]/.test(v) ? '"' + v.replace(/"/g,'""') + '"' : v
  }).join(delim)).join('\n')
}
function indexOfKey(header, key){
  if(/^\d+$/.test(key)) return Math.max(0, parseInt(key,10)-1)
  return header.indexOf(key)
}
export default function CsvMerge(){
  const [input,setInput]=useState('')
  let output=''
  try{
    const m=(input||'').match(/^key\s*=\s*(.+)\n(?:type\s*=\s*(inner|left|right|outer)\n)?(?:header\s*=\s*(yes|no)\n)?(?:delim\s*=\s*(,|\t|;)\n)?---\n([\s\S]*?)\n---\n([\s\S]*)$/i)
    if(!m){
      output = 'key=name\ntype=inner\nheader=yes\ndelim=,\n---\nname,age\nAda,33\nLinus,54\n---\nname,city\nAda,London\nLinus,Helsinki'
    }else{
      const key=m[1].trim()
      const type=(m[2]||'inner').toLowerCase()
      const header=(m[3]||'yes').toLowerCase()==='yes'
      const delim=m[4]||','
      const left=parseCSV(m[5],delim), right=parseCSV(m[6],delim)
      if(!left.length || !right.length){ output='' }
      else{
        let lhdr=null, rhdr=null, li=0, ri=0
        if(header){ lhdr=left.shift(); rhdr=right.shift(); li=indexOfKey(lhdr,key); ri=indexOfKey(rhdr,key) }
        else { li=indexOfKey(left[0],key); ri=indexOfKey(right[0],key) }
        if(li<0 || ri<0) throw new Error('Join key not found')
        // Build map for right
        const rmap=new Map()
        for(const r of right){ const k=r[ri]??''; if(!rmap.has(k)) rmap.set(k, []); rmap.get(k).push(r) }
        const rows=[]
        const headerRow = (lhdr && rhdr) ? [...lhdr, ...rhdr.filter((_,i)=>i!==ri)] : null
        if(headerRow) rows.push(headerRow)
        const matchedR = new Set()
        for(const l of left){
          const k=l[li]??''
          const rs=rmap.get(k)
          if(rs && rs.length){
            for(const r of rs){
              rows.push([...l, ...r.filter((_,i)=>i!==ri)])
              matchedR.add(r)
            }
          } else if(type==='left' || type==='outer'){
            const emptyR = (rhdr ? rhdr.length-1 : (right[0]?.length||0)-1)
            rows.push([...l, ...Array(emptyR).fill('')])
          }
        }
        if(type==='right' || type==='outer'){
          for(const r of right){
            if(matchedR.has(r)) continue
            const k=r[ri]??''
            // Check if any L had this k
            let had=false
            for(const l of left){ if((l[li]??'')===k){ had=true; break } }
            if(!had){
              const emptyL = (lhdr ? lhdr.length : (left[0]?.length||0))
              const rcols = r.filter((_,i)=>i!==ri)
              rows.push([...Array(emptyL).fill(''), ...rcols])
            }
          }
        }
        output = toCSV(rows, delim)
      }
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"key=name\ntype=inner\nheader=yes\ndelim=,\n---\nname,age\nAda,33\nLinus,54\n---\nname,city\nAda,London\nLinus,Helsinki"} />
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
