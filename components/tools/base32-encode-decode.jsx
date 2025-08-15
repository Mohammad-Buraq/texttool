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

const ALPH='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
function b32encode(bytes){let o='',i=0,b=0,bt=0;while(i<bytes.length){b=(b<<8)|bytes[i++];bt+=8;while(bt>=5){o+=ALPH[(b>>(bt-5))&31];bt-=5}}if(bt>0)o+=ALPH[(b<<(5-bt))&31];while(o.length%8)o+='=';return o}
function b32decode(s){s=(s||'').toUpperCase().replace(/[^A-Z2-7=]/g,'');let b=0,bt=0,o=[];for(const c of s){if(c==='=')break;const v=ALPH.indexOf(c);if(v<0)continue;b=(b<<5)|v;bt+=5;if(bt>=8){o.push((b>>(bt-8))&255);bt-=8}}return new Uint8Array(o)}

export default function Base32EncodeDecode(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('encode')
  let output=''
  try{const enc=new TextEncoder(),dec=new TextDecoder();output=mode==='encode'?b32encode(enc.encode(input||'')):dec.decode(b32decode(input||''))}catch(e){output='Error: '+(e?.message||e)}
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
