
'use client'
import {useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

export default function MorseCodeEncodeDecode() {
  const [input, setInput] = useState('')

  const output = (() => {
  const map = {a:'.-',b:'-...',c:'-.-.',d:'-..',e:'.',f:'..-.',g:'--.',h:'....',i:'..',j:'.---',k:'-.-',l:'.-..',m:'--',n:'-.',o:'---',p:'.--.',q:'--.-',r:'.-.',s:'...',t:'-',u:'..-',v:'...-',w:'.--',x:'-..-',y:'-.--',z:'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',' ':'/'}
  const rev = Object.fromEntries(Object.entries(map).map(([k,v])=>[v,k]))
  const mode = 'encode'
  return mode==='encode'
    ? [...input.toLowerCase()].map(ch=>map[ch] ?? ch).join(' ')
    : input.split(/\s+/).map(token=>rev[token] ?? token).join('')
})()

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onDownload={()=>{}} onClear={()=>setInput('')}>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder="Input" />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Output"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="morse-code-encode-decode.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
