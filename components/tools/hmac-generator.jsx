'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function HmacGenerator(){
  const [data,setData]=useState('hello')
  const [key,setKey]=useState('secret')
  const [algo,setAlgo]=useState('SHA-256')
  const [out,setOut]=useState('')

  useEffect(()=>{
    let cancelled=false
    ;(async()=>{
      try{
        const enc=new TextEncoder()
        const k=await crypto.subtle.importKey('raw', enc.encode(key), {name:'HMAC', hash:{name:algo}}, false, ['sign'])
        const sig=await crypto.subtle.sign('HMAC', k, enc.encode(data))
        const hex=Array.from(new Uint8Array(sig)).map(b=>b.toString(16).padStart(2,'0')).join('')
        if(!cancelled) setOut(hex)
      }catch(e){
        if(!cancelled) setOut('Error: ' + (e?.message||e))
      }
    })()
    return ()=>{cancelled=true}
  }, [data,key,algo])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(out)} onClear={()=>{setData(''); setKey(''); setOut('')}}>
      <div className="grid2">
        <div>
          <TextArea value={data} onChange={setData} placeholder="Data (message)"/>
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">Key
              <input className="input" value={key} onChange={e=>setKey(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Algorithm
              <select className="input" value={algo} onChange={e=>setAlgo(e.target.value)}>
                <option>SHA-256</option>
                <option>SHA-384</option>
                <option>SHA-512</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <TextArea value={out} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={out}/><DownloadButton text={out}/><ClearButton onClear={()=>{setData(''); setKey(''); setOut('')}}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
