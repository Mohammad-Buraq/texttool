'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function htmlToMd(html){
  const P=new DOMParser().parseFromString(html,'text/html')
  function walk(node){
    if(node.nodeType===Node.TEXT_NODE) return node.nodeValue
    const name=node.nodeName.toLowerCase()
    const kids=[...node.childNodes].map(walk).join('')
    switch(name){
      case 'strong': case 'b': return `**${kids}**`
      case 'em': case 'i': return `*${kids}*`
      case 'code': return '`'+kids+'`'
      case 'a': return `[${kids}](${node.getAttribute('href')||''})`
      case 'br': return '  \n'
      case 'p': return kids.trim()? kids.trim()+'\n\n' : ''
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': {
        const level=+name[1]; return `${'#'.repeat(level)} ${kids.trim()}\n\n`
      }
      case 'li': return '- '+kids+'\n'
      case 'ul': case 'ol': return kids+'\n'
      default: return kids
    }
  }
  const body=[...P.body.childNodes].map(walk).join('').trim()
  return body
}
export default function HtmlToMarkdown(){
  const [input,setInput]=useState('')
  let output=''
  try{
    output = input ? htmlToMd(input) : ''
  }catch(e){ output='Error: ' + (e?.message||e) }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={"<h1>Title</h1><p><strong>Bold</strong> and <em>italic</em></p>"} /> 
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>setInput('')}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
