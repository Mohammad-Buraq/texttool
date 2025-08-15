'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

export default function SortLines(){
  const [input, setInput] = useState('banana\nApple\ncherry\ndate')
  const [descending, setDescending] = useState(false)    // bool instead of 'asc'|'desc'
  const [caseSensitive, setCaseSensitive] = useState(false)

  const output = useMemo(()=>{
    const arr = input.split(/\r?\n/)
    const cmp = (a, b) => {
      if (!caseSensitive) { a = a.toLowerCase(); b = b.toLowerCase() }
      return a.localeCompare(b, 'en', { numeric: true })
    }
    arr.sort(cmp)
    if (descending) arr.reverse()
    return arr.join('\n')
  }, [input, descending, caseSensitive])

  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(output)} onClear={()=>setInput('')}>
      <div className="flex gap-4 items-center flex-wrap mb-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={descending} onChange={e=>setDescending(e.target.checked)} />
          Z→A
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={caseSensitive} onChange={e=>setCaseSensitive(e.target.checked)} />
          Case sensitive
        </label>
      </div>

      <div className="grid2">
        <TextArea value={input} onChange={setInput} />
        <div>
          <TextArea value={output} onChange={()=>{}} />
          <div className="toolbar mt-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="sorted.txt" />
            <ClearButton onClear={()=>setInput('')} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

