(function(){
const style=document.createElement('link');style.rel='stylesheet';style.href='carousel.css';document.head.appendChild(style);
const MOVIES=[
{t:'Inception',y:'2010',g:'Sci-Fi · Thriller',img:'https://pics.filmaffinity.com/Inception-131981581-large.jpg'},
{t:'Interstellar',y:'2014',g:'Sci-Fi · Adventure',img:'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'},
{t:'The Dark Knight',y:'2008',g:'Action · Crime',img:'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg'},
{t:'Parasite',y:'2019',g:'Drama · Thriller',img:'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'},
{t:'Titanic',y:'1997',g:'Romance · Drama',img:'https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg'},
{t:'The Matrix',y:'1999',g:'Sci-Fi · Action',img:'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'},
{t:'Avatar',y:'2009',g:'Sci-Fi · Adventure',img:'https://image.tmdb.org/t/p/original/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg'},
{t:'Oppenheimer',y:'2023',g:'Drama · History',img:'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'},
{t:'Spider-Man: Into the Spider-Verse',y:'2018',g:'Animation · Action',img:'https://image.tmdb.org/t/p/original/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg'},
{t:'Dune: Part Two',y:'2024',g:'Sci-Fi · Adventure',img:'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg'},
{t:'Everything Everywhere All at Once',y:'2022',g:'Sci-Fi · Comedy',img:'https://image.tmdb.org/t/p/original/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg'},
{t:'The Lord of the Rings: The Fellowship of the Ring',y:'2001',g:'Fantasy · Adventure',img:'https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkbl1cHo6.jpg'},
{t:'The Godfather',y:'1972',g:'Crime · Drama',img:'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'},
{t:'Pulp Fiction',y:'1994',g:'Crime · Drama',img:'https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'},
{t:'Spirited Away',y:'2001',g:'Animation · Fantasy',img:'https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg'},
{t:'Mad Max: Fury Road',y:'2015',g:'Action · Adventure',img:'https://image.tmdb.org/t/p/original/hA2ple9q4qnwxp3hKVNhroipsir.jpg'},
{t:'Get Out',y:'2017',g:'Horror · Mystery',img:'https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhf4yHf9f1b6mH.jpg'},
{t:'Top Gun: Maverick',y:'2022',g:'Action · Drama',img:'https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg'},
{t:'Black Panther',y:'2018',g:'Action · Superhero',img:'https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg'},
{t:'Avengers: Endgame',y:'2019',g:'Action · Superhero',img:'https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg'},
{t:'The Shawshank Redemption',y:'1994',g:'Drama',img:'https://image.tmdb.org/t/p/original/lyQBXzOQTgK6J6H8m4u8YfQfF7Q.jpg'},
{t:'Gladiator',y:'2000',g:'Action · Drama',img:'https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg'},
{t:'The Lion King',y:'1994',g:'Animation · Family',img:'https://image.tmdb.org/t/p/original/2e853FDVSIso600tD7t8K0d5D6T.jpg'},
{t:'Jurassic Park',y:'1993',g:'Adventure · Sci-Fi',img:'https://image.tmdb.org/t/p/original/fjTU1Bgh3KJu4GQj7Gf7G5m8Y9d.jpg'},
{t:'Coco',y:'2017',g:'Animation · Family',img:'https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg'}
];
const NIGERIA=[
{t:'Lionheart',y:'2018',g:'Drama · Comedy',img:'https://cdn.guardian.ng/wp-content/uploads/2019/03/Genevieve.jpg'},
{t:'A Tribe Called Judah',y:'2023',g:'Comedy · Drama',img:'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak%3D/v3/t/assets/p26320013_p_v8_aa.jpg'},
{t:'Living in Bondage: Breaking Free',y:'2019',g:'Drama · Thriller',img:'https://pics.filmaffinity.com/living_in_bondage_breaking_free-971508249-large.jpg'},
{t:'King of Boys',y:'2018',g:'Crime · Drama',img:'https://fr.web.img6.acsta.net/pictures/19/04/29/14/58/0086198.jpg'},
{t:'The Wedding Party',y:'2016',g:'Romance · Comedy',img:'https://media.senscritique.com/media/000020919243/0/the_wedding_party.jpg'},
{t:'The Figurine: Araromire',y:'2010',g:'Mystery · Drama',img:'https://images.justwatch.com/poster/300655798/s718/the-figurine.jpg'},
{t:'Hijack 93',y:'2024',g:'Thriller · Drama',img:'https://media.senscritique.com/media/000022425172/0/le_detournement.jpg'},
{t:'Amina',y:'2021',g:'Action · Adventure · Biography',img:'https://cdn.pmnewsnigeria.com/wp-content/uploads/2021/10/EA3A8FE2-05E9-4068-83FC-849EAA20FEB2.jpeg'},
{t:'The Man of God',y:'2022',g:'Drama',img:'https://cdn.kinocheck.com/i/9ulny1w3az.jpg'},
{t:'Swallow',y:'2021',g:'Drama · History · Thriller',img:'https://fr.web.img6.acsta.net/pictures/21/09/17/10/08/2854026.jpg'},
{t:'Ẹlẹṣin Ọba: The King’s Horseman',y:'2022',g:'Drama · Historical',img:'https://de.web.img2.acsta.net/r_1280_720/pictures/22/10/31/14/36/2818809.jpg'},
{t:'Sanitation Day',y:'2021',g:'Crime · Thriller',img:'https://cdn.businessday.ng/wp-content/uploads/2021/01/sanitation-day.jpg'}
];
function key(t){return encodeURIComponent(t)}
function card(m,badge){return `<a class="card" href="movie.html?title=${key(m.t)}" data-title="${m.t}" data-tags="${m.g} ${m.y} global movie nigeria nollywood"><div class="poster image-poster"><img src="${m.img}" alt="${m.t} ${m.y} movie poster" loading="lazy"><span>${badge||m.y}</span></div><div><h3>${m.t}</h3><p>${m.g} · ${m.y}</p></div></a>`}
function addSection(id,label,title,items,badge){const host=document.getElementById(id);if(!host)return;const sec=document.createElement('section');sec.className='section container slider-section generated-section';sec.innerHTML=`<div class="section-head"><div><p class="eyebrow">${label}</p><h2>${title}</h2></div><div class="slider-controls"><button class="slider-btn prev" aria-label="Previous">‹</button><button class="slider-btn next" aria-label="Next">›</button></div></div><div class="movie-rail">${items.map(x=>card(x,badge)).join('')}</div>`;host.parentNode.insertBefore(sec,host.nextSibling)}
function makeExistingRails(){document.querySelectorAll('.section.container').forEach(sec=>{if(sec.classList.contains('generated-section'))return;const grid=sec.querySelector(':scope > .grid');const head=sec.querySelector('.section-head');if(!grid||!head)return;grid.classList.add('movie-rail');const controls=document.createElement('div');controls.className='slider-controls';controls.innerHTML='<button class="slider-btn prev" aria-label="Previous">‹</button><button class="slider-btn next" aria-label="Next">›</button>';head.appendChild(controls);sec.classList.add('slider-section')})}
function bind(){document.querySelectorAll('.slider-section').forEach(sec=>{const rail=sec.querySelector('.movie-rail');if(!rail||sec.dataset.bound)return;sec.dataset.bound='true';const prev=sec.querySelector('.prev'),next=sec.querySelector('.next');const amount=()=>Math.max(280,Math.round(rail.clientWidth*.72));prev&&prev.addEventListener('click',()=>rail.scrollBy({left:-amount(),behavior:'smooth'}));next&&next.addEventListener('click',()=>rail.scrollBy({left:amount(),behavior:'smooth'}))})}
function bindDynamicSearch(){const input=document.getElementById('search');if(!input||input.dataset.catalogSearchBound)return;input.dataset.catalogSearchBound='true';input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();document.querySelectorAll('.card').forEach(card=>{const text=((card.dataset.title||'')+' '+(card.dataset.tags||'')+' '+card.innerText).toLowerCase();card.style.display=!q||text.includes(q)?'':'none'});document.querySelectorAll('.slider-section').forEach(sec=>{const visible=[...sec.querySelectorAll('.card')].some(c=>c.style.display!=='none');sec.style.display=visible?'':'none'})})}
makeExistingRails();const moviesAnchor=document.getElementById('movies');if(moviesAnchor)addSection('movies','ALL-TIME FAVORITES','From Every Era',MOVIES,'GLOBAL');const nigeriaAnchor=document.getElementById('nigeria');if(nigeriaAnchor)addSection('nigeria','MORE NOLLYWOOD','More Nigerian Movies',NIGERIA,'NIGERIA');bind();bindDynamicSearch();
})();