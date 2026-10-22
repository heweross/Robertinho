const cdn = 'https://cdn.jsdelivr.net/gh/heweross/Robertinho@main/assets/';
const raw = './assets/';
const stage = 'https://robertinho-do-brasil-live-experience-8muzto.v2.appdeploy.ai/resources/foto-teclado-show.jpeg';
const featuredClip = 'https://robertinho-do-brasil-live-experience-8muzto.v2.appdeploy.ai/resources/trechos-musicas-sucesso.mp4';
const structureClip = 'https://robertinho-do-brasil-live-experience-8muzto.v2.appdeploy.ai/resources/estrutura-2027.mp4';
const localSinging = 'https://robertinho-do-brasil-live-experience-8muzto.v2.appdeploy.ai/resources/foto-cantando-evento.jpeg';
const wa = 'https://wa.me/393895669400';
let language = 'pt';
const button = document.querySelector('#languageToggle');
function updateBooking() {
  document.querySelectorAll('a[data-book]').forEach(a => {
    const type = a.dataset.kind ? (language === 'pt' ? ' | Tipo: '+a.dataset.kind : ' | Tipo: '+a.dataset.kind) : '';
    const intro = language==='pt' ? 'Olá, Robertinho! Gostaria de uma proposta para contratar seu show.' : 'Ciao Robertinho! Vorrei una proposta per il tuo spettacolo.';
    const detail = language==='pt' ? 'Data: __ | Cidade: __ | Tipo de evento: __ | Convidados: __' : 'Data: __ | Città: __ | Tipo di evento: __ | Invitati: __';
    a.href=wa+'?text='+encodeURIComponent(intro+type+'\n'+detail);
    a.target='_blank';a.rel='noopener noreferrer';
  });
}
function renderLanguage(lang) {
  language=lang; document.documentElement.lang=lang==='pt'?'pt-BR':'it';
  document.querySelectorAll('[data-pt][data-it]').forEach(el=>{
    const value=el.getAttribute('data-'+lang)||'';
    if(el.dataset.html==='true') el.innerHTML=value;
    else el.textContent=value;
  });
  document.querySelector('#languageCurrent').textContent=lang.toUpperCase();
  button.setAttribute('aria-label',lang==='pt'?'Mudar para italiano':'Passa al portoghese');
  updateBooking();
}
button.addEventListener('click',()=>renderLanguage(language==='pt'?'it':'pt'));
const dialog=document.querySelector('#videoModal');
const player=document.querySelector('#showPlayer');
function stopPlayer(){player.onerror=null;player.pause();player.removeAttribute('src');player.load();}
function openVideo(file){
  const featured=file==='featured'||file==='estrutura';
  if(!featured&&!/^live-[1-5]\.mp4$/.test(file))return;
  const source=file==='featured'?featuredClip:file==='estrutura'?structureClip:raw+file;
  const backup=file==='featured'?raw+'live-3.mp4':file==='estrutura'?raw+'live-1.mp4':'';
  stopPlayer();
  player.poster=file==='estrutura'?localSinging:stage;
  let usedBackup=false;
  player.onerror=()=>{
    if(!backup||usedBackup)return;
    usedBackup=true;
    player.onerror=null;
    player.src=backup;
    player.load();
    player.play().catch(()=>{});
  };
  player.src=source;
  player.preload='metadata';
  if(!dialog.open)dialog.showModal();
  player.play().catch(()=>{});
}
document.querySelectorAll('[data-video]').forEach(e=>e.addEventListener('click',()=>openVideo(e.dataset.video||'')));
document.querySelector('#closeModal').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',stopPlayer);
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelectorAll('[data-rail]').forEach(b=>b.addEventListener('click',()=>{
  const rail=document.getElementById(b.dataset.rail||'');
  if(rail)rail.scrollBy({left:Number(b.dataset.direction||1)*325,behavior:'smooth'});
}));
// Keep authentic photos distinct. Never replace every missing thumbnail with the same picture.
// Try the original GitHub asset host first; if both fail, show a designed dark card,
// preserving the title and booking link without a broken image icon.
document.querySelectorAll('img').forEach(img=>{
  const name=img.dataset.gh||'';
  const candidates=name?[cdn+name,raw+name]:[];
  if(img.src.includes('raw.githubusercontent.com')&&name)candidates.reverse();
  let attempt=0;
  img.addEventListener('error',()=>{
    if(attempt<candidates.length){const next=candidates[attempt++];if(next!==img.src){img.src=next;return;}}
    img.style.display='none';img.parentElement?.classList.add('missing-image');
  });
  if(img.complete&&img.naturalWidth===0)img.dispatchEvent(new Event('error'));
});
renderLanguage('pt');

const photoModal=document.querySelector('#photoModal');
const photoLarge=document.querySelector('#photoLarge');
document.querySelectorAll('[data-photo]').forEach(button=>{
  button.addEventListener('click',()=>{
    const image=button.querySelector('img');
    if(!image||!image.naturalWidth)return;
    photoLarge.src=image.currentSrc||image.src;
    photoLarge.alt=image.alt;
    photoModal.showModal();
  });
});
document.querySelector('#photoClose').addEventListener('click',()=>photoModal.close());
photoModal.addEventListener('click',e=>{if(e.target===photoModal)photoModal.close()});
photoModal.addEventListener('close',()=>photoLarge.removeAttribute('src'));
