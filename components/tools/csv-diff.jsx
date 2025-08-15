'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function CsvDiff() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    function parseCSV(s, delim=','){
      const out=[], row=[]; let i=0, cur='', inq=false
      while(i<=s.length){
        const ch = s[i] || ''
        if(inq){
          if(ch==='"'){ if(s[i+1]==='"'){ cur+='"'; i++ } else { inq=false } }
          else { cur+=ch }
        }else{
          if(ch==='"'){ inq=true }
          else if(ch===delim){ row.push(cur); cur='' }
          else if(ch==='\n' || ch==='\r' || ch===''){ row.push(cur); out.push(row.slice()); row.length=0; cur=''; if(ch==='\r'&&s[i+1]==='\n') i++ }
          else { cur+=ch }
        }
        i++
      }
      return out.filter(r=>r.length>1 || (r.length===1 && r[0]!==''))
    }
    function toCSV(rows, delim=','){
      return rows.map(r=>r.map(c=> (/[",\n\r]/.test(c)? '"'+c.replace(/"/g,'""')+'"' : c)).join(delim)).join('\n')
    }

    const parts = text.split(/^---+\s*$/m)
    if(parts.length<2) output = 'Paste: CSV A\n---\nCSV B'
    else {
      const A=parseCSV(parts[0]), B=parseCSV(parts[1])
      if(A.length===0||B.length===0) output = 'Both CSVs need headers and rows'
      else {
        const ha=A[0], hb=B[0]
        const ia=0, ib=0 // first column as key
        const mapA = new Map(A.slice(1).map(r=>[r[ia], r]))
        const mapB = new Map(B.slice(1).map(r=>[r[ib], r]))
        const added=[], removed=[], changed=[]
        for(const [k,row] of mapB){ if(!mapA.has(k)) added.push(row) }
        for(const [k,row] of mapA){ if(!mapB.has(k)) removed.push(row); else if(row.join(',')!==mapB.get(k).join(',')) changed.push({from:row, to:mapB.get(k)}) }
        output = JSON.stringify({added, removed, changed}, null, 2)
      }
    }

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`name
Ada
Bob
---
name
Ada
Cara`}
        />
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2">
            <CopyButton text={output} />
            <DownloadButton text={output} />
            <ClearButton onClear={() => setInput('')} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

