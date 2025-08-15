
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function JsonToCsv() {
  const [input, setInput] = useState('')

  const output = (() => {
  try {
    const arr = JSON.parse(input)
    if (!Array.isArray(arr)) return ''
    const headers = Array.from(new Set(arr.flatMap(o => Object.keys(o))))
    const rows = [headers.join(',')]
    arr.forEach(o => rows.push(headers.map(h => o[h] || '').join(',')))
    return rows.join('\n')
  } catch(e) { return e.message }
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="json-to-csv.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

