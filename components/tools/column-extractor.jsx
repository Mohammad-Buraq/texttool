'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function ColumnExtractor() {
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

    const m = text.match(/^col\s*=\s*(\w+|\d+)\s*(?:;\s*delim\s*=\s*([^\n]+))?\s*\n([\s\S]*)$/i)
    if(!m) output = 'col=HeaderOrIndex; delim=,\nCSV...'
    else {
      const col=m[1], delim=m[2]||','; const payload=m[3]
      const rows=parseCSV(payload, delim); if(rows.length===0) output = ''
      else {
        const header=rows[0]; const idx=/^\d+$/.test(col)? parseInt(col,10) : header.indexOf(col)
        if(idx<0 || idx>=header.length) throw new Error('Column not found')
        output = rows.slice(1).map(r=>r[idx]).join('\n')
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
          placeholder={`col=Email; delim=,
name,email
Ada,ada@example.com
Bob,bob@x.com`}
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

