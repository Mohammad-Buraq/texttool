'use client'
import {useMemo, useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

function wrapText(text, width){
  if (!width || width <= 0) return text
  return text.split(/(?:\r?\n){2,}/).map(p=>{
    const words = p.replace(/\r?\n/g,' ').split(/\s+/).filter(Boolean)
    const lines = []
    let line = ''
    for(const w of words){
      if(!line) line = w
      else if ((line + ' ' + w).length <= width) line += ' ' + w
      else { lines.push(line); line = w }
    }
    if(line) lines.push(line)
    return lines.join('\n')
  }).join('\n\n')
}

export default function WrapUnwrapLines(){
  const [input,setInput] = useState('This tool can hard-wrap text to a column width or unwrap line breaks.\nIt preserves blank lines between paragraphs.')
  const [mode,setMode] = useState('wrap') // 'wrap' | 'unwrap'
  const [width,setWidth] = useState(72)
  const output = useMemo(()=> mode==='wrap' ? wrapText(input, width) : input.replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim(), [input, mode, width])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)}
              onDownload={()=>{}}
              onClear={()=>setInput('')}>
      <div className="card mb-2 flex flex-wrap items-center gap-4 small">
        <label>Mode
          <select className="input ml-2" value={mode} onChange={e=>setMode(e.target.value)}>
            <option value="wrap">Wrap</option>
            <option value="unwrap">Unwrap</option>
          </select>
        </label>
        {mode==='wrap' && (
          <label>Width
            <input type="number" className="input ml-2 w-24" value={width} min={10} max={200} onChange={e=>setWidth(parseInt(e.target.value||'0',10))}/>
          </label>
        )}
      </div>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={'Paste text here'} />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder={mode==='wrap'?'Wrapped output':'Unwrapped output'}/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename={mode==='wrap'?'wrapped.txt':'unwrapped.txt'}/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
