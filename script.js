const search=document.getElementById('search'), clear=document.getElementById('clear');
function filter(q){q=q.trim().toLowerCase();document.querySelectorAll('.card').forEach(c=>{const text=(c.dataset.title+' '+c.dataset.tags).toLowerCase();c.style.display=(!q||text.includes(q))?'':'none';});}
search.addEventListener('input',e=>filter(e.target.value));clear.addEventListener('click',()=>{search.value='';filter('');search.focus()});
document.querySelectorAll('[data-genre]').forEach(b=>b.addEventListener('click',()=>{search.value=b.dataset.genre;filter(b.dataset.genre);document.getElementById('movies').scrollIntoView({behavior:'smooth'})}));
const modal=document.getElementById('modal'), modalInput=document.getElementById('modalInput');
function openModal(){modal.classList.add('open');modalInput.value=search.value;modalInput.focus()}
document.getElementById('openSearch').onclick=openModal;document.getElementById('heroSearch').onclick=openModal;document.getElementById('closeModal').onclick=()=>modal.classList.remove('open');modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});modalInput.addEventListener('input',e=>{search.value=e.target.value;filter(e.target.value)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
