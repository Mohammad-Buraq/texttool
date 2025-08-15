'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function JsMinify(){
  const [input, setInput] = useState('')
  let output = ''
  try {
    const s = input || ''
    output = minifyJS(s)
  } catch(e){ output = 'Error: ' + (e?.message || e) }

  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={`// comment
const x = 1 + 2;`} />
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2">
            <CopyButton text={output} />
            <DownloadButton text={output} />
            <ClearButton onClear={() => setInput('')} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

/**
 * Conservative JavaScript minifier without a full parser.
//  * - Strips // and /* */
//  * - Preserves string, template, and regex literals
//  * - Collapses whitespace safely
//  */
function minifyJS(code){
  let out = ''
  let i = 0
  const n = code.length
  let inS = false, inD = false, inT = false, inR = false
  let inBC = false, inLC = false
  while(i < n){
    const c  = code[i]
    const p  = code[i-1]
    const nn = code[i+1]

    // line comment
    if(!inS && !inD && !inT && !inR && !inBC && !inLC && c==='/' && nn==='/' ){
      inLC = true; i+=2; while(i<n && code[i] !== '\n') i++; continue
    }
    // block comment
    if(!inS && !inD && !inT && !inR && !inBC && !inLC && c==='/' && nn==='*' ){
      inBC = true; i+=2
      while(i<n && !(code[i]==='*' && code[i+1]==='/')) i++
      i+=2; continue
    }
    if(inLC){ if(c==='\n'){ inLC=false; out+='\n' } i++; continue }
    if(inBC){ if(c==='*' && nn=== '/'){ inBC=false; i+=2 } else { i++ } continue }

    // strings/templates/regex
    if(!inD && !inT && !inR && c==="'" && !inS){ inS=true; out+=c; i++; continue }
    if(inS){ out+=c; if(c==="'" && p!=='\\') inS=false; i++; continue }

    if(!inS && !inT && !inR && c=='"' && !inD){ inD=true; out+=c; i++; continue }
    if(inD){ out+=c; if(c=='"' && p!=='\\') inD=false; i++; continue }

    if(!inS && !inD && !inR && c==='`' && !inT){ inT=true; out+=c; i++; continue }
    if(inT){ out+=c; if(c==='`' && p!=='\\') inT=false; i++; continue }

    // naive regex literal detection: after certain punctuators
    if(!inS && !inD && !inT && !inR && c==='/' && '/=([{!,:;?*&|^~<>'.includes(p||'') ){
      inR = true; out+=c; i++; continue
    }
    if(inR){ out+=c; if(c==='/' && p!=='\\') inR=false; i++; continue }

    // whitespace collapsing outside literals
    if(/\s/.test(c)){
      const prev = out.slice(-1)
      const idx = (i+1) + (code[i+1]==='\r' && code[i+2]==='\n' ? 2 : 0)
      const m = code.slice(idx).match(/\S/)
      const nextCh = m ? m[0] : ''
      if(/[A-Za-z0-9_$]/.test(prev) && /[A-Za-z0-9_$]/.test(nextCh)){
        out+=' '
      }
      i++; continue
    }

    // trim spaces around punctuators
    if('=+-%*|&^!?:;,<>)}]({'.includes(c)){
      while(out.endsWith(' ')) out = out.slice(0,-1)
      out += c
      i++
      while(i<n && /\s/.test(code[i])) i++
      continue
    }

    out += c
    i++
  }
  return out.trim()
}
