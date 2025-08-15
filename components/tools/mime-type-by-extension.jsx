'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function MimeTypeByExtension() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const ext = text.trim().replace(/^\./,'').toLowerCase()
    if(!ext) output = ''
    else {
      const map={html:'text/html',htm:'text/html',css:'text/css',js:'application/javascript',mjs:'application/javascript',json:'application/json',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',svg:'image/svg+xml',pdf:'application/pdf',txt:'text/plain',csv:'text/csv',zip:'application/zip',xml:'application/xml',mp3:'audio/mpeg',mp4:'video/mp4'}
      output = map[ext]||'application/octet-stream'
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
          placeholder={`.png`}
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

