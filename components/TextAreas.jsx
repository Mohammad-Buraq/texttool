'use client'
import { useEffect, useRef } from 'react';
export function TextArea({ value, onChange, placeholder="Paste text here...", className="" }){
  const ref = useRef(null);
  useEffect(()=>{
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = (ref.current.scrollHeight+2) + 'px';
  }, [value]);
  return (
    <textarea ref={ref} className={`ta ${className}`} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} />
  );
}
export function CopyButton({ text }){
  return <button className="btn" onClick={()=>navigator.clipboard.writeText(text||"")}>Copy</button>;
}
export function DownloadButton({ text, filename="output.txt" }){
  return <button className="btn" onClick={()=>{
    const blob = new Blob([text||""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  }}>Download</button>;
}
export function ClearButton({ onClear }){
  return <button className="btn" onClick={onClear}>Clear</button>;
}
