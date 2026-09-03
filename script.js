const search=document.getElementById('search'),clear=document.getElementById('clear');
const cards=[...document.querySelectorAll('.card')];
const sections=[...document.querySelectorAll('.section')];
function filter(q){q=q.trim().toLowerCase();cards.forEach(card=>{const text=((card.dataset.title||'')+' '+(card.dataset.tags||'')+' '+card.innerText).toLowerCase();card.style.display=!q||text.includes(q)?'':'none';});sections.forEach(section=>{const grid=section.querySelector('.grid');if(!grid)return;const sectionCards=[...grid.querySelectorAll('.card')];if(sectionCards.length)section.style.display=sectionCards.some(c=>c.style.display!=='none')?'':'none';});}
if(search){search.addEventListener('input',e=>filter(e.target.value));if(clear)clear.addEventListener('click',()=>{search.value='';filter('');search.focus();});}
document.querySelectorAll('[data-genre]').forEach(button=>button.addEventListener('click',()=>{const genre=button.dataset.genre||'';if(search){search.value=genre;filter(genre);}const target=document.getElementById('movies')||document.getElementById('trending');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});}));
const modal=document.getElementById('modal'),modalInput=document.getElementById('modalInput');
function openModal(){if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');if(modalInput){modalInput.value=search?search.value:'';modalInput.focus();}}
function closeSearchModal(){if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}}
const openSearch=document.getElementById('openSearch'),heroSearch=document.getElementById('heroSearch'),closeModal=document.getElementById('closeModal');
if(openSearch)openSearch.onclick=openModal;if(heroSearch)heroSearch.onclick=openModal;if(closeModal)closeModal.onclick=closeSearchModal;if(modal)modal.addEventListener('click',e=>{if(e.target===modal)closeSearchModal();});if(modalInput)modalInput.addEventListener('input',e=>{if(search){search.value=e.target.value;filter(e.target.value);}});
const menu=document.getElementById('menu'),mobileNav=document.getElementById('mobileNav');if(menu&&mobileNav)menu.addEventListener('click',()=>mobileNav.classList.toggle('open'));document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>mobileNav&&mobileNav.classList.remove('open')));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSearchModal();if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openModal();}});
document.querySelectorAll('.image-poster img').forEach(img=>img.addEventListener('error',()=>{const poster=img.closest('.image-poster');if(poster){poster.classList.add('poster-fallback');img.remove();}},{once:true}));
filter('');
const upgrades=document.createElement('script');upgrades.src='catalog-enhancements.js';document.head.appendChild(upgrades);
