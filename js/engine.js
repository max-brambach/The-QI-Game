
// ================================================================
// GAME STATE
// ================================================================
let GS={
  started:false,
  player:{x:18,y:16,dir:2,step:0},
  cam:{x:0,y:0},
  map:null,
  inv:{},
  beaten:{},   // npc.id -> true
  cooldowns:{},// npc.id -> {secs:N, steps:N}
  stepCount:0,
  dialogOpen:false,riddleOpen:false,
  currentNPC:null,
  won:false,
  frame:0,waterT:0,
};
// Dynamic tile size — fills the screen, recalculated on resize
let TS, VW, VH;

function calcViewport(){
  // Use visualViewport for correct dimensions on iOS Safari (excludes address bar, keyboard)
  const vv = window.visualViewport;
  const W_PX = vv ? Math.round(vv.width)  : window.innerWidth;
  const H_PX = vv ? Math.round(vv.height) : window.innerHeight;
  // Tile size: fit ~18 cols wide AND ~14 rows tall, clamp 18-32px
  TS  = Math.max(18, Math.min(32, Math.floor(Math.min(W_PX/18, H_PX/14))));
  // Viewport in tiles, never larger than the map itself
  VW  = Math.min(Math.floor(W_PX / TS), W);
  VH  = Math.min(Math.floor(H_PX / TS), H);
  // Resize canvas to exactly whole tiles
  cv.width  = VW * TS;
  cv.height = VH * TS;
  cv.style.width  = cv.width  + 'px';
  cv.style.height = cv.height + 'px';
  // Center canvas if smaller than screen
  cv.style.left = Math.floor((W_PX - cv.width)  / 2) + 'px';
  cv.style.top  = Math.floor((H_PX - cv.height) / 2) + 'px';
  // Re-clamp camera
  GS.cam.x = Math.max(0, Math.min(W - VW, GS.cam.x));
  GS.cam.y = Math.max(0, Math.min(H - VH, GS.cam.y));
}

const cv=document.getElementById('canvas');
// Initial size — calcViewport() will refine on startGame
cv.width=320; cv.height=240; // safe placeholder
const ctx=cv.getContext('2d');
const mmcv=document.getElementById('mm');
const mmctx=mmcv.getContext('2d');

// Input
const keys=new Set();
var _konamiSeq=[];
var _konamiCode=['ArrowUp','ArrowDown','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','ArrowDown'];
cv.addEventListener('keydown',e=>{
  keys.add(e.code);
  if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault();
  if((e.code==='KeyE'||e.code==='Space')&&!GS.dialogOpen&&!GS.riddleOpen) tryInteract();
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){
    _konamiSeq.push(e.code);
    if(_konamiSeq.length>_konamiCode.length) _konamiSeq.shift();
    if(_konamiSeq.join(',')===_konamiCode.join(',')){
      _konamiSeq=[];
      if(!bananaModeActive){notify('🍌 BANANA JOE ACTIVATED!');playBananaJoe();}
    }
  }
});
cv.addEventListener('keyup',e=>keys.delete(e.code));

// ================================================================
// START
// ================================================================
function startGame(){
  document.getElementById('title').style.display='none';
  GS.started=true;
  GS.map=makeMap();
  calcViewport();
  buildInvUI();
  cv.focus();
  initAudio();
  if(audioCtx) playMusic();
  loop();
}

// ================================================================
// MOVEMENT
// ================================================================
let moveT=0;
function handleMove(dt){
  if(GS.dialogOpen||GS.riddleOpen) return;
  moveT+=dt;
  if(moveT<140) return;
  const p=GS.player;
  let dx=0,dy=0;
  if(keys.has('ArrowLeft')||keys.has('KeyA')){dx=-1;p.dir=1;}
  else if(keys.has('ArrowRight')||keys.has('KeyD')){dx=1;p.dir=3;}
  else if(keys.has('ArrowUp')||keys.has('KeyW')){dy=-1;p.dir=0;}
  else if(keys.has('ArrowDown')||keys.has('KeyS')){dy=1;p.dir=2;}
  else return;
  moveT=0;
  const nx=p.x+dx,ny=p.y+dy;
  if(nx<0||nx>=W||ny<0||ny>=H) return;
  const t=GS.map[ny][nx];
  if(t===T.WL||t===T.W||t===T.TR) return;
  if(npcAt(nx,ny)) return;
  p.x=nx;p.y=ny;p.step=(p.step+1)%4;
  GS.stepCount++;
  checkSnacks();
}

