'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function ChecksumHash(){
  const [input,setInput]=useState('hello')
  const [algo,setAlgo]=useState('SHA-256')
  const [out,setOut]=useState('')
  useEffect(()=>{
    let c=false
    ;(async()=>{
      try{
        const enc=new TextEncoder()
        const buf=enc.encode(input||'')
        const dig=await crypto.subtle.digest(algo, buf)
        const hex=Array.from(new Uint8Array(dig)).map(b=>b.toString(16).padStart(2,'0')).join('')
        if(!c) setOut(hex)
      }catch(e){ if(!c) setOut('Error: ' + (e?.message||e)) }
    })()
    return ()=>{c=true}
  }, [input,algo])
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(out)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <div className="mt-2 flex items-center gap-4">
            <label className="flex items-center gap-2">Algorithm
              <select className="input" value={algo} onChange={e=>setAlgo(e.target.value)}>
                <option>SHA-1</option>
                <option>SHA-256</option>
                <option>SHA-384</option>
                <option>SHA-512</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <TextArea value={out} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={out}/><DownloadButton text={out}/><ClearButton onClear={()=>{setInput('')}}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
