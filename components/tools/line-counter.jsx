'use client'
import { useMemo, useState } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton } from '@/components/TextAreas'

export default function LineCounter(){
  const [input,setInput] = useState('one\ntwo\n\nthree')
  const lines = useMemo(()=> input.split(/\r?\n/).length, [input])
  const nonEmpty = useMemo(()=> input.split(/\r?\n/).filter(l=>/\S/.test(l)).length, [input])
  return (
    <ToolShell>
      <div className="flex gap-4 small mb-2">
        <div><strong>Total lines:</strong> {lines}</div>
        <div><strong>Non-empty:</strong> {nonEmpty}</div>
      </div>
      <TextArea value={input} onChange={setInput}/>
      <div className="toolbar mt-2"><CopyButton text={String(lines)}/></div>
    </ToolShell>
  )
}
