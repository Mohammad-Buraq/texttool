
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function IndentText() {
  const [input, setInput] = useState('')

  const output = (() => {
  const n = 2
  const useTabs = false
  const pad = useTabs ? '\t'.repeat(n) : ' '.repeat(n)
  return input.split(/\r?\n/).map(l=>pad+l).join('\n')
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="indent-text.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
