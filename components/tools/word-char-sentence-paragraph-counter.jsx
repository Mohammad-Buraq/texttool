'use client'
import {useMemo, useState} from 'react'
import ToolShell from '@/components/ToolShell'
import {TextArea, CopyButton, DownloadButton, ClearButton} from '@/components/TextAreas'

function stats(text){
  const chars = [...text].length
  const charsNoSpaces = [...text.replace(/\s+/g,'')].length
  const words = (text.match(/\b[\p{L}\p{N}'-]+\b/gu) || []).length
  const sentences = (text.match(/[.!?]+(?=\s|$)/g) || []).length
  const paragraphs = text.trim() ? (text.trim().split(/(?:\r?\n){2,}/).length) : 0
  const avgWordLen = words ? (charsNoSpaces/words) : 0
  const readingTimeMin = words ? Math.ceil(words/200) : 0
  return {chars, charsNoSpaces, words, sentences, paragraphs, avgWordLen, readingTimeMin}
}

export default function WordCharSentenceParagraphCounter(){
  const [input,setInput] = useState('Hello world. This is a sample.\n\nTwo paragraphs!')
  const s = useMemo(()=>stats(input), [input])
  const output = [
    `Words: ${s.words}`,
    `Characters (with spaces): ${s.chars}`,
    `Characters (no spaces): ${s.charsNoSpaces}`,
    `Sentences: ${s.sentences}`,
    `Paragraphs: ${s.paragraphs}`,
    `Average word length: ${s.avgWordLen.toFixed(2)}`,
    `Reading time: ${s.readingTimeMin} min`
  ].join('\n')

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)}
              onDownload={()=>{}}
              onClear={()=>setInput('')}>
      <div className="card small mb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div><strong>Words</strong>: {s.words}</div>
        <div><strong>Sentences</strong>: {s.sentences}</div>
        <div><strong>Paragraphs</strong>: {s.paragraphs}</div>
        <div><strong>Chars</strong>: {s.chars}</div>
      </div>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={'Paste text here'} />
        <div>
          <TextArea value={output} onChange={()=>{}} placeholder="Stats"/>
          <div className="toolbar mt-2">
            <CopyButton text={output}/>
            <DownloadButton text={output} filename="text-stats.txt"/>
            <ClearButton onClear={()=>setInput('')}/>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
