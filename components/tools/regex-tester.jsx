'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RegexTester(){
  const [input,setInput]=useState('The quick brown fox.')
  const [pattern,setPattern]=useState('\\b\\w+\\b')
  const [flags,setFlags]=useState('gi')
  const [max,setMax]=useState(200)
  let output=''
  try{
    let fl=flags||''
    if(!fl.includes('g')) fl+='g'
    const re=new RegExp(pattern, fl)
    const matches=[]
    let t; let count=0
    while( (t=re.exec(input||'')) && count<parseInt(max||200,10) ){
      matches.push(`@${t.index}-${t.index+(t[0]?.length||0)}: ${t[0]}${t.length>1? ' | groups: '+t.slice(1).join(', '):''}`)
      if(t[0]==='') re.lastIndex++
      count++
    }
    output = matches.length? matches.join('\n') : 'No matches.'
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">Pattern
              <input className="input" value={pattern} onChange={e=>setPattern(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Flags
              <input className="input w-24" value={flags} onChange={e=>setFlags(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Max
              <input className="input w-24" type="number" min="1" value={max} onChange={e=>setMax(e.target.value)} />
            </label>
          </div>
        </div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>{setInput('')}}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