function npcAt(x,y){return NPCS.find(n=>n.x===x&&n.y===y);}

// ================================================================
// INTERACTION
// ================================================================
function tryInteract(){
  const p=GS.player;
  const dirs=[{x:0,y:-1},{x:-1,y:0},{x:1,y:0},{x:0,y:1}];
  const d=dirs[p.dir]||dirs[2];
  const tx=p.x+d.x,ty=p.y+d.y;
  let npc=npcAt(tx,ty)||npcAt(p.x,p.y);
  if(!npc){
    // Check adjacent in all 4 dirs
    for(const dd of dirs){
      npc=npcAt(p.x+dd.x,p.y+dd.y);
      if(npc) break;
    }
  }
  if(npc) openDlg(npc);
}

// ================================================================
// DIALOG
// ================================================================
function openDlg(npc){
  GS.currentNPC=npc;
  GS.dialogOpen=true;
  document.getElementById('dlg').style.display='block';
  document.getElementById('dlg-name').textContent=npcSpriteName(npc)+' '+npc.name;

  if(npc.role==='boss'){
    const hasAll=PARTS.every(p=>GS.inv[p.id]);
    if(GS.beaten[npc.id]) showDlgText(npc.greetDone,[{t:'Thank you!',a:closeDlg}]);
    else if(!hasAll){
      const c=Object.keys(GS.inv).length,n=PARTS.length;
      const lines=[
        "You think you can just walk up and talk to ME? You don't even have a microscope. Come back when you've assembled something worth my time.",
        "Missing "+(n-c)+" parts still. Do you even know what a condenser does?",
        "I've trained hundreds of students. None showed up this unprepared.",
        c===0?"Zero parts. ZERO. I am genuinely in awe of your unpreparedness.":
          c<4?"Only "+c+" parts? That's a paperweight, not a microscope.":
          c<n-1?"Getting closer... "+c+"/"+n+". Don't celebrate yet.":
          "ONE part missing. I can wait. Can you count to "+n+"?",
      ];
      showDlgText(lines[Math.floor(Math.random()*lines.length)],[{t:"Sorry... I'll keep looking.",a:closeDlg}]);
    }
    else showDlgText(npc.greetReady,[{t:'I am ready for the exam.',a:function(){startJExam(npc);}},{t:'Not yet...',a:closeDlg}]);
    return;
  }

  if(GS.beaten[npc.id]){
    const pname=PARTS.find(p=>p.id===npc.partId)?.name;
    showDlgText(npc.greetDone||`You already have the ${pname}. Keep going!`,[{t:'Thanks!',a:closeDlg}]);
    return;
  }

  const cd=GS.cooldowns[npc.id];
  if(cd){
    const secsLeft=Math.ceil(cd.secs);
    showDlgText(`Come back in ${secsLeft}s and review your notes!`,[{t:'I\'ll be back...',a:closeDlg}]);
    return;
  }

  showDlgText(npc.greet,[{t:'⚡ Accept the challenge!',a:()=>openRiddle(npc)},{t:'Maybe later...',a:closeDlg}]);
}

function showDlgText(text,choices){
  document.getElementById('dlg-text').textContent=text;
  const ch=document.getElementById('dlg-choices');
  ch.innerHTML='';
  (choices||[]).forEach(c=>{
    const b=document.createElement('button');
    b.className='cbtn';b.textContent='▶ '+c.t;b.onclick=c.a;
    ch.appendChild(b);
  });
}

function closeDlg(){
  GS.dialogOpen=false;
  document.getElementById('dlg').style.display='none';
  cv.focus();
}

// ================================================================
// JENNIFER 3-QUESTION EXAM
// ================================================================
let jExam={q:0,passed:0,npc:null};

function startJExam(npc){
  closeDlg();
  jExam={q:0,passed:0,npc};
  showJExamQ();
}

