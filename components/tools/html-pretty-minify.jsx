'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function minifyHtml(txt){
  return txt
    .replace(/<!--[\s\S]*?-->/g,'')
    .replace(/>\s+</g,'><')
    .replace(/\s{2,}/g,' ')
    .trim()
}
function prettyHtml(txt){
  const voids = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'])
  let out='', indent=0
  const tokens = txt.replace(/<!--[\s\S]*?-->/g,'').split(/(<[^>]+>)/g).filter(Boolean)
  for (let t of tokens){
    if (t[0] !== '<'){
      const s = t.replace(/\s+/g,' ').trim()
      if (s) out += ' '.repeat(indent) + s + '\n'
      continue
    }
    const isClose = /^<\//.test(t)
    const tag = (t.match(/^<\s*([a-z0-9-]+)/i)||[])[1]?.toLowerCase?.() || ''
    const isSelf = /\/>$/.test(t) || voids.has(tag)
    if (isClose) indent = Math.max(0, indent - 2)
    out += ' '.repeat(indent) + t + '\n'
    if (!isClose && !isSelf) indent += 2
  }
  return out.trim()
}

export default function HtmlPrettyMinify(){
  const [input, setInput] = useState('')
  let output = ''
  try{
    const text = input || ''
    const m = text.match(/^mode\s*=\s*(pretty|minify)\s*\n([\s\S]*)$/i)
    const mode = (m?.[1] || 'pretty').toLowerCase()
    const payload = m ? m[2] : text
    output = mode === 'minify' ? minifyHtml(payload) : prettyHtml(payload)
  }catch(e){
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`mode=minify|pretty
<div> a </div>`}
        />
        <div>
          <TextArea value={output} onChange={()=>{}} />
          <div className="toolbar mt-2">
            <CopyButton text={output} />
            <DownloadButton text={output} />
            <ClearButton onClear={()=>setInput('')} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
