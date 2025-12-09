// script.js
// Interactivity: preloader, theme toggle, back-to-top, scroll reveals, demo chart and contact handler

document.addEventListener('DOMContentLoaded', ()=>{
  // Preloader
  const preloader = document.getElementById('preloader');
  setTimeout(()=>{preloader.style.opacity = 0; preloader.style.pointerEvents = 'none'; setTimeout(()=>preloader.remove(),600)},900);

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  let dark = true;
  themeToggle.addEventListener('click', ()=>{
    dark = !dark;
    if(!dark){ body.classList.add('light'); themeToggle.innerHTML = '<i class="fa fa-sun"></i>' } else { body.classList.remove('light'); themeToggle.innerHTML = '<i class="fa fa-moon"></i>' }
  });

  // Back to top
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400) backBtn.style.display = 'block'; else backBtn.style.display = 'none';
    // reveal
    document.querySelectorAll('.fade-in').forEach(el=>{
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80) el.classList.add('in-view');
    });
  });
  backBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Mobile menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  mobileBtn && mobileBtn.addEventListener('click', ()=>{
    document.querySelector('.nav').classList.toggle('open');
  });

  // Contact form (UI-only)
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert('Thanks! Your message has been received (UI-only demo).');
    contactForm.reset();
  });

  // Scroll reveal: add fade-in to major cards
  document.querySelectorAll('.card').forEach((c,i)=>{ if(i%2===0) c.classList.add('fade-in') });

  // Demo chart
  const ctx = document.getElementById('waterChart');
  if(ctx){
    const data = {
      labels: ['-5m','-4m','-3m','-2m','-1m','Now'],
      datasets: [
        {label:'pH',data:[6.8,6.9,7.0,7.1,7.15,7.2],borderColor:'#00ffd6',backgroundColor:'rgba(0,255,214,0.06)',tension:0.3},
        {label:'TDS',data:[140,135,130,125,122,120],borderColor:'#0099ff',backgroundColor:'rgba(0,153,255,0.06)',tension:0.3},
        {label:'Turbidity',data:[3.6,3.2,2.8,2.4,2.2,2.0],borderColor:'#66ffb3',backgroundColor:'rgba(102,255,179,0.04)',tension:0.3}
      ]
    };
    new Chart(ctx,{type:'line',data,options:{responsive:true,plugins:{legend:{labels:{color:'#fff'}}},scales:{x:{ticks:{color:'#ddd'}},y:{ticks:{color:'#ddd'}}}}});
  }

  // Demo values -> risk meter
  function updateRisk(){
    const ph = 7.2; const tds = 120; const turb = 2.0;
    document.getElementById('demoPH').textContent = ph;
    document.getElementById('demoTDS').textContent = tds + ' ppm';
    document.getElementById('demoTURB').textContent = turb + ' NTU';
    const score = (Math.abs(7-ph)*2) + (tds/200) + (turb/5);
    const dot = document.querySelector('.risk-dot');
    const riskText = document.getElementById('riskText');
    if(score < 1.5){ dot.style.background='green'; riskText.textContent='🟢 Safe' }
    else if(score < 3.5){ dot.style.background='orange'; riskText.textContent='🟠 Moderate' }
    else { dot.style.background='red'; riskText.textContent='🔴 Dangerous' }
  }
  updateRisk();

  // Optional cursor glow
  const glow = document.createElement('div'); glow.className='cursor-glow'; document.body.appendChild(glow);
  window.addEventListener('mousemove',(e)=>{ glow.style.left = e.clientX+'px'; glow.style.top = e.clientY+'px'; });
});