function showJExamQ(){
  const npc=jExam.npc;
  const r=npc.riddles[jExam.q];
  GS.riddleOpen=true;
  document.getElementById('rdl').style.display='block';
  document.getElementById('rdl-title').textContent=
    'JENNIFER EXAM — Q'+(jExam.q+1)+' OF '+npc.riddles.length;
  document.getElementById('rdl-prize').textContent=
    'Passed: '+jExam.passed+'/'+npc.riddles.length+' — Prize: QI Certificate';
  document.getElementById('rdl-q').textContent=r.q;
  document.getElementById('rdl-fb').textContent='';
  document.getElementById('rdl-cont').style.display='none';
  riddleRight=false;
  const el=document.getElementById('rdl-answers');
  el.innerHTML='';
  r.opts.forEach((opt,i)=>{
    const b=document.createElement('button');
    b.className='ans';b.textContent=opt.t;
    b.onclick=(function(ii){return function(){answerJExam(ii);};})(i);
    el.appendChild(b);
  });
}

function answerJExam(idx){
  if(riddleRight) return;
  riddleRight=true;
  const r=jExam.npc.riddles[jExam.q];
  const correct=r.opts[idx].c;
  document.querySelectorAll('.ans').forEach(function(b,i){
    b.disabled=true;
    if(i===idx){ b.classList.add(r.opts[i].c?'correct':'wrong'); }
  });
  if(correct){jExam.passed++;playSFX('correct');}
  else playSFX('wrong');
  const fb=correct?'<span style="color:#7ddb7d">CORRECT!</span> ':'<span style="color:#db7d7d">Wrong.</span> ';
  document.getElementById('rdl-fb').innerHTML=fb+r.expl;
  const isLast=(jExam.q>=jExam.npc.riddles.length-1);
  const contBtn=document.getElementById('rdl-cont');
  contBtn.textContent=isLast?'FINISH EXAM':'NEXT QUESTION';
  contBtn.onclick=advanceJExam;
  contBtn.style.display='block';
}

function advanceJExam(){
  jExam.q++;
  if(jExam.q<jExam.npc.riddles.length){
    showJExamQ();
  } else {
    document.getElementById('rdl').style.display='none';
    GS.riddleOpen=false;
    const p=jExam.passed,t=jExam.npc.riddles.length;
    if(p===t){
      GS.beaten[jExam.npc.id]=true;
      playSFX('win');
      setTimeout(showWin,600);
    } else {
      GS.cooldowns[jExam.npc.id]={secs:COOLDOWN_SECS};
      startCooldownTimer(jExam.npc.id);
      notify(p+'/'+t+' correct. Not enough. Come back in '+COOLDOWN_SECS+'s!');
    }
    cv.focus();
  }
}

// ================================================================
// RIDDLE
// ================================================================
let riddleRight=false;

function openRiddle(npc){
  closeDlg();
  GS.riddleOpen=true;
  document.getElementById('rdl').style.display='block';
  const r=npc.riddle;
  const pname=npc.partId?PARTS.find(p=>p.id===npc.partId)?.name:'QI Certificate';
  document.getElementById('rdl-title').textContent=`⚡ ${npc.firstName.toUpperCase()}'S CHALLENGE ⚡`;
  document.getElementById('rdl-prize').textContent=`🏆 Prize: ${pname}`;
  document.getElementById('rdl-q').textContent=r.q;
  document.getElementById('rdl-fb').textContent='';
  document.getElementById('rdl-cont').style.display='none';
  riddleRight=false;

  const el=document.getElementById('rdl-answers');
  el.innerHTML='';
  r.opts.forEach((opt,i)=>{
    const b=document.createElement('button');
    b.className='ans';b.textContent=opt.t;
    b.onclick=()=>answerRiddle(i,npc);
    el.appendChild(b);
  });
}

