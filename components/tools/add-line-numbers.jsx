'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function AddLineNumbers(){
  const [input, setInput] = useState('')
  const [start, setStart] = useState(1)
  const [pad, setPad] = useState(0)
  const [sep, setSep] = useState('. ')

  const lines = input.split(/\r?\n/)
  const width = Math.max(pad, String(start + Math.max(lines.length - 1,0)).length)
  const output = lines.map((l,i)=>`${String(start+i).padStart(width,'0')}${sep}${l}`).join('\n')

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>
      <div className="card mb-2 flex flex-wrap gap-3 items-center">
        <label className="small">Start
          <input className="input ml-2 w-24" type="number" value={start} onChange={e=>setStart(parseInt(e.target.value||'0',10))}/>
        </label>
        <label className="small">Zero-pad
          <input className="input ml-2 w-24" type="number" min="0" value={pad} onChange={e=>setPad(parseInt(e.target.value||'0',10))}/>
        </label>
        <label className="small">Separator
          <input className="input ml-2 w-28" value={sep} onChange={e=>setSep(e.target.value)}/>
        </label>
      </div>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={'One\\nTwo\\nThree'} />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="numbered.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
