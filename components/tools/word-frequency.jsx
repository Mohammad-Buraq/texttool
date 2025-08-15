'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

const stop = new Set(['the','a','an','and','or','of','to','in','on','for','with','is','it','this','that'])

export default function WordFrequency(){
  const [input,setInput] = useState('One fish two fish red fish blue fish')
  const [useStopwords,setUseStopwords] = useState(true)

  const freq = useMemo(()=>{
    const words = (input.toLowerCase().match(/\p{L}[\p{L}\p{M}\p{Pd}']*/gu)||[])
      .filter(w=> useStopwords ? !stop.has(w) : true)
    const map = new Map()
    words.forEach(w=> map.set(w, (map.get(w)||0)+1))
    return Array.from(map.entries()).sort((a,b)=>b[1]-a[1])
  },[input,useStopwords])

  const output = freq.map(([w,c])=>`${w}\t${c}`).join('\n')

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={useStopwords} onChange={e=>setUseStopwords(e.target.checked)}/> Remove common stopwords
      </label>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="word-frequency.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}

