const DATA={
'Alpha':{type:'movie',genre:'Action · Adventure',year:'2026',tags:'action adventure netflix trending',desc:'A current Nigeria Netflix chart leader, Alpha is an action-adventure title that has been attracting strong attention in the market.',poster:'t1',provider:'Netflix',search:'Alpha'},
'The Whisper Man':{type:'movie',genre:'Mystery · Thriller',year:'2026',tags:'mystery thriller netflix trending',desc:'A mystery thriller about a troubled man confronting a sinister figure from his past. It is currently among Nigeria’s most-watched Netflix movie titles.',poster:'t2',provider:'Netflix',search:'The Whisper Man'},
'The Secret Woman':{type:'movie',genre:'Drama · Mystery',year:'2026',tags:'drama mystery romance netflix trending',desc:'A drama built around relationships, secrets and personal struggles, currently appearing near the top of Nigeria’s Netflix movie chart.',poster:'t3',provider:'Netflix',search:'The Secret Woman'},
'Anacondas Trail of Blood':{type:'movie',genre:'Action · Horror',year:'2026',tags:'action horror thriller netflix trending',desc:'An action-horror survival story involving deadly snakes and a fight to stay alive. It is currently trending in Nigeria.',poster:'t4',provider:'Netflix',search:'Anacondas Trail of Blood'},
'Facing El Chapo':{type:'movie',genre:'Documentary · Crime',year:'2026',tags:'documentary crime netflix trending',desc:'A documentary exploring the dangerous world surrounding the notorious drug lord, currently ranking in Nigeria’s Netflix Top 10 movies.',poster:'t5',provider:'Netflix',search:'Facing El Chapo'},
'Colours of Fire':{type:'movie',genre:'Drama',year:'2026',tags:'drama netflix trending',desc:'A drama exploring human relationships and resilience that has remained visible on Nigeria’s current Netflix movie chart.',poster:'t6',provider:'Netflix',search:'Colours of Fire'},
'The Last House':{type:'movie',genre:'Thriller · Mystery',year:'2026',tags:'thriller mystery sci-fi netflix trending',desc:'A tense survival thriller currently appearing in Nigeria’s Netflix Top 10 movie rankings.',poster:'t7',provider:'Netflix',search:'The Last House'},
'Abigail':{type:'movie',genre:'Horror · Thriller',year:'2024',tags:'horror thriller netflix trending',desc:'A horror thriller in which a group of kidnappers discover that their young captive is far more dangerous than expected. It is currently charting in Nigeria.',poster:'t8',provider:'Netflix',search:'Abigail'},
'The Last Signal':{type:'movie',genre:'Thriller · Action',year:'2026',tags:'thriller action',desc:'A tense mystery unfolds around a signal that should never have been received. Replace this demo copy with the official synopsis for your title.',poster:'p1'},
'Midnight Lagos':{type:'movie',genre:'Drama · Nollywood',year:'2026',tags:'drama nollywood',desc:'One city. One night. Several lives crossing at exactly the wrong time. Replace this demo copy with the official synopsis.',poster:'p2'},
'Moonlight Promise':{type:'movie',genre:'Romance · Fantasy',year:'2026',tags:'romance fantasy',desc:'A promise made beneath the moon changes two lives forever. Replace this demo copy with the official synopsis.',poster:'p3'},
'Beyond the Gate':{type:'movie',genre:'Fantasy · Adventure',year:'2026',tags:'fantasy adventure',desc:'An impossible gate opens to a world no one was meant to enter. Replace this demo copy with the official synopsis.',poster:'p4'},
'City of Echoes':{type:'movie',genre:'Mystery',year:'2026',tags:'mystery',desc:'A mystery hidden inside a city of memories pulls its investigator deeper with every clue.',poster:'p5'},
'Second Chance':{type:'movie',genre:'Romance · Drama',year:'2026',tags:'romance drama',desc:'Two people get an unexpected chance to rewrite the ending of a story they thought was over.',poster:'p6'},
'The Crossing':{type:'movie',genre:'Adventure',year:'2026',tags:'adventure',desc:'A dangerous crossing tests courage, loyalty and the cost of turning back.',poster:'p7'},
'Hidden Truth':{type:'movie',genre:'Crime · Thriller',year:'2026',tags:'crime thriller',desc:'Every answer creates another question as a buried secret threatens to surface.',poster:'p8'},
'Beauty in Black':{type:'series',genre:'Drama',tags:'drama netflix trending',desc:'A drama series currently holding the number-one position among Netflix TV titles in Nigeria in the latest chart checked.',poster:'s1',provider:'Netflix',search:'Beauty in Black'},
'Mousetrap':{type:'series',genre:'Thriller · Mystery',tags:'thriller mystery netflix trending',desc:'A current Netflix Top 10 series in Nigeria, bringing a mystery-driven thriller into the CineVault trending catalogue.',poster:'s2',provider:'Netflix',search:'Mousetrap'},
'Four Hands Two Sonatas':{type:'series',genre:'Drama · Music',tags:'drama music netflix trending',desc:'A current Netflix Top 10 series in Nigeria combining drama and music.',poster:'s3',provider:'Netflix',search:'Four Hands Two Sonatas'},
'The Early Spring':{type:'series',genre:'Drama · Romance',tags:'drama romance netflix trending',desc:'A current Netflix Top 10 series in Nigeria, suited to viewers looking for relationship-focused drama.',poster:'s4',provider:'Netflix',search:'The Early Spring'},
'Royal House':{type:'series',genre:'Drama',season:'1',tags:'drama',desc:'Power, family and secrets collide behind the doors of a royal household.',poster:'s1'},
'After Dark':{type:'series',genre:'Thriller',season:'2',tags:'thriller',desc:'When the city sleeps, a new mystery begins. Replace this demo copy with the official series synopsis.',poster:'s2'},
'The Pack':{type:'series',genre:'Fantasy',season:'1',tags:'fantasy',desc:'An unlikely group discovers that their greatest strength may also be their greatest danger.',poster:'s3'},
'New Beginnings':{type:'series',genre:'Romance',season:'3',tags:'romance',desc:'Old feelings return as new beginnings force everyone to choose what they truly want.',poster:'s4'}
};

