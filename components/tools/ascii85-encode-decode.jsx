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

function a85encode(bytes){
  let out='<~'
  for(let i=0;i<bytes.length;i+=4){
    const c=bytes.subarray(i,i+4)
    if(c.length<4){
      const pad=new Uint8Array(4); pad.set(c)
      let n=(pad[0]<<24)|(pad[1]<<16)|(pad[2]<<8)|pad[3]; let block=[]
      for(let j=0;j<5;j++){ block.unshift((n%85)+33); n=(n/85)|0 }
      out+=String.fromCharCode(...block.slice(0,c.length+1)); break
    }else{
      const n=(c[0]<<24)|(c[1]<<16)|(c[2]<<8)|c[3]
      if(n===0){ out+='z'; continue }
      let x=n>>>0, block=[]
      for(let j=0;j<5;j++){ block.unshift((x%85)+33); x=Math.floor(x/85) }
      out+=String.fromCharCode(...block)
    }
  }
  return out+'~>'
}
function a85decode(str){
  const s=(str||'').replace(/\s+/g,'').replace(/^<~|~>$/g,'').replace(/z/g,'!!!!!')
  let out=[]
  for(let i=0;i<s.length;i+=5){
    let ch=s.slice(i,i+5)
    if(ch.length<5){
      const pad=5-ch.length; ch+='u'.repeat(pad)
      let n=0; for(let j=0;j<5;j++) n=n*85+(ch.charCodeAt(j)-33)
      n-= (85**pad - 1)
      out.push((n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255)
      out=out.slice(0,out.length-(pad)); break
    }else{
      let n=0; for(let j=0;j<5;j++) n=n*85+(ch.charCodeAt(j)-33)
      out.push((n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255)
    }
  }
  return new Uint8Array(out)
}

export default function Ascii85EncodeDecode(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('encode')
  let output=''
  try{const enc=new TextEncoder(),dec=new TextDecoder();output=mode==='encode'?a85encode(enc.encode(input||'')):dec.decode(a85decode(input||''))}catch(e){output='Error: '+(e?.message||e)}
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
