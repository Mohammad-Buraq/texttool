
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function TrimEachLine() {
  const [input, setInput] = useState('')

  const output = input.split(/\r?\n/).map(l=>l.trim()).join('\n')
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="trim-each-line.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