const params=new URLSearchParams(location.search);
const requested=params.get('title');
const item=DATA[requested]||DATA['The Last Signal'];
const title=requested&&DATA[requested]?requested:(item.type==='series'?'Royal House':'The Last Signal');
const $=id=>document.getElementById(id);

if($('detailTitle'))$('detailTitle').textContent=title;
if($('posterTitle'))$('posterTitle').innerHTML=title.toUpperCase().replace(/ /g,'<br>');
if($('detailGenre'))$('detailGenre').textContent=item.genre+(item.type==='movie'&&item.year?` · ${item.year}`:item.type==='series'&&item.season?` · SEASON ${item.season}`:'');
if($('detailDescription'))$('detailDescription').textContent=item.desc;
if($('longDescription'))$('longDescription').textContent=item.desc;
if($('metaGenre'))$('metaGenre').textContent=item.genre.split(' · ')[0];
if($('detailPoster'))$('detailPoster').classList.add(item.poster);
document.title=`${title} | CineVault NG`;

if(item.type==='series'&&item.season){
  if($('metaSeason'))$('metaSeason').textContent=item.season;
  if($('episodeSeason'))$('episodeSeason').textContent=item.season;
  if($('seasonLabel'))$('seasonLabel').textContent=`Season ${item.season}`;
}

// For researched trending entries, send visitors to the provider's legitimate
// search page instead of hosting or linking to unauthorized copies.
const officialUrl=item.provider==='Netflix'&&item.search
  ? `https://www.netflix.com/ng/search?q=${encodeURIComponent(item.search)}`
  : '#';

['watchBtn','watchBtn2'].forEach(id=>{
  const btn=$(id);
  if(!btn)return;
  if(officialUrl!=='#'){
    btn.href=officialUrl;
    btn.target='_blank';
    btn.rel='noopener noreferrer';
    btn.textContent=`Find on ${item.provider}`;
  }else{
    btn.href='#';
    btn.addEventListener('click',e=>{
      e.preventDefault();
      alert('The official viewing link has not been added yet.');
    });
  }
});

document.querySelectorAll('.episode').forEach((episode,index)=>episode.addEventListener('click',e=>{
  if(episode.getAttribute('href')==='#'){
    e.preventDefault();
    alert(`Episode ${String(index+1).padStart(2,'0')} official viewing link has not been added yet.`);
  }
}));
