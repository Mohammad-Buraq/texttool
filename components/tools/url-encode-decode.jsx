'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function UrlEncodeDecode(){
  const [input,setInput] = useState('https://example.com/?q=hello world&lang=en')
  const [mode,setMode] = useState('encode') // encode | decode

  const output = useMemo(()=>{
    try{
      return mode==='encode' ? encodeURIComponent(input) : decodeURIComponent(input)
    }catch(e){ return 'Invalid input' }
  },[input,mode])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="flex gap-4 items-center mb-2">
        <label className="flex items-center gap-2"><input type="radio" name="m" checked={mode==='encode'} onChange={()=>setMode('encode')}/> Encode</label>
        <label className="flex items-center gap-2"><input type="radio" name="m" checked={mode==='decode'} onChange={()=>setMode('decode')}/> Decode</label>
      </div>
      <div className="grid2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename={`url-${mode}.txt`}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
