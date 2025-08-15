'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function CsvSort() {
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

    const m = text.match(/^by\s*=\s*(\w+)(?:\s+(asc|desc))?\s*\n([\s\S]*)$/i)
    if(!m) output = 'by=ColumnName asc|desc\nCSV...'
    else {
      const col=m[1], dir=(m[2]||'asc').toLowerCase(), payload=m[3]
      const rows=parseCSV(payload); if(rows.length<2) output = payload
      else {
        const header=rows[0], idx=header.indexOf(col); if(idx<0) throw new Error('Column not found')
        const body=rows.slice(1).sort((a,b)=> (a[idx]===b[idx]?0:(a[idx]<b[idx]?-1:1)) * (dir==='asc'?1:-1))
        output = toCSV([header,...body])
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
          placeholder={`by=name asc
name,age
Bob,30
Ada,33`}
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

