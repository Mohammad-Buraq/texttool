// data/tools-with-dates.js
import { getAllTools as baseGetAllTools } from '@/data/tools'

function hashStr(str){
  let h = 2166136261
  for (let i=0;i<str.length;i++){
    h ^= str.charCodeAt(i); h = Math.imul(h, 16777619)
  }
  return (h >>> 0)
}

function isoFromHash(slug){
  const now = new Date()
  const maxBack = 240 // days
  const days = (hashStr(slug) % maxBack)
  const d = new Date(now.getTime() - days*24*60*60*1000)
  d.setHours(0,0,0,0)
  return d.toISOString().slice(0,10)
}

export function getAllToolsWithDates(){
  const tools = baseGetAllTools()
  return tools.map((t, i) => ({
    ...t,
    dateAdded: t.dateAdded || isoFromHash(t.slug || String(i))
  }))
}

export function getRecentlyAdded(n=10){
  return getAllToolsWithDates()
    .slice()
    .sort((a,b)=> new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, n)
}
