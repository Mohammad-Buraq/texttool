'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function parseCSV(text, delim=',') {
  const rows = []
  const lines = (text || '').split(/\r?\n/)
  for (const line of lines) {
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
export default function ColumnExtractor(){
  const [input,setInput]=useState('')
  let output=''
  try{
    const m=(input||'').match(/^cols\s*=\s*([0-9,\- ]+|.+)\n(?:header\s*=\s*(yes|no)\n)?(?:delim\s*=\s*(,|\t|;)\n)?([\s\S]*)$/i)
    if(!m){
      output = 'cols=1,3\nheader=yes\ndelim=,\nname,age,city\nAda,33,London\nLinus,54,Helsinki'
    }else{
      const colsRaw=m[1].trim()
      const header=(m[2]||'yes').toLowerCase()==='yes'
      const delim=m[3]||','
      const data=m[4]||''
      const rows=parseCSV(data,delim)
      if(!rows.length){ output='' }
      else{
        let idxs=[]
        if(header && !/^\d|,/.test(colsRaw)){ // by names
          const hdr=rows[0]; const names=colsRaw.split(',').map(s=>s.trim())
          idxs = names.map(n=>hdr.indexOf(n)).filter(i=>i>=0)
        }else{ // by indices (1-based)
          idxs = colsRaw.split(',').map(s=>parseInt(s.trim(),10)-1).filter(i=>!isNaN(i) && i>=0)
        }
        if(header){
          const hdr = rows.shift()
          const out=[idxs.map(i=>hdr[i]??'')]
          for(const r of rows) out.push(idxs.map(i=>r[i]??''))
          output = toCSV(out, delim)
        }else{
          const out=[]
          for(const r of rows) out.push(idxs.map(i=>r[i]??''))
          output = toCSV(out, delim)
        }
      }
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"cols=1,3\nheader=yes\ndelim=,\nname,age,city\nAda,33,London\nLinus,54,Helsinki"} />
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