function answerRiddle(idx,npc){
  if(riddleRight) return;
  const r=npc.riddle;
  const correct=r.opts[idx].c;
  const btns=document.querySelectorAll('.ans');
  btns.forEach((b,i)=>{
    b.disabled=true;
    if(i===idx){ b.classList.add(r.opts[i].c?'correct':'wrong'); }
  });

  if(correct){
    riddleRight=true;
    document.getElementById('rdl-fb').innerHTML=`<span style="color:#7ddb7d">✓ CORRECT!</span> ${r.expl}`;
    playSFX('correct');
    document.getElementById('rdl-cont').style.display='block';
  } else {
    // WRONG: no explanation shown, cooldown starts
    document.getElementById('rdl-fb').innerHTML=`<span style="color:#db7d7d">✗ Not quite.</span> Come back in ${COOLDOWN_SECS}s and review your notes!`;
    playSFX('wrong');
    // Start cooldown
    GS.cooldowns[npc.id]={secs:COOLDOWN_SECS};
    startCooldownTimer(npc.id);
    document.getElementById('rdl-cont').style.display='block';
  }
}

function closeRiddle(){
  document.getElementById('rdl').style.display='none';
  GS.riddleOpen=false;
  const npc=GS.currentNPC;
  if(riddleRight&&npc){
    GS.beaten[npc.id]=true;
    if(npc.partId){
      GS.inv[npc.partId]=true;
      updateInvUI();
      playSFX('pickup');
      notify(`✓ Got: ${PARTS.find(p=>p.id===npc.partId)?.name}!`);
    } else if(npc.role==='boss'){
      playSFX('win');setTimeout(showWin,800);
    }
  }
  cv.focus();
}

// Cooldown timer (real-time seconds)
function startCooldownTimer(id){
  const iv=setInterval(()=>{
    if(!GS.cooldowns[id]){clearInterval(iv);return;}
    GS.cooldowns[id].secs-=1;
    if(GS.cooldowns[id].secs<=0){
      delete GS.cooldowns[id];clearInterval(iv);
    }
  },1000);
}


// ================================================================
// INTERIOR
// ================================================================
// ================================================================
// WIN
// ================================================================
function showWin(){
  GS.won=true;stopMusic();
  const w=document.getElementById('win');
  w.style.display='flex';
}

// ================================================================
// INVENTORY UI
// ================================================================
function buildInvUI(){
  const el=document.getElementById('slots');
  el.innerHTML='';
  PARTS.forEach(p=>{
    const s=document.createElement('div');
    s.className='slot';s.id='slot-'+p.id;
    s.innerHTML=`<div class="slot-icon" style="opacity:0.2">${p.icon}</div><div class="tip">${p.name}</div>`;
    el.appendChild(s);
  });
}

function updateInvUI(){
  const count=Object.keys(GS.inv).length;
  PARTS.forEach(p=>{
    const s=document.getElementById('slot-'+p.id);
    if(s&&GS.inv[p.id]){
      s.classList.add('filled');
      s.querySelector('.slot-icon').style.opacity='1';
    }
  });
  if(count===PARTS.length) notify('🔬 All parts! Find Jennifer in Grace Auditorium!');
}

// ================================================================
// NOTIFICATION
// ================================================================
function notify(t){
  const el=document.getElementById('notif');
  el.textContent=t;el.style.display='block';
  clearTimeout(window._nt);
  window._nt=setTimeout(()=>el.style.display='none',3500);
}

// ================================================================
// CAMERA — dead-zone scroll
// Camera only moves when player walks within MARGIN tiles of the
// viewport edge. At map boundaries the camera clamps and the
// player walks freely up to the edge.
// ================================================================
const CAM_MARGIN = 4; // tiles from edge before camera scrolls

function updateCam(){
  const p=GS.player;
  let cx=GS.cam.x, cy=GS.cam.y;

  // Scroll right: player too close to right edge of viewport
  if(p.x - cx > VW - 1 - CAM_MARGIN) cx = p.x - (VW - 1 - CAM_MARGIN);
  // Scroll left: player too close to left edge of viewport
  if(p.x - cx < CAM_MARGIN)           cx = p.x - CAM_MARGIN;
  // Scroll down
  if(p.y - cy > VH - 1 - CAM_MARGIN) cy = p.y - (VH - 1 - CAM_MARGIN);
  // Scroll up
  if(p.y - cy < CAM_MARGIN)           cy = p.y - CAM_MARGIN;

  // Clamp to map bounds
  GS.cam.x = Math.max(0, Math.min(W - VW, cx));
  GS.cam.y = Math.max(0, Math.min(H - VH, cy));
}

