
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function MarkdownToHtml() {
  const [input, setInput] = useState('')

  const output = (() => {
  return input.replace(/^# (.*$)/gim, '<h1>$1</h1>')
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="markdown-to-html.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
