const DATA={
'The Last Signal':{type:'movie',genre:'Thriller · Action',year:'2026',tags:'thriller action',desc:'A tense mystery unfolds around a signal that should never have been received. Replace this demo copy with the official synopsis for your title.',poster:'p1'},
'Midnight Lagos':{type:'movie',genre:'Drama · Nollywood',year:'2026',tags:'drama nollywood',desc:'One city. One night. Several lives crossing at exactly the wrong time. Replace this demo copy with the official synopsis.',poster:'p2'},
'Moonlight Promise':{type:'movie',genre:'Romance · Fantasy',year:'2026',tags:'romance fantasy',desc:'A promise made beneath the moon changes two lives forever. Replace this demo copy with the official synopsis.',poster:'p3'},
'Beyond the Gate':{type:'movie',genre:'Fantasy · Adventure',year:'2026',tags:'fantasy adventure',desc:'An impossible gate opens to a world no one was meant to enter. Replace this demo copy with the official synopsis.',poster:'p4'},
'City of Echoes':{type:'movie',genre:'Mystery',year:'2026',tags:'mystery',desc:'A mystery hidden inside a city of memories pulls its investigator deeper with every clue.',poster:'p5'},
'Second Chance':{type:'movie',genre:'Romance · Drama',year:'2026',tags:'romance drama',desc:'Two people get an unexpected chance to rewrite the ending of a story they thought was over.',poster:'p6'},
'The Crossing':{type:'movie',genre:'Adventure',year:'2026',tags:'adventure',desc:'A dangerous crossing tests courage, loyalty and the cost of turning back.',poster:'p7'},
'Hidden Truth':{type:'movie',genre:'Crime · Thriller',year:'2026',tags:'crime thriller',desc:'Every answer creates another question as a buried secret threatens to surface.',poster:'p8'},
'Royal House':{type:'series',genre:'Drama',season:'1',tags:'drama',desc:'Power, family and secrets collide behind the doors of a royal household.',poster:'s1'},
'After Dark':{type:'series',genre:'Thriller',season:'2',tags:'thriller',desc:'When the city sleeps, a new mystery begins. Replace this demo copy with the official series synopsis.',poster:'s2'},
'The Pack':{type:'series',genre:'Fantasy',season:'1',tags:'fantasy',desc:'An unlikely group discovers that their greatest strength may also be their greatest danger.',poster:'s3'},
'New Beginnings':{type:'series',genre:'Romance',season:'3',tags:'romance',desc:'Old feelings return as new beginnings force everyone to choose what they truly want.',poster:'s4'}
};
const title=new URLSearchParams(location.search).get('title')||'The Last Signal';
const item=DATA[title]||DATA['The Last Signal'];
const $=id=>document.getElementById(id);
if($('detailTitle'))$('detailTitle').textContent=title;
if($('posterTitle'))$('posterTitle').innerHTML=title.toUpperCase().replace(/ /g,'<br>');
if($('detailGenre'))$('detailGenre').textContent=item.genre+(item.type==='movie'?` · ${item.year}`:` · SEASON ${item.season}`);
if($('detailDescription'))$('detailDescription').textContent=item.desc;
if($('longDescription'))$('longDescription').textContent=item.desc;
if($('metaGenre'))$('metaGenre').textContent=item.genre.split(' · ')[0];
if(item.type==='series'){
 document.title=`${title} | CineVault NG`;
 if($('metaSeason'))$('metaSeason').textContent=item.season;
 if($('episodeSeason'))$('episodeSeason').textContent=item.season;
 if($('seasonLabel'))$('seasonLabel').textContent=`Season ${item.season}`;
}else{document.title=`${title} | CineVault NG`;}
if($('detailPoster'))$('detailPoster').classList.add(item.poster);
if($('watchBtn'))$('watchBtn').addEventListener('click',e=>{if($('watchBtn').getAttribute('href')==='#watch')return;});
