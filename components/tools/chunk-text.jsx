'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function ChunkText(){
  const [input,setInput]=useState('')
  let output=''
  try{
    const m=(input||'').match(/^size\s*=\s*(\d+)\n(?:overlap\s*=\s*(\d+)\n)?(?:joiner\s*=\s*(.*)\n)?([\s\S]*)$/i)
    if(!m){
      output = 'size=160\noverlap=0\njoiner=\\n---\\n\nPaste long text here...'
    }else{
      const size=parseInt(m[1],10)
      const overlap=parseInt(m[2]||'0',10)
      const joiner = (m[3]||'\\n---\\n').replace(/\\n/g,'\n')
      const text=m[4]||''
      if(size<=0) throw new Error('size must be > 0')
      if(overlap<0 || overlap>=size) throw new Error('0 ≤ overlap < size')
      const chunks=[]
      for(let i=0;i<text.length;i+= (size-overlap)){
        chunks.push(text.slice(i, i+size))
        if(i+size>=text.length) break
      }
      output = chunks.join(joiner)
    }
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"size=160\noverlap=0\njoiner=\\n---\\n\nLorem ipsum dolor sit amet..."} />
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
