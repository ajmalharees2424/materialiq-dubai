// Local, explicitly invoked snapshot collection. Runtime uses native fetch.
import {readFile,writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {collectSource} from '../lib/scrapers.mjs';
const sources=JSON.parse(await readFile(new URL('../lib/sources.json',import.meta.url),'utf8'));
const previous=JSON.parse(await readFile(new URL('../lib/seed.json',import.meta.url),'utf8'));
const run=promisify(execFile);const fetchText=async url=>{const {stdout}=await run('curl',['--fail','--silent','--show-error','--max-time','20','--max-filesize','5000000',url],{maxBuffer:5000000});return stdout;};
let all=[];let health=[];
for(const s of sources){const r=await collectSource(s,fetchText);all.push(...(r.products.length?r.products:previous.filter(p=>p.supplier===s.name)).map(p=>({...p,status:'snapshot'})));health.push({name:s.name,count:r.products.length,warnings:r.warnings});console.log(s.name,r.products.length,'products;',r.warnings.length,'failed pages');}
await writeFile(new URL('../lib/seed.json',import.meta.url),JSON.stringify(all,null,2)+'\n');await writeFile(new URL('../lib/collection-report.json',import.meta.url),JSON.stringify({attemptedAt:new Date().toISOString(),sources:health},null,2)+'\n');
