
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function RandomLinePicker() {
  const [input, setInput] = useState('')

  const output = (() => {
  const lines = input.split(/\r?\n/).filter(l => l)
  const out = []
  const count = 1
  for (let i = 0; i < Math.min(count, lines.length); i++) {
    const idx = Math.floor(Math.random() * lines.length)
    out.push(lines.splice(idx, 1)[0])
  }
  return out.join('\n')
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="random-line-picker.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

