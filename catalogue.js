(function(){
function init(){
const data=window.CINEVAULT_CATALOG||[];
const params=new URLSearchParams(location.search);
const page=location.pathname.split('/').pop();
const isSearch=page==='search.html';
const genre=(params.get('genre')||'').trim();
const query=(params.get('q')||'').trim();
const grid=document.getElementById('catalogueGrid');
const title=document.getElementById('catalogueTitle');
const lead=document.getElementById('catalogueLead');
const count=document.getElementById('catalogueCount');
const sort=document.getElementById('sort');
const searchInput=document.getElementById('catalogueSearch');
const empty=document.getElementById('emptyState');
const typeButtons=[...document.querySelectorAll('[data-type]')];
let activeType='all';
function norm(v){return (v||'').toLowerCase().trim()}
function slug(v){return encodeURIComponent(String(v||'').trim())}
function esc(v){return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function matchesGenre(m,target){const g=norm(target);if(g==='classics')return Number(m.y)<2000;if(g==='2020s')return Number(m.y)>=2020;if(g==='2010s')return Number(m.y)>=2010&&Number(m.y)<2020;if(g==='2000s')return Number(m.y)>=2000&&Number(m.y)<2010;if(g==='1990s')return Number(m.y)>=1990&&Number(m.y)<2000;return (m.g||[]).some(x=>norm(x)===g)}
function card(m){const href=(m.type==='series'?'series.html':'movie.html')+'?title='+slug(m.t);const tags=(m.g||[]).filter(x=>x!=='Series').slice(0,3).join(' · ');const image=m.img?`<img src="${esc(m.img)}" alt="${esc(m.t)} ${m.y} poster" loading="lazy" referrerpolicy="no-referrer">`:'';return `<a class="card" href="${href}" data-title="${esc(m.t)}" data-tags="${esc((m.g||[]).join(' '))}"><div class="poster image-poster" data-title="${esc(m.t)}">${image}<span>${esc(m.badge||m.y)}</span></div><div><h3>${esc(m.t)}</h3><p>${esc(tags)}${tags?' · ':''}${esc(m.y)}</p></div></a>`}
function currentSort(list){const mode=sort?sort.value:'popular';return [...list].sort((a,b)=>{if(mode==='az')return a.t.localeCompare(b.t);if(mode==='year'||mode==='newest')return b.y-a.y||b.pop-a.pop;return b.pop-a.pop||b.y-a.y})}
function render(){let list=data.filter(m=>activeType==='all'||m.type===activeType);if(genre)list=list.filter(m=>matchesGenre(m,genre));const q=norm(searchInput?searchInput.value:query);if(q)list=list.filter(m=>norm(m.t+' '+(m.g||[]).join(' ')+' '+m.y).includes(q));list=currentSort(list);grid.innerHTML=list.map(card).join('');count.textContent=`${list.length} title${list.length===1?'':'s'} found`;empty.hidden=list.length!==0;document.dispatchEvent(new CustomEvent('cinevault:catalogue-rendered'))}
if(isSearch){title.textContent=query?`Search results for “${query}”`:'Search CineVault';lead.textContent='Search across CineVault movies and series by title, genre, country, or year.'}else{title.textContent=genre||'All Titles';lead.textContent=genre?`Explore CineVault’s ${genre} catalogue, then sort by newest, popularity, year, or A–Z.`:'Browse the full CineVault catalogue.';document.querySelectorAll('.genre-chips a').forEach(a=>{if(norm(a.dataset.genre)===norm(genre))a.classList.add('active')})}
if(searchInput)searchInput.value=query;
sort&&sort.addEventListener('change',render);
searchInput&&searchInput.addEventListener('input',()=>{if(isSearch){const q=searchInput.value.trim();history.replaceState(null,'',q?'search.html?q='+encodeURIComponent(q):'search.html')}render()});
typeButtons.forEach(btn=>btn.addEventListener('click',()=>{activeType=btn.dataset.type;typeButtons.forEach(x=>x.classList.toggle('active',x===btn));render()}));
render();
}
(window.CINEVAULT_CATALOG_READY||Promise.resolve()).then(init).catch(()=>init());
})();