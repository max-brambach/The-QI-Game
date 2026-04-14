// ================================================================
// GAME DATA — Edit NPCs, parts, riddles, buildings, snacks here
// ================================================================

const PARTS = [
  {id:'obj',      name:'Objective Lens',          icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="6" y="2" width="16" height="2" fill="#aaeaaa"/><rect x="6" y="4" width="16" height="3" fill="#7ddb7d"/><rect x="7" y="4" width="14" height="1" fill="#aaeaaa"/><rect x="6" y="6" width="1" height="3" fill="#4a9e4a"/><rect x="21" y="6" width="1" height="3" fill="#4a9e4a"/><rect x="7" y="6" width="14" height="3" fill="#7ddb7d"/><rect x="7" y="9" width="14" height="1" fill="#4a9e4a"/><rect x="7" y="10" width="14" height="1" fill="#aaeaaa"/><rect x="7" y="11" width="14" height="1" fill="#4a9e4a"/><rect x="7" y="12" width="14" height="1" fill="#7ddb7d"/><rect x="7" y="13" width="14" height="1" fill="#4a9e4a"/><rect x="7" y="14" width="14" height="1" fill="#aaeaaa"/><rect x="7" y="15" width="14" height="1" fill="#4a9e4a"/><rect x="8" y="16" width="12" height="2" fill="#7ddb7d"/><rect x="9" y="18" width="10" height="1" fill="#4a9e4a"/><rect x="9" y="19" width="10" height="2" fill="#7ddb7d"/><rect x="10" y="21" width="8" height="1" fill="#4a9e4a"/><rect x="10" y="22" width="8" height="2" fill="#7ddb7d"/><rect x="11" y="24" width="6" height="2" fill="#4a9e4a"/><rect x="11" y="26" width="6" height="1" fill="#7ddb7d"/><rect x="12" y="26" width="4" height="1" fill="#aaeaaa"/><rect x="13" y="26" width="2" height="1" fill="#ffffff"/></svg>'},
  {id:'cond',     name:'Condenser',               icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="8" y="3" width="12" height="2" fill="#7ddb7d"/><rect x="9" y="5" width="10" height="2" fill="#4a9e4a"/><rect x="10" y="7" width="8" height="2" fill="#7ddb7d"/><rect x="9" y="9" width="10" height="2" fill="#4a9e4a"/><rect x="9" y="11" width="2" height="2" fill="#7ddb7d"/><rect x="17" y="11" width="2" height="2" fill="#7ddb7d"/><rect x="10" y="11" width="8" height="2" fill="#1a1a1a"/><rect x="10" y="13" width="8" height="2" fill="#1a1a1a"/><rect x="9" y="13" width="2" height="2" fill="#7ddb7d"/><rect x="17" y="13" width="2" height="2" fill="#7ddb7d"/><rect x="9" y="15" width="10" height="2" fill="#4a9e4a"/><rect x="12" y="17" width="4" height="4" fill="#7ddb7d"/><rect x="13" y="21" width="2" height="4" fill="#4a9e4a"/></svg>'},
  {id:'digcam',   name:'Digital Camera',          icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="4" y="8" width="20" height="14" fill="#4a9e4a"/><rect x="5" y="9" width="18" height="12" fill="#1a2a1a"/><rect x="9" y="11" width="10" height="8" fill="#4a9e4a"/><rect x="10" y="12" width="8" height="6" fill="#1a1a1a"/><rect x="11" y="13" width="6" height="4" fill="#2a2a5a"/><rect x="12" y="14" width="4" height="2" fill="#3a3a8a"/><rect x="13" y="14" width="2" height="1" fill="#aaaaff"/><rect x="18" y="6" width="4" height="3" fill="#7ddb7d"/><rect x="5" y="5" width="7" height="4" fill="#4a9e4a"/><rect x="6" y="10" width="2" height="2" fill="#f0c87d"/></svg>'},
  {id:'segsoft',  name:'Segmentation Software',   icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="3" y="4" width="22" height="18" fill="#4a9e4a"/><rect x="4" y="5" width="20" height="16" fill="#0a140a"/><rect x="6" y="7" width="4" height="2" fill="#7ddb7d"/><rect x="5" y="8" width="1" height="4" fill="#7ddb7d"/><rect x="6" y="12" width="4" height="2" fill="#7ddb7d"/><rect x="10" y="8" width="1" height="4" fill="#7ddb7d"/><rect x="7" y="9" width="2" height="2" fill="#4a9e4a"/><rect x="14" y="7" width="5" height="2" fill="#f0c87d"/><rect x="13" y="8" width="1" height="4" fill="#f0c87d"/><rect x="14" y="12" width="5" height="2" fill="#f0c87d"/><rect x="19" y="8" width="1" height="4" fill="#f0c87d"/><rect x="15" y="9" width="3" height="2" fill="#c8a050"/><rect x="9" y="15" width="5" height="2" fill="#7db8f0"/><rect x="8" y="16" width="1" height="2" fill="#7db8f0"/><rect x="9" y="18" width="5" height="2" fill="#7db8f0"/><rect x="14" y="16" width="1" height="2" fill="#7db8f0"/><rect x="10" y="16" width="3" height="2" fill="#5a8ac0"/><rect x="10" y="22" width="8" height="2" fill="#4a9e4a"/></svg>'},
  {id:'denoise',  name:'Denoising Software',      icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="2" y="5" width="24" height="18" fill="#4a9e4a"/><rect x="3" y="6" width="22" height="16" fill="#0a140a"/><rect x="4" y="7" width="9" height="13" fill="#0a1a0a"/><rect x="4" y="7" width="4" height="1" fill="#4a9e4a"/><rect x="5" y="9" width="2" height="1" fill="#7ddb7d"/><rect x="7" y="10" width="1" height="1" fill="#7ddb7d"/><rect x="5" y="11" width="1" height="2" fill="#4a9e4a"/><rect x="8" y="9" width="1" height="1" fill="#7ddb7d"/><rect x="6" y="12" width="2" height="1" fill="#7ddb7d"/><rect x="9" y="11" width="1" height="1" fill="#4a9e4a"/><rect x="5" y="13" width="1" height="1" fill="#7ddb7d"/><rect x="8" y="14" width="2" height="1" fill="#7ddb7d"/><rect x="6" y="15" width="1" height="1" fill="#4a9e4a"/><rect x="7" y="16" width="1" height="1" fill="#7ddb7d"/><rect x="9" y="13" width="1" height="1" fill="#7ddb7d"/><rect x="5" y="17" width="2" height="1" fill="#4a9e4a"/><rect x="13" y="13" width="2" height="2" fill="#f0c87d"/><rect x="12" y="12" width="4" height="1" fill="#f0c87d"/><rect x="12" y="15" width="4" height="1" fill="#f0c87d"/><rect x="15" y="11" width="2" height="5" fill="#f0c87d"/><rect x="15" y="7" width="9" height="13" fill="#0a1a0a"/><rect x="15" y="7" width="4" height="1" fill="#4a9e4a"/><rect x="17" y="12" width="5" height="4" fill="#4a9e4a"/><rect x="18" y="11" width="3" height="6" fill="#7ddb7d"/><rect x="19" y="12" width="2" height="4" fill="#aaeaaa"/><rect x="20" y="13" width="1" height="2" fill="#ffffff"/></svg>'},
  {id:'objclass', name:'Object Classifier',       icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="3" y="3" width="22" height="20" fill="#4a9e4a"/><rect x="4" y="4" width="20" height="18" fill="#0a140a"/><rect x="4" y="11" width="20" height="1" fill="#2a4a2a"/><rect x="14" y="4" width="1" height="18" fill="#2a4a2a"/><rect x="5" y="5" width="8" height="5" fill="#4a1a1a"/><rect x="6" y="6" width="6" height="3" fill="#db4a4a"/><rect x="8" y="7" width="2" height="1" fill="#f07070"/><rect x="11" y="6" width="1" height="1" fill="#f07070"/><rect x="15" y="5" width="8" height="5" fill="#1a4a1a"/><rect x="16" y="6" width="6" height="3" fill="#4adb4a"/><rect x="19" y="7" width="2" height="1" fill="#7df07d"/><rect x="5" y="12" width="8" height="5" fill="#4a4a1a"/><rect x="6" y="13" width="6" height="3" fill="#dbdb4a"/><rect x="9" y="14" width="2" height="1" fill="#f0f07d"/><rect x="15" y="12" width="8" height="5" fill="#1a1a4a"/><rect x="16" y="13" width="6" height="3" fill="#4a4adb"/><rect x="19" y="14" width="2" height="1" fill="#7d7df0"/><rect x="11" y="22" width="6" height="2" fill="#4a9e4a"/></svg>'},
  {id:'coloc',    name:'Colocalization Software', icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="5" y="8" width="6" height="2" fill="#4adb4a"/><rect x="4" y="10" width="2" height="6" fill="#4adb4a"/><rect x="5" y="16" width="6" height="2" fill="#4adb4a"/><rect x="10" y="10" width="1" height="6" fill="#4adb4a"/><rect x="6" y="10" width="4" height="6" fill="#1a4a1a"/><rect x="13" y="8" width="6" height="2" fill="#db4a4a"/><rect x="19" y="10" width="2" height="6" fill="#db4a4a"/><rect x="13" y="16" width="6" height="2" fill="#db4a4a"/><rect x="12" y="10" width="1" height="6" fill="#db4a4a"/><rect x="14" y="10" width="4" height="6" fill="#4a1a1a"/><rect x="11" y="9" width="3" height="2" fill="#f0c87d"/><rect x="10" y="11" width="4" height="4" fill="#f0c87d"/><rect x="11" y="15" width="3" height="2" fill="#f0c87d"/><rect x="11" y="11" width="2" height="4" fill="#f0a040"/><rect x="7" y="21" width="14" height="2" fill="#4a9e4a"/></svg>'},
  {id:'laser',    name:'Laser Launch',            icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="3" y="10" width="12" height="8" fill="#4a9e4a"/><rect x="4" y="11" width="10" height="6" fill="#2a4a2a"/><rect x="5" y="12" width="3" height="2" fill="#db4a4a"/><rect x="5" y="15" width="3" height="1" fill="#4adb4a"/><rect x="14" y="9" width="2" height="10" fill="#7ddb7d"/><rect x="15" y="10" width="1" height="8" fill="#aaeaaa"/><rect x="17" y="13" width="2" height="2" fill="#aaeaaa"/><rect x="19" y="12" width="2" height="4" fill="#7ddb7d"/><rect x="21" y="11" width="2" height="6" fill="#4a9e4a"/><rect x="23" y="11" width="3" height="6" fill="#4adb4a"/><rect x="19" y="11" width="2" height="1" fill="#4a9e4a"/><rect x="19" y="16" width="2" height="1" fill="#4a9e4a"/><rect x="21" y="10" width="2" height="1" fill="#2a6a2a"/><rect x="21" y="17" width="2" height="1" fill="#2a6a2a"/></svg>'},
  {id:'tirf',     name:'TIRF Module',             icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="2" y="18" width="24" height="2" fill="#7ddb7d"/><rect x="3" y="19" width="22" height="1" fill="#aaeaaa"/><rect x="4" y="14" width="2" height="2" fill="#60b8ff"/><rect x="6" y="13" width="2" height="2" fill="#60b8ff"/><rect x="8" y="12" width="2" height="2" fill="#7ddbff"/><rect x="10" y="11" width="2" height="2" fill="#7ddbff"/><rect x="12" y="10" width="2" height="2" fill="#aaeaff"/><rect x="14" y="9" width="2" height="2" fill="#aaeaff"/><rect x="16" y="8" width="2" height="2" fill="#ffffff"/><rect x="4" y="20" width="20" height="4" fill="#1a1a2a"/><rect x="5" y="21" width="18" height="2" fill="#0a0a1a"/><rect x="18" y="18" width="2" height="2" fill="#4adb4a"/><rect x="20" y="16" width="2" height="2" fill="#4adb4a"/><rect x="22" y="14" width="2" height="2" fill="#7ddb7d"/><rect x="24" y="12" width="2" height="2" fill="#7ddb7d"/><rect x="2" y="6" width="4" height="2" fill="#4a4adb"/><rect x="3" y="5" width="2" height="2" fill="#7070f0"/><rect x="6" y="4" width="2" height="2" fill="#4a4adb"/></svg>'},
  {id:'confocal', name:'Confocal Scanner',        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="2" y="12" width="5" height="4" fill="#4adb4a"/><rect x="3" y="13" width="3" height="2" fill="#aaeaaa"/><rect x="8" y="10" width="6" height="6" fill="#4a9e4a"/><rect x="9" y="11" width="4" height="4" fill="#2a6a2a"/><rect x="9" y="11" width="2" height="2" fill="#7ddb7d"/><rect x="11" y="13" width="2" height="2" fill="#7ddb7d"/><rect x="12" y="16" width="4" height="2" fill="#4adb4a"/><rect x="12" y="18" width="4" height="8" fill="#2a6a2a"/><rect x="19" y="11" width="7" height="6" fill="#4a9e4a"/><rect x="20" y="12" width="5" height="4" fill="#1a1a1a"/><rect x="22" y="13" width="1" height="2" fill="#aaeaaa"/><rect x="21" y="19" width="5" height="5" fill="#7ddb7d"/><rect x="22" y="20" width="3" height="3" fill="#aaeaaa"/></svg>'},
  {id:'piezo',    name:'Piezo Z Stage',           icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="5" y="3" width="18" height="3" fill="#7ddb7d"/><rect x="6" y="4" width="16" height="1" fill="#aaeaaa"/><rect x="7" y="6" width="14" height="2" fill="#1a1a1a"/><rect x="8" y="8" width="12" height="2" fill="#4a9e4a"/><rect x="8" y="10" width="12" height="2" fill="#7ddb7d"/><rect x="8" y="12" width="12" height="2" fill="#4a9e4a"/><rect x="8" y="14" width="12" height="2" fill="#7ddb7d"/><rect x="8" y="16" width="12" height="2" fill="#4a9e4a"/><rect x="5" y="18" width="18" height="3" fill="#7ddb7d"/><rect x="6" y="19" width="16" height="1" fill="#aaeaaa"/><rect x="3" y="7" width="2" height="2" fill="#f0c87d"/><rect x="3" y="11" width="2" height="2" fill="#f0c87d"/><rect x="3" y="15" width="2" height="2" fill="#f0c87d"/><rect x="2" y="9" width="4" height="1" fill="#f0c87d"/><rect x="2" y="13" width="4" height="1" fill="#f0c87d"/><rect x="23" y="7" width="2" height="2" fill="#f0c87d"/><rect x="23" y="11" width="2" height="2" fill="#f0c87d"/><rect x="23" y="15" width="2" height="2" fill="#f0c87d"/><rect x="22" y="9" width="4" height="1" fill="#f0c87d"/><rect x="22" y="13" width="4" height="1" fill="#f0c87d"/></svg>'},
  {id:'xystage',  name:'Motorized XY Stage',      icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="6" y="6" width="16" height="16" fill="#4a9e4a"/><rect x="7" y="7" width="14" height="14" fill="#1a3a1a"/><rect x="10" y="10" width="8" height="8" fill="#2a4a2a"/><rect x="11" y="11" width="6" height="6" fill="#3a5a3a"/><rect x="12" y="12" width="4" height="4" fill="#4a9e4a"/><rect x="13" y="13" width="2" height="2" fill="#7ddb7d"/><rect x="2" y="13" width="4" height="2" fill="#f0c87d"/><rect x="1" y="12" width="2" height="4" fill="#f0c87d"/><rect x="22" y="13" width="4" height="2" fill="#f0c87d"/><rect x="25" y="12" width="2" height="4" fill="#f0c87d"/><rect x="13" y="2" width="2" height="4" fill="#f0c87d"/><rect x="12" y="1" width="4" height="2" fill="#f0c87d"/><rect x="13" y="22" width="2" height="4" fill="#f0c87d"/><rect x="12" y="25" width="4" height="2" fill="#f0c87d"/><rect x="3" y="3" width="3" height="3" fill="#7ddb7d"/><rect x="22" y="3" width="3" height="3" fill="#7ddb7d"/><rect x="3" y="22" width="3" height="3" fill="#7ddb7d"/><rect x="22" y="22" width="3" height="3" fill="#7ddb7d"/></svg>'},
  {id:'incubator',name:'Stage-top Incubator',     icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="3" y="4" width="22" height="4" fill="#7ddb7d"/><rect x="3" y="4" width="4" height="20" fill="#7ddb7d"/><rect x="21" y="4" width="4" height="20" fill="#7ddb7d"/><rect x="3" y="20" width="22" height="4" fill="#7ddb7d"/><rect x="4" y="5" width="20" height="18" fill="#0a140a"/><rect x="7" y="10" width="14" height="8" fill="#2a4a2a"/><rect x="8" y="11" width="12" height="6" fill="#3a5a3a"/><rect x="5" y="7" width="5" height="4" fill="#4a9e4a"/><rect x="6" y="8" width="3" height="2" fill="#f07a4a"/><rect x="18" y="7" width="5" height="4" fill="#4a9e4a"/><rect x="19" y="8" width="3" height="2" fill="#4adb4a"/><rect x="8" y="5" width="2" height="5" fill="#f07a4a"/><rect x="11" y="5" width="2" height="5" fill="#4adb4a"/><rect x="14" y="5" width="2" height="5" fill="#7db8f0"/><rect x="3" y="14" width="1" height="4" fill="#aaeaaa"/></svg>'},
  {id:'hydrogel', name:'Hydrogel Kit',            icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="10" y="2" width="8" height="2" fill="#7ddb7d"/><rect x="9" y="4" width="10" height="2" fill="#4a9e4a"/><rect x="8" y="6" width="12" height="14" fill="#4a9e4a"/><rect x="9" y="7" width="10" height="12" fill="#0a200a"/><rect x="9" y="7" width="10" height="3" fill="#2a5a8a"/><rect x="9" y="10" width="10" height="2" fill="#4a9e4a"/><rect x="9" y="12" width="10" height="2" fill="#8a5a2a"/><rect x="9" y="14" width="10" height="3" fill="#4a9e4a"/><rect x="12" y="9" width="4" height="2" fill="#7db8f0"/><rect x="11" y="10" width="1" height="2" fill="#7db8f0"/><rect x="15" y="10" width="1" height="2" fill="#7db8f0"/><rect x="12" y="12" width="4" height="1" fill="#7db8f0"/><rect x="10" y="19" width="4" height="1" fill="#f0c87d"/><rect x="14" y="19" width="4" height="1" fill="#f0c87d"/><rect x="9" y="20" width="10" height="2" fill="#4a9e4a"/><rect x="10" y="22" width="8" height="4" fill="#4a9e4a"/><rect x="11" y="23" width="6" height="2" fill="#2a4a2a"/></svg>'},

  {id:'filtwheel', name:'Emission Filter Wheel', icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="4" y="4" width="20" height="20" fill="#4a9e4a"/><rect x="5" y="5" width="18" height="18" fill="#1a3a1a"/><rect x="11" y="6" width="6" height="3" fill="#4adb4a"/><rect x="12" y="7" width="4" height="1" fill="#7df07d"/><rect x="18" y="9" width="4" height="5" fill="#dbdb4a"/><rect x="19" y="10" width="2" height="3" fill="#f0f07d"/><rect x="17" y="18" width="5" height="4" fill="#db4a4a"/><rect x="18" y="19" width="3" height="2" fill="#f07070"/><rect x="11" y="20" width="6" height="3" fill="#4a4adb"/><rect x="12" y="21" width="4" height="1" fill="#7070f0"/><rect x="5" y="18" width="5" height="4" fill="#4adbdb"/><rect x="6" y="19" width="3" height="2" fill="#70f0f0"/><rect x="4" y="9" width="4" height="5" fill="#db4adb"/><rect x="5" y="10" width="2" height="3" fill="#f070f0"/><rect x="11" y="11" width="6" height="6" fill="#4a9e4a"/><rect x="12" y="12" width="4" height="4" fill="#2a6a2a"/><rect x="13" y="13" width="2" height="2" fill="#7ddb7d"/><rect x="13" y="2" width="2" height="4" fill="#7ddb7d"/><rect x="13" y="22" width="2" height="4" fill="#7ddb7d"/></svg>'},
  {id:'flcube',    name:'Filter Cube',     icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="5" y="4" width="18" height="20" fill="#4a9e4a"/><rect x="6" y="5" width="16" height="18" fill="#1a3a1a"/><rect x="8" y="5" width="12" height="4" fill="#4a4adb"/><rect x="9" y="6" width="10" height="2" fill="#7070f0"/><rect x="10" y="6" width="8" height="1" fill="#aaaaff"/><rect x="16" y="8" width="2" height="2" fill="#aaeaaa"/><rect x="14" y="10" width="2" height="2" fill="#aaeaaa"/><rect x="12" y="12" width="2" height="2" fill="#aaeaaa"/><rect x="10" y="14" width="2" height="2" fill="#aaeaaa"/><rect x="8" y="16" width="2" height="2" fill="#aaeaaa"/><rect x="19" y="10" width="4" height="8" fill="#4adb4a"/><rect x="20" y="11" width="2" height="6" fill="#7df07d"/><rect x="20" y="13" width="2" height="2" fill="#ffffff"/><rect x="12" y="5" width="4" height="4" fill="#4a4adb"/><rect x="18" y="14" width="6" height="2" fill="#4adb4a"/><rect x="12" y="9" width="4" height="4" fill="#2a2a8a"/><rect x="17" y="13" width="2" height="4" fill="#2a8a2a"/><rect x="13" y="3" width="2" height="2" fill="#7db8f0"/><rect x="24" y="14" width="2" height="2" fill="#4adb4a"/></svg>'},
  {id:'ledsrc',   name:'LED Light Source',       icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" shape-rendering="crispEdges"><rect x="3" y="3" width="22" height="22" fill="#4a9e4a"/><rect x="4" y="4" width="20" height="20" fill="#1a3a1a"/><rect x="5" y="4" width="2" height="6" fill="#3a7a3a"/><rect x="9" y="4" width="2" height="6" fill="#3a7a3a"/><rect x="13" y="4" width="2" height="6" fill="#3a7a3a"/><rect x="17" y="4" width="2" height="6" fill="#3a7a3a"/><rect x="21" y="4" width="2" height="6" fill="#3a7a3a"/><rect x="6" y="11" width="3" height="3" fill="#60b8ff"/><rect x="10" y="11" width="3" height="3" fill="#60ffb8"/><rect x="14" y="11" width="3" height="3" fill="#c0ff40"/><rect x="18" y="11" width="3" height="3" fill="#ff6060"/><rect x="6" y="15" width="3" height="3" fill="#a060ff"/><rect x="10" y="15" width="3" height="3" fill="#60ffff"/><rect x="14" y="15" width="3" height="3" fill="#ffff40"/><rect x="18" y="15" width="3" height="3" fill="#ff2020"/><rect x="7" y="12" width="1" height="1" fill="#ffffff"/><rect x="11" y="12" width="1" height="1" fill="#ffffff"/><rect x="15" y="12" width="1" height="1" fill="#ffffff"/><rect x="19" y="12" width="1" height="1" fill="#ffffff"/><rect x="7" y="16" width="1" height="1" fill="#ffffff"/><rect x="11" y="16" width="1" height="1" fill="#ffffff"/><rect x="15" y="16" width="1" height="1" fill="#ffffff"/><rect x="19" y="16" width="1" height="1" fill="#ffffff"/><rect x="8" y="19" width="12" height="2" fill="#aaeaaa"/><rect x="6" y="21" width="16" height="1" fill="#7ddb7d"/><rect x="4" y="22" width="20" height="1" fill="#4a9e4a"/><rect x="8" y="24" width="12" height="2" fill="#2a6a2a"/><rect x="11" y="25" width="6" height="2" fill="#4a9e4a"/><rect x="23" y="5" width="2" height="2" fill="#00ff88"/><rect x="23" y="5" width="1" height="1" fill="#ffffff"/><rect x="3" y="8" width="22" height="2" fill="#2a6a2a"/><rect x="4" y="8" width="20" height="1" fill="#7ddb7d"/></svg>'},
];

// Cooldown: 30 seconds
const COOLDOWN_SECS = 30;

// NPC roster — x,y are TILE coordinates on the world map
const NPCS = [
  // ── BOSS ──────────────────────────────────────────────────────
  {
    id:'jennifer', firstName:'Jennifer', name:'Dr. Jennifer Waters',
    role:'boss', partId:null,
    x:28, y:19,
    hair:'#8B4513', skin:'#DEB887', shirt:'#FFFFFF', coat:true,
    greetLocked:"placeholder",
    greetReady:"So. You assembled the microscope. I have four questions. Answer them all correctly for your certificate.",
    greetDone:"Well done. The certificate speaks for itself.",
    riddles:[
      {
        q:"You image a fluorescent sample with a 60x/1.4 NA objective (emission 510nm). According to the Nyquist criterion, what is the maximum pixel size you should use at the camera?",
        opts:[
          {t:"A) 510nm, one wavelength per pixel",c:false},
          {t:"B) ~222nm, the approximate PSF FWHM",c:false},
          {t:"C) ~90nm in sample space",c:true},
          {t:"D) As small as possible",c:false},
        ],
        expl:"Rayleigh lateral resolution = 0.61*510/1.4) \u2248 222nm. Nyquist requires sampling at \u22652x the highest frequency, so pixel ~90nm in sample space. Undersampling aliases structure; oversampling wastes signal and increases bleaching.",
      },
      {
        q:"When writing a paper, which details about your objective lens do you need to report?",
        opts:[
          {t:"A) Serial number",c:false},
          {t:"B) Manufacturer, correction class, magnification, NA, and immersion medium",c:true},
          {t:"C) Magnification and focus settings",c:false},
          {t:"D) Magnification only \u2014 it determines resolution",c:false},
        ],
        expl:"Magnification alone is nearly meaningless for reproducibility \u2014 two 60\u00d7 objectives can have vastly different optical performance. NA determines resolution and light collection, immersion medium must match your sample mounting, and manufacturer and correction class let another lab source the exact same optic. Serial number is too much; focus settings are an acquisition detail, not a lens property.",
      },
      {
        q:"You fit a Gaussian to a single fluorescent bead and measure the PSF width. Would a dimmer bead give a different fitted PSF width even if the optics are identical?",
        opts:[
          {t:"A) No \u2014 the PSF is a property of the optics alone, so bead brightness is irrelevant",c:false},
          {t:"B) No \u2014 a dimmer bead would give a narrower PSF because fewer photons spread less",c:false},
          {t:"C) Not necessarily wider or narrower, but less precisely determined \u2014 fewer photons mean noisier intensity values and a less reliable Gaussian fit",c:true},
          {t:"D) Yes, always wider \u2014 dimmer beads emit lower energy photons which diffract more strongly at the objective",c:false},
        ],
        expl:"The true PSF is a property of the optics, not the fluorophore. But measuring it requires fitting a model to noisy data, and noise is shot-noise limited \u2014 scaling with \u221aN photons. With fewer photons, the low-intensity rings of the PSF are buried in noise and the Gaussian fit becomes uncertain. The estimated width could land high or low \u2014 what decreases is your confidence in the measurement. This is the same principle underlying SMLM: more photons don\u2019t change the PSF, they let you characterize it more precisely.",
      },
      {
        q:"You choose a pixel dwell time of 4\u00b5s on a confocal with a 63\u00d7 objective (NA 1.4, 488nm). You need a new frame every 5 seconds. Using Nyquist-sampled pixels, what is the maximum square FOV you can image?",
        opts:[
          {t:"A) 256\u00d7256 pixels (~22\u00d722\u00b5m)",c:false},
          {t:"B) 512\u00d7512 pixels (~44\u00d744\u00b5m)",c:false},
          {t:"C) 1024\u00d71024 pixels (~89\u00d789\u00b5m)",c:true},
          {t:"D) 2048\u00d72048 pixels (~178\u00d7178\u00b5m)",c:false},
        ],
        expl:"First calculate the maximum number of pixels: 5,000,000\u00b5s / 4\u00b5s = 1,250,000 pixels. The largest square grid that fits is 1024\u00d71024 (1,048,576 pixels) \u2014 2048\u00d72048 would require 16.7 seconds. Then convert to physical size: Nyquist pixel size = (\u03bb/2NA)/2 = (488/2\u00d71.4)/2 \u2248 87nm. So 1024 \u00d7 87nm \u2248 89\u00b5m per side. Both steps are necessary \u2014 pixel budget sets the grid size, Nyquist converts it to physical dimensions.",
      },
      {
        q:"One final question \u2014 and this one is the most important. Cats or dogs?",
        opts:[
          {t:"A) Dogs",c:false},
          {t:"B) Both equally",c:false},
          {t:"C) Neither, I only care about cells",c:false},
          {t:"D) Cats",c:true},
        ],
        expl:"Cats. Obviously. Independent, curious, and statistically overrepresented in microscopy labs worldwide. Congratulations \u2014 you have answered correctly on every count.",
      },
    ],
  },

  // ── INSTRUCTORS ───────────────────────────────────────────────
  {
    id:'talley', firstName:'Talley', name:'Dr. Talley Lambert',
    role:'instructor', partId:'digcam',
    x:7, y:15,
    hair:'#4a3000', skin:'#C8956C', shirt:'#3a6adb', coat:false,
    greet:"Hey, I'm Talley! Answer this and the camera is yours.",
    greetDone:"Exactly right! You need to understand more than just the microscope to be a good microscopist.",
    riddle:{
      q:"You increase laser power but fluorescence intensity plateaus but the detector is not saturating. What is the most likely explanation?",
      opts:[
        {t:"A) Photobleaching",c:false},
        {t:"B) Ground state depletion",c:true},
        {t:"C) Dirty objective",c:false},
        {t:"D) Stimulated emission",c:false},
      ],
      expl:"Fluorescence requires a fluorophore in the ground state to absorb a photon. At high laser powers, molecules are re-excited so rapidly that most of the population is trapped in the excited or triplet state \u2014 the ground state is depleted. With fewer molecules available to absorb, additional laser power yields no additional signal. Detector saturation is the tempting wrong answer, but can be ruled out by checking the raw pixel values.",
    }
  },
  {
    id:'beth', firstName:'Beth', name:'Dr. Beth Cimini',
    role:'instructor', partId:'segsoft',
    x:22, y:18,
    hair:'#c06030', skin:'#F5C5A0', shirt:'#9a3db5', coat:false,
    greet:"Hi! Answer this segmentation question and the segmentation software is yours!",
    greetDone:"Great work! Remember: measure, don't eyeball.",
    riddle:{
      q:"You're segmenting touching nuclei getting merged objects. Which of the following is a good strategy?",
      opts:[
        {t:"A) Watershed on the distance transform of the binary mask",c:true},
        {t:"B) Use a larger Gaussian smoothing filter before thresholding",c:false},
        {t:"C) Increase image brightness to reveal separation",c:false},
        {t:"D) Lower the minimum diameter threshold to split objects",c:false},
      ],
      expl:"Watershed on the distance transform treats the distance-from-background as topography, finding object centres and drawing watershed lines between them. It reliably separates touching spherical nuclei even with similar intensities. Lowering diameter or blurring makes things worse \u2014 you need the geometric separation information.",
    }
  },
  {
    id:'florian', firstName:'Florian', name:'Dr. Florian Jug',
    role:'instructor', partId:'denoise',
    x:27, y:3,
    hair:'#3a3a3a', skin:'#D4A574', shirt:'#2a8a2a', coat:false,
    greet:"Guten Tag! I'm Florian. Deep learning can denoise microscopy images dramatically. Answer this and the denoising software is yours.",
    greetDone:"Wunderbar! The future of imaging is computational.",
    riddle:{
      q:"You train a U-Net to restore noisy confocal images. Training loss steadily decreases but validation loss plateaus then rises. What should you do?",
      opts:[
        {t:"A) Train for more epochs. The model hasn't converged yet",c:false},
        {t:"B) Apply early stopping, add data augmentation, and possibly reduce model capacity",c:true},
        {t:"C) Increase the learning rate to escape the local minimum",c:false},
        {t:"D) Switch to a different model architecture",c:false},
      ],
      expl:"Classic overfitting! The model memorises training noise instead of learning generalizable restoration. Solutions: early stopping at the validation minimum, aggressive augmentation (random flips, rotations, intensity jitter), dropout layers, or a smaller model. In microscopy data is scarce \u2014 augmentation is especially important.",
    }
  },
  {
    id:'hunter', firstName:'Hunter', name:'Dr. Hunter Elliott',
    role:'instructor', partId:'objclass',
    x:6, y:22,
    hair:'#5a4030', skin:'#C8956C', shirt:'#db7a2a', coat:false,
    greet:"Quantitative is the key word. Tell me about quantitative image analysis and this object classifier is yours.",
    greetDone:"Solid! I'll be on my flying machine.",
    riddle:{
      q:"When should you use rolling ball background subtraction instead of uniform background subtraction?",
      opts:[
        {t:"A) When your signal is very dim and you need to preserve as many photons as possible",c:false},
        {t:"B) When your background is uniformly low across the entire field",c:false},
        {t:"C) When background intensity varies spatially across the image, such as from autofluorescence gradients",c:true},
        {t:"D) When your cells are densely packed and leave no empty regions to sample background from",c:false},
      ],
      expl:"Uniform background subtraction assumes a single background value applies everywhere, valid when illumination is flat. Rolling ball fits a local estimate at every position, capturing slow spatial variation across the field. If your background is spatially uniform, use uniform subtraction; if it varies due to autofluorescence gradients, use rolling ball.",
    }
  },
  {
    id:'damian', firstName:'Damian', name:'Damian Dalle Nogare',
    role:'instructor', partId:'coloc',
    x:23, y:10,
    hair:'#2a2a2a', skin:'#C8956C', shirt:'#2a6aaa', coat:false,
    greet:"Hi! I'm Damian, nice to meet you. Answer my spatial correlation question and the colocalization software is yours!",
    greetDone:"Nice work! And remember: colocalization can only show that two things are close; not that they interact.",
    riddle:{
      q:"Which of the following correctly describes Manders' colocalization coefficients M1 and M2?",
      opts:[
        {t:"A) M1 and M2 measure the Pearson correlation between channel intensities",c:false},
        {t:"B) M1 is the fraction of channel 1 signal overlapping channel 2; M2 is the reverse",c:true},
        {t:"C) M1 and M2 together give a p-value for colocalization significance",c:false},
        {t:"D) M1=M2=1 means the two channels are anti-correlated",c:false},
      ],
      expl:"Manders' coefficients are overlap fractions, not correlations. M1 = (Ch1 intensity where Ch2 > threshold) / (total Ch1 intensity). It answers: what fraction of protein A signal is found where protein B is present? M1 and M2 are asymmetric \u2014 A mostly with B (M1\u22481) while B mostly elsewhere (M2\u22480.1). Always apply intensity thresholds (Costes' method) before computing Manders'.",
    }
  },

  // ── TAs ──────────────────────────────────────────────────────
  {
    id:'federico', firstName:'Federico', name:'Federico Gasparoli',
    role:'ta', partId:'laser',
    x:9, y:18,
    hair:'#2a2a2a', skin:'#D4A574', shirt:'#4a4adb', coat:false,
    greet:"Ciao! I'm Federico, TA and Python enthusiast. Light sheet is my passion. Answer this and I'll hand over the laser launch module!",
    greetDone:"Perfetto! Light sheet is beautiful, no?",
    riddle:{
      q:"In light sheet fluorescence microscopy (LSFM), the illumination and detection objectives are perpendicular. What is the advantage over widefield or confocal?",
      opts:[
        {t:"A) Only the focal plane is illuminated; far less bleaching across the sample volume",c:true},
        {t:"B) Light sheet systems are simpler and less expensive than widefield",c:false},
        {t:"C) The 90-degree geometry eliminates the need for fluorescent labels",c:false},
        {t:"D) Higher lateral resolution than confocal thanks to the thin sheet",c:false},
      ],
      expl:"Selective plane illumination! In widefield and confocal, every Z-plane gets illuminated every time you image. In LSFM, a thin sheet illuminates only the focal plane \u2014 everything else stays dark and unbleached. For live imaging of developing embryos or long time-lapses, this reduces total phototoxic dose compared to confocal.",
    }
  },
  {
    id:'eva', firstName:'Eva', name:'Eva de la Serna',
    role:'ta', partId:'obj',
    x:24, y:22,
    hair:'#1a1a1a', skin:'#C8A090', shirt:'#c03080', coat:false,
    greet:"Hi! I'm Eva \u2014 I doodle science AND image beautiful cells! Answer my confocal pinhole question to get the objective lens!",
    greetDone:"Good job! A great objective is the heart of any fluorescence microscope.",
    riddle:{
      q:"Airyscan offers up to a root 2 improvement in resolution by incorporating a 32 PMT array detector and pixel reassignment. What is the core idea behind this strategy?",
      opts:[
        {t:"A) Photons are distributed evenly across all 32 PMTs to maximize their quantum efficiency and normalize signal",c:false},
        {t:"B) Each PMT's image is deconvolved independently then averaged together",c:false},
        {t:"C) Each PMT's image is shifted toward the center by half its offset from the optical axis, then summed to create the final image",c:true},
        {t:"D) PMTs are weighted by their distance from the optical axis to suppress bleedthrough",c:false},
      ],
      expl:"Each PMT in the detector array occupies a slightly different position relative to the optical axis, so it collects light from a slightly different part of the PSF. Shifting each element's image by half its offset before summing reassigns that signal closer to where it actually originated.",
    }
  },
  {
    id:'max', firstName:'Max', name:'Max Brambach',
    role:'ta', partId:'cond',
    x:6, y:10,
    hair:'#4a3a20', skin:'#D4A574', shirt:'#2a5a8a', coat:false,
    greet:"Hallo! I'm Max. Tell me what the condenser aperture diaphragm is for and I'll hand over the condenser!",
    greetDone:"Sehr gut! The condenser aperture is often overlooked but critical for widefield microscopy.",
    riddle:{
      q:"What does the condenser aperture diaphragm primarily control in a widefield fluorescence microscope?",
      opts:[
        {t:"A) The field of view; closing it crops the visible area",c:false},
        {t:"B) Focus on it to achieve Koehler illumination.",c:false},
        {t:"C) The working distance of the objective",c:false},
        {t:"D) The illumination NA, affecting resolution, contrast and depth of field",c:true},
      ],
      expl:"The condenser aperture controls the illumination NA. Opening it increases the cone angle of illuminating light \u2014 improving lateral resolution but reducing contrast. Closing it increases contrast and depth of field but sacrifices resolution. It is NOT the same as the field diaphragm, which controls the illuminated area.",
    }
  },
  {
    id:'esteban', firstName:'Esteban', name:'Esteban Miglietta',
    role:'ta', partId:'flcube',
    x:18, y:8,
    hair:'#1a1a1a', skin:'#B08060', shirt:'#8a2a6a', coat:false,
    greet:"\u00a1Hola! I'm Esteban. Answer my ML question and I'll give you this fluorescence cube!",
    greetDone:"\u00a1Excelente! Never trust a single accuracy number. Always check precision and recall!",
    riddle:{
      q:"You train a U-Net classifier to detect mitotic cells. Your model achieves 95% accuracy on a dataset where only 2% of cells are mitotic. What statement is true?",
      opts:[
        {t:"A) Neural networks are imprecise and should not be used for cell classification",c:false},
        {t:"B) Suspicious. 95% accuracy seems too good for noisy biological data",c:false},
        {t:"C) We are calling true mitotic cells with 95% accuracy.",c:false},
        {t:"D) A model predicting 'never mitotic' would score 98%. You need precision/recall or F1",c:true},
      ],
      expl:"Class imbalance! When positives are rare (2% of cells mitotic), a trivial model that always predicts negative scores 98% accuracy. Use precision (what fraction of predicted positives are real), recall (what fraction of real positives are found), F1-score, or AUROC. In biology, false negatives and false positives often have very different costs \u2014 choose your metric accordingly.",
    }
  },
  {
    id:'matt', firstName:'Matt', name:'Matt Lycas',
    role:'ta', partId:'hydrogel',
    x:28, y:25,
    hair:'#8a6a30', skin:'#D4A574', shirt:'#2a8a5a', coat:false,
    greet:"Hey! I'm Matt. Expansion microscopy means physically inflating your cells for super-resolution on a standard scope! Answer this for the hydrogel kit.",
    greetDone:"Excellent! With the right hydrogel, ExM gives super-resolution on any confocal.",
    riddle:{
      q:"In expansion microscopy (ExM), a fixed specimen is embedded in a swellable hydrogel and physically expanded ~4x. What is the benefit?",
      opts:[
        {t:"A) It concentrates fluorophores, making them ~4x brighter",c:false},
        {t:"B) It eliminates the need for fixation and speeds up sample preparation by ~ 4x",c:false},
        {t:"C) It expands the number of different fluorescent labels one can use by ~4x",c:false},
        {t:"D) Physical 4x expansion gives ~4x resolution gain on standard confocal",c:true},
      ],
      expl:"Physical magnification = optical resolution gain! Standard confocal resolution is ~250nm. After 4x expansion, structures originally 60-70nm apart become ~250nm apart \u2014 resolvable by a standard objective. Genuine super-resolution through sample chemistry, not optics \u2014 accessible on any confocal without specialised lasers or detectors.",
    }
  },

  // ── VENDORS ──────────────────────────────────────────────────
  {
    id:'louise', firstName:'Louise', name:'Louise @ Leica',
    role:'vendor', partId:'tirf',
    x:4, y:16,
    hair:'#8a5a30', skin:'#F0C8A0', shirt:'#cc0000', coat:false,
    greet:"Hi! I'm Louise from Leica Microsystems. Answer my question about fluorescence optics and I'll give you the TIRF module!",
    greetDone:"Excellent! The dichroic mirror is the unsung hero of every fluorescence microscope.",
    riddle:{
      q:"TIRF illuminates only a ~100nm evanescent field at the coverslip. Its advantage over other techniques is?",
      opts:[
        {t:"A) Better lateral resolution than widefield",c:false},
        {t:"B) Better axial resolution than confocal",c:false},
        {t:"C) Removes out-of-focus light",c:true},
        {t:"D) Allows imaging deeper into tissue than confocal",c:false},
      ],
      expl:"Evanescent field restriction! Only fluorophores within ~100nm of the coverslip are excited. Organelles and nuclei deeper in the cell are simply not illuminated, eliminating out-of-focus haze for imaging membrane dynamics and vesicle fusion.",
    }
  },
  {
    id:'gustavo', firstName:'Gustavo', name:'Gustavo @ Leica',
    role:'vendor', partId:'confocal',
    x:10, y:10,
    hair:'#1a1a1a', skin:'#C09070', shirt:'#cc0000', coat:false,
    greet:"Hi! I'm Gustavo from Leica. Impress me and I'll hand over another microscope part!",
    greetDone:"Great! Confocal opens a whole new world of optical sectioning.",
    riddle:{
      q:"In a point-scanning confocal, what is the function of the pinhole?",
      opts:[
        {t:"A) Rejects out-of-focus light giving optical sectioning",c:true},
        {t:"B) Selects which emission wavelengths reach the detector",c:false},
        {t:"C) Determines the pixel clock of the PMT",c:false},
        {t:"D) Attenuates the focused illumination on the sample",c:false},
      ],
      expl:"The pinhole is the heart of confocal! It is positioned in a conjugate plane to the focal point. Only light from the focal point passes through to the detector, while out-of-focus light is physically blocked.",
    }
  },
  {
    id:'steve', firstName:'Steve', name:'Steve @ ASI',
    role:'vendor', partId:'piezo',
    x:9, y:5,
    hair:'#888888', skin:'#E8C8A0', shirt:'#2244aa', coat:false,
    greet:"Hey! I'm Steve from Applied Scientific Instrumentation. Answer this and the piezo Z stage is yours!",
    greetDone:"Great! Sub-micron Z control opens up so much in quantitative 3D imaging.",
    riddle:{
      q:"You're doing a 3D z-stack with a 60x/1.4 NA objective and want to Nyquist sample in Z. What step size should you use?",
      opts:[
        {t:"A) The same as your XY pixel size for isotropic sampling",c:false},
        {t:"B) 1 \u00b5m to be reproducible across systems",c:false},
        {t:"C) As small as possible to increase resolution",c:false},
        {t:"D) < 300 nm. 2 to 3 times smaller than the axial resolution",c:true},
      ],
      expl:"Nyquist in Z! Axial resolution for a 1.4 NA confocal at 510nm is roughly 500-600nm. Your z-step must be \u2264 half that, so ~250-300nm. Larger steps miss axial features; much smaller steps over-bleach without gaining information. Piezo stages are essential for reproducible sub-micron Z steps in quantitative 3D imaging.",
    }
  },
  {
    id:'zander', firstName:'Zander', name:'Zander @ ASI',
    role:'vendor', partId:'xystage',
    x:31, y:13,
    hair:'#4a4a4a', skin:'#D8B890', shirt:'#2244aa', coat:false,
    greet:"Hi! I'm Zander from ASI. Answer this for the motorized XY stage!",
    greetDone:"Nice! Automated stage control is the backbone of high-throughput microscopy.",
    riddle:{
      q:"You're acquiring a tiled image (10x10 grid) of a large tissue section and notice intensity differences at tile edges. What is the most likely cause?",
      opts:[
        {t:"A) Uneven illumination across the field of view",c:true},
        {t:"B) Photobleaching around the edges",c:false},
        {t:"C) The motorized stage is introducing z-drift",c:false},
        {t:"D) The laser power is fluctuating between acquisitions",c:false},
      ],
      expl:"Vignetting! Most objectives illuminate the centre brighter than the edges. In tiled images this creates visible seams at boundaries. The fix: acquire a flat-field correction image, such as a Model's flatfield slide, and divide each tile by it before stitching. Essential for any quantitative tiled acquisition.",
    }
  },
  {
    id:'lara', firstName:'Lara', name:'Lara @ Okolab',
    role:'vendor', partId:'incubator',
    x:16, y:24,
    hair:'#5a3a1a', skin:'#DEB887', shirt:'#2a8a5a', coat:false,
    greet:"Hi! I'm Lara from Okolab. Answer this and the incubator is yours!",
    greetDone:"Awesome! Happy cells make better images.",
    riddle:{
      q:"Your lab switches from a bicarbonate-buffered medium to HEPES-buffered medium for a live-cell experiment. What does this change about your environmental control requirements at the stage?",
      opts:[
        {t:"A) You no longer need CO\u2082 control. HEPES buffers pH independently of CO\u2082",c:true},
        {t:"B) You need more CO\u2082 to compensate for HEPES's lower buffering capacity",c:false},
        {t:"C) HEPES requires higher temperature (39\u00b0C) to buffer effectively",c:false},
        {t:"D) CO\u2082 is required to maintain the appropriate osmolarity",c:false},
      ],
      expl:"Standard bicarbonate-buffered media maintain pH only in equilibrium with ~5% CO\u2082 \u2014 disrupt that and pH drifts fast. HEPES is a zwitterionic organic buffer that holds pH independently of CO\u2082, making it ideal for open-stage imaging. The tradeoff is that it's not great for long-term culture, so it's best reserved for shorter sessions. Temperature control remains essential either way.",
    }
  },

  {
    id:'jonathan', firstName:'Jonathan', name:'Jonathan @ Evident',
    role:'vendor', partId:'filtwheel',
    x:33, y:16,
    hair:'#5a4a3a', skin:'#E8C8A0', shirt:'#1a6aaa', coat:false,
    greet:"Hi! I'm Jonathan from Evident Scientific \u2014 formerly Olympus. Let me test your optics knowledge for this emission filter wheel!",
    greetDone:"Excellent! Good filter selection is the difference between a clean image and a mess of bleedthrough.",
    riddle:{
      q:"You want to image three fluorophores simultaneously: DAPI, GFP, and mCherry. What is a critical consideration when selecting emission filters?",
      opts:[
        {t:"A) Choose the widest bandpass filters possible to maximize signal",c:false},
        {t:"B) Ensure emission filters are narrow enough to minimize spectral bleedthrough",c:true},
        {t:"C) Always use longpass filters to collect more total photons",c:false},
        {t:"D) Filter choice doesn't matter if laser power is low enough",c:false},
      ],
      expl:"Spectral bleedthrough is the enemy of quantitative multichannel imaging! DAPI, GFP, and mCherry have overlapping emission tails, so narrow bandpass filters centred on each peak are essential to minimize bleedthrough. Wider filters collect more photons but also more emission from neighbouring fluorophores.",
    }
  },

  {
    id:'erika', firstName:'Erika', name:'Dr. Erika Wee',
    role:'instructor', partId:'ledsrc',
    x:15, y:18,
    hair:'#2a1a0a', skin:'#d4a87a', shirt:'#2a5a8a', coat:true,
    greet:"Hi! I'm Erika Wee, director of the CSHL Microscopy Core Facility. We run widefield, confocal, spinning disk, SIM, and EM \u2014 the works. Answer my phase contrast question and I'll give you this LED light source!",
    greetDone:"Excellent! Phase contrast and DIC are underappreciated workhorses \u2014 every cell biologist should know when to use which.",
    riddle:{
      q:"A researcher wants to image live, unstained HeLa cells to check cell health before an experiment. They ask you whether to use phase contrast or DIC. What is an important practical consideration?",
      opts:[
        {t:"A) DIC is incompatible with plastic dishes but phase contrast would work fine",c:true},
        {t:"B) Phase contrast produces better axial resolution than DIC for thick samples",c:false},
        {t:"C) DIC cannot image cells without fluorescent labels",c:false},
        {t:"D) Phase contrast requires a laser source; DIC works with any white light",c:false},
      ],
      expl:"The plastic birefringence trap! DIC works by detecting optical path differences using polarized light split by a Nomarski prism. Plastic tissue culture dishes are themselves birefringent \u2014 they scramble the polarization and ruin the DIC image. Phase contrast uses a phase ring and annulus to convert refractive index differences into amplitude differences, with no polarization needed \u2014 it works perfectly with plastic dishes. For routine live cell work in plastic, always recommend phase contrast. Use DIC only with glass-bottomed dishes.",
    }
  },
];

const BUILDINGS=[
  // {x:12,y:4,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:21,y:7,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:15,y:21,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:23,y:11,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:15,y:24,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:33,y:15,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:2,y:5,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:25,y:17,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:3,y:11,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:21,y:15,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:17,y:3,w:1,h:1,  name:'A',    color:'#c8a87d'},
  // {x:29,y:23,w:1,h:1,  name:'A',    color:'#c8a87d'},
  
 
];

const SNACKS=[
  {x:12,y:4, msg:'☕ Stale Blackford Hall coffee. Burnt PCR flavor.'},
  {x:21,y:6,  msg:'🍪 Dry cookies by Grace Auditorium. They\'ve always been dry.'},
  {x:10,y:21,  msg:'🧃 Warm juice box under a bush. Vintage: yesterday.'},
  {x:25,y:11, msg:'🍕 Cold pizza from last night\'s lecture. Still counts.'},
  {x:15,y:28, msg:'🍫 Emergency chocolate stash behind a tree!'},
  {x:35,y:15, msg:'🦞 A solitary shrimp washed up from the harbor. Do not eat.'},
  {x:2,y:5,   msg:'🥨 Damp pretzels. The harbor air got to them.'},
  {x:25,y:17, msg:'🧋 Ice cold bubble tea. A genuine CSHL miracle.'},
  {x:3,y:14,  msg:'☕ Another coffee. This one is from this morning, at least.'},
  {x:21,y:15, msg:'🍩 A donut hidden behind the centrifuge. Someone\'s stash.'},
  {x:17,y:3,  msg:'🥐 A croissant! Slightly fossilised but spiritually intact.'},
  {x:29,y:23, msg:'🫙 Peanut butter jar, almost empty. The harbor views are nice here.'},
];
const foundSnacks=new Set();