// ================================================================
// DRAW — TILE
// ================================================================
function drawTile(x,y,tile,cx,cy){
  const px=(x-cx)*TS,py=(y-cy)*TS;
  if(px<-TS||px>VW*TS||py<-TS||py>VH*TS) return;
  ctx.fillStyle=TC[tile]||'#2a4018';
  ctx.fillRect(px,py,TS,TS);

  if(tile===T.G){
    // subtle grid + occasional grass tuft
    ctx.strokeStyle='rgba(0,0,0,0.08)';ctx.lineWidth=0.5;
    ctx.strokeRect(px,py,TS,TS);
    if((x*3+y*7)%11===0){
      ctx.fillStyle='#3a5022';
      ctx.fillRect(px+3,py+14,2,4);ctx.fillRect(px+9,py+12,2,6);ctx.fillRect(px+14,py+15,2,3);
    }
  }
  if(tile===T.W){
    // water shimmer
    const sh=0.12+Math.sin(GS.waterT+x*0.7+y*0.4)*0.08;
    ctx.fillStyle=`rgba(80,140,200,${sh})`;ctx.fillRect(px,py,TS,TS);
    if((GS.frame+x+y)%18<2){
      ctx.strokeStyle='rgba(140,200,255,0.25)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(px+2,py+TS/2);ctx.lineTo(px+TS-2,py+TS/2);ctx.stroke();
    }
  }
  if(tile===T.TR){
    // Simple tree pixel art
    ctx.fillStyle='#0e2010';
    ctx.beginPath();ctx.moveTo(px+TS/2,py+1);ctx.lineTo(px+TS-2,py+TS-3);ctx.lineTo(px+2,py+TS-3);ctx.closePath();ctx.fill();
    ctx.fillStyle='#1c3a1c';
    ctx.beginPath();ctx.moveTo(px+TS/2,py+1);ctx.lineTo(px+TS-4,py+TS-5);ctx.lineTo(px+4,py+TS-5);ctx.closePath();ctx.fill();
    ctx.fillStyle='#3a2210';ctx.fillRect(px+TS/2-2,py+TS-4,4,4);
  }
  if(tile===T.WL){
    // Brick wall
    ctx.fillStyle='#7a6840';ctx.fillRect(px,py,TS,TS);
    ctx.fillStyle='#8a7850';
    const row=y%2;
    for(let i=0;i<3;i++){const bx=(row*5+i*8)%TS;ctx.fillRect(px+bx,py+1,6,TS/2-2);ctx.fillRect(px+bx,py+TS/2+1,6,TS/2-2);}
  }
  if(tile===T.SC){
    // Staircase / door
    ctx.fillStyle='#9a8060';ctx.fillRect(px,py,TS,TS);
    ctx.fillStyle='#c8a870';
    for(let i=0;i<4;i++) ctx.fillRect(px+1,py+2+i*4,TS-2,2);
    // Arrow prompt
    if(GS.frame%30<20){ctx.fillStyle='#7ddb7d';ctx.font='8px monospace';ctx.textAlign='center';ctx.fillText('▲',px+TS/2,py+TS-2);}
  }
  if(tile===T.P){
    ctx.strokeStyle='rgba(0,0,0,0.1)';ctx.lineWidth=0.5;ctx.strokeRect(px,py,TS,TS);
  }
  if(tile===T.DK){
    ctx.fillStyle='#5a3818';ctx.fillRect(px,py,TS,TS);
    ctx.strokeStyle='#3a2008';ctx.lineWidth=1;
    for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(px,py+i*7+2);ctx.lineTo(px+TS,py+i*7+2);ctx.stroke();}
  }
}

// ================================================================
// DRAW — NPC PIXEL SPRITES
// ================================================================
// Each NPC has hand-crafted 16×24 pixel art in a 4-color palette
// drawn with ctx rectangles for that authentic Game Boy feel

