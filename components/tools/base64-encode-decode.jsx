'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function Radios({ mode, setMode }) {
  return (
    <div className="mt-2 flex items-center gap-6">
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input type="radio" name="mode" checked={mode==='encode'} onChange={()=>setMode('encode')} />
        <span>Encode</span>
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input type="radio" name="mode" checked={mode==='decode'} onChange={()=>setMode('decode')} />
        <span>Decode</span>
      </label>
    </div>
  )
}

function bytesToBase64(bytes){let bin='',ch=0x8000;for(let i=0;i<bytes.length;i+=ch){bin+=String.fromCharCode.apply(null,bytes.subarray(i,i+ch))}return btoa(bin)}
function base64ToBytes(b64){const bin=atob((b64||'').replace(/\s+/g,''));const out=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)out[i]=bin.charCodeAt(i);return out}

export default function Base64EncodeDecode(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('encode')
  let output=''
  try{const enc=new TextEncoder(),dec=new TextDecoder();output=mode==='encode'?bytesToBase64(enc.encode(input||'')):dec.decode(base64ToBytes(input||''))}catch(e){output='Error: '+(e?.message||e)}
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} placeholder="Type text here..." />
          <Radios mode={mode} setMode={setMode} />
        </div>
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={() => setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
