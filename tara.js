// Ücretsiz haftalık tarama: Google News RSS -> adaylar.json (bağımlılık yok, Node 18+)
const fs=require('fs');
const SORGULAR=[
 'skyscraper tower construction facade contractor','curtain wall contractor awarded tower','airport terminal construction facade',
 'new stadium construction steel','convention centre construction','hospital campus construction steel facade',
 'headquarters tower construction','gökdelen inşaat cephe','havalimanı terminal inşaat','kule projesi inşaat başladı',
 'şehir hastanesi ihale','stadyum inşaat ihale','mixed-use tower groundbreaking','supertall tower topping out',
 // mimar / cephe mühendisi / marka odakli (yukseklik bilinmese de yakalar)
 'Kengo Kuma tower under construction','Zaha Hadid Architects tower construction','Foster + Partners tower construction','BIG Bjarke Ingels tower construction',
 'Gensler tower construction','SOM tower construction','Kohn Pedersen Fox tower construction','Atkins Aedas tower construction',
 'AKT II facade engineer tower','Arup facade engineer tower construction','Werner Sobek facade tower','Front Inc facade tower',
 'branded residences tower construction Aman OR "Four Seasons" OR "Mandarin Oriental" OR "Ritz-Carlton"','waterfront mixed-use hotel casino residential tower construction',
 // yerel diller
 'строительство небоскреб башня Грузия OR Казахстан OR Узбекистан OR Азербайджан','строительство башни фасад подрядчик',
 'ناطحة سحاب مشروع إنشاء برج','مشروع برج جديد المقاول الرئيسي','kule inşaatı mimar ünlü proje konut otel'];
const ANAHTAR=/(tower|skyscraper|terminal|stadium|hospital|convention|headquarters|kule|gökdelen|havalimanı|stadyum|hastane|kongre|башн|небоскр|برج|ناطحة)/i;
const m2=/(\d{2,3}[.,]?\d{3})\s?(m2|m²|sqm|square met|metrekare)/i, yuk=/(\d{2,3})\s?(m|meter|metre)\b/i;
const dec=s=>s.replace(/<!\[CDATA\[|\]\]>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
(async()=>{
 let eski={};try{eski=JSON.parse(fs.readFileSync('adaylar.json','utf8'))}catch(e){}
 const yeni=[];
 for(const q of SORGULAR){
  try{
   const r=await fetch('https://news.google.com/rss/search?q='+encodeURIComponent(q+' when:14d')+'&hl=en&gl=US&ceid=US:en');
   const x=await r.text();
   for(const it of x.split('<item>').slice(1)){
    const g=t=>{const m=it.match(new RegExp('<'+t+'[^>]*>([\\s\\S]*?)</'+t+'>'));return m?dec(m[1]).trim():''};
    const baslik=g('title'),link=g('link'),tarih=g('pubDate'),kaynak=g('source');
    if(!ANAHTAR.test(baslik)||eski[link])continue;
    const a={baslik,link,tarih,kaynak,ipucu_m2:(baslik.match(m2)||[])[0]||null,ipucu_yukseklik:(baslik.match(yuk)||[])[0]||null,sorgu:q};
    eski[link]=a;yeni.push(a);
   }
  }catch(e){console.error(q,e.message)}
 }
 fs.writeFileSync('adaylar.json',JSON.stringify(eski,null,1));
 const md='# Bu hafta '+yeni.length+' yeni aday ('+new Date().toISOString().slice(0,10)+')\n\n'+yeni.map(a=>'- ['+a.baslik+']('+a.link+') — '+a.kaynak+(a.ipucu_m2?' · '+a.ipucu_m2:'')).join('\n');
 fs.writeFileSync('bu-hafta.md',md);console.log(yeni.length+' yeni aday');
})();
