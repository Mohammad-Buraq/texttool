'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RemoveEmptyLines(){
  const [input,setInput] = useState('A\n\n \nB\n\nC')
  const [keepWhitespaceOnly, setKeepWhitespaceOnly] = useState(false)

  const output = useMemo(()=>{
    const re = keepWhitespaceOnly ? /^(?!$).+/ : /^(?=\s*\S).+/
    return input.split(/\r?\n/).filter(l=>re.test(l)).join('\n')
  },[input, keepWhitespaceOnly])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={keepWhitespaceOnly} onChange={e=>setKeepWhitespaceOnly(e.target.checked)}/>
        Keep whitespace-only lines
      </label>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="no-empty-lines.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
