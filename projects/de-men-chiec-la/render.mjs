import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
const require=createRequire('/workspace/cloud-setup/animation/package.json');
const {chromium}=require('@playwright/test');
const root=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(fs.readFileSync(path.join(root,'timeline.json'),'utf8'));
const output=path.resolve(process.argv[2]||path.join(root,'../../output/de-men-chiec-la-60s.mp4'));
if(fs.existsSync(output))throw Error(`Output exists; move it aside before rendering: ${output}`);
fs.mkdirSync(path.dirname(output),{recursive:true});
const server=http.createServer((req,res)=>{const target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!target.startsWith(root+'/'))return res.writeHead(403).end();fs.readFile(target,(err,b)=>{if(err)return res.writeHead(404).end();res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.json':'application/json','.woff2':'font/woff2'})[path.extname(target)]||'application/octet-stream');res.end(b)})});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser,ffmpeg;
try{
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true});
 const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(`${r.status()}: ${r.url()}`)});
 await page.goto(`http://127.0.0.1:${server.address().port}/anim.html`);await page.evaluate(()=>window.ready);
 if(process.env.REVIEW){
 const dir=process.env.REVIEW;fs.mkdirSync(dir,{recursive:true});
 for(const t of [0,6,9,12,16,20,26,28,31,36,40,45,48,51,54,57,59.966667]){await page.evaluate(t=>window.renderFrame(t),t);await page.screenshot({path:path.join(dir,`${t}.png`)});}
 if(errors.length)throw Error(errors.join('\n'));console.log('Review frames saved:',dir);
 }else{
 ffmpeg=spawn('ffmpeg',['-nostdin','-v','error','-n','-f','image2pipe','-vcodec','mjpeg','-framerate','30','-i','pipe:0','-i',path.join(root,'soundtrack.wav'),'-map','0:v:0','-map','1:a:0','-vf','scale=in_range=full:out_range=tv,format=yuv420p','-c:v','libx264','-threads','2','-crf','18','-r','30','-c:a','aac','-b:a','192k','-movflags','+faststart',output],{stdio:['pipe','ignore','pipe']});
 let log='';ffmpeg.stderr.on('data',b=>log+=b);const done=once(ffmpeg,'close');
 ffmpeg.stdin.on('error',()=>{});
 const frames=data.frames;
 for(let i=0;i<frames;i++){
  if(errors.length)throw Error(errors.join('\n'));
  const b64=await page.evaluate(t=>window.draw({t}),i/30);
  if(ffmpeg.exitCode!==null)throw Error(log);
  if(!ffmpeg.stdin.write(Buffer.from(b64,'base64')))await once(ffmpeg.stdin,'drain');
  if(i%150===0)console.log(`Rendered ${i}/${frames} (${(i/30).toFixed(1)}s)`);
 }
 ffmpeg.stdin.end();const [code]=await done;if(code!==0)throw Error(log);
 if(errors.length)throw Error(errors.join('\n'));
 console.log('Complete:',output,'frames:',frames);
 }
}finally{if(ffmpeg&&ffmpeg.exitCode===null)ffmpeg.kill();if(browser)await browser.close();await new Promise(r=>server.close(r))}
