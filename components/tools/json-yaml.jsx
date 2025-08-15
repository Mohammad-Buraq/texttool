'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function JsonYaml() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const m = text.match(/^mode\s*=\s*(json-to-yaml|yaml-to-json)\s*\n([\s\S]*)$/i)
    if(!m){ output = 'mode=json-to-yaml|yaml-to-json\n...' }
    else {
      const mode = m[1].toLowerCase()
      const payload = m[2]
      function toYAML(obj, depth=0){
        const pad = '  '.repeat(depth)
        if(obj==null) return 'null'
        if(typeof obj==='boolean' || typeof obj==='number') return String(obj)
        if(typeof obj==='string'){ if(/[:#\-?&*!|>'"@{}\[\],%]/.test(obj)) return JSON.stringify(obj); return obj }
        if(Array.isArray(obj)){
          return obj.map(v=> pad+'- '+ (typeof v==='object'? '\n'+toYAML(v, depth+1): toYAML(v, depth))).join('\n')
        }
        return Object.keys(obj).map(k=> pad + k + ': ' + (typeof obj[k]==='object'? '\n'+toYAML(obj[k], depth+1) : toYAML(obj[k], depth))).join('\n')
      }
      function fromYAML(y){
        const lines = y.replace(/\t/g,'  ').split(/\r?\n/)
        const stack=[{indent:-1, obj:{}}]
        for(const line of lines){
          if(!line.trim()||/^#/.test(line)) continue
          const indent = line.match(/^\s*/)[0].length
          while(stack.length && indent <= stack[stack.length-1].indent) stack.pop()
          let cur = stack[stack.length-1]
          const mArr = line.trim().match(/^-\s+(.*)$/)
          if(mArr){
            if(!Array.isArray(cur.obj)) cur.obj = []
            const item = mArr[1]
            if(/:/.test(item)){ const o={}; cur.obj.push(o); stack.push({indent, obj:o}); const kv=item.split(/\s*:\s*/); o[kv[0]]=kv[1]||'' }
            else cur.obj.push(item)
            continue
          }
          const kv = line.trim().split(/:\s*/)
          const key = kv[0]; const val = kv.slice(1).join(': ')
          if(val===''){ const o={}; cur.obj[key]=o; stack.push({indent, obj:o}) }
          else { cur.obj[key] = /^\d+$/.test(val)? Number(val) : (/^(true|false)$/i.test(val)? val.toLowerCase()==='true' : val) }
        }
        return stack[0].obj
      }
      if(mode==='json-to-yaml'){ const o = JSON.parse(payload); output = toYAML(o) }
      else { const o = fromYAML(payload); output = JSON.stringify(o,null,2) }
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
          placeholder={`mode=json-to-yaml
{"a":1,"b":[2,3]}`}
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

