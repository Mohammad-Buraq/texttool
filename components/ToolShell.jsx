'use client'
import { useEffect } from 'react';
export default function ToolShell({ children, onCopy, onDownload, onClear }){
  useEffect(()=>{
    function onKey(e){
      if (!e.altKey) return;
      if (e.code==='KeyC'){ e.preventDefault(); onCopy && onCopy(); }
      if (e.code==='KeyD'){ e.preventDefault(); onDownload && onDownload(); }
      if (e.code==='KeyL'){ e.preventDefault(); onClear && onClear(); }
    }
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  }, [onCopy, onDownload, onClear]);
  return <div className="space-y-4">{children}</div>;
}
