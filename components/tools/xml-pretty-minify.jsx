'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function XmlPrettyMinify() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    function prettyXml(xml){
      const P=new DOMParser().parseFromString(xml,'application/xml')
      if(P.querySelector('parsererror')) throw new Error('Invalid XML')
      const ser=(node,depth=0)=>{
        if(node.nodeType===Node.TEXT_NODE){
          const t=(node.nodeValue||'').trim()
          return t ? '  '.repeat(depth)+t+'\n' : ''
        }
        if(node.nodeType===Node.DOCUMENT_NODE){
          return Array.from(node.childNodes).map(n=>ser(n,0)).join('')
        }
        const el = node
        let s='  '.repeat(depth)+'<'+el.nodeName
        for(const a of Array.from(el.attributes)){ s+= ` ${a.name}="${a.value}"` }
        if(el.childNodes.length===0){ return s + '/>\n' }
        s+='>\n'
        s+=Array.from(el.childNodes).map(n=>ser(n,depth+1)).join('')
        s+='  '.repeat(depth)+`</${el.nodeName}>\n`
        return s
      }
      return ser(P)
    }
    function minifyXml(xml){ return xml.replace(/>\s+</g,'><').replace(/\s{2,}/g,' ').trim() }
    const m = text.match(/^mode\s*=\s*(pretty|minify)\s*\n([\s\S]*)$/i)
    const mode = (m?.[1]||'pretty').toLowerCase()
    const payload = m ? m[2] : text
    output = mode==='pretty'? prettyXml(payload) : minifyXml(payload)

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`mode=pretty|minify
<root><a x='1'>y</a></root>`}
        />
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

