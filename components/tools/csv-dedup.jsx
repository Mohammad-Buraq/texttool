'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function CsvDedupe() {
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

    const m = text.match(/^keys\s*=\s*(.*)\n([\s\S]*)$/i)
    const keys = m ? m[1].split(/\s*,\s*/) : null
    const payload = m ? m[2] : text
    const rows = parseCSV(payload)
    if(rows.length===0) output = ''
    else {
      const header = rows[0]
      const idxs = keys ? keys.map(k=>header.indexOf(k)) : null
      const seen=new Set(); const out=[header]
      for(let i=1;i<rows.length;i++){
        const key = idxs? idxs.map(ix=>rows[i][ix]).join('|') : rows[i].join('|')
        if(seen.has(key)) continue
        seen.add(key); out.push(rows[i])
      }
      output = toCSV(out)
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
          placeholder={`keys=email
name,email
Ada,ada@example.com
Ada,ada@example.com
Bob,b@x.com`}
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

