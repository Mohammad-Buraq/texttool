'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function IbanValidator() {
  const [input, setInput] = useState('')
  let output = ''
  try {
    const text = input || ''

    const raw = text.replace(/\s+/g,'').toUpperCase()
    if(!raw) { output = '' }
    else {
      const re = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/
      if(!re.test(raw)) { output = 'Invalid IBAN format' }
      else {
        const rearr = raw.slice(4)+raw.slice(0,4)
        const converted = rearr.replace(/[A-Z]/g, c => (c.charCodeAt(0)-55).toString())
        let mod = 0
        for (let i = 0; i < converted.length; i++) mod = (mod*10 + (converted.charCodeAt(i)-48)) % 97
        output = (mod === 1) ? 'Valid IBAN' : 'Invalid IBAN'
      }
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
          placeholder={`GB82 WEST 1234 5698 7654 32`}
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

