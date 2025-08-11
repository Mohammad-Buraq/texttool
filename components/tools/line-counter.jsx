'use client'
import {useMemo, useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function LineCounter(){
  const [input,setInput] = useState('one\ntwo\n\nthree')
  const lines = useMemo(()=> input.split(/\r?\n/).length, [input])
  const nonEmpty = useMemo(()=> input.split(/\r?\n/).filter(l=>/\S/.test(l)).length, [input])
  const output = `Total lines: ${lines}\nNon-empty: ${nonEmpty}`

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)}
              onDownload={()=>{}}
              onClear={()=>setInput('')}>
      <div className="card small mb-2 flex gap-4">
        <div><strong>Total lines:</strong> {lines}</div>
        <div><strong>Non-empty:</strong> {nonEmpty}</div>
      </div>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={'Paste text here'} />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Counts"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="line-count.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
