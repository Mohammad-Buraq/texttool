'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function CsvToMarkdownTable() {
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

    const rows = parseCSV(text)
    if(rows.length===0) output = ''
    else {
      const widths = rows[0].map((_,i)=> Math.max(...rows.map(r=> (r[i]||'').length)))
      const line = r => '| ' + r.map((c,i)=> (c||'').padEnd(widths[i],' ')).join(' | ') + ' |'
      const header = line(rows[0])
      const sep = '| ' + widths.map(w=>'-'.repeat(w)).join(' | ') + ' |'
      const body = rows.slice(1).map(line).join('\n')
      output = [header, sep, body].join('\n')
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
          placeholder={`name,age
Ada,33
Bob,30`}
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