function drawNPC(npc,cx,cy){
  const px=(npc.x-cx)*TS, py=(npc.y-cy)*TS;
  if(px<-TS||px>VW*TS||py<-TS||py>VH*TS) return;

  const beaten=GS.beaten[npc.id];
  const bob=Math.sin(GS.frame*0.12+npc.x+npc.y)*1;
  const cd=GS.cooldowns[npc.id];

  // Shadow
  ctx.fillStyle='rgba(0,0,0,0.28)';
  ctx.beginPath();ctx.ellipse(px+TS/2,py+TS-2,7,3,0,0,Math.PI*2);ctx.fill();

  // Pixel sprite — 16 wide, drawn at (px+2, py+bob)
  const sx=px+2, sy=py+bob;
  drawPixelNPC(ctx,sx,sy,npc,beaten);

  // Name tag
  const shortName=npc.firstName;
  ctx.font='7px monospace';
  ctx.fillStyle='#7ddb7d';
  ctx.textAlign='center';
  ctx.fillText(shortName,px+TS/2,py-1+bob);

  // Interaction indicator
  if(!beaten&&!cd){
    const pulse=0.5+Math.sin(GS.frame*0.14)*0.5;
    ctx.fillStyle=`rgba(255,200,50,${pulse})`;
    ctx.font='9px monospace';ctx.textAlign='right';
    ctx.fillText('!',px+TS-1,py+4);
  }
  if(cd){
    const pulse=0.4+Math.sin(GS.frame*0.2)*0.4;
    ctx.fillStyle=`rgba(255,100,100,${pulse})`;
    ctx.font='8px monospace';ctx.textAlign='right';
    ctx.fillText('⏱',px+TS-1,py+4);
  }
  if(beaten&&npc.partId){
    ctx.fillStyle='#7ddb7d';ctx.font='9px serif';ctx.textAlign='right';
    ctx.fillText('✓',px+TS,py+4);
  }
  if(npc.role==='boss'){
    const hasAll=PARTS.every(p=>GS.inv[p.id]);
    if(hasAll&&!beaten){
      const pulse=0.4+Math.sin(GS.frame*0.2)*0.5;
      ctx.fillStyle=`rgba(255,50,50,${pulse})`;
      ctx.font='9px monospace';ctx.textAlign='center';
      ctx.fillText('BOSS',px+TS/2,py-10);
    }
  }
}

// Pixel NPC sprite — 16×22 character using rect-draw pixel art
function drawPixelNPC(c,sx,sy,npc,beaten){
  const {hair,skin,shirt,coat}=npc;
  const sc=1; // scale 1px = 1px

  // Head (8×8 at sx+4, sy+2)
  pr(c,sx+4,sy+2,8,8,skin);
  // Hair
  pr(c,sx+4,sy+2,8,3,hair);
  // Eyes
  pr(c,sx+5,sy+6,2,2,'#1a1a1a');
  pr(c,sx+9,sy+6,2,2,'#1a1a1a');

  // Body (shirt or coat)
  if(coat){
    pr(c,sx+3,sy+10,10,8,shirt); // white coat
    pr(c,sx+6,sy+10,2,8,'#cccccc'); // center stripe
    pr(c,sx+3,sy+10,2,8,'#dddddd'); // left coat edge
    pr(c,sx+11,sy+10,2,8,'#dddddd'); // right coat edge
  } else {
    pr(c,sx+3,sy+10,10,8,shirt);
  }

  // Arms
  pr(c,sx+1,sy+10,2,7,skin);
  pr(c,sx+13,sy+10,2,7,skin);

  // Legs
  const legWave=Math.round(Math.sin(npc.x*0.5+GS.frame*0.15)*1);
  pr(c,sx+3,sy+18,4,5,'#2a2a6a');
  pr(c,sx+9,sy+18,4,5,'#2a2a6a');
  // Shoes
  pr(c,sx+2,sy+22,5,2,'#1a1a1a');
  pr(c,sx+9,sy+22,5,2,'#1a1a1a');
}

// Pixel rect helper
function pr(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h);}

