'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function CsvMerge() {
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

    const m = text.match(/^join\s*=\s*(\w+)\s+on\s+(\w+)\s*\n([\s\S]*)$/i)
    if(!m) output = 'join=inner|left|right on columnName\nCSV A\n---\nCSV B'
    else {
      const mode=m[1].toLowerCase(), col=m[2]; const payload=m[3]
      const parts = payload.split(/^---+\s*$/m)
      if(parts.length<2) output = 'CSV A\n---\nCSV B'
      else {
        const A=parseCSV(parts[0]), B=parseCSV(parts[1])
        const ha=A[0], hb=B[0]; const ia=ha.indexOf(col), ib=hb.indexOf(col)
        const keyset = new Set([...A.slice(1).map(r=>r[ia]), ...B.slice(1).map(r=>r[ib])])
        const headers=[...ha, ...hb.filter(h=>h!==col)]
        const mapA = new Map(A.slice(1).map(r=>[r[ia], r]))
        const mapB = new Map(B.slice(1).map(r=>[r[ib], r]))
        const out=[headers]
        for(const k of keyset){
          const a = mapA.get(k), b = mapB.get(k)
          if(mode==='inner' && (!a||!b)) continue
          if(mode==='left' && !a) continue
          if(mode==='right' && !b) continue
          const row=[...(a||Array(ha.length).fill(''))]
          const btrim = (b||Array(hb.length).fill('')).filter((_,i)=>hb[i]!==col)
          out.push([...row, ...btrim])
        }
        output = toCSV(out)
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
          placeholder={`join=inner on id
id,name
1,Ada
2,Bob
---
id,dept
1,Eng
3,Sales`}
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

