/* Original paper theatre. Style study: stiller/kagit-kesik/anim.html.
   All geometry is drawn procedurally; no sprites, stock images, or scene cuts.
   Frame-addressed choreography shares timeline.json with music.py. */
const cv=document.getElementById('c'); let c=cv.getContext('2d');
const W=1920,H=1080,PI=Math.PI;
let TL, Q;
const clamp=x=>Math.max(0,Math.min(1,x)), mix=(a,b,u)=>a+(b-a)*u;
const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10)};
const seg=(t,a,b)=>ease((t-a)/(b-a));
function seq(t,keys){for(let i=1;i<keys.length;i++){if(t<=keys[i][0])return mix(keys[i-1][1],keys[i][1],seg(t,keys[i-1][0],keys[i][0]));}return keys.at(-1)[1]}
function rgb(a,b,u){return '#'+a.match(/\w\w/g).map((x,i)=>Math.round(mix(parseInt(x,16),parseInt(b.match(/\w\w/g)[i],16),u)).toString(16).padStart(2,'0')).join('')}
function seeded(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
const rand=seeded(23), texture=document.createElement('canvas');texture.width=512;texture.height=512;
const tc=texture.getContext('2d');for(let i=0;i<9000;i++){tc.fillStyle=i%2?'rgba(255,245,210,.055)':'rgba(25,16,38,.055)';tc.fillRect(rand()*512,rand()*512,rand()*2+.3,rand()*1+.3)}
for(let i=0;i<650;i++){let x=rand()*512,y=rand()*512;tc.strokeStyle='rgba(255,245,220,.07)';tc.lineWidth=.6;tc.beginPath();tc.moveTo(x,y);tc.lineTo(x+rand()*12-6,y+rand()*4);tc.stroke()}
const pat=c.createPattern(texture,'repeat');
function paper(path,col,shadow=8){c.save();c.shadowColor='rgba(13,17,31,.33)';c.shadowBlur=shadow;c.shadowOffsetX=shadow*.35;c.shadowOffsetY=shadow*.6;c.fillStyle=col;c.fill(path);c.shadowColor='transparent';c.clip(path);c.fillStyle=pat;c.fillRect(-4000,-2500,8000,6000);c.strokeStyle='rgba(255,244,210,.26)';c.lineWidth=2;c.stroke(path);c.restore()}
function shape(fn,col,sh=8){let p=new Path2D();fn(p);paper(p,col,sh)}
function oval(x,y,rx,ry,col,rot=0,sh=5){shape(p=>p.ellipse(x,y,rx,ry,rot,0,2*PI),col,sh)}
function line(pts,col,w){c.save();c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.lineCap='round';c.beginPath();c.moveTo(...pts[0]);for(let i=1;i<pts.length;i++)c.lineTo(...pts[i]);c.stroke();c.restore()}
function star(x,y,r,rot=0,col='#ffeab2'){shape(p=>{for(let i=0;i<10;i++){let a=rot-PI/2+i*PI/5,rr=i%2?r*.43:r;i?p.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):p.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}p.closePath()},col,5)}
const stars=Array.from({length:65},()=>({x:rand()*2100-90,y:rand()*710+20,r:1.5+rand()*3,phase:rand()*6}));
const scraps=Array.from({length:24},(_,i)=>({sx:-215+i*19,sy:Math.sin(i*.8)*18,x:180+rand()*1550,y:90+rand()*490,rot:rand()*6,r:6+rand()*9}));
function foliage(x,y,len,width,angle,col){c.save();c.translate(x,y);c.rotate(angle);shape(p=>{p.moveTo(0,0);p.bezierCurveTo(len*.32,-width,len*.72,-width*.72,len,0);p.bezierCurveTo(len*.7,width*.65,len*.3,width,0,0)},col,9);line([[0,0],[len*.9,0]],'rgba(255,230,170,.17)',1.6);c.restore()}
// Layered woodland: hand-cut tapered stems, curlable paper leaves and foreground blades.
const treeCache=new Map();
function treeLayer(depth,i){
 const key=depth+':'+i;if(treeCache.has(key))return treeCache.get(key);
 const saved=c,off=document.createElement('canvas');off.width=660;off.height=1300;c=off.getContext('2d');c.translate(330,1110);
 const col=['#748873','#4c705e','#294b49'][depth],len=650+Math.sin(i*4)*150;
 shape(p=>{p.moveTo(-24,180);p.bezierCurveTo(-13,-100,-40,-len*.7,-14,-len);p.quadraticCurveTo(-2,-len-32,8,-len);p.bezierCurveTo(2,-len*.6,30,-100,39,180);p.closePath()},col,12);
 for(let j=0;j<6;j++){let yy=-len+j*92;foliage(0,yy,120+j*18+Math.sin(i*3+j)*30,38+j*5,(j%2?-.48:PI+.5)+Math.sin(i+j)*.2,col)}
 c=saved;treeCache.set(key,off);return off;
}
function forest(t,depth,cam){
 const depart=seg(t,Q.pages-2,Q.river+3),off=depart*(1100+depth*250);
 if(off>1350)return;
 c.save();c.translate(-cam*(.2+depth*.27),off);
 for(let i=0;i<7;i++){
 let x=-160+i*365+Math.sin(i*8)*80,y=1030-depth*80;
 let bend=Math.sin(t*.35+i)*.012*(1+seg(t,10,16)*3),fold=seg(t,18+i*.55,28+i*.3);
 c.save();c.translate(x,y);c.rotate(bend+fold*(i%2?.65:-.8));c.scale(mix(1,.08,fold),1);c.drawImage(treeLayer(depth,i),-330,-1110);c.restore();
 }c.restore();
}
function background(t,camera){
 const night=seg(t,19,30);c.fillStyle=rgb('#bcb58c','#182d49',night);c.fillRect(0,0,W,H);
 c.fillStyle=pat;c.fillRect(0,0,W,H);
 // Translucent sheets of light, with very slow angular drift.
 c.save();c.globalAlpha=(1-night)*.18;c.translate(1380,0);c.rotate(.35+Math.sin(t*.12)*.025);
 for(let i=0;i<5;i++){c.fillStyle=i%2?'#fff0c5':'#ece4aa';c.beginPath();c.moveTo(i*95-500,-150);c.lineTo(i*130-500,1400);c.lineTo(i*130-320,1400);c.lineTo(i*95-440,-150);c.fill()}c.restore();
 for(const s of stars){c.save();c.globalAlpha=night*(.5+.18*Math.sin(t*.7+s.phase));star(s.x-camera*.04,s.y,s.r,0,'#e8d4aa');c.restore()}
 let moonY=mix(1230,260,seg(t,23,30));
 oval(1430-camera*.06,moonY,130,130,'#e4d9b4',0,18);oval(1458-camera*.06,moonY-17,112,112,rgb('#bcb58c','#263958',night),0,2);
 // Back hills are physically displaced downward as the wind carries us above the wood.
 for(let d=0;d<3;d++){
  let fly=seg(t,14,24)*(1-seg(t,41,49)), base=720+d*100+fly*460;
  shape(p=>{p.moveTo(-200,1400);for(let x=-200;x<=2200;x+=20){let yy=base+Math.sin((x+camera*(.16+d*.15))/ (260+d*110)+d)*80;p.lineTo(x,yy)}p.lineTo(2200,1400);p.closePath()},rgb(['#8e9b7a','#6f896b','#506f57'][d],['#52617e','#384f67','#263f50'][d],night),15);
 }
 forest(t,0,camera);forest(t,1,camera);
 // The ground lengthens into a moonlit river, then curves back into the final hill.
 let river=seg(t,24,30)*(1-seg(t,41,48));
 if(river>0){for(let d=0;d<7;d++){
  let yy=726+d*55+Math.sin(t*.48+d)*5+(1-river)*700;
  shape(p=>{p.moveTo(-100,2000);for(let x=-100;x<=2100;x+=30)p.lineTo(x,yy+Math.sin(x/240+t*.2+d)*11);p.lineTo(2100,2000);p.closePath()},rgb('#263f50',['#8da9ab','#678e9c','#527a8d','#426a81','#355b71','#2b4d67','#203c54'][d],river),7);
 }
 c.save();c.globalAlpha=river*.55;for(let i=0;i<25;i++){let xx=1380+Math.sin(i*9)*i*8,yy=728+i*10;line([[xx-i*5,yy],[xx+i*5+15,yy]],'#deceaa',2)}c.restore();}
}
// One persistent leaf silhouette changes curvature: shelter -> leaf -> folded hull -> wings.
function leafPath(boat,bird,flap){let p=new Path2D();let pts=[];
 for(let i=0;i<96;i++){
  let a=i/96*PI*2,x=Math.cos(a)*265,y=Math.sin(a)*91*(.8+.2*Math.abs(Math.sin(a)));
  // Keep contour correspondence; no swapping illustrations.
  let hullY=Math.sin(a)>0?105*Math.sin(a):(-25+12*Math.sin(a));
  y=mix(y,hullY,boat);let bx=Math.cos(a)*390;
  let by=Math.sin(a)*90-Math.abs(Math.cos(a))*(110+flap*145)+20; if(Math.sin(a)>0)by+=Math.pow(Math.sin(a*10),2)*25*Math.abs(Math.cos(a));
  x=mix(x,bx,bird);y=mix(y,by,bird);
  pts.push([x,y]);
 }
 p.moveTo(...pts[0]);for(let i=1;i<pts.length;i++)p.lineTo(...pts[i]);p.closePath();return p;
}
function leaf(t,x,y,ang){
 let boat=seg(t,Q.river,Q.release)*(1-seg(t,Q.wings-2,Q.wings+2)),bird=seg(t,Q.wings-2,Q.wings+2)*(1-seg(t,Q.land-2,Q.land+3));
 let dissolve=seg(t,Q.scatter,Q.stars),flap=Math.sin((t-Q.wings)*2.3)*seg(t,Q.wings,Q.wings+2)*(1-seg(t,43,48));
 c.save();c.translate(x,y);c.rotate(ang);let p=leafPath(boat,bird,flap);
 if(dissolve<1){c.save();c.beginPath();c.rect(-300+dissolve*600,-300,650,650);c.clip();paper(p,rgb('#c58d45','#d8b86d',seg(t,25,36)),12);
 c.save();c.clip(p);line([[-265,0],[0,boat*5],[265,0]],'#765934',3.2);
 for(let i=-4;i<=4;i++){let xx=i*48;line([[xx,0],[xx+35,-80-bird*60]],'rgba(103,75,40,.40)',2);line([[xx,0],[xx+35,85]],'rgba(103,75,40,.3)',2)}
 // Scored fold at keel.
 if(boat>.01){c.globalAlpha=boat*.35;shape(p=>{p.moveTo(-265,0);p.quadraticCurveTo(0,120,265,0);p.quadraticCurveTo(0,45,-265,0)},'#79582e',2)}c.restore();c.restore();
 if(dissolve===0){line([[255,0],[290,-6],[309,-19]],'#9c773c',8);line([[258,-2],[291,-8]],'#e6c47d',2)}
 }
 c.restore();
 if(t>=Q.scatter){for(let i=0;i<scraps.length;i++){
  const s=scraps[i],u=seg(t,Q.scatter+i*.08,Q.stars+i*.035);
  if(u<=0)continue;
  let sx=x+Math.cos(ang)*s.sx,sy=y+Math.sin(ang)*s.sx;
  let xx=mix(sx,s.x,u)+Math.sin(u*PI)*100*Math.sin(i),yy=mix(sy,s.y,u)-Math.sin(u*PI)*170;
  c.save();c.translate(xx,yy);c.rotate(mix(s.rot,s.rot*.1,u));c.scale(1,1-.5*Math.sin(PI*u));star(0,0,mix(12,s.r,u),0,rgb('#d8b86d','#ffedb4',u));c.restore();
 }}
}
function limb(a,b,d,width,col){line([a,b,d],'#253c35',width+3);line([a,b,d],col,width);oval(b[0],b[1],width*.58,width*.58,col,0,1)}
function ik(a,target,l1,l2,side=1){let dx=target[0]-a[0],dy=target[1]-a[1],r=Math.min(Math.hypot(dx,dy),l1+l2-.01),ang=Math.atan2(dy,dx);let q=Math.acos(Math.max(-1,Math.min(1,(l1*l1+r*r-l2*l2)/(2*l1*Math.max(.01,r)))));return[a[0]+Math.cos(ang+side*q)*l1,a[1]+Math.sin(ang+side*q)*l1]}
function cricket(t,pose){
 let {x,y,angle,scale,sleep,fear,joy,reach,release,sit}=pose;
 c.save();c.translate(x,y);c.rotate(angle);c.scale(scale,scale);
 const breath=Math.sin(t*1.8)*1.5*(.3+sleep),headTilt=seq(t,[[0,.2],[7,.18],[9,-.3],[12,-.55],[16,-.22],[23,.15],[29,-.15],[33,-.28],[40,-.3],[47,-.05],[52,-.38],[57,-.45],[60,-.45]]);
 // Two rear walking legs and two smaller middle legs; each has its own joints.
 const kick=(1-sleep)*(1-sit)*(seg(t,14,18)*(1-seg(t,25,29)))*Math.sin(t*5)*20;
 limb([-25,18],[-80,48+kick*.5],[-54,104-kick],14,'#536d4d');
 limb([2,18],[32,62-kick*.4],[57,99+kick*.3],9,'#647e55');
 // Segmented abdomen / wing covers.
 c.save();c.translate(0,breath);c.rotate(.1+sleep*.4);
 oval(-35,8,65,39,'#566a42',.22,9);
 shape(p=>{p.moveTo(-91,6);p.bezierCurveTo(-55,-42,4,-40,21,-8);p.quadraticCurveTo(-22,39,-91,6)},'#79915b',7);
 for(let i=0;i<4;i++){c.save();c.translate(-65+i*18,-10);c.rotate(-.2);line([[0,0],[-7,28]],'rgba(38,62,40,.4)',2);c.restore()}
 oval(3,-4,29,38,'#8d9d62',-.25,6);c.restore();
 // Foreground powerful femur, tibia and pointed tarsus.
 let knee=[-55,44+sit*12+kick],foot=[-23-sit*26,106-sit*21-kick*.3];
 limb([-21,12],knee,foot,16,'#879a59');line([foot,[foot[0]+28,foot[1]+2]],'#c2bd7a',7);
 limb([14,16],[41,54-sit*8],[80-sit*34,89-sit*6],8,'#9ca866');
 // Hands aim at the same leaf stem position used by the leaf geometry.
 const shoulders=[[13,-20],[28,-15]];
 let targets=[[55,11],[57,18]];
 if(reach>0){targets=targets.map((p,i)=>[mix(p[0],pose.hand[0]-i*8,reach),mix(p[1],pose.hand[1]+i*6,reach)])}
 if(release>0){targets=targets.map((p,i)=>[mix(p[0],i?92:-45,release),mix(p[1],-38-i*16,release)])}
 if(sit>.4&&reach<.1&&release<.1)targets=[[59,52],[27,53]];
 for(let i=0;i<2;i++){let dx=targets[i][0]-shoulders[i][0],dy=targets[i][1]-shoulders[i][1],dist=Math.hypot(dx,dy);if(dist>93)targets[i]=[shoulders[i][0]+dx*93/dist,shoulders[i][1]+dy*93/dist];let bend=ik(shoulders[i],targets[i],47,48,i?1:-1);limb(shoulders[i],bend,targets[i],7,i?'#b4b57a':'#7f955c');oval(...targets[i],7,5,'#c0bc80',-.4,2)}
 // Head pivot, separate eye lids, brows and mandibles.
 c.save();c.translate(28,-42+breath);c.rotate(headTilt);
 oval(0,0,38,34,'#a6ad6e',-.1,7);oval(22,12,17,15,'#c2bb80',-.2,4);
 let blink=(Math.sin(t*2.07)> .995? .15:1),open=(1-sleep)*blink;
 oval(16,-9,13,15,'#eee6b8',0,2);
 c.save();c.beginPath();c.ellipse(16,-9,13,Math.max(1,15*open),0,0,2*PI);c.clip();c.fillStyle='#ede5b9';c.fillRect(0,-28,40,40);oval(20+joy*2,-9-fear*2,6,8,'#203c38',0,0);oval(22,-12,2,2,'#fff3d0',0,0);c.restore();
 if(open<.95){c.fillStyle='#a6ad6e';c.fillRect(2,-25,29,15*(1-open));c.fillRect(2,-9+15*open,29,15*(1-open));line([[5,-9],[27,-9]],'#354b37',sleep*2.5)}
 line([[7,-28-fear*4],[25,-29-fear*8]],'#52673d',3);
 if(fear>.4)oval(30,15,4,6*fear,'#415538',0,0);else{c.beginPath();c.moveTo(24,17);c.quadraticCurveTo(29,19+joy*7,35,15);c.strokeStyle='#516744';c.lineWidth=2.5;c.stroke()}
 // Antennae respond to head motion with phase-lag, ending in fine cut-paper tips.
 let calm=1-seg(t,55,58),aSwing=(Math.sin(t*1.8)*4+Math.sin(t*.8)*3)*calm;
 for(let i=0;i<2;i++){
  let endX=(i?51:-17)+aSwing*(i?1:-1)-sleep*35,endY=-113+sleep*38+(i?9:0)+Math.sin(t*1.8-.6)*3*calm;
  c.beginPath();c.moveTo(i?12:-4,-26);c.bezierCurveTo(i?25:-25,-62,endX-20,endY-20,endX,endY);c.strokeStyle=i?'#d0c78b':'#87975d';c.lineWidth=i?3:2.4;c.stroke();oval(endX,endY,3,3,'#e4d49b',0,0);
  if(i===1){let pt=new DOMPoint(endX,endY).matrixTransform(c.getTransform());window.antennaTip={x:pt.x,y:pt.y}}
 }
 c.restore();c.restore();
}
function choreography(t){
 let lx=seq(t,[[0,900],[7,900],[10,890],[12,935],[15,1020],[20,1030],[25,950],[30,940],[35,1000],[40,1050],[45,980],[48,970],[60,970]]);
 let ly=seq(t,[[0,480],[7,480],[10,506],[12,538],[15,465],[20,380],[25,510],[29,700],[34,700],[39,500],[43,530],[48,760],[60,760]]);
 let la=seq(t,[[0,-.12],[7,-.12],[10,.1],[12,-.16],[16,-.32],[22,.22],[27,.02],[33,0],[37,-.1],[42,.06],[48,.02],[60,.02]]);
 la+=Math.sin(t*1.4)*.025*seg(t,8,14)*(1-seg(t,44,49));
 let sleep=1-seg(t,Q.stir,Q.stir+2),reach=seg(t,10,12)*(1-seg(t,26,28));
 let release=seg(t,30,33)*(1-seg(t,42,46));
 // Ground -> reaches from below -> hangs by the stem -> settles inside the boat.
 let x=seq(t,[[0,880],[7,880],[10,960],[12,1140],[15,1245],[20,1240],[25,1150],[29,985],[32,965],[36,1020],[40,1070],[45,1000],[48,975],[60,975]]);
 let y=seq(t,[[0,739],[7,739],[9,710],[12,675],[15,660],[20,590],[25,690],[29,635],[34,635],[39,437],[43,467],[48,681],[60,681]]);
 let angle=seq(t,[[0,.18],[7,.18],[9,-.18],[12,-.5],[16,-.4],[22,.12],[27,-.08],[30,-.15],[38,-.15],[45,0],[48,.08],[54,-.06],[60,-.06]]);
 let scale=seq(t,[[0,1],[12,1],[27,1],[45,1],[60,1]]),sit=seg(t,26,30);
 // Reach uses endpoint of persistent stem; rotate world target back to body-local frame.
 let sx=lx+Math.cos(la)*300+Math.sin(la)*15,sy=ly+Math.sin(la)*300-Math.cos(la)*15;
 let dx=sx-x,dy=sy-y,hand=[(dx*Math.cos(angle)+dy*Math.sin(angle))/scale,(dy*Math.cos(angle)-dx*Math.sin(angle))/scale];
 // While airborne, enforce anatomical reach instead of stretching arms.
 if(t>=10&&t<29){let hang=seg(t,10,12)*(1-seg(t,26,29));let nx=sx-50,ny=sy+80;x=mix(x,nx,hang);y=mix(y,ny,hang);dx=sx-x;dy=sy-y;hand=[dx*Math.cos(angle)+dy*Math.sin(angle),dy*Math.cos(angle)-dx*Math.sin(angle)]}
 return {lx,ly,la,pose:{x,y,angle,scale,sleep,fear:seg(t,8,13)*(1-seg(t,27,32)),joy:seg(t,30,37),reach,release,sit,hand}};
}
function frame(t){
 c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.clearRect(0,0,W,H);
 const camera=seq(t,[[0,-50],[8,30],[17,130],[27,400],[36,620],[45,740],[60,740]]);
 background(t,camera);
 const {lx,ly,la,pose}=choreography(t);
 // Camera composition: intimate shelter, tracking flight, broad river, closing portrait.
 let zoom=seq(t,[[0,1.12],[6,1.7],[11,1.24],[18,.91],[27,.9],[33,1],[39,.82],[45,.94],[50,1],[55,1.8],[58,2.15],[60,2.15]]);
 let fx=seq(t,[[0,900],[12,1080],[20,1150],[30,960],[42,1020],[50,970],[60,1000]]);
 let fy=seq(t,[[0,670],[12,580],[20,490],[30,660],[42,490],[50,670],[60,602]]);
 c.save();c.translate(960,600);c.scale(zoom,zoom);c.translate(-fx,-fy);
 // Mossy sleeping platform moves away with the forest pages.
 if(t<25){let d=seg(t,13,24);c.save();c.translate(-d*950,d*750);
 shape(p=>{p.moveTo(220,1200);p.lineTo(220,948);p.bezierCurveTo(600,855,750,842,1040,850);p.bezierCurveTo(1200,851,1380,990,1550,1010);p.lineTo(1550,1200);p.closePath()},'#647957',15);
 for(let i=0;i<15;i++){let xx=550+i*43,yy=878+Math.pow((xx-900)/55,2);foliage(xx,yy,31+i%3*9,7,-1.9+i%4*.3,i%2?'#93a06c':'#7d915c')}
 for(let i=0;i<4;i++){c.save();c.translate(520+i*165,925+i%2*35);c.rotate(-.5+i*.3);foliage(0,0,90,24,0,i%2?'#b99b62':'#aa8650');c.restore()}
 c.restore();}
 // The shelter stalk peels away as a page: it leaves the frame, not a dissolve.
 if(t<24){let dep=seg(t,10,22);c.save();c.translate(-dep*1100,dep*500);line([[640,1100],[680,760],[775,500],[640,280]],'#7f8955',18);foliage(694,731,175,48,-1.6,'#8b985c');c.restore()}
 // Final hill exists as continuous paper terrain, rising to receive the leaf.
 let hill=seg(t,41,48);
 if(hill>0){let hy=mix(1400,796,hill);shape(p=>{p.moveTo(-600,1500);p.lineTo(-600,hy+150);p.bezierCurveTo(300,hy+80,780,hy-60,1090,hy-4);p.bezierCurveTo(1400,hy+10,1750,hy+80,2500,hy+200);p.lineTo(2500,1500);p.closePath()},'#405e57',16);
  for(let i=0;i<8;i++)foliage(450+i*160,hy+30+Math.sin(i)*12,40+i%3*12,8,-1.8+i*.08,'#6b8161');
 }
 // Body occlusion changes as it climbs into the hull: same articulated character.
 if(t<27){cricket(t,pose);leaf(t,lx,ly,la)}else{leaf(t,lx,ly,la);cricket(t,pose)}
 c.restore();
 // A single liberated star alights on the antenna, following its actual transformed tip.
 if(t>=53){let u=seg(t,53,57),tip=window.antennaTip||{x:1100,y:360};let xx=mix(1500,tip.x,u)+Math.sin(PI*u)*80,yy=mix(190,tip.y,u)-Math.sin(PI*u)*90;
  c.save();c.shadowColor='#ffe0a0';c.shadowBlur=20;star(xx,yy,mix(12,15,u),mix(.6,0,u));c.restore();
 }
 // Foreground cut-paper framing, with independent parallax and no obscuring of performance.
 let front=1-seg(t,14,23),returning=seg(t,45,50);
 c.save();c.translate(-camera*.25,(1-Math.max(front,returning))*600);
 for(let i=0;i<5;i++){foliage(-35+i*26,1110,290+i*35,30,-1.12-i*.17,rgb('#263f36','#203a45',seg(t,20,30)));foliage(2020-i*20,1120,320+i*30,34,-2+i*.11,'#223c3c')}c.restore();
 // Very light fixed vignette: no black transitions or flickering grain.
 let v=c.createRadialGradient(960,500,390,960,540,1180);v.addColorStop(0,'rgba(14,22,30,0)');v.addColorStop(1,'rgba(14,22,30,.22)');c.fillStyle=v;c.fillRect(0,0,W,H);
}
window.ready=fetch('timeline.json').then(r=>r.json()).then(t=>{TL=t;Q=Object.fromEntries(Object.entries(t.cues).map(([k,v])=>[k,v/t.fps]));frame(0)});
window.draw=({t,q=.94})=>{frame(t);return cv.toDataURL('image/jpeg',q).split(',')[1]};
window.renderFrame=frame;
