'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function JsonDiff() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const parts = text.split(/^---+\s*$/m)
    if(parts.length<2){ output = 'Paste: JSON A \n---\nJSON B' }
    else {
      const A = JSON.parse(parts[0]), B = JSON.parse(parts[1])
      const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v)
      function diff(a,b,path=[]){
        const out=[]
        const keys = new Set([...Object.keys(a||{}), ...Object.keys(b||{})])
        for(const k of keys){
          const p = [...path, k]
          if(!(k in (b||{}))) out.push({type:'removed', path:p.join('.'), from:a?.[k]})
          else if(!(k in (a||{}))) out.push({type:'added', path:p.join('.'), to:b?.[k]})
          else {
            const av=a[k], bv=b[k]
            if(isObj(av) && isObj(bv)) out.push(...diff(av,bv,p))
            else if(JSON.stringify(av)!==JSON.stringify(bv)) out.push({type:'changed', path:p.join('.'), from:av, to:bv})
          }
        }
        return out
      }
      output = JSON.stringify(diff(A,B), null, 2)
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
          placeholder={`{ "a": 1, "b": 2 }
---
{ "a": 1, "b": 3, "c": 4 }`}
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

