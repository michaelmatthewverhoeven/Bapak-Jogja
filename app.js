/**
 * Pengendali antarmuka Visit Jogja.
 * Menghubungkan navigasi, animasi, kartu, pencarian, formulir, dan panel chat.
 */
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
function escapeHTML(v){return String(v).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))}
function cardTemplate(item){return `<article class="travel-card reveal" data-name="${escapeHTML(item.name.toLowerCase())}" data-keywords="${escapeHTML((item.name+' '+item.location+' '+item.tags.join(' ')).toLowerCase())}"><div class="card-media"><img src="${item.image}" alt="${escapeHTML(item.name)}"><span class="rating">★ ${item.rating}</span></div><div class="card-body"><div class="card-meta"><span>${escapeHTML(item.location)}</span><span>${escapeHTML(item.price)}</span></div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.description)}</p><div class="tags">${item.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div></div></article>`}
function renderCards(){destinationGrid.innerHTML=DATA.destinations.map(cardTemplate).join('');hotelGrid.innerHTML=DATA.hotels.map(cardTemplate).join('');foodGrid.innerHTML=DATA.foods.map(cardTemplate).join('')}
function compactRupiah(value){if(value>=1000000){const n=value/1000000;return 'Rp'+n.toLocaleString('id-ID',{maximumFractionDigits:1})+' juta'}return 'Rp'+Math.round(value/1000).toLocaleString('id-ID')+' ribu'}
function budgetEstimate(type,days,level){const item=BUDGET_LEVELS[level]||BUDGET_LEVELS.sedang;const count=TRAVELER_SIZE[type]||1;const duration=Math.max(1,Math.min(7,Number(days)||2));const factor=SHARING_FACTOR[type]||1;return {item,count,duration,perMin:item.min*duration,perMax:item.max*duration,groupMin:item.min*duration*count*factor,groupMax:item.max*duration*count*factor}}
function updateBudgetDisplay(){const data=budgetEstimate(travelerType.value,tripDays.value,tripBudget.value);budgetTitle.textContent='Paket '+data.item.label;budgetAmount.textContent=compactRupiah(data.perMin)+'–'+compactRupiah(data.perMax)+'/orang';budgetPill.textContent=data.duration+' hari';budgetGroup.textContent='Estimasi total '+travelerType.value+' ('+data.count+' orang): '+compactRupiah(data.groupMin)+'–'+compactRupiah(data.groupMax)+'. Gaya: '+data.item.style+'.';$$('[data-budget-level]').forEach(el=>el.classList.toggle('active',el.dataset.budgetLevel===tripBudget.value))}
renderCards();
updateBudgetDisplay();
[travelerType,tripDays,tripBudget].forEach(el=>el.addEventListener('change',updateBudgetDisplay));

// Smooth, non-shaking hero slideshow
let slideIndex=0;const slides=$$('.hero-slide');setInterval(()=>{slides[slideIndex].classList.remove('active');slideIndex=(slideIndex+1)%slides.length;slides[slideIndex].classList.add('active')},8000);

// Character entrance animation
const heading=$('#animatedHeading');const raw=heading.innerHTML.split('<br>');let globalIndex=0;heading.innerHTML=raw.map(line=>[...line].map(ch=>{const delay=200+(globalIndex++*30);return `<span class="char" style="transition-delay:${delay}ms">${ch===' '?'&nbsp;':escapeHTML(ch)}</span>`}).join('')).join('<br>');requestAnimationFrame(()=>heading.classList.add('ready'));

// Reveal animation
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>observer.observe(el));

// Mobile menu
menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));$$('#navLinks a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// Search
function showToast(text){toast.textContent=text;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),2600)}
function performSearch(query){const q=query.trim().toLowerCase();if(!q){showToast('Masukkan kata pencarian.');return}const cards=$$('.travel-card');const hit=cards.find(c=>c.dataset.keywords.includes(q)||q.split(/\s+/).some(w=>w.length>2&&c.dataset.keywords.includes(w)));if(hit){hit.scrollIntoView({behavior:'smooth',block:'center'});hit.animate([{outline:'3px solid rgba(241,198,106,0)'},{outline:'3px solid rgba(241,198,106,.9)'},{outline:'3px solid rgba(241,198,106,0)'}],{duration:1800});showToast('Ditemukan: '+hit.dataset.name.replace(/\b\w/g,c=>c.toUpperCase()))}else{openChat();addUser('Saya mencari '+query);setTimeout(()=>addBot('Saya belum menemukan kartu yang tepat. Coba tulis minatmu, misalnya wisata budaya, pantai, hotel pusat kota, atau kuliner tradisional.'),350)}}
searchForm.addEventListener('submit',e=>{e.preventDefault();performSearch(searchInput.value)});$$('[data-search]').forEach(b=>b.addEventListener('click',()=>{searchInput.value=b.dataset.search;performSearch(b.dataset.search)}));

