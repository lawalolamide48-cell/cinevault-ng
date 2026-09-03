window.CINEVAULT_CATALOG=[];window.CINEVAULT_POSTERS={};window.CINEVAULT_WATCH={};
window.CINEVAULT_CATALOG_READY=(async()=>{
const load=src=>new Promise(resolve=>{const s=document.createElement('script');s.src=src;s.onload=()=>resolve(true);s.onerror=()=>{console.warn('CineVault could not load '+src);resolve(false)};document.head.appendChild(s)});
for(const src of ['catalogue-core-1.js','catalogue-core-2.js','catalogue-core-3.js','catalogue-core-4.js','catalogue-core-5.js','catalogue-core-6.js'])await load(src);
if(typeof R!=='undefined'&&typeof G!=='undefined')await load('catalogue-core-final.js');else console.warn('CineVault core catalogue could not be assembled');
for(const src of ['catalogue-posters-1.js','catalogue-posters-2.js','catalogue-posters-3.js'])await load(src);
if(Array.isArray(window.CINEVAULT_CATALOG))await load('catalogue-posters-final.js');
return window.CINEVAULT_CATALOG||[];
})();