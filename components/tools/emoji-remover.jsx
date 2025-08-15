'use client'
import { useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function EmojiRemover(){
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''
    let re
    try {
      re = /[\p{Extended_Pictographic}\uFE0F]/gu
    } catch {
      re = /[\u2700-\u27BF\u2190-\u21FF\u2600-\u26FF\uFE0F\u200D\u{1F000}-\u{1FAFF}]/gu
    }
    output = text.replace(re,'').replace(/\u200D/g,'').replace(/\uFE0F/g,'').replace(/[ \t]{2,}/g,' ').trim()
  } catch(e){ output = 'Error: ' + (e?.message || e) }
  return (
    <ToolShell onCopy={() => navigator.clipboard.writeText(output)} onClear={() => setInput('')}>
      <div className="grid2">
        <TextArea value={input} onChange={setInput} placeholder={`Paste text with emoji here … 😄🤝🏽👨‍👩‍👧‍👦🏳️‍🌈`} />
        <div>
          <TextArea value={output} onChange={() => {}} />
          <div className="toolbar mt-2"><CopyButton text={output}/><DownloadButton text={output}/><ClearButton onClear={() => setInput('')} /></div>
        </div>
      </div>
    </ToolShell>
  )
}