// Chat panel opens only after icon/button click
function openChat(){chatPanel.classList.add('open');chatPanel.setAttribute('aria-hidden','false');setTimeout(()=>chatInput.focus(),180)}function closeChat(){chatPanel.classList.remove('open');chatPanel.setAttribute('aria-hidden','true')}
chatFab.addEventListener('click',openChat);navChat.addEventListener('click',openChat);aboutChat.addEventListener('click',openChat);chatClose.addEventListener('click',closeChat);

const stored=JSON.parse(localStorage.getItem('visitJogjaChatV3')||'[]');
function saveChat(){const messages=$$('.msg',chatMessages).slice(-18).map(m=>({role:m.classList.contains('user')?'user':'bot',text:m.textContent}));localStorage.setItem('visitJogjaChatV3',JSON.stringify(messages))}
function addMessage(role,text){const div=document.createElement('div');div.className='msg '+role;div.textContent=text;chatMessages.appendChild(div);chatMessages.scrollTop=chatMessages.scrollHeight;saveChat()}
function addBot(t){addMessage('bot',t)}function addUser(t){addMessage('user',t)}
if(stored.length){stored.forEach(m=>addMessage(m.role,m.text))}else addBot('Sugeng rawuh! Saya Bapak Jogja. Saya dapat membantu rating wisata, hotel, dan kuliner pada skala 1–5, menghitung anggaran, menjelaskan kawasan Jogja secara mendalam, serta menyusun itinerary. Kamu ingin mulai dari apa?');

let selectedType='keluarga';
const toolsToggle=document.getElementById('toolsToggle'),toolsPanel=document.getElementById('toolsPanel'),travelerBadge=document.getElementById('travelerBadge');
function setToolsOpen(open){toolsPanel.hidden=!open;toolsToggle.setAttribute('aria-expanded',String(open));toolsToggle.querySelector('b').textContent=open?'−':'＋'}
toolsToggle.addEventListener('click',()=>setToolsOpen(toolsPanel.hidden));
$$('.quick-grid button').forEach(btn=>btn.addEventListener('click',()=>{$$('.quick-grid button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');selectedType=btn.dataset.type;travelerBadge.textContent=btn.textContent.replace(/^[^A-Za-zÀ-ÿ]+/,'').trim()||selectedType;addUser('Saya pergi bersama '+selectedType+'.');travelerType.value=selectedType;updateBudgetDisplay();setToolsOpen(false);setTimeout(()=>addBot(`Baik. Untuk perjalanan ${selectedType}, berapa hari dan kategori anggarannya? Hemat Rp250–400 ribu, sedang Rp450–700 ribu, nyaman Rp800 ribu–1,2 juta, atau premium Rp1,4–2,2 juta per orang per hari.`),300)}));

chatForm.addEventListener('submit',e=>{e.preventDefault();const value=chatInput.value.trim();if(!value)return;addUser(value);chatInput.value='';setToolsOpen(false);setTimeout(()=>addBot(respond(value)),420)});$$('.topic-grid button').forEach(btn=>btn.addEventListener('click',()=>{const value=btn.dataset.question;addUser(value);setToolsOpen(false);setTimeout(()=>addBot(respond(value)),320)}));

function launchPlanner(){selectedType=travelerType.value;updateBudgetDisplay();openChat();setToolsOpen(false);$$('.quick-grid button').forEach(b=>b.classList.toggle('active',b.dataset.type===selectedType));const activeType=$('.quick-grid button.active');travelerBadge.textContent=activeType?activeType.textContent.replace(/^[^A-Za-zÀ-ÿ]+/,'').trim():selectedType;const prompt=`Buat itinerary ${tripDays.value} hari untuk ${selectedType}, anggaran ${tripBudget.value}.`;addUser(prompt);setTimeout(()=>addBot(makePlan(selectedType,tripDays.value,tripBudget.value)),380)}
generatePlan.addEventListener('click',launchPlanner);openPlanner.addEventListener('click',()=>{document.querySelector('.planner-mini').scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>travelerType.focus(),450)});
