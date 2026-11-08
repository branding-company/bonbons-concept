/* Hero copy in three languages. Armenian and Russian are DRAFTS pending native review. */
window.COPY = {
  en:{h1:'Sweet, <i>painted</i> by hand.',sub:'Anush. Armenian bonbons, finished like couture.',hint:'Touch the shell. Press and hold to crack it.',hold:'Keep holding…',replay:'Replay',next_k:'Apricot & thyme',next_h:'The filling <i>decides.</i>',next_p:'Orchard apricot, mountain thyme, a thin glossy shell. This is where every box starts.',cta:'Build your box'},
  ru:{h1:'Сладость, <i>написанная</i> от руки.',sub:'Anush. Армянские конфеты, сделанные как haute couture.',hint:'Коснитесь глазури. Удерживайте, чтобы разбить.',hold:'Держите…',replay:'Ещё раз',next_k:'Абрикос и чабрец',next_h:'Всё решает <i>начинка.</i>',next_p:'Абрикос из сада, горный чабрец, тонкая глянцевая глазурь. С этого начинается каждая коробка.',cta:'Собрать коробку'},
  hy:{h1:'Ձեռքով <i>նկարված</i> անուշ։',sub:'Anush. հայկական բոնբոններ՝ կարված կուտյուրի պես։',hint:'Դիպչեք թաղանթին։ Պահեք՝ կոտրելու համար։',hold:'Պահեք…',replay:'Կրկին',next_k:'Ծիրան և ուրց',next_h:'Ամեն ինչ որոշում է <i>միջուկը։</i>',next_p:'Այգու ծիրան, լեռնային ուրց, բարակ փայլուն թաղանթ։ Ամեն տուփ սկսվում է այստեղից։',cta:'Հավաքել տուփը'}
};
window.setLang = function(l){
  document.documentElement.lang = l;
  document.querySelectorAll('[data-k]').forEach(function(el){ el.innerHTML = COPY[l][el.dataset.k]; });
  document.querySelectorAll('.lang button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.l===l); });
  try{localStorage.setItem('anush-lang',l)}catch(e){}
};
window.initLang = function(){
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',function(){ setLang(b.dataset.l); }); });
  var l='en'; try{l=localStorage.getItem('anush-lang')||'en'}catch(e){}
  setLang(l);
};
