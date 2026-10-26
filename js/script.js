const TANGGAL_ACARA='2027-03-13T15:00:00+07:00'; // tanggal & jam acara (untuk countdown)
addEventListener('DOMContentLoaded',()=>{
const $=s=>document.querySelector(s),app=$('#app'),secs=[...document.querySelectorAll('.s')],au=$('#bgm'),mus=$('#mus'),dots=$('#dots');
document.querySelectorAll('.bg').forEach(b=>b.innerHTML='<img class="bgm" src="assets/img/latar.jpg" alt=""><img class="ag ag1" src="assets/img/batu-hijau.webp" alt=""><img class="ag ag2" src="assets/img/batu-hijau.webp" alt=""><img class="gd" src="assets/img/emas.webp" alt="">');

// Posisi gambar batu-hijau per slide (satuan cqw = % lebar undangan). Makin NEGATIF = makin keluar layar.
// atas = batu di bagian atas, bawah = batu di bagian bawah. (Slide genap tercermin kiri-kanan oleh desain.)
const BATU={2:{atas:-56,bawah:-58},3:{atas:-45},6:{atas:-53}};
secs.forEach((s,i)=>{const c=BATU[i+1];if(!c)return;const a=s.querySelector('.ag1'),b=s.querySelector('.ag2');
 if(c.atas!=null&&a)a.style.right=c.atas+'cqw';if(c.bawah!=null&&b)b.style.left=c.bawah+'cqw'});
secs.forEach((s,i)=>{const b=document.createElement('button');b.ariaLabel='Slide '+(i+1);b.onclick=()=>s.scrollIntoView({behavior:'smooth'});dots.append(b)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){secs.forEach(s=>s.classList.toggle('in',s===e.target));[...dots.children].forEach((d,i)=>d.classList.toggle('a',secs[i]===e.target))}}),{root:app,threshold:.6});
secs.forEach(s=>io.observe(s));
$('#open').onclick=()=>{app.classList.remove('lock');dots.classList.add('on');mus.classList.add('on');au.play().then(()=>mus.classList.add('p')).catch(()=>{});secs[1].scrollIntoView({behavior:'smooth'})};
mus.onclick=()=>{if(au.paused){au.play();mus.classList.add('p')}else{au.pause();mus.classList.remove('p')}};
const T=new Date(TANGGAL_ACARA),el={d:$('#d'),h:$('#h'),m:$('#m'),s:$('#s')};
function tick(){let t=Math.max(0,Math.floor((T-Date.now())/1e3));const v={d:Math.floor(t/86400),h:Math.floor(t%86400/3600),m:Math.floor(t%3600/60),s:t%60};
for(const k in v){const x=String(v[k]).padStart(2,'0');if(el[k].textContent!==x){el[k].textContent=x;el[k].classList.remove('tk');void el[k].offsetWidth;el[k].classList.add('tk')}}}
tick();setInterval(tick,1000);
const sl=$('.slider');let dn=0,x0=0,s0=0;
sl.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;dn=1;x0=e.clientX;s0=sl.scrollLeft;sl.style.scrollSnapType='none';sl.style.cursor='grabbing'});
addEventListener('pointermove',e=>{if(dn)sl.scrollLeft=s0-(e.clientX-x0)});
addEventListener('pointerup',()=>{if(!dn)return;dn=0;sl.style.scrollSnapType='';sl.style.cursor=''});
})