// ================================================================
// DRAW — PLAYER
// ================================================================
function drawPlayer(cx,cy){
  const p=GS.player;
  const px=(p.x-cx)*TS, py=(p.y-cy)*TS;
  const bob=Math.sin(GS.frame*0.18)*(p.step%2?1:0);

  // Shadow
  ctx.fillStyle='rgba(0,0,0,0.3)';
  ctx.beginPath();ctx.ellipse(px+TS/2,py+TS-2,7,3,0,0,Math.PI*2);ctx.fill();

  const sx=px+2, sy=py+bob;
  // Head
  pr(ctx,sx+4,sy+1,8,8,'#DEB887');
  // Hair — dark
  pr(ctx,sx+4,sy+1,8,3,'#3a2510');
  // Eyes based on direction
  if(p.dir===2){pr(ctx,sx+5,sy+6,2,2,'#111');pr(ctx,sx+9,sy+6,2,2,'#111');}
  else if(p.dir===0){pr(ctx,sx+5,sy+4,2,2,'#111');pr(ctx,sx+9,sy+4,2,2,'#111');}
  else if(p.dir===1){pr(ctx,sx+5,sy+5,2,2,'#111');}
  else{pr(ctx,sx+9,sy+5,2,2,'#111');}
  // Lab coat (player is always a scientist!)
  pr(ctx,sx+3,sy+9,10,8,'#f0f0f0');
  pr(ctx,sx+6,sy+9,2,8,'#dddddd');
  pr(ctx,sx+3,sy+9,2,8,'#e8e8e8');
  pr(ctx,sx+11,sy+9,2,8,'#e8e8e8');
  // Arms
  pr(ctx,sx+1,sy+9,2,7,'#DEB887');
  pr(ctx,sx+13,sy+9,2,7,'#DEB887');
  // Legs — animated walk cycle
  const walk=Math.sin(GS.frame*0.25)*2;
  pr(ctx,sx+3,sy+17,4,5+walk,'#1a3a8a');
  pr(ctx,sx+9,sy+17,4,5-walk,'#1a3a8a');
  pr(ctx,sx+2,sy+22,5,2,'#1a1a1a');
  pr(ctx,sx+9,sy+22,5,2,'#1a1a1a');
}

// NPC sprite "name" for dialog header
function npcSpriteName(npc){
  const icons={ta:'🎓',instructor:'🔬',vendor:'🏪',boss:'⚡'};
  return icons[npc.role]||'👤';
}

// ================================================================
// BUILDING LABELS
// ================================================================
function drawBuildingLabels(cx,cy){
  BUILDINGS.forEach(b=>{
    const px=(b.x+b.w/2-cx)*TS, py=(b.y+1-cy)*TS+8;
    if(px<0||px>cv.width||py<0||py>cv.height) return;
    ctx.font='6px monospace';ctx.fillStyle=b.color;ctx.textAlign='center';
    ctx.fillText(b.name,px,py);
  });
}

// ================================================================
// MINIMAP
// ================================================================
function drawMinimap(){
  const mw=90,mh=90;
  mmctx.fillStyle='#071407';mmctx.fillRect(0,0,mw,mh);
  const sx=mw/W,sy=mh/H;
  const mc={[T.G]:'#2a4018',[T.W]:'#1a3555',[T.P]:'#7a6040',[T.BL]:'#382818',[T.WL]:'#685838',[T.TR]:'#163016',[T.DK]:'#5a3818',[T.SC]:'#9a8060'};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    mmctx.fillStyle=mc[GS.map[y][x]]||'#2a4018';
    mmctx.fillRect(Math.floor(x*sx),Math.floor(y*sy),Math.ceil(sx)+1,Math.ceil(sy)+1);
  }
  // NPCs
  NPCS.forEach(n=>{
    mmctx.fillStyle='#7ddb7d';
    mmctx.fillRect(Math.floor(n.x*sx)-1,Math.floor(n.y*sy)-1,3,3);
  });
  // Player
  mmctx.fillStyle='#ffffff';
  const p=GS.player;
  mmctx.fillRect(Math.floor(p.x*sx)-1,Math.floor(p.y*sy)-1,3,3);
  // Viewport rect
  const cam=GS.cam;
  mmctx.strokeStyle='rgba(255,255,255,0.3)';mmctx.lineWidth=1;
  mmctx.strokeRect(Math.floor(cam.x*sx),Math.floor(cam.y*sy),Math.floor(VW*sx),Math.floor(VH*sy));
}


// ================================================================
// SNACK EASTER EGGS — hidden treats around CSHL campus
// ================================================================

