const menuButton=document.querySelector('.menu-button');
const menu=document.querySelector('.menu');
if(menuButton&&menu){
  menuButton.addEventListener('click',()=>{
    const open=menuButton.getAttribute('aria-expanded')==='true';
    menuButton.setAttribute('aria-expanded',String(!open));
    menu.classList.toggle('open',!open);
  });
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
  }));
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.08,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();
