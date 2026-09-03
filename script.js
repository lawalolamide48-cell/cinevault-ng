const search=document.getElementById('search'),clear=document.getElementById('clear');
const cards=[...document.querySelectorAll('.card')];
const sections=[...document.querySelectorAll('.section')];

function filter(q){
  q=q.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const text=((card.dataset.title||'')+' '+(card.dataset.tags||'')+' '+card.innerText).toLowerCase();
    const show=!q||text.includes(q);
    card.style.display=show?'':'none';
    if(show) visible++;
  });
  sections.forEach(section=>{
    const grid=section.querySelector('.grid');
    if(!grid)return;
    const hasCards=grid.querySelector('.card');
    if(hasCards) section.style.display=[...grid.querySelectorAll('.card')].some(c=>c.style.display!=='none')?'':'none';
  });
  return visible;
}

if(search){
  search.addEventListener('input',e=>filter(e.target.value));
  if(clear)clear.addEventListener('click',()=>{search.value='';filter('');search.focus();});
}

document.querySelectorAll('[data-genre]').forEach(button=>button.addEventListener('click',()=>{
  const genre=button.dataset.genre||'';
  if(search){search.value=genre;filter(genre);}
  const target=document.getElementById('featured')||document.getElementById('movies');
  if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
}));

const modal=document.getElementById('modal'),modalInput=document.getElementById('modalInput');
function openModal(){
  if(!modal)return;
  modal.classList.add('open');
  if(modalInput){modalInput.value=search?search.value:'';modalInput.focus();}
}
const openSearch=document.getElementById('openSearch'),heroSearch=document.getElementById('heroSearch'),closeModal=document.getElementById('closeModal');
if(openSearch)openSearch.onclick=openModal;
if(heroSearch)heroSearch.onclick=openModal;
if(closeModal)closeModal.onclick=()=>modal.classList.remove('open');
if(modal)modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');});
if(modalInput)modalInput.addEventListener('input',e=>{if(search){search.value=e.target.value;filter(e.target.value);}});

const menu=document.getElementById('menu'),mobileNav=document.getElementById('mobileNav');
if(menu&&mobileNav)menu.addEventListener('click',()=>mobileNav.classList.toggle('open'));
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>mobileNav&&mobileNav.classList.remove('open')));

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&modal)modal.classList.remove('open');
  if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
    e.preventDefault();openModal();
  }
});

// Keep the homepage clean when a search is cleared.
filter('');
