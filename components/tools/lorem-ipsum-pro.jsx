'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

function generate(paras=3, sentMin=3, sentMax=7, wordMin=4, wordMax=10){
  const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua vitae aliquet nec ullamcorper sit amet risus nullam eget".split(' ')
  function rand(n){ return Math.floor(Math.random()*n) }
  function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1) }
  const out=[]
  for(let p=0;p<paras;p++){
    const sCount = Math.max(sentMin, Math.min(sentMax, sentMin + rand(sentMax - sentMin + 1)))
    const sentences=[]
    for(let s=0;s<sCount;s++){
      const wCount = Math.max(wordMin, Math.min(wordMax, wordMin + rand(wordMax - wordMin + 1)))
      const arr=[]
      for(let w=0;w<wCount;w++) arr.push(words[rand(words.length)])
      let sentence = cap(arr.join(' ')).replace(/\s+/g,' ') + '.'
      sentences.push(sentence)
    }
    out.push(sentences.join(' '))
  }
  return out.join('\n\n')
}
export default function LoremIpsumPro(){
  const [paras,setParas]=useState(3)
  const [smin,setSmin]=useState(3)
  const [smax,setSmax]=useState(7)
  const [wmin,setWmin]=useState(4)
  const [wmax,setWmax]=useState(10)
  const [output,setOutput]=useState('')

  function regen(){
    const p=Math.max(1, parseInt(paras||1,10))
    const sm=Math.max(1, parseInt(smin||1,10))
    const sx=Math.max(sm, parseInt(smax||sm,10))
    const wm=Math.max(1, parseInt(wmin||1,10))
    const wx=Math.max(wm, parseInt(wmax||wm,10))
    setOutput(generate(p, sm, sx, wm, wx))
  }
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>{setOutput('')}}>
      <div className="grid2">
        <div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2">Paragraphs
              <input className="input w-24" type="number" min="1" value={paras} onChange={e=>setParas(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Sentences (min)
              <input className="input w-24" type="number" min="1" value={smin} onChange={e=>setSmin(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Sentences (max)
              <input className="input w-24" type="number" min="1" value={smax} onChange={e=>setSmax(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Words (min)
              <input className="input w-24" type="number" min="1" value={wmin} onChange={e=>setWmin(e.target.value)} />
            </label>
            <label className="flex items-center gap-2">Words (max)
              <input className="input w-24" type="number" min="1" value={wmax} onChange={e=>setWmax(e.target.value)} />
            </label>
          </div>
          <div className="mt-3">
            <button className="btn" onClick={regen}>Generate</button>
          </div>
        </div>
        <div>
          <TextArea value={output} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={()=>{setOutput('')}}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
