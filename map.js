


// ================================================================
// MAP — Based on real CSHL campus layout
// Building positions derived from official CSHL map #1-66+
// Harbor runs along the east edge; Bungtown Rd runs N-S
// ================================================================
const W=42, H=32;
const T={G:0,W:1,P:2,BL:3,WL:4,TR:5,DK:6,SC:7}; // Grass,Water,Path,Building,Wall,Tree,Dock,Stairs

function makeMap(){
  const m=[];
  for(let y=0;y<H;y++){m[y]=[];for(let x=0;x<W;x++)m[y][x]=T.G;}

  // Harbor water — east side, irregular shoreline
  for(let y=0;y<H;y++)
    for(let x=34;x<W;x++)
      if(x>34+Math.round(Math.sin(y*0.6)*1.5)) m[y][x]=T.W;

  // Beach / dock area mid-east
  for(let y=14;y<18;y++) m[y][33]=T.DK;
  m[15][34]=T.DK; m[16][34]=T.DK; 

  // === ROADS ===  
  // (x,y) coords are top-left of 2-tile wide road sections
  // Bungtown Rd (main N-S, enters from south, runs to harbor at north)
  for(let y=2;y<H;y++){m[y][18]=T.P;m[y][19]=T.P;}
  // Upper east spur (to Grace / Carnegie)
  for(let x=12;x<35;x++){m[3][x]=T.P;m[4][x]=T.P;}
  // Lower loop road
  for(let x=4;x<31;x++){m[24][x]=T.P;m[25][x]=T.P;}
  // Cross-road mid campus
  for(let x=4;x<34;x++){m[14][x]=T.P;m[15][x]=T.P;}
  // West spur
  for(let y=3;y<26;y++){m[y][4]=T.P;m[y][5]=T.P;}
  // East inner road (parallel to harbor)
  for(let y=5;y<26;y++){m[y][31]=T.P;m[y][32]=T.P;}

  for(let x=4;x<10;x++){m[8][x]=T.P;}

  // === BUILDINGS (using real CSHL building positions) ===
  // (x,y,w,h) = top-left corner + width/height in tiles
  // #1 Grace Auditorium (large, NE area, key meeting hall)
  bld(m,12,16,6,8);
  // #5 Bush Lecture Hall (just south of Grace)
  bld_top(m,20,16,5,4);
  // #6 Blackford Hall/Dining (large central)
  bld(m,20,7,5,7);
  // #10 Delbruck Lab
  // bld(m,7,8,5,4);
  // #4 Demerec Lab (west side)
  // bld(m,6,16,5,4);
  // #22 Hershey Lab
  bld_top(m,26,16,5,6);
  // #24 Cairns Lab
  // bld(m,27,16,4,4);
  // #32 Beckman Lab (Hillside area)
  // bld(m,20,17,5,5);
  // #21 Carnegie Library (near harbor)
  // bld(m,28,11,5,4);
  // #31 Dolan Hall (north, housing + fitness)
  bld(m,6,3,6,5);
  // cole cottage
  bld_top(m,14,5,4,4);

  bld_top(m,27,5,4,4);
  // Cabins row (south)
  for(let i=0;i<3;i++) bld(m,1,2+i*4,3,3);
  // Small shed / boathouse by harbor
  // bld(m,30,22,3,3);
  // Airslie House (historic, north entrance area)
  // bld(m,12,2,4,3);

  // Trees — peppered around grass
  // (x,y) coords are center of tree tile; some are just off-map to create a more natural edge
  const trees=[
    [2,2],[3,2],[2,10],[2,15],[2,20],[2,25],
    [9,2],[10,2],[11,2],
    [21,2],[22,2],[23,2],[24,2],[25,2],[26,2],
    [9,26],[10,26],[11,26],[13,26],[14,26],[15,26],[16,26],
    [17,26],[18,26],[19,26],[20,26],[21,26],
    [34,2],[35,2],[36,2],[37,2],[38,2],
    [33,20],[33,21],[33,22],[33,23],[33,24],[33,25],
    [3,12],[3,13],[3,18],[3,19],
    [17,2],[18,2],[19,2],
    [6,12],[6,13],
  ];
  trees.forEach(([x,y])=>{if(y<H&&x<W&&m[y][x]===T.G)m[y][x]=T.TR;});

  return m;
}

function bld(m,x,y,w,h){
  for(let dy=0;dy<h;dy++) for(let dx=0;dx<w;dx++){
    if(y+dy<H&&x+dx<W){
      const isWall=dx===0||dx===w-1||dy===0||dy===h-1;
      m[y+dy][x+dx]=isWall?T.WL:T.BL;
    }
  }
  // Door in bottom center
  if(y+h<H) m[y+h-1][x+Math.floor(w/2)]=T.SC;
}

function bld_top(m,x,y,w,h){
  for(let dy=0;dy<h;dy++) for(let dx=0;dx<w;dx++){
    if(y+dy<H&&x+dx<W){
      const isWall=dx===0||dx===w-1||dy===0||dy===h-1;
      m[y+dy][x+dx]=isWall?T.WL:T.BL;
    }
  }
  // Door in bottom center
  if(y+h<H) m[y][x+Math.floor(w/2)]=T.SC;
}


// ================================================================
// RENDERING COLORS
// ================================================================
const TC={
  [T.G]:'#2a4018',[T.W]:'#1a3555',[T.P]:'#7a6040',
  [T.BL]:'#382818',[T.WL]:'#685838',[T.TR]:'#163016',
  [T.DK]:'#5a3818',[T.SC]:'#9a8060',
};
