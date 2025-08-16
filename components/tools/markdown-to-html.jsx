'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function mdToHtml(md){
  const lines=(md||'').split(/\r?\n/)
  const out=[]; let i=0
  function inline(s){
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
         .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
         .replace(/__([^_]+)__/g,'<strong>$1</strong>')
         .replace(/\*([^*]+)\*/g,'<em>$1</em>')
         .replace(/_([^_]+)_/g,'<em>$1</em>')
         .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>')
    return s
  }
  while(i<lines.length){
    const l=lines[i]
    if(/^#{1,6}\s+/.test(l)){
      const m=l.match(/^(#{1,6})\s+(.*)$/); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); i++; continue
    }
    if(/^\s*[-*]\s+/.test(l)){
      const items=[]
      while(i<lines.length && /^\s*[-*]\s+/.test(lines[i])){ items.push('<li>'+inline(lines[i].replace(/^\s*[-*]\s+/,''))+'</li>'); i++ }
      out.push('<ul>'+items.join('')+'</ul>'); continue
    }
    if(/^\s*\d+\.\s+/.test(l)){
      const items=[]
      while(i<lines.length && /^\s*\d+\.\s+/.test(lines[i])){ items.push('<li>'+inline(lines[i].replace(/^\s*\d+\.\s+/,''))+'</li>'); i++ }
      out.push('<ol>'+items.join('')+'</ol>'); continue
    }
    const buf=[]; while(i<lines.length && lines[i].trim()!==''){ buf.push(lines[i]); i++ }
    if(buf.length){ out.push('<p>'+inline(buf.join(' '))+'</p>') } else { i++ }
  }
  return out.join('\n')
}
export default function MarkdownToHtml(){
  const [input,setInput]=useState('')
  let output=''
  try{
    output = input ? mdToHtml(input) : ''
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"# Title\n\n*One* **two** and a [link](https://example.com)"} /> 
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
