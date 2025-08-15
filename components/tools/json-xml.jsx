'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function JsonXml() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const m = text.match(/^mode\s*=\s*(json-to-xml|xml-to-json)\s*\n([\s\S]*)$/i)
    if(!m){ output = 'mode=json-to-xml|xml-to-json\n...' }
    else {
      const mode = m[1].toLowerCase()
      const payload = m[2]
      function objToXml(obj, name='root', depth=0){
        const pad = '  '.repeat(depth)
        if(obj==null) return `${pad}<${name}/>`
        if(Array.isArray(obj)) return obj.map(v=>objToXml(v,name,depth)).join('\n')
        if(typeof obj !== 'object') return `${pad}<${name}>${String(obj)}</${name}>`
        let out = `${pad}<${name}>\n`
        for(const k of Object.keys(obj)) out += objToXml(obj[k], k, depth+1) + '\n'
        out += `${pad}</${name}>`
        return out
      }
      function xmlToObj(xml){
        const P = new DOMParser().parseFromString(xml, 'application/xml')
        if(P.querySelector('parsererror')) throw new Error('Bad XML')
        function ser(node){
          if(node.nodeType===Node.TEXT_NODE) return (node.nodeValue||'').trim()
          const el = node; const children = Array.from(el.childNodes).filter(n=>n.nodeType!==Node.TEXT_NODE || (n.nodeValue||'').trim())
          if(children.length===0) return ''
          const obj={}
          for(const c of children){
            const key = c.nodeName
            const v = ser(c)
            if(obj[key]==null) obj[key]=v
            else if(Array.isArray(obj[key])) obj[key].push(v)
            else obj[key] = [obj[key], v]
          }
          return obj
        }
        return ser(P)
      }
      if(mode==='json-to-xml'){ const o = JSON.parse(payload); output = objToXml(o,'root') }
      else { const o = xmlToObj(payload); output = JSON.stringify(o,null,2) }
    }

  } catch (e) {
    output = 'Error: ' + (e?.message || e)
  }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder={`mode=json-to-xml
{"note":{"to":"Bob","msg":"hi"}`}
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

