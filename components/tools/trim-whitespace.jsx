'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function TrimWhitespace(){
  const [input,setInput]=useState('  A  \n  B  \n\n  C  ')
  const [trimWhole,setTrimWhole]=useState(true)
  const [trimEach,setTrimEach]=useState(false)
  const [collapse,setCollapse]=useState(false)
  let output=''
  try{
    let t = input||''
    if(trimWhole) t = t.replace(/^\s+|\s+$/g,'')
    if(trimEach)  t = t.split(/\r?\n/).map(l=>l.replace(/^\s+|\s+$/g,'')).join('\n')
    if(collapse)  t = t.replace(/ {2,}/g,' ')
    output=t
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <div className="mt-2 flex items-center gap-6 flex-wrap">
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={trimWhole} onChange={e=>setTrimWhole(e.target.checked)} /><span>Trim whole text edges</span></label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={trimEach} onChange={e=>setTrimEach(e.target.checked)} /><span>Trim each line edges</span></label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={collapse} onChange={e=>setCollapse(e.target.checked)} /><span>Collapse multiple spaces</span></label>
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
