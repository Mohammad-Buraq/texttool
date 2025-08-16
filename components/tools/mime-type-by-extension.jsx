'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { TextArea, CopyButton, DownloadButton, ClearButton } from '@/components/TextAreas'

const MAP = {
  'txt':'text/plain','csv':'text/csv','html':'text/html','htm':'text/html','css':'text/css','js':'application/javascript','mjs':'application/javascript',
  'json':'application/json','xml':'application/xml','pdf':'application/pdf',
  'jpg':'image/jpeg','jpeg':'image/jpeg','png':'image/png','gif':'image/gif','webp':'image/webp','svg':'image/svg+xml','ico':'image/x-icon',
  'mp3':'audio/mpeg','wav':'audio/wav','ogg':'audio/ogg',
  'mp4':'video/mp4','webm':'video/webm','mov':'video/quicktime',
  'zip':'application/zip','gz':'application/gzip','tar':'application/x-tar','rar':'application/vnd.rar','7z':'application/x-7z-compressed',
  'woff':'font/woff','woff2':'font/woff2','ttf':'font/ttf','otf':'font/otf',
};
function guessOne(s, filenames){
  const str = (s||'').trim()
  if(!str) return ''
  let ext = ''
  if(filenames){
    const m = str.match(/\.([A-Za-z0-9]+)$/)
    ext = m ? m[1] : ''
  }else{
    ext = str.replace(/^\./,'')
  }
  ext = ext.toLowerCase()
  const mt = MAP[ext] || 'application/octet-stream'
  return filenames ? (str + ' => ' + mt) : (ext + ' ' + mt)
}
export default function MimeTypeByExtension(){
  const [input,setInput]=useState('index.html\nphoto.jpg\narchive.tar.gz\nREADME')
  const [filenames,setFilenames]=useState(true)
  const lines=(input||'').split(/\r?\n/)
  const out = lines.map(l=>guessOne(l, filenames)).filter(Boolean).join('\n')
  return (
    <ToolShell onCopy={()=>navigator.clipboard.writeText(out)} onClear={()=>{setInput('')}}>
      <div className="grid2">
        <div>
          <TextArea value={input} onChange={setInput} />
          <label className="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" checked={filenames} onChange={e=>setFilenames(e.target.checked)} />
            <span>Input contains filenames (uncheck for extensions only)</span>
          </label>
        </div>
        <div>
          <TextArea value={out} onChange={()=>{}}/>
          <div className="toolbar mt-2"><CopyButton text={out}/><DownloadButton text={out}/><ClearButton onClear={()=>{setInput('')}}/></div>
        </div>
      </div>
    </ToolShell>
  )
}
