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

const ALPH='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const MAP=Object.fromEntries([...ALPH].map((c,i)=>[c,i]))
function b58encode(bytes){
  let z=0; while(z<bytes.length && bytes[z]===0) z++
  let digits=[0]
  for(const b of bytes.slice(z)){
    let carry=b
    for(let i=0;i<digits.length;i++){
      const x=(digits[i]<<8)+carry
      digits[i]=x%58; carry=(x/58)|0
    }
    while(carry){ digits.push(carry%58); carry=(carry/58)|0 }
  }
  return '1'.repeat(z)+digits.reverse().map(d=>ALPH[d]).join('') || '1'
}
function b58decode(str){
  let z=0,i=0; while(i<str.length && str[i]==='1'){ z++; i++ }
  let digits=[0]
  for(;i<str.length;i++){
    const v=MAP[str[i]]; if(v===undefined) continue
    let carry=v
    for(let j=0;j<digits.length;j++){
      const x=digits[j]*58+carry
      digits[j]=x&255; carry=x>>8
    }
    while(carry){ digits.push(carry&255); carry>>=8 }
  }
  const out=new Uint8Array(z+digits.length); out.set(digits.reverse(),z); return out
}

export default function Base58EncodeDecode(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('encode')
  let output=''
  try{const enc=new TextEncoder(),dec=new TextDecoder();output=mode==='encode'?b58encode(enc.encode(input||'')):dec.decode(b58decode(input||''))}catch(e){output='Error: '+(e?.message||e)}
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
