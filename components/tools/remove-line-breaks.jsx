'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function RemoveLineBreaks(){
  const [input,setInput] = useState('Line one.\nLine two.\nLine three.')
  const [separator,setSeparator] = useState(' ')
  const output = useMemo(()=> input.split(/\r?\n/).join(separator), [input,separator])
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <label className="small">Separator <input className="input w-28 ml-2" value={separator} onChange={e=>setSeparator(e.target.value)} /></label>
      <div className="grid2 mt-2">
        <TextArea value={input} onChange={setInput}/>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output} filename="no-line-breaks.txt"/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