function checkSnacks(){
  const p=GS.player;
  const s=SNACKS.find(s=>s.x===p.x&&s.y===p.y&&!foundSnacks.has(s.x+','+s.y));
  if(s){
    foundSnacks.add(s.x+','+s.y);
    const found=foundSnacks.size,total=SNACKS.length;
    notify(s.msg);
    playSFX('pickup');
    updateSnackCounter();
    if(found===total&&!bananaModeActive){
      setTimeout(function(){notify('🍌 ALL SNACKS FOUND! Banana Joe time!');playBananaJoe();},1200);
    }
  }
}
function updateSnackCounter(){
  const el=document.getElementById('snack-count');
  if(el) el.textContent='🍌 '+foundSnacks.size+'/'+SNACKS.length;
}

// ================================================================
// MAIN LOOP
// ================================================================
let lastT=0;
function loop(ts=0){
  const dt=ts-lastT;lastT=ts;
  GS.frame++;GS.waterT+=0.025;
  if(!GS.started||GS.won){requestAnimationFrame(loop);return;}
  handleMove(dt);updateCam();

  // Clear
  ctx.fillStyle='#0a1208';ctx.fillRect(0,0,cv.width,cv.height);
  const cx=GS.cam.x,cy=GS.cam.y;

  // Tiles
  for(let y=cy;y<Math.min(cy+VH+2,H);y++)
    for(let x=cx;x<Math.min(cx+VW+2,W);x++)
      drawTile(x,y,GS.map[y][x],cx,cy);

  // Building labels
  drawBuildingLabels(cx,cy);

  // NPCs
  NPCS.forEach(n=>drawNPC(n,cx,cy));

  // Player
  drawPlayer(cx,cy);

  // Post-process: scanlines + vignette
  ctx.fillStyle='rgba(0,0,0,0.025)';
  for(let i=0;i<cv.height;i+=2) ctx.fillRect(0,i,cv.width,1);
  const vg=ctx.createRadialGradient(cv.width/2,cv.height/2,80,cv.width/2,cv.height/2,Math.max(cv.width,cv.height)*0.6);
  vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,0.45)');
  ctx.fillStyle=vg;ctx.fillRect(0,0,cv.width,cv.height);

  drawMinimap();
  requestAnimationFrame(loop);
}


let lastNearBoss=false;
setInterval(()=>{
  if(!GS.started||GS.won)return;
  const p=GS.player;
  const jNPC=NPCS.find(n=>n.role==='boss');
  if(!jNPC)return;
  const dist=Math.abs(jNPC.x-p.x)+Math.abs(jNPC.y-p.y);
  const near=dist<=2;
  if(near&&!lastNearBoss){
    // Remember which music was playing so we can restore it on exit
    _prevMusicFn=bananaModeActive?playBananaJoe:playMusic;
    playJenniferMusic();
    playSFX('interact');
  }
  if(!near&&lastNearBoss){
    stopMusic();
    resumePrevMusic();
  }
  lastNearBoss=near;
},500);


function tpush(code){
  keys.add(code);
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(code)){
    _konamiSeq.push(code);
    if(_konamiSeq.length>_konamiCode.length) _konamiSeq.shift();
    if(_konamiSeq.join(',')===_konamiCode.join(',')){
      _konamiSeq=[];
      if(!bananaModeActive){notify('🍌 BANANA JOE ACTIVATED!');playBananaJoe();}
    }
  }
}
function tpop(code){setTimeout(()=>keys.delete(code),80);}
function taction(){
  if(!GS.dialogOpen&&!GS.riddleOpen) tryInteract();
  else if(GS.dialogOpen){const b=document.querySelectorAll('.cbtn');if(b.length===1)b[0].click();}
}
document.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
document.addEventListener('touchstart',e=>{
  if(e.touches.length>1) e.preventDefault(); // no pinch zoom
},{passive:false});

// Handle orientation/resize
window.addEventListener('resize',()=>{ if(GS.started) calcViewport(); });
if(window.visualViewport){
  window.visualViewport.addEventListener('resize',()=>{ if(GS.started) calcViewport(); });
  window.visualViewport.addEventListener('scroll',()=>{ if(GS.started) calcViewport(); });
}
window.addEventListener('orientationchange',()=>{ setTimeout(()=>{ if(GS.started) calcViewport(); },200); });

// Boot
window.addEventListener('load',()=>{
  document.getElementById('title').style.display='flex';
});
