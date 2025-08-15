
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function CsvToJson() {
  const [input, setInput] = useState('')

  const output = (() => {
  const lines = input.trim().split(/\r?\n/)
  if (!lines.length) return '[]'
  const headers = lines[0].split(',')
  const rows = lines.slice(1).map(line => {
    const cols = line.split(',')
    const obj = {}
    headers.forEach((h,i) => obj[h] = cols[i])
    return obj
  })
  return JSON.stringify(rows, null, 2)
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="csv-to-json.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

