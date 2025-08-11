
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function ExtractEmails() {
  const [input, setInput] = useState('')

  const output = (() => {
  const emails = input.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || []
  return Array.from(new Set(emails)).join('\n')
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="extract-emails.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
