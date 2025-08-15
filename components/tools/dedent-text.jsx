
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function DedentText() {
  const [input, setInput] = useState('')

  const output = (() => {
  const lines = input.split(/\r?\n/)
  const indents = lines.filter(l=>l.trim()).map(l=>(l.match(/^\s*/)||[''])[0].length)
  const min = indents.length ? Math.min(...indents) : 0
  return lines.map(l=>l.slice(min)).join('\n')
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="dedent-text.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

