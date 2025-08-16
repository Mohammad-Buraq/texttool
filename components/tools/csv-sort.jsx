'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function parseCSV(text, delim=',') {
  const out = []
  const lines = (text || '').split(/\r?\n/)
  for (const line of lines) {
    const row = []
    let i = 0, cur = '', inq = false
    while (i < line.length) {
      const ch = line[i]
      if (inq) {
        if (ch === '"' && line[i+1] === '"') { cur += '"'; i += 2; continue }
        if (ch === '"') { inq = false; i++; continue }
        cur += ch; i++; continue
      } else {
        if (ch === '"') { inq = true; i++; continue }
        if (ch === delim) { row.push(cur); cur = ''; i++; continue }
        cur += ch; i++; continue
      }
    }
    row.push(cur)
    out.push(row)
  }
  return out
}
function toCSV(rows, delim=',') {
  return rows.map(r => r.map(v => {
    v = String(v ?? '')
    return /["\n\r,\t]/.test(v) ? '"' + v.replace(/"/g,'""') + '"' : v
  }).join(delim)).join('\n')
}
export default function CsvSort(){
  const [input,setInput]=useState('')
  let output=''
  try{
    const m=(input||'').match(/^col\s*=\s*(\d+)\n(?:dir\s*=\s*(asc|desc)\n)?(?:header\s*=\s*(yes|no)\n)?(?:delim\s*=\s*(,|\t|;)\n)?([\s\S]*)$/i)
    if(!m){
      output = 'col=1\ndir=asc\nheader=yes\ndelim=,\nname,age\nAda,33\nLinus,54'
    }else{
      const col = Math.max(1, parseInt(m[1],10))
      const dir = (m[2]||'asc').toLowerCase()
      const header = (m[3]||'yes').toLowerCase()==='yes'
      const delim = m[4]||','
      const rows = parseCSV(m[5], delim)
      if(!rows.length){ output=''; }
      else{
        const hdr = header? rows.shift() : null
        const idx = col-1
        rows.sort((a,b)=>{
          const av=a[idx]??'', bv=b[idx]??''
          const na = av.trim()!=='' && !isNaN(+av), nb = bv.trim()!=='' && !isNaN(+bv)
          const cmp = (na&&nb) ? (+av - +bv) : String(av).localeCompare(String(bv), undefined, {numeric:true, sensitivity:'base'})
          return dir==='asc'? cmp : -cmp
        })
        const out = hdr? [hdr, ...rows] : rows
        output = toCSV(out, delim)
      }
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"col=2\ndir=desc\nheader=yes\ndelim=,\nname,age\nAda,33\nLinus,54"}/> 
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
