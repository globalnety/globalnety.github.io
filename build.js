!function(){"use strict";window.htmlToElement=function(t){let e=document.createElement("template");return e.innerHTML=t.trim(),e.content.firstChild},window.AuxEvent=class{constructor(){this.event=document.createElement("e"),this.aux=new Event("e")}addListener(t,e){let n=this.event;n.addEventListener("e",(function a(){document.contains(t)?e():n.removeEventListener("e",a)}))}dispatch(){this.event.dispatchEvent(this.aux)}},window.Observable=class{constructor(t){this.variable=t,this.event=new AuxEvent}get value(){return this.variable}set value(t){this.variable=t,this.event.dispatch()}subscribe(t,e){this.event.addListener(t,e)}},window.waitForGlobal=function(t){return new Promise(e=>{if(window[t])return e();document.head.querySelector(`[meta-id=${t}]`).addEventListener("load",()=>e())})},window.queryToObject=function(t){return(t=(t=t.substring(t.indexOf("?")+1)).split("&").map(t=>t.split("="))).reduce((t,[e,n])=>(t[e]=decodeURIComponent(n),t),{})},window.objectToQuery=function(t){return Object.entries(t).map(([t,e])=>[t,encodeURIComponent(e)]).map(t=>t.join("=")).join("&")};let t=new Observable(!1);async function e(){return await waitForGoogle,!googleFailed&&gapi.auth2.getAuthInstance().isSignedIn.get()}window.googleFailed=!1,window.initGoogle=()=>{gapi.load("auth2",(function(){gapi.auth2.init({client_id:"1047047837014-oujfhfvq2dhvccskf3go504ftsfn8q0i.apps.googleusercontent.com"}).then(()=>{t.value=!0}).catch(e=>{googleFailed=!0,t.value=!0,console.error(e)})}))},window.waitForGoogle=new Promise(e=>{if(t.value)return e();t.subscribe(document,()=>e())}),window.isLogged=new Observable(e()),(async()=>{await waitForGoogle,gapi.auth2.getAuthInstance().currentUser.listen(()=>{isLogged.value=e()})})(),window.signIn=async function(){if(await waitForGoogle,googleFailed)throw alert("Es necesario activar las cookies para poder loguearse. Este error puede deberse a navegar en modo incógnito.");await gapi.auth2.getAuthInstance().signIn(),isLogged.variable=async()=>!0},window.post=async function(t,e){let n=await async function(){return await isLogged.value?gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token:null}();return new Promise((a,i)=>{let s=new XMLHttpRequest,o="https://globalnety-core-dev.herokuapp.com/api/v1/"+t;n&&(o+="?token="+n),s.open("POST",o),s.responseType="json",s.onload=()=>{s.status<400?a(s.response):i(s.response)},s.onerror=()=>i(s.statusText),s.send(JSON.stringify(e))})};let n=new Observable(localStorage.operation||"buy");function a(){return Math.random()<.5?"piso":"casa"}const i=["Madrid","Bailén","Valencia","Zamora","Villarobledo","Antequera","Málaga","Bilbao","Sevilla","Granada"];function s(){let t=htmlToElement(`<main>\n\t\t<header class="home-header">\n\t\t\t<a class="config-link" href="#/notifications">Panel de control</a>\n\t\t\t<div id="g-signin2"></div>\n\t\t</header>\n\t\t<section class="home-content">\n\t\t\t<p class="big-logo">Globalnety</p>\n\t\t\t<form class="home-search"><input placeholder="${a()} en ${i[Math.floor(Math.random()*i.length)]}" type="search" required autofocus></form>\n\t\t\t<div class="home-selector">\n\t\t\t\t<a class="is-active" value="buy">Comprar</a>\n\t\t\t\t<a value="rent">Alquilar</a>\n\t\t\t</div>\n\t\t\t<p class="home-info">Encuentra tu ${a()} en Globalnety</p>\n\t\t\t<p class="home-info">Más de 3.200.000 propiedades indexadas</p>\n\t\t</section>\n\t\t<footer class="home-footer">\n\t\t\t<a>Acerca de Globalnety</a>\n\t\t\t<p>Real Estate Global Network</p>\n\t\t</footer>\n\t</main>`),e=t.querySelector("form"),s=t.querySelectorAll(".home-selector > a");function o(){for(let t of s)t.getAttribute("value")==n.value?t.classList.add("is-active"):t.classList.remove("is-active");localStorage.operation=n.value}o();for(let t of s)t.onclick=function(){t.classList.contains("is-active")?e.onsubmit():n.value=t.getAttribute("value")};n.subscribe(t,o);let r=t.querySelector("input");return e.onsubmit=function(t){if(t&&t.preventDefault(),e.reportValidity()){let t={text:r.value,operation:n.value};location.hash="/search?"+objectToQuery(t)}},r.oninvalid=()=>r.setCustomValidity("Introduce tu búsqueda"),r.oninput=()=>r.setCustomValidity(""),t}let o=async function(){return await waitForGlobal("IntersectionObserver"),new IntersectionObserver((t,e)=>{for(let n of t)n.isIntersecting?(e.unobserve(n.target),n.target.observerCallback()):document.contains(n.target)||e.unobserve(n.target)})}();function r(t){let e=htmlToElement('<a class="like-button"><i class="far fa-heart"></i></a>');return e.onclick=async function(){await isLogged.value||await signIn(),post("like",{reference:t});let n=htmlToElement('<a class="like-button"><i class="fas fa-heart"></i></a>');n.onclick=async function(){await isLogged.value||await signIn(),post("unlike",{reference:t}),n.replaceWith(r(t))},e.replaceWith(n)},e}function l(t){let e=htmlToElement(`<article class="item-card">\n\t\t<a href="${t.url}" target="_blank" rel="noopener noreferrer nofollow"><img class="item-img" src="${t.image_url||"images/home-placeholder.jpg"}"></a>\n\t\t<a class="item-title" href="${t.url}" target="_blank" rel="noopener noreferrer nofollow"></a>\n\t\t<div class="item-prices">\n\t\t\t<p class="item-price"><span class="${t.undervalued?"positive-price":"negative-price"}">${t.price.toLocaleString()}</span> €</p>\n\t\t\t<a class="item-estimation locked">Desbloquea valoración Globalnety</a>\n\t\t</div>\n\t\t<div class="item-details"></div>\n\t\t<a class="item-description"></a>\n\t\t<div class="item-bottom">\n\t\t\t<div class="tags"></div>\n\t\t\t<a class="like-button"></a>\n\t\t</div>\n\t</article>`);e.querySelector(".item-title").textContent=t.title;let n=e.querySelector(".item-description");return n.textContent=t.description,n.onclick=()=>n.classList.add("expanded"),"HIDDEN"!=t.estimated_price?e.querySelector(".item-estimation").replaceWith(htmlToElement(`<p class="item-estimation">Nuestra estimación: <span><span class="is-bold">${t.estimated_price.toLocaleString()}</span> €</span></p>`)):e.querySelector(".item-estimation").onclick=signIn,e.querySelector(".item-details").append(...t.details.map(t=>htmlToElement(`<p>${t}</p>`))),e.querySelector(".tags").append(...t.hashtags.map(t=>htmlToElement(`<p>#${t}</p>`))),e.querySelector(".like-button").replaceWith(r(t.reference)),e}function c(t,e=1){let n=t.querySelector(".results"),a=queryToObject(location.hash);a.page=e,post("search",a).then(a=>{let i=a.properties.map(l);i.length>5&&async function(t,e){if(t.observerCallback){let n=t.observerCallback;t.observerCallback=function(){n(),e()}}else t.observerCallback=e;if(document.contains(t))(await o).observe(t);else{let e=new MutationObserver(async()=>{document.contains(t)&&(e.disconnect(),(await o).observe(t))});e.observe(document.body,{childList:!0,subtree:!0})}}(i[i.length-5],()=>c(t,e+1)),n.append(...i),t.querySelector("#n-results").textContent=a.results.toLocaleString()+" resultados"}).catch(e=>{console.error(e),t.querySelector("#n-results").textContent="Error, vueva a intentarlo"})}let d=[{by:null,name:"Relevantes"},{by:"price",type:"asc",name:"Baratos"},{by:"price",type:"desc",name:"Caros"},{by:"m2",type:"desc",name:"Grandes"},{by:"m2",type:"asc",name:"Pequeños"}];function u(t){let e=queryToObject(location.hash);return t.by?(e.sortBy=t.by,e.sortOrder=t.type):(delete e.sortBy,delete e.sortOrder),"#/search?"+objectToQuery(e)}function p(){let t=htmlToElement('<main>\n\t\t<header class="main-header">\n\t\t\t<a href="#" class="header-logo">Globalnety</a>\n\t\t\t<div id="g-signin2"></div>\n\t\t</header>\n\t\t<section class="filters-section"></section>\n\t\t<section class="ordering">\n\t\t\t<p class="ordering-title">Ordenar</p>\n\t\t\t<div class="ordering-margin"></div>\n\t\t\t<article class="ordering-control"></article>\n\t\t</section>\n\t\t<section class="results">\n\t\t</section>\n\t</main>');return t.querySelector(".filters-section").replaceWith(function(){let t=htmlToElement('<section class="filters-section">\n\t\t<p class="search-reminder"></p>\n\t\t<header class="filters-header">\n\t\t\t<div>\n\t\t\t\t<p id="n-results">Cargando...</p>\n\t\t\t\t<a class="filters-button"><i class="fas fa-caret-down"></i><span>Filtrar</span></a>\n\t\t\t</div>\n\t\t\t<a class="button" href="#/notifications">\n\t\t\t\t<span>Avisar novedades</span>\n\t\t\t\t<i class="fas fa-bell"></i>\n\t\t\t</a>\n\t\t</header>\n\t\t<form>\n\t\t\t<article class="filters">\n\t\t\t\t<label for="city">Ciudad</label>\n\t\t\t\t<input id="city" type="text">\n\t\t\t\t<label for="min_price">Precio mínimo</label>\n\t\t\t\t<input id="min_price" type="number" min="0">\n\t\t\t\t<label for="max_price">Precio máximo</label>\n\t\t\t\t<input id="max_price" type="number" min="0">\n\t\t\t\t<label for="min_m2">m<sup>2</sup> mínimos</label>\n\t\t\t\t<input id="min_m2" type="number" min="0">\n\t\t\t\t<label for="max_m2">m<sup>2</sup> máximos</label>\n\t\t\t\t<input id="max_m2" type="number" min="0">\n\t\t\t\t<label for="professional">Profesionales</label>\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input id="professional" type="checkbox" checked>\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t\t<label for="private">Particulares</label>\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input id="private" type="checkbox" checked>\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t\t<label for="type">Tipo</label>\n\t\t\t\t<div class="select-wrapper">\n\t\t\t\t\t<select id="type">\n\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t<option>áticos</option>\n\t\t\t\t\t\t<option>casas</option>\n\t\t\t\t\t\t<option>estudios</option>\n\t\t\t\t\t\t<option>lofts</option>\n\t\t\t\t\t\t<option>chalets</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<label for="type"><i class="fas fa-caret-down"></i></label>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t\t<button class="button">Aplicar filtros</button>\n\t\t</form>\n\t</section>');t.querySelector(".filters-button").onclick=()=>t.classList.toggle("expanded");let e=queryToObject(location.hash);t.querySelector(".search-reminder").textContent=e.text||"";let n=t.querySelector("form");for(let t of n.elements){let n;t.id&&(n=e[t.id])&&("checkbox"==t.type?t.checked=!1:t.value=n)}return n.onsubmit=function(t){t.preventDefault();for(let t of n.elements)t.id&&("checkbox"==t.type?t.checked?delete e[t.id]:e[t.id]=!1:t.value?e[t.id]=t.value:delete e[t.id]);location.hash="/search?"+objectToQuery(e)},t}()),t.querySelector(".ordering-control").replaceWith(function(){let t=htmlToElement('<article class="ordering-control">\n\t\t<a class="ordering-status"></a>\n\t</article>'),e=queryToObject(location.hash),n=e.sortBy&&e.sortOrder?d.find(t=>t.by==e.sortBy&&t.type==e.sortOrder).name:"Relevantes",a=t.querySelector(".ordering-status");return a.textContent=n,a.onclick=()=>t.classList.remove("expanded"),t.append(...d.filter(t=>t.name!=n).map((e,n)=>{let a;return 0==n?(a=htmlToElement(`<a class="ordering-selector"><span>${e.name}</span><i class="fas fa-caret-down"></i></a>`),a.onclick=n=>{t.classList.contains("expanded")||(n.preventDefault(),t.classList.add("expanded"),a.href=u(e))}):a=htmlToElement(`<a class="ordering-option" href="${u(e)}">${e.name}</a>`),a})),t}()),c(t),isLogged.subscribe(t,loadURI),t}let m=0;window.loadURI=async function(){scrollTo(0,0);let t,e,n=++m,a=location.hash;e=(t=a.match(/#\/search\?.+/))?p():(t=a.match(/#\/notifications$/))?htmlToElement('<main>\n\t\t<header class="main-header">\n\t\t\t<a class="header-logo" href="#">Globalnety</a>\n\t\t\t<div id="g-signin2"></div>\n\t\t</header>\n\t\t<nav class="big-tabs">\n\t\t\t<a class="is-selected">Notificaciones</a>\n\t\t\t<a href="#/interests">Intereses</a>\n\t\t\t<a href="#/marketing">Marketing</a>\n\t\t</nav>\n\t\t<p class="info-block">Con Globalnety podrás enterarte de las últimas oportunidades inmobiliarias antes que nadie.\n\t\t\n\t\t\tPara ello buscaremos por ti aquello que más te interese y te enviaremos notificaciones instantáneas o emails.\n\t\t\t\n\t\t\tNuestro servicio de notificaciones instantáneas está integrado con Telegram. Si no sabes lo que es Telegram puedes obtener más información <a>aquí</a>.\n\t\t</p>\n\t\t<section>\n\t\t\t<article class="notifications-input">\n\t\t\t\t<div class="input-icon"><i class="far fa-envelope"></i></div>\n\t\t\t\t<input type="text">\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input type="checkbox">\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t</article>\n\t\t\t<article class="notifications-input">\n\t\t\t\t<div class="input-icon"><i class="fab fa-telegram-plane"></i></div>\n\t\t\t\t<input type="text">\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input type="checkbox">\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t</article>\n\t\t</section>\n\t\t<section class="notifications-links">\n\t\t\t<a>Qué es un alias de Telegram</a>\n\t\t\t<a>Cómo conectar Globalnety con Telegram</a>\n\t\t</section>\n\t</main>'):(t=a.match(/#\/interests$/))?htmlToElement('<main>\n\t\t<header class="main-header">\n\t\t\t<a class="header-logo" href="#">Globalnety</a>\n\t\t\t<div id="g-signin2"></div>\n\t\t</header>\n\t\t<nav class="big-tabs">\n\t\t\t<a href="#/notifications">Notificaciones</a>\n\t\t\t<a class="is-selected">Intereses</a>\n\t\t\t<a href="#/marketing">Marketing</a>\n\t\t</nav>\n\t\t<div class="info-block">\n\t\t\t<p><span class="is-bold">Aún no tienes intereses creados</span>\n\t\t\t\n\t\t\t\tAl mostrar interés en un tipo particular de activo inmobiliario, Globalnety buscará para ti sin parar hasta encontrar aquello que se ajusta a lo que quieres.\n\t\t\t\t\n\t\t\t\tSabemos que tienes mucho correo y la mayoría es correo basura, por tanto te damos la opción de recibir las notificaciones en Telgram y de decidir cuántas y con qué frecuencia quieres recibirlas.\n\t\t\t\t\n\t\t\t\tCuando desees dejar de recibir notificaciones vuelve aquí y simplemente borra el interés.\n\t\t\t\t\n\t\t\t\tEsto está pensado tanto para usuarios profesionales como inversores inmobiliarios o agencias inmobiliarias que están buscando un activo infravalorado para comprar o una propiedad con unas características concretas para un cliente.\n\t\t\t</p>\n\t\t\t<a class="button">+ Añadir interés</a>\n\t\t</div>\n\t</main>'):(t=a.match(/#\/marketing$/))?htmlToElement('<main>\n\t\t<header class="main-header">\n\t\t\t<a class="header-logo" href="#">Globalnety</a>\n\t\t\t<div id="g-signin2"></div>\n\t\t</header>\n\t\t<nav class="big-tabs">\n\t\t\t<a href="#/notifications">Notificaciones</a>\n\t\t\t<a href="#/interests">Intereses</a>\n\t\t\t<a class="is-selected">Marketing</a>\n\t\t</nav>\n\t\t<div class="info-block">\n\t\t\t<p><span class="is-bold">Llega a tus clientes a través de Globalnety</span>\n\t\t\t\n\t\t\t\tLos usuarios de Globalnety son principalmente agencias e inversores inmobiliarios en busca de activos.\n\t\t\t\t\n\t\t\t\tPor ello si tienes servicios relacionados como un despacho de abogados o tienes propiedades que deseas destacar puedes hacerlo a través de esta sección.\n\t\t\t</p>\n\t\t\t<a class="button">+ Crea tu anuncio</a>\n\t\t</div>\n\t</main>'):s(),e=await e,n==m&&(document.querySelector("main").replaceWith(e),document.querySelector("#g-signin2")&&(await waitForGoogle,googleFailed||gapi.signin2.render("g-signin2")))},window.onpopstate=loadURI,loadURI()}();
