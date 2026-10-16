/* Original continuous Canvas explainer; sentence timing estimated from measured silences and transcript length. */
const cv=document.getElementById('c'),g=cv.getContext('2d'),TAU=Math.PI*2;
const C={navy:'#0a1030',deep:'#14224c',sea:'#1769a0',seaLight:'#2696cb',land:'#69c4ab',cyan:'#65e2df',gold:'#ffd16c',pink:'#fa91bd',coral:'#ff7f8e',white:'#f1f4e6',ink:'#15384e'};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t;
const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10)};
const step=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
let A,S;
const start=i=>S[i].start,end=i=>S[i].end;
const at=(i,j,p)=>lerp(start(i),end(j),p);
function blend(a,b,p){const A=parseInt(a.slice(1),16),B=parseInt(b.slice(1),16);return '#'+[16,8,0].map(k=>Math.round(lerp((A>>k)&255,(B>>k)&255,clamp(p))).toString(16).padStart(2,'0')).join('')}
function dot(x,y,r,c){g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,TAU);g.fill()}
function ellipse(x,y,rx,ry,c,a=0){g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,a,0,TAU);g.fill()}
function round(x,y,w,h,r,c){g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()}
function line(x,y,X,Y,c,w){g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(X,Y);g.stroke()}
function polygon(p,c){g.fillStyle=c;g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()}
function text(s,x,y,size=24,c=C.white,align='center'){g.font=`500 ${size}px Catalog,sans-serif`;g.fillStyle=c;g.textAlign=align;g.textBaseline='middle';g.fillText(s,x,y)}
function glow(x,y,r,c,a){g.save();g.globalAlpha*=a;const z=g.createRadialGradient(x,y,0,x,y,r);z.addColorStop(0,c);z.addColorStop(1,c+'00');g.fillStyle=z;g.fillRect(x-r,y-r,r*2,r*2);g.restore()}
function crescent(x,y,r){g.save();g.beginPath();g.arc(x,y,r,0,TAU);g.clip();g.fillStyle='#10143d55';g.beginPath();g.rect(x-r,y-r,r*2,r*2);g.moveTo(x-r*.2+r*1.01,y-r*.2);g.arc(x-r*.2,y-r*.2,r*1.01,0,TAU,true);g.fill('evenodd');g.restore()}
let randomSeed=918;const rand=()=>((randomSeed=randomSeed*16807%2147483647)/2147483647);
const stars=Array.from({length:115},()=>({x:rand()*1920,y:rand()*1080,r:.6+rand()*1.7,p:rand()*TAU}));
// Stylized geographic centers; not statistical data or a political boundary map.
const nodes=[{name:'Mỹ',x:728,y:454},{name:'Hàn Quốc',x:1214,y:443},{name:'Đài Loan',x:1236,y:507},{name:'Nhật Bản',x:1293,y:425},{name:'Trung Quốc',x:1138,y:470},{name:'Việt Nam',x:1154,y:563},{name:'Châu Âu',x:970,y:394},{name:'Châu Phi',x:949,y:601},{name:'Nam Mỹ',x:802,y:684},{name:'Australia',x:1260,y:721}];
const edges=[[0,6],[6,4],[4,1],[1,3],[3,2],[2,5],[5,4],[5,0],[0,8],[8,7],[7,6],[7,9],[9,5],[6,3],[0,4]];
function route(a,b,p){const h=-Math.min(150,Math.hypot(b.x-a.x,b.y-a.y)*.25);return{x:lerp(a.x,b.x,p),y:lerp(a.y,b.y,p)+Math.sin(p*Math.PI)*h}}
function link(a,b,color,width=2,amount=1){g.strokeStyle=color;g.lineWidth=width;g.beginPath();for(let j=0;j<=40;j++){const p=amount*j/40,q=route(a,b,p);j?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)}g.stroke()}
function parcel(x,y,s=1){g.save();g.translate(x,y);g.scale(s,s);round(-13,-11,26,22,4,C.gold);polygon([[-13,-8],[0,-1],[13,-8],[0,-14]],'#ffe5a2');line(0,-1,0,10,'#bc864c',2);line(-7,-12,6,-5,'#bc864c',3);g.restore()}
function chip(x,y,s=1){g.save();g.translate(x,y);g.scale(s,s);for(let i=-1;i<2;i++){line(-19,i*8,19,i*8,C.cyan,3);line(i*8,-19,i*8,19,C.cyan,3)}round(-13,-13,26,26,5,C.ink);round(-8,-8,16,16,3,C.cyan);g.restore()}
function coin(x,y,s=1){g.save();g.translate(x,y);g.scale(s,s);dot(0,0,14,C.gold);dot(-2,-2,10,'#ffe9ac');text('$',0,1,17,'#ac7445');g.restore()}
function music(x,y,s=1){g.save();g.translate(x,y);g.scale(s,s);line(0,10,0,-15,C.pink,5);line(0,-15,17,-20,C.pink,5);line(17,-20,17,5,C.pink,5);ellipse(-5,11,8,5,C.pink,-.3);ellipse(12,6,8,5,C.pink,-.3);g.restore()}
function film(x,y,s=1){g.save();g.translate(x,y);g.scale(s,s);round(-17,-12,34,24,4,C.pink);for(let i=-1;i<=1;i++){round(i*10-3,-10,5,4,1,C.ink);round(i*10-3,6,5,4,1,C.ink)}polygon([[-4,-5],[7,0],[-4,5]],C.ink);g.restore()}
function person(x,y,sc,t,mode='walk',phase=0){g.save();g.translate(x,y);g.scale(sc,sc);const mood=typeof mode==='number'?mode:(mode==='sad'?1:0),wave=typeof mode==='number'?1-mood:(mode==='wave'?1:0),move=mode==='walk'?Math.sin(t*5+phase):0;ellipse(0,3,17,4,'#071c3555');line(-5,-16,-8+move*5,0,'#224966',6);line(5,-16,9-move*5,0,'#224966',6);round(-11,-46,22,32,7,C.cyan);line(-10,-38,-17-move*6,-21,'#e8ad83',5);line(10,-38,18+move*6,-23-wave*(Math.sin(t*4)*5+17),'#e8ad83',5);dot(0,-59,14,'#f0c292');g.save();g.translate(0,-59);g.rotate(mood*.2+(1-mood)*Math.sin(t*.7+phase)*.025);ellipse(-1,-9,13,7,'#26384c');dot(-4,0,1.2,C.ink);dot(5,0,1.2,C.ink);line(-3,7,4,8-mood*3,C.ink,1.3);g.restore();g.restore()}
function factory(x,y,sc,t,activity=1){g.save();const parentAlpha=g.globalAlpha;g.translate(x,y);g.scale(sc,sc);ellipse(0,8,137,16,'#06172f55');round(-105,-88,210,95,9,'#b1d5ce');polygon([[-105,-88],[-55,-121],[-55,-88],[-5,-121],[-5,-88],[45,-121],[45,-88]],'#d2e7d9');round(67,-154,22,81,5,'#608ba3');round(63,-158,30,9,3,'#9fbbbf');for(let k=0;k<3;k++){const p=(t*.17+k/3)%1;g.globalAlpha=parentAlpha*activity*(1-p)*.23;ellipse(77+p*30,-162-p*70,10+p*20,8+p*13,'#bfd6d8')}g.globalAlpha=parentAlpha;for(let i=0;i<4;i++)round(-89+i*43,-69,27,24,4,'#42708b');round(-22,-39,44,46,4,C.ink);line(-92,-8,94,-8,'#3a687e',5);for(let i=0;i<4;i++){const px=-80+((t*26*activity+i*44)%176);parcel(px,-11,.55)}g.restore()}
function shop(x,y,sc,t){g.save();g.translate(x,y);g.scale(sc,sc);round(-60,-65,120,69,6,'#bddfd4');round(-66,-82,132,23,5,C.pink);for(let i=0;i<6;i++)round(-63+i*22,-82,11,24,2,'#ffe0b7');round(-49,-45,52,35,5,C.ink);round(14,-48,30,52,4,'#366a82');parcel(-35,-27,.6);chip(-9,-28,.5);person(59,16,.95,t,'wave');g.restore()}
function truck(x,y,sc,t){g.save();g.translate(x,y);g.scale(sc,sc);round(-55,-39,76,38,5,C.gold);round(23,-29,35,30,7,C.cyan);round(29,-25,20,12,3,'#23536f');dot(-32,2,11,C.ink);dot(39,2,11,C.ink);for(const dx of [-32,39]){dot(dx,2,5,'#cce5d9');line(dx,2,dx+Math.cos(t*6)*4,2+Math.sin(t*6)*4,'#5b8291',2)}g.restore()}
const continentShapes=[[[678,385],[728,343],[793,367],[835,425],[807,474],[767,478],[766,526],[714,485],[665,435]],[[780,527],[827,549],[858,609],[833,675],[817,749],[786,704],[775,623],[749,579]],[[920,419],[944,391],[1012,376],[1068,404],[1110,367],[1182,379],[1269,383],[1320,433],[1274,486],[1246,528],[1186,540],[1159,600],[1130,561],[1093,498],[1035,484],[1008,450],[970,453]],[[921,471],[987,482],[1024,529],[1008,592],[971,661],[932,639],[899,555]],[[1190,690],[1250,655],[1304,696],[1286,741],[1221,747]],[[925,775],[1022,782],[1109,772],[1090,800],[944,803]]];
function globe(t,show){g.save();g.translate(960,555);g.scale(show,show);g.translate(-960,-555);glow(960,555,470,'#43c9ef',.13);dot(960,555,394,C.sea);g.save();g.beginPath();g.arc(960,555,394,0,TAU);g.clip();const gr=g.createLinearGradient(650,200,1300,900);gr.addColorStop(0,C.seaLight);gr.addColorStop(1,'#104a7d');g.fillStyle=gr;g.fillRect(500,150,950,820);g.strokeStyle='#a2d8e11f';g.lineWidth=1.3;for(let i=-2;i<=2;i++){g.beginPath();g.ellipse(960,555,390,Math.abs(i)*86+30,0,0,TAU);g.stroke();g.beginPath();g.ellipse(960,555,Math.abs(i)*88+30,394,0,0,TAU);g.stroke()}for(const p of continentShapes)polygon(p,C.land);g.restore();crescent(960,555,394);g.strokeStyle='#86e8ff88';g.lineWidth=4;g.beginPath();g.arc(960,555,395,Math.PI,Math.PI*1.8);g.stroke();g.restore()}
function screenPhone(x,y,scale,open,t,morph=0){g.save();const parentAlpha=g.globalAlpha;g.translate(x,y);g.scale(scale,scale);const width=lerp(190,70,morph),height=lerp(356,61,morph);round(-width/2-6,-height/2-6,width+12,height+12,lerp(30,8,morph),'#234e6a');round(-width/2,-height/2,width,height,lerp(25,7,morph),morph>.7?C.gold:'#c3eee1');if(morph<.98){g.globalAlpha=parentAlpha*(1-morph);round(-width/2+11,-height/2+13,width-22,height-26,20,'#113a57');round(-27,-height/2+15,54,9,5,'#76bfbf');dot(0,height/2-21,6,'#a8ded5');const tilt=Math.sin(t*.8)*.03;g.save();g.rotate(tilt);glow(0,0,105,C.cyan,.2);dot(0,-12,48,C.seaLight);for(let i=0;i<3;i++)link({x:-45+i*14,y:30},{x:43,y:-50+i*25},C.gold,2,1);g.restore();g.globalAlpha=parentAlpha}if(open>0){for(let i=0;i<4;i++){const p=open*(i+1);g.globalAlpha=.7;round(-63+p*32,-110+i*53-p*15,126,31,6,[C.cyan,C.gold,C.pink,C.land][i])}g.globalAlpha=1}g.restore()}
function hand(x,y,scale,visibility){g.save();g.globalAlpha*=visibility;g.translate(x,y);g.scale(scale,scale);round(-67,-34,135,165,39,'#e5ae88');round(-83,-73,29,101,14,'#f2c69d');round(60,-68,31,116,15,'#f2c69d');round(-57,88,113,117,15,C.cyan);g.restore()}
function timePacket(t,a,b,offset=0){return clamp((t-a)/(b-a)+offset)}
function stagePhrase(t){const sections=[{i:3,title:'TOÀN CẦU HÓA',sub:'Một sản phẩm • Nhiều quốc gia'},{i:5,title:'MỘT MẠNG LƯỚI KẾT NỐI',sub:'Hàng hóa · Vốn · Con người · Ý tưởng'},{i:8,title:'CƠ HỘI',sub:'Thị trường · Công nghệ · Lựa chọn'},{i:10,title:'RỦI RO & SỰ PHỤ THUỘC',sub:'Việc làm · Chuỗi cung ứng · Khủng hoảng'},{i:14,title:'VĂN HÓA LAN TỎA',sub:'Âm nhạc · Phim ảnh · Xu hướng'},{i:16,title:'TỐT HAY XẤU?',sub:'Cơ hội đi cùng thách thức'},{i:19,title:'KẾT NỐI — VÀ PHÂN CHIA',sub:'Ai nhận lợi ích? Ai chịu rủi ro?'}];for(let j=0;j<sections.length;j++){const q=sections[j],next=j+1<sections.length?start(sections[j+1].i):A.duration+1,alpha=step(t,start(q.i),start(q.i)+.7)*(1-step(t,next-.6,next));if(alpha<=0)continue;g.save();g.globalAlpha=alpha;text(q.title,960,86,43,C.white);text(q.sub,960,139,24,'#a7cbd9');g.restore()}}
function frame(t){
 g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;const bg=g.createLinearGradient(0,0,1920,1080);bg.addColorStop(0,C.navy);bg.addColorStop(1,'#201943');g.fillStyle=bg;g.fillRect(0,0,1920,1080);glow(350,430,650,'#477ca0',.16);glow(1530,720,660,'#9d568e',.13);
 for(const s of stars){g.globalAlpha=.28+.22*Math.sin(t*.4+s.p);dot(s.x-Math.sin(t*.035)*10,s.y,s.r,'#e1eadd')}g.globalAlpha=1;
 const intro=step(t,start(1),start(2)),network=step(t,start(4),end(4));
 const local=step(t,start(8),start(8)+2)*(1-step(t,end(12)-1,start(13)+1));
 const culture=step(t,start(14),start(14)+2)*(1-step(t,end(15)-1,start(16)+1));
 const closeEnd=step(t,start(16),start(16)+2)*(1-step(t,start(18),start(18)+2));
 const cx=lerp(960,1138,local),cy=lerp(555,520,local),zoom=1+local*1.45;
 g.save();g.translate(960,555);g.scale(zoom,zoom);g.translate(-cx,-cy);
 globe(t,lerp(.05,1,intro));
 const showLinks=step(t,start(1)+.7,start(4));
 const problem=step(t,start(10),start(10)+1.5),crisis=step(t,start(13),end(13));
 for(let e=0;e<edges.length;e++){const [a,b]=edges[e],n=nodes[a],m=nodes[b],drawAmount=step(t,start(1)+e*.08,start(3)+e*.08),risk=problem*(1-culture*.8)*((e%3===0)?.9:.25);
 g.globalAlpha=showLinks*(.4+network*.5);link(n,m,blend('#8ce2d6',C.coral,risk),1.7+crisis,drawAmount);g.globalAlpha=1;
 if(network>0){const speed=1/(7+(e%4)*2),p=(t*speed+e*.13)%1,q=route(n,m,p),k=network*Math.pow(Math.sin(p*Math.PI),.6)*(1-local*.65);g.save();g.globalAlpha=k;const sc=.55;g.globalAlpha=k*(1-culture);if(e%4===0)coin(q.x,q.y,sc);else if(e%4===1)parcel(q.x,q.y,sc);else if(e%4===2)chip(q.x,q.y,sc);else {dot(q.x,q.y,3,C.white);line(q.x-6,q.y,q.x+6,q.y,C.white,1)}g.globalAlpha=k*culture;e%2?music(q.x,q.y,sc):film(q.x,q.y,sc);g.restore()}
 if(crisis>0){const p=clamp((t-start(13)-e*.13)/(end(13)-start(13))),q=route(n,m,p);g.globalAlpha=Math.sin(p*Math.PI)*(1-culture);glow(q.x,q.y,25,C.coral,.6);dot(q.x,q.y,5,C.coral);g.globalAlpha=1;}}
 for(let i=0;i<nodes.length;i++){const n=nodes[i],visible=step(t,start(1)+i*.12,start(2)+.5+i*.12);g.save();g.globalAlpha=visible;glow(n.x,n.y,20,C.cyan,.4);dot(n.x,n.y,8,C.ink);dot(n.x,n.y,5,i===4?blend(C.gold,C.coral,problem):C.gold);const nameOpacity=(1-local)*step(t,start(1),start(2))*(1-step(t,start(4),end(4)));g.globalAlpha*=nameOpacity;const labels=[[710,355],[1330,365],[1395,540],[1430,424],[1100,345],[1210,650],[945,330],[876,631],[750,747],[1340,780]];const [lx,ly]=labels[i];line(n.x,n.y,lx,ly+18,'#c4e8db77',1.5);text(n.name,lx,ly,24,C.white);g.restore()}
 // The same manufacturing node expands under the tracking camera.
 const factories=step(t,start(8),start(8)+1.8),movePlant=step(t,start(11)+.5,end(11)-.5),jam=step(t,start(12),end(12));
 if(factories>0){const sc=.1+.42*local;g.save();g.globalAlpha=factories*(1-culture*.93);factory(1080,550,sc,t,1-jam*.85);factory(1258,620,sc*.8,t,movePlant);shop(1260,390,sc*.85,t);person(1012,559,sc*1.15,t,problem);person(1038,559,sc,t,problem,2);
 link({x:1080,y:554},{x:1260,y:398},blend(C.gold,C.coral,jam),3,1);link({x:1080,y:560},{x:1258,y:628},C.cyan,2,1);
 const delivery=(t*.12)%1;let pos=route({x:1080,y:554},{x:1260,y:398},lerp(delivery,Math.min(delivery,.48),jam));parcel(pos.x,pos.y,sc*.6);
 if(movePlant>0){const p=route({x:1080,y:565},{x:1258,y:631},movePlant);const reveal=step(t,start(11)+.5,start(11)+1.1);truck(p.x,p.y,.33*reveal,t);chip(p.x-5,p.y-19,.34*reveal)}
 if(jam>0){g.save();g.globalAlpha*=jam;const z=route({x:1080,y:554},{x:1260,y:398},.53);line(z.x-12,z.y-14,z.x+12,z.y+14,C.coral,5);line(z.x+12,z.y-14,z.x-12,z.y+14,C.coral,5);for(let k=1;k<4;k++){const q=route({x:1080,y:554},{x:1260,y:398},.53-k*.065);parcel(q.x,q.y,.29*jam)}g.restore()}
 // Multiple choices and investment travel along the existing routes.
 const opportunity=(1-problem)*factories;for(let k=0;k<3;k++){const p=(t*.11+k/3)%1,q=route({x:1260,y:398},{x:1080,y:554},p);g.globalAlpha=opportunity;coin(q.x,q.y,.26)}g.restore()}
 // Musical devices grow from existing network points, never replace the world.
 if(culture>0){for(const i of [0,3,6,8]){const n=nodes[i];g.save();g.globalAlpha=culture;g.translate(n.x,n.y);g.scale(culture,culture);round(-23,-40,46,31,5,C.ink);round(-19,-36,38,23,3,C.seaLight);music(0,-22,.5);person(30,16,.65,t,'wave',i);g.restore()}}
 // One phone persists: opens into parts, returns, shrinks to network node,
 // comes forward for the question, and settles back into the opening hand.
 const returnEnd=step(t,start(19),end(19)),baseSmall=step(t,end(2),end(3));
 const phoneScale=lerp(1.46,.14,baseSmall)+closeEnd*.9+returnEnd*.76;
 const phoneY=lerp(535,560,baseSmall)-closeEnd*25+returnEnd*24;
 const explode=step(t,start(1),at(1,1,.18))*(1-step(t,start(2),end(2)));
 const phoneX=lerp(960,905,baseSmall)+closeEnd*55+returnEnd*575-explode*430;
 // Final simultaneous distribution across the existing connected population.
 const final=step(t,start(18),start(18)+2);if(final>0){for(let i=0;i<6;i++){const x=655+i*120,y=894;g.save();g.globalAlpha=final;person(x,y,.9,t,i<3?'wave':'sad',i);const n=nodes[i],p=(t*.25+i*.1)%1;link(n,{x,y:y-55},i<3?C.gold:C.coral,1.8,final);const q=route(n,{x,y:y-55},p);if(i<3)parcel(q.x,q.y,.6);else {glow(q.x,q.y,17,C.coral,.5);dot(q.x,q.y,4,C.coral)}g.restore()}}
 const phoneVisible=1-local*.92;
 g.save();g.globalAlpha=phoneVisible;hand(phoneX,phoneY+180*phoneScale,phoneScale,.9*(1-baseSmall)+returnEnd*.85);screenPhone(phoneX,phoneY,phoneScale,0,t,0);
 if(explode>0){for(let i=0;i<6;i++){const n=nodes[i],p=ease(explode),x=lerp(phoneX,n.x,p),y=lerp(phoneY-80+i*30,n.y,p);link({x:phoneX,y:phoneY}, {x,y},'#b0e5df66',1,1);if(i%3===0)chip(x,y,1.15);else if(i%3===1)round(x-21,y-13,42,26,5,C.pink);else coin(x,y,1.1)}}g.restore();
 g.restore();const header=g.createLinearGradient(0,0,0,195);header.addColorStop(0,'#0a1030ed');header.addColorStop(.7,'#0a10309a');header.addColorStop(1,'#0a103000');g.fillStyle=header;g.fillRect(0,0,1920,195);stagePhrase(t);if(A.status==='preview'){text('BẢN THỬ BỐ CỤC • CHƯA CĂN AUDIO',960,1040,22,C.gold);}
 // Stable, unhurried ending; no fade to black or disconnected end card.
}
window.ready=Promise.all([fetch('alignment.json').then(r=>{if(!r.ok)throw Error('Verified alignment.json is required');return r.json()}).then(data=>{if(!['aligned','estimated'].includes(data.status)&&!(data.status==='preview'&&new URL(location.href).searchParams.get('preview')==='1'))throw Error('Unverified alignment');A=data;S=data.sentences;if(S.length!==20)throw Error('Expected twenty original transcript sentences')}),Promise.all([document.fonts.load('500 24px Catalog','Toàn cầu hóa Mỹ Hàn Quốc Đài Loan Nhật Bản Việt Nam'),document.fonts.ready])]);
window.draw=({t,q=.93})=>{frame(t);return cv.toDataURL('image/jpeg',q).split(',')[1]};
