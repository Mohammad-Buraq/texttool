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

function qpEncode(str){
  const enc=new TextEncoder(); const bytes=enc.encode(str||'')
  let line='', out=''
  const safe=(b)=> (b>=33 && b<=60) || (b>=62 && b<=126) && b!==61
  for(let i=0;i<bytes.length;i++){ 
    const b=bytes[i]
    let chunk
    if(safe(b)){ chunk=String.fromCharCode(b) }
    else if(b===0x20 || b===0x09){ chunk=String.fromCharCode(b) } // space/tab allowed but encoded at EOL
    else { chunk='='+b.toString(16).toUpperCase().padStart(2,'0') }
    if(line.length + chunk.length > 73){ out += line + '=' + '\r\n'; line='' }
    line += chunk
    if(line.length>=73 || i===bytes.length-1){ 
      line=line.replace(/[ \t]$/g, (m)=>'='+m.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0'))
    }
  }
  out += line
  return out.replace(/\n/g,'\r\n')
}
function qpDecode(str){
  const s=(str||'').replace(/=\r?\n/g,'') // soft line breaks
  const bytes=[]
  for(let i=0;i<s.length;i++){ 
    const ch=s[i]
    if(ch==='=' && i+2<s.length && /[0-9A-Fa-f]{2}/.test(s.slice(i+1,i+3))){ 
      bytes.push(parseInt(s.slice(i+1,i+3),16)); i+=2
    } else { bytes.push(ch.charCodeAt(0)) }
  }
  return new TextDecoder().decode(new Uint8Array(bytes))
}

export default function QuotedPrintable(){
  const [input,setInput]=useState('')
  const [mode,setMode]=useState('encode')
  let output=''
  try{ output = mode==='encode' ? qpEncode(input||'') : qpDecode(input||'') }catch(e){ output='Error: '+(e?.message||e) }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} placeholder="Café = nice" />
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
