'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function JsonPathExtract() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const m = text.match(/^path\s*=\s*(.+)\n([\s\S]*)$/i)
    if(!m){ output = 'path=$.a.b[0]\n{ "a": { "b": [1,2,3] } }' }
    else {
      let path = m[1].trim()
      const payload = m[2]
      const obj = JSON.parse(payload)
      if(path.startsWith('$')) path = path.slice(1)
      if(path.startsWith('.')) path = path.slice(1)
      // tokenize: split by '.' and bracket [n]
      const tokens = []
      let i=0
      while(i<path.length){
        if(path[i]==='['){
          const j = path.indexOf(']', i+1)
          if(j<0) throw new Error('Unclosed [ in path')
          const inner = path.slice(i+1, j).trim()
          tokens.push(inner)
          i = j+1
          if(path[i]==='.') i++
        } else {
          let j=i
          while(j<path.length && path[j]!=='.' && path[j]!=='[') j++
          tokens.push(path.slice(i,j))
          if(path[j]==='.') j++
          i=j
        }
      }
      let cur = obj
      for(const t of tokens){
        if(t==='') continue
        const num = t.match(/^\d+$/) ? parseInt(t,10) : null
        if(num!=null && Array.isArray(cur)) cur = cur[num]
        else cur = cur?.[t]
        if(cur===undefined){ break }
      }
      output = JSON.stringify(cur, null, 2)
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
          placeholder={`path=$.a.b[0]
{ "a": { "b": [1,2,3] } }`}
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

