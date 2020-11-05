!function(){"use strict";window.htmlToElement=function(t){let e=document.createElement("template");return e.innerHTML=t.trim(),e.content.firstChild},window.AuxEvent=class{constructor(){this.event=document.createElement("e"),this.aux=new Event("e")}addListener(t,e){let n=this.event;n.addEventListener("e",(function a(){document.contains(t)?e():n.removeEventListener("e",a)}))}dispatch(){this.event.dispatchEvent(this.aux)}},window.Observable=class{constructor(t){this.variable=t,this.event=new AuxEvent}get value(){return this.variable}set value(t){this.variable=t,this.event.dispatch()}subscribe(t,e){this.event.addListener(t,e)}},window.waitForGlobal=function(t){return new Promise((e=>{if(window[t])return e();document.head.querySelector(`[meta-id=${t}]`).addEventListener("load",(()=>e()))}))},window.queryToObject=function(t){let e=t.indexOf("?");return-1==e?{}:(t=(t=t.substring(e+1)).split("&").map((t=>t.split("=")))).reduce(((t,[e,n])=>(t[e]=decodeURIComponent(n),t)),{})},window.objectToQuery=function(t){return Object.entries(t).map((([t,e])=>[t,encodeURIComponent(e)])).map((t=>t.join("="))).join("&")};let t=new Observable(!1);async function e(){return await waitForGoogle,!googleFailed&&gapi.auth2.getAuthInstance().isSignedIn.get()}function n(){return htmlToElement('<header class="main-header">\n\t\t<a class="config-icon" href="#/notifications"><i class="fas fa-bars"></i></a>\n\t\t<a class="header-logo" href="#">Globalnety</a>\n\t\t<div id="g-signin2"></div>\n\t</header>')}function a(t,e){let n=htmlToElement('<nav class="big-tabs"></nav>');return t=t.map((t=>htmlToElement(`<a name="${t.id}" href="${t.href}">${t.name}</a>`))),n.append(...t),(e=n.querySelector(`[name=${e}]`)).classList.add("is-selected"),e.setAttribute("scrollintoview",""),n}function i(t){return a([{id:"notifications",href:"#/notifications",name:"Notificaciones"},{id:"interests",href:"#/interests",name:"Intereses"},{id:"marketing",href:"#/marketing",name:"Marketing"},{id:"account",href:"#/account",name:"Mi cuenta"}],t)}function s(t){return a([{id:"basic",href:"#/plans/basic",name:"Basic"},{id:"investor",href:"#/plans/investor",name:"Investor"},{id:"corporate",href:"#/plans/corporate",name:"Corporate"}],t)}window.googleFailed=!1,window.initGoogle=()=>{gapi.load("auth2",(function(){gapi.auth2.init({client_id:"1047047837014-oujfhfvq2dhvccskf3go504ftsfn8q0i.apps.googleusercontent.com"}).then((()=>{t.value=!0})).catch((e=>{googleFailed=!0,t.value=!0,console.error(e)}))}))},window.waitForGoogle=new Promise((e=>{if(t.value)return e();t.subscribe(document,(()=>e()))})),window.isLogged=new Observable(e()),(async()=>{await waitForGoogle,gapi.auth2.getAuthInstance().currentUser.listen((()=>{isLogged.value=e()}))})(),window.signIn=async function(){if(await waitForGoogle,googleFailed)throw alert("Es necesario activar las cookies para poder loguearse. Este error puede deberse a navegar en modo incógnito.");await gapi.auth2.getAuthInstance().signIn(),isLogged.variable=async()=>!0},window.post=async function(t,e){let n=await async function(){return await isLogged.value?gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token:null}();return new Promise(((a,i)=>{let s=new XMLHttpRequest,l="https://globalnety-core-dev.herokuapp.com/api/v1/"+t;n&&(l+="?token="+n),s.open("POST",l),s.responseType="json",s.onload=()=>{s.status<400?a(s.response):403==s.status?(s.response&&s.response.msg&&alert(s.response.msg),i("FORBIDDEN")):i(s.response)},s.onerror=()=>i(s.statusText),s.send(JSON.stringify(e))}))},window.checkout=async function(t){await isLogged.value||await signIn();let e=post("create-checkout-session",t).then((t=>t.id)).catch((()=>{throw alert("Error, vuelva a intentarlo")})),n=async function(){return await waitForGlobal("Stripe"),Stripe("pk_test_51HcDsEFmlcdOyaQ38ntpVfI3OrlIR1qAGhZfZnvQrJXwLkKCqeoHYW1RVataGvNwTGPadIRSs25G5b2Yb93TqBt000GmFhsiSj")}();(await n).redirectToCheckout({sessionId:await e})};let l=new Observable(localStorage.operation||"buy");const o=["Madrid","Bailén","Valencia","Zamora","Villarrobledo","Antequera","Málaga","Bilbao","Sevilla","Granada"];function r(){let t=htmlToElement(`<main class="home-main"><div>\n\t\t<header></header>\n\t\t<section class="home-content">\n\t\t\t<p class="big-logo">Globalnety</p>\n\t\t\t<form class="home-search"><input placeholder="${o[Math.floor(Math.random()*o.length)]}" type="search" required autofocus></form>\n\t\t\t<div class="home-selector">\n\t\t\t\t<a class="is-active" value="buy">Comprar</a>\n\t\t\t\t<a value="rent">Alquilar</a>\n\t\t\t</div>\n\t\t\t<p class="home-info">Encuentra tu ${Math.random()<.5?"piso":"casa"} en Globalnety</p>\n\t\t\t<p class="home-info">Más de 1.247.221 propiedades indexadas</p>\n\t\t\t<p class="home-info">7 portales inmobiliarios indexados</p>\n\t\t</section>\n\t\t<footer class="home-footer">\n\t\t\t<a href="/privacy">Política de privacidad</a>\n\t\t\t<a href="/terms">Aviso legal</a>\n\t\t</footer>\n\t</div></main>`);t.querySelector("header").replaceWith(htmlToElement('<header class="home-header">\n\t\t<a class="config-link" href="#/notifications">Panel de control</a>\n\t\t<div id="g-signin2"></div>\n\t</header>'));let e=t.querySelector("form"),n=t.querySelectorAll(".home-selector > a");function a(){for(let t of n)t.getAttribute("value")==l.value?t.classList.add("is-active"):t.classList.remove("is-active");localStorage.operation=l.value}a();for(let t of n)t.onclick=function(){l.value=t.getAttribute("value"),e.onsubmit()};l.subscribe(t,a);let i=t.querySelector("input");return e.onsubmit=function(t){if(t&&t.preventDefault(),e.reportValidity()){let t={text:i.value,operation:l.value};location.hash="/search?"+objectToQuery(t)}},i.oninvalid=()=>i.setCustomValidity("Introduce tu búsqueda"),i.oninput=()=>i.setCustomValidity(""),t}let c=async function(){return await waitForGlobal("IntersectionObserver"),new IntersectionObserver(((t,e)=>{for(let n of t)n.isIntersecting?(e.unobserve(n.target),n.target.observerCallback()):document.contains(n.target)||e.unobserve(n.target)}))}();function p(t,e={}){let n=new Set;for(let a of t.elements)a.id?"checkbox"==a.type?a.checked?delete e[a.id]:e[a.id]=!1:a.value?e[a.id]=a.value:delete e[a.id]:a.name&&n.add(a.name);for(let a of n){let n=[];for(let e of t.elements[a])e.checked&&n.push(e.value);n.length?e[a]=n.join(","):delete e[a]}return e}function u(t){let e="likes"!=m(),n=htmlToElement(`<a class="like-button"><i class="${e?"far":"fas"} fa-heart"></i></a>`);return n.onclick=async function(){await isLogged.value||await signIn(),post(e?"like":"unlike",{reference:t});let a=htmlToElement(`<a class="like-button"><i class="${e?"fas":"far"} fa-heart"></i></a>`);a.onclick=async function(){await isLogged.value||await signIn(),post(e?"unlike":"like",{reference:t}),a.replaceWith(u(t))},n.replaceWith(a)},n}function d(t){let e=htmlToElement(`<article class="item-card">\n\t\t<a href="${t.url}" target="_blank" rel="noopener noreferrer nofollow"><img class="item-img" src="${t.image_url||"images/home-placeholder.jpg"}"></a>\n\t\t<a class="item-title" href="${t.url}" target="_blank" rel="noopener noreferrer nofollow"></a>\n\t\t<div class="item-prices">\n\t\t\t<p class="item-price"><span class="${(t.undervalued?"positive-price":0==t.undervalued&&"negative-price")||"neutral-price"}">${t.price.toLocaleString()}</span> €</p>\n\t\t\t<a class="item-estimation locked">Desbloquea valoración Globalnety</a>\n\t\t</div>\n\t\t<div class="item-details"></div>\n\t\t<a class="item-description"></a>\n\t\t<div class="item-bottom">\n\t\t\t<div class="tags"></div>\n\t\t\t<a class="like-button"></a>\n\t\t</div>\n\t</article>`);e.querySelector(".item-title").textContent=t.title;let n=e.querySelector(".item-description");return n.textContent=t.description,n.onclick=()=>n.classList.add("expanded"),"HIDDEN"!=t.estimated_price?e.querySelector(".item-estimation").replaceWith(htmlToElement(`<p class="item-estimation">Nuestra estimación: <span><span class="is-bold">${t.estimated_price.toLocaleString()}</span> €</span></p>`)):e.querySelector(".item-estimation").onclick=signIn,e.querySelector(".item-details").append(...t.details.map((t=>htmlToElement(`<p>${t}</p>`)))),e.querySelector(".tags").append(...t.hashtags.map((t=>htmlToElement(`<p>#${t}</p>`)))),e.querySelector(".like-button").replaceWith(u(t.reference)),e}function m(){return location.hash.match(/#\/([^?]+)/)[1]}async function b(t,e=1){let n=t.querySelector(".results"),a=queryToObject(location.hash);a.page=e;let i=m();"likes"!=i||await isLogged.value||await signIn().catch((()=>{throw t.querySelector("#n-results").textContent="Error, login necesario"})),post("likes"==i?"get-likes":"search",a).then((a=>{let i=a.properties.map(d);i.length>5&&async function(t,e){if(t.observerCallback){let n=t.observerCallback;t.observerCallback=function(){n(),e()}}else t.observerCallback=e;if(document.contains(t))(await c).observe(t);else{let e=new MutationObserver((async()=>{document.contains(t)&&(e.disconnect(),(await c).observe(t))}));e.observe(document.body,{childList:!0,subtree:!0})}}(i[i.length-5],(()=>b(t,e+1))),n.append(...i),t.querySelector("#n-results").textContent=a.results.toLocaleString()+" resultados",a.title&&(t.querySelector(".search-reminder").innerHTML=a.title)})).catch((e=>{console.error(e),t.querySelector("#n-results").textContent="Error, vueva a intentarlo"}))}let h=[{by:null,name:"Relevantes"},{by:"price",type:"asc",name:"Baratos"},{by:"price",type:"desc",name:"Caros"},{by:"m2",type:"desc",name:"Grandes"},{by:"m2",type:"asc",name:"Pequeños"},{by:"pm2",type:"asc",name:"Baratos €/m<sup>2</sup>"},{by:"pm2",type:"desc",name:"Caros €/m<sup>2</sup>"},{by:"publication_time",type:"desc",name:"Recientes"}];function v(t){let e=queryToObject(location.hash);return t.by?(e.sortBy=t.by,e.sortOrder=t.type):(delete e.sortBy,delete e.sortOrder),`#/${m()}?${objectToQuery(e)}`}function f(){let t=htmlToElement('<section class="filters-section">\n\t\t<p class="search-reminder"></p>\n\t\t<header class="filters-header">\n\t\t\t<div>\n\t\t\t\t<p id="n-results">Cargando...</p>\n\t\t\t\t<a class="filters-button"><i class="fas fa-caret-down"></i><span>Filtrar</span></a>\n\t\t\t</div>\n\t\t\t<a id="subscribe-button"></a>\n\t\t</header>\n\t\t<form>\n\t\t\t<article class="filters">\n\t\t\t\t<label for="operation">Operación</label>\n\t\t\t\t<div class="select-wrapper">\n\t\t\t\t\t<select id="operation">\n\t\t\t\t\t\t<option value="buy">Comprar</option>\n\t\t\t\t\t\t<option value="rent">Alquilar</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<label for="city">Ciudad</label>\n\t\t\t\t<input id="city" type="text">\n\t\t\t\t<label for="area">Barrio</label>\n\t\t\t\t<input id="area" type="text">\n\t\t\t\t<label for="min_price">Precio mínimo</label>\n\t\t\t\t<input id="min_price" type="number" min="0">\n\t\t\t\t<label for="max_price">Precio máximo</label>\n\t\t\t\t<input id="max_price" type="number" min="0">\n\t\t\t\t<label for="min_m2">m<sup>2</sup> mínimos</label>\n\t\t\t\t<input id="min_m2" type="number" min="0">\n\t\t\t\t<label for="max_m2">m<sup>2</sup> máximos</label>\n\t\t\t\t<input id="max_m2" type="number" min="0">\n\t\t\t\t<label for="professional">Profesionales</label>\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input id="professional" type="checkbox" checked>\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t\t<label for="private">Particulares</label>\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input id="private" type="checkbox" checked>\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t\t<label>Habitaciones</label>\n\t\t\t\t<div class="checkboxes">\n\t\t\t\t\t<label><input name="beds" value="0" type="checkbox"><span>0</span></label>\n\t\t\t\t\t<label><input name="beds" value="1" type="checkbox"><span>1</span></label>\n\t\t\t\t\t<label><input name="beds" value="2" type="checkbox"><span>2</span></label>\n\t\t\t\t\t<label><input name="beds" value="3" type="checkbox"><span>3</span></label>\n\t\t\t\t\t<label><input name="beds" value="4" type="checkbox"><span>4</span></label>\n\t\t\t\t\t<label><input name="beds" value="5+" type="checkbox"><span>+</span></label>\n\t\t\t\t</div>\n\t\t\t\t<label>Baños</label>\n\t\t\t\t<div class="checkboxes">\n\t\t\t\t\t<label><input name="baths" value="0" type="checkbox"><span>0</span></label>\n\t\t\t\t\t<label><input name="baths" value="1" type="checkbox"><span>1</span></label>\n\t\t\t\t\t<label><input name="baths" value="2" type="checkbox"><span>2</span></label>\n\t\t\t\t\t<label><input name="baths" value="3" type="checkbox"><span>3</span></label>\n\t\t\t\t\t<label><input name="baths" value="4" type="checkbox"><span>4</span></label>\n\t\t\t\t\t<label><input name="baths" value="5+" type="checkbox"><span>+</span></label>\n\t\t\t\t</div>\n\t\t\t\t<label for="type">Tipo</label>\n\t\t\t\t<div class="select-wrapper">\n\t\t\t\t\t<select id="type">\n\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t<option>áticos</option>\n\t\t\t\t\t\t<option>pisos</option>\n\t\t\t\t\t\t<option>estudios</option>\n\t\t\t\t\t\t<option>lofts</option>\n\t\t\t\t\t\t<option>duplex</option>\n\t\t\t\t\t\t<option>casas</option>\n\t\t\t\t\t\t<option>chalets</option>\n\t\t\t\t\t\t<option>casas rurales</option>\n\t\t\t\t\t\t<option>vacacional</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<label for="type"><i class="fas fa-caret-down"></i></label>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t\t<button class="button">Aplicar filtros</button>\n\t\t</form>\n\t</section>');t.querySelector(".filters-button").onclick=()=>t.classList.toggle("expanded");let e=queryToObject(location.hash);t.querySelector(".search-reminder").innerHTML=("likes"==m()?"Mis favoritos":e.text)||"";let n=t.querySelector("form");return function(t,e){let n=new Set;for(let a of t.elements){let t;a.id&&(t=e[a.id])?"checkbox"==a.type?a.checked=!1:a.value=t:a.name&&n.add(a.name)}for(let a of n)if(e[a]){let n=e[a].split(",");for(let e of t.elements[a])n.includes(e.value)&&(e.checked=!0)}}(n,e),n.onsubmit=function(t){t.preventDefault(),location.hash=`/${m()}?${objectToQuery(p(n,e))}`},t.querySelector("#subscribe-button").replaceWith(function(){if("search"!=m())return htmlToElement('<a class="button" href="#/interests">\n\t\t\t<i class="fas fa-chevron-left"></i>\n\t\t\t<span>Volver a intereses</span>\n\t\t</a>');let t=htmlToElement('<button class="button">\n\t\t<span>Avisar novedades</span>\n\t\t<i class="fas fa-bell"></i>\n\t</button>');return t.onclick=async function(){await isLogged.value||await signIn(),t.disabled=!0,post("subscribe-to-feed",queryToObject(location.hash)).then((()=>{alert("Suscripción añadida. Configure las notificaciones en el panel de control para recibir las novedades."),t.querySelector("span").textContent="Suscripción añadida"})).catch((e=>{"FORBIDDEN"==e?location.hash="/plans/investor":e.msg?alert(e.msg):"city field is mandatory"==e.status?alert("Filtre por ciudad para poder añadir la suscripción"):alert("Error al suscribirse. Vuelva a intertarlo."),t.disabled=!1}))},t}()),t}function y(){let t=htmlToElement('<main>\n\t\t<header></header>\n\t\t<section class="filters-section"></section>\n\t\t<section class="ordering">\n\t\t\t<p class="ordering-title">Ordenar</p>\n\t\t\t<div class="ordering-margin"></div>\n\t\t\t<article class="ordering-control"></article>\n\t\t</section>\n\t\t<section class="results">\n\t\t</section>\n\t</main>');return t.querySelector("header").replaceWith(n()),t.querySelector(".filters-section").replaceWith(f()),t.querySelector(".ordering-control").replaceWith(function(){let t=htmlToElement('<article class="ordering-control">\n\t\t<a class="ordering-status"></a>\n\t</article>'),e=queryToObject(location.hash),n=e.sortBy&&e.sortOrder?h.find((t=>t.by==e.sortBy&&t.type==e.sortOrder)).name:"Relevantes",a=t.querySelector(".ordering-status");return a.innerHTML=n,a.onclick=()=>t.classList.remove("expanded"),t.append(...h.filter((t=>t.name!=n)).map(((e,n)=>{let a;return 0==n?(a=htmlToElement(`<a class="ordering-selector"><span>${e.name}</span><i class="fas fa-caret-down"></i></a>`),a.onclick=n=>{t.classList.contains("expanded")||(n.preventDefault(),t.classList.add("expanded"),a.href=v(e))}):a=htmlToElement(`<a class="ordering-option" href="${v(e)}">${e.name}</a>`),a}))),t}()),b(t),isLogged.subscribe(t,loadURI),t}function g(t=!0){let e='Al añadir un interés, <span class="is-bold">Globalnety buscará por ti</span> las nuevas propiedades que los propietarios o representantes han publicado en <span class="is-bold">cualquier portal inmobiliario</span>.\n\t\t\n\t\tEste es un servicio para usuarios particulares que buscan comprar una vivienda y para profesionales inmobiliarios que desean ampliar la cartera de inmuebles con nuevas oportunidades y encontrar activos para sus clientes.\n\t\t\n\t\tPuedes consultar tus FAVORITOS (<i class="fas fa-heart"></i>) pulsando <a href="#/likes">aquí</a>.';return t&&(e='<span class="is-bold">Aún no tienes intereses creados</span>\n\n'+e),htmlToElement(`<div class="info-block"><p>${e}</p><a class="button" href="#/add-interest">+ Añadir interés</a>\n\t</div>`)}function k(t){let e=t.is_active,n=function(t){for(let[e,n]of Object.entries(t))null!=n&&1!=n||delete t[e];return t}(t.query),a=htmlToElement(`<a class="interest-name" href="#/interest?${objectToQuery(n)}"></a>`);a.innerHTML=t.title;let i=htmlToElement(`<label class="switch"><input type="checkbox" ${e?"checked":""}><div class="slider"></div></label>`),s=i.querySelector("input");s.addEventListener("change",(function(){let n=s.checked;post(n?"enable-interest":"disable-interest",{id:t.id}).then((()=>{e=n})).catch((t=>{"FORBIDDEN"==t?location.hash="/plans/investor":(alert("Error, vuelva a intentarlo"),s.checked=e)}))}));let l=htmlToElement('<a class="delete-button"><i class="far fa-trash-alt"></i></a>');return l.onclick=function(){confirm("¿Desea eliminar el interés?")&&post("delete-interest",{id:t.id}).then(loadURI).catch((()=>alert("Error, vuelva a intentarlo")))},[a,i,l]}function w(){let t=htmlToElement('<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<p class="info-block">Cargando...</>\n\t</main>');t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(i("interests"));let e=t.querySelector(".info-block");return isLogged.value.then((t=>{t?post("get-user-interests").then((t=>{t.length?e.replaceWith(function(t){let e=htmlToElement('<main class="interests-list">\n\t\t<section class="interests-items"></section>\n\t\t<p class="interests-info">Puedes consultar tus FAVORITOS (<i class="fas fa-heart"></i>) pulsando <a href="#/likes">aquí</a>.</p>\n\t\t<a class="interests-info-link is-bold">Saber más</a>\n\t\t<a class="button" href="#/add-interest">+ Añadir interés</a>\n\t</main>');return e.querySelector(".interests-items").append(...[].concat(...t.map(k))),e.querySelector(".interests-info-link").onclick=()=>e.replaceWith(g(!1)),e}(t)):e.replaceWith(g())})).catch((t=>{console.error(t),e.textContent="Error, vuelva a intentarlo"})):e.replaceWith(g())})),isLogged.subscribe(t,loadURI),t}let q='&nbsp;&nbsp;&nbsp;<i class="fas fa-check"></i>',S='&nbsp;&nbsp;&nbsp;<i class="fas fa-times"></i>',x={Free:`(*) Portales inmobiliarios${q}\n\t\t(*) Fondos de inversión${S}\n\t\t(*) Bancos${S}\n\t\t(*) Subastas oficiales${S}\n\t\t(*) Solicitudes a demanda${S}\n\t\t(*) Búsquedas automáticas (Intereses)${q} (limitado a un interés)\n\t\t(*) Acceso API Agencias${S}\n\t\t(*) Notificaciones por email&nbsp${q}\n\t\t(*) Notificaciones por Telegram${q}\n\t\t(*) Alquiler y Compra${q}\n\t\t(*) Asistencia técnica${S}`,Investor:`(*) Portales inmobiliarios${q}\n\t\t(*) Fondos de inversión${q}\n\t\t(*) Bancos${q}\n\t\t(*) Subastas oficiales${S}\n\t\t(*) Solicitudes a demanda${q}\n\t\t(*) Búsquedas automáticas (Intereses)${q}\n\t\t(*) Acceso API Agencias${S}\n\t\t(*) Notificaciones por email${q}\n\t\t(*) Notificaciones por Telegram${q}\n\t\t(*) Alquiler y Compra${q}\n\t\t(*) Asistencia técnica&nbsp;&nbsp;&nbsp;E-mail`,Corporate:`(*) Portales inmobiliarios${q}\n\t\t(*) Fondos de inversión${q}\n\t\t(*) Bancos${q}\n\t\t(*) Subastas oficiales${q}\n\t\t(*) Solicitudes a demanda${q}\n\t\t(*) Búsquedas automáticas (Intereses)${q}\n\t\t(*) Acceso API Agencias${q}\n\t\t(*) Notificaciones por email${q}\n\t\t(*) Notificaciones por Telegram${q}\n\t\t(*) Alquiler y Compra${q}\n\t\t(*) Asistencia técnica&nbsp;&nbsp;&nbsp;E-mail`};function E(t,e){t.onclick=function(){t.disabled=!0,checkout(e).catch((()=>t.disabled=!1))}}function T(t){return"basic"==t?function(){let t=htmlToElement('<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<p class="info-block">Si eres un partícular buscando alquilar o comprar una propiedad, éste es tu plan.\n\n\t\t\tCon el plan <span class="is-bold">Basic</span> podrás obtener una valoración de cada propiedad automáticamente.\n\n\t\t\tPara activar el plan Basic sólo tienes que hacer login con tu cuenta de Google.\n\n\t\t\t<span class="is-bold">Este plan es completamente gratuito</span>.\n\n\t\t\tSi eres un profesional del sector inmobiliario o lo son tus clientes echa un ojo a los planes <a href="#/plans/investor">Investor</a> y <a href="#/plans/corporate">Corporate</a>.\n\t\t</p>\n\t</main>');return t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(s("basic")),t}():"corporate"==t?function(){let t=htmlToElement(`<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<main class="info-main">\n\t\t\t<p class="info-block">Si trabajas en el mercado inmobiliario y quieres enterarte de las últimas oportunidades de inversión antes que nadie, éste es tu plan.\n\t\t\t\t\n\t\t\t\t${x.Corporate}\n\t\t\t</p>\n\t\t\t<section class="subscription-price">\n\t\t\t\t<p>Coste de la suscripción:</p>\n\t\t\t\t<article class="price-buttons">\n\t\t\t\t\t<button name="monthly">Mensual: 59.95€</button>\n\t\t\t\t\t<div class="price-buttons-space"></div>\n\t\t\t\t\t<button name="annual">Anual: 495.95€</button>\n\t\t\t\t</article>\n\t\t\t\t<p>Si contratas más de 6 licencias <a href="mailto:globalnety.com@gmail.com" target="_black" rel="noopener">contacta con ventas</a></p>\n\t\t\t</section>\n\t\t</main>\n\t</main>`);return t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(s("corporate")),E(t.querySelector("[name=monthly]"),{plan:"CORPORATE_PLAN",periodicity:"MONTHLY"}),E(t.querySelector("[name=annual]"),{plan:"CORPORATE_PLAN",periodicity:"ANNUAL"}),t}():function(){let t=htmlToElement(`<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<main class="info-main">\n\t\t\t<p class="info-block">Si eres un inversor buscando oportunidades, éste es tu plan.\n\t\t\t\t\n\t\t\t\t${x.Investor}\n\t\t\t</p>\n\t\t\t<section class="subscription-price">\n\t\t\t\t<p>Coste de la suscripción:</p>\n\t\t\t\t<article class="price-buttons">\n\t\t\t\t\t<button name="monthly">Mensual: 14.95€</button>\n\t\t\t\t\t<div class="price-buttons-space"></div>\n\t\t\t\t\t<button name="annual">Anual: 129.95€</button>\n\t\t\t\t</article>\n\t\t\t</section>\n\t\t</main>\n\t</main>`);return t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(s("investor")),E(t.querySelector("[name=monthly]"),{plan:"INVESTOR_PLAN",periodicity:"MONTHLY"}),E(t.querySelector("[name=annual]"),{plan:"INVESTOR_PLAN",periodicity:"ANNUAL"}),t}()}function $(){let t=htmlToElement('<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<p class="info-block">Cargando...</>\n\t</main>');t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(i("account"));let e=t.querySelector(".info-block");return isLogged.value.then((t=>{t?post("get-user").then((t=>e.replaceWith(function(t){return htmlToElement(`<div class="info-block"><p class="info-title">Mis datos</p><div class="account-table">\n\t\t\t<p>Globalnety email:</p>\n\t\t\t<p>${t.email}</p>\n\t\t\t<p>Alias de Telegram:</p>\n\t\t\t<p>${t.tg_alias}</p>\n\t\t</div><p class="info-title">Mi plan</p><p class="info-subtitle">${t.type}</p><p>${x[t.type]}</p><a class="button" href="#/plans/investor">Ver planes</a>\n\t</div>`)}(t)))).catch((t=>{console.error(t),e.textContent="Error, vuelva a intentarlo"})):e.replaceWith(htmlToElement('<p class="info-block is-bold">Accede con Google para obtener los datos de tu cuenta.</>'))})),isLogged.subscribe(t,loadURI),t}let I=0;window.loadURI=async function(){scrollTo(0,0);let t,e,a=++I,s=location.hash;e=(t=s.match(/#\/search\?.+/))||(t=s.match(/#\/likes/))||(t=s.match(/#\/interest\?.+/))?y():(t=s.match(/#\/notifications$/))?function(){let t=htmlToElement('<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<main class="info-main">\n\t\t\t<p class="info-block">Globalnety rastrea internet y te informa de los nuevos anuncios que se han publicado en los portales inmobiliarios en tiempo real, en aquellas búsquedas que tengas interés.\n\t\t\t\t\n\t\t\t\tPara que accedas antes que nadie a las últimas oportunidades inmobiliarias estés donde estés.\n\t\t\t\t\n\t\t\t\tNuestro servicio de notificaciones instantáneas utiliza e-mail y está integrado con Telegram.\n\t\t\t\t\n\t\t\t\tSi no sabes lo que es Telegram puedes obtener más información <a href="https://telegram.org/" target="_blank" rel="noopener nofollow" >aquí</a>.\n\t\t\t</p>\n\t\t\t<section>\n\t\t\t\t<article class="notifications-input">\n\t\t\t\t\t<div class="input-icon"><i class="far fa-envelope"></i></div>\n\t\t\t\t\t<input name="mail" type="text" readonly>\n\t\t\t\t\t<label class="switch">\n\t\t\t\t\t\t<input name="mail-active" type="checkbox">\n\t\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t\t</label>\n\t\t\t\t</article>\n\t\t\t\t<article class="notifications-input">\n\t\t\t\t\t<div class="input-icon"><i class="fab fa-telegram-plane"></i></div>\n\t\t\t\t\t<input name="telegram" type="text" required>\n\t\t\t\t\t<label class="switch">\n\t\t\t\t\t\t<input name="telegram-active" type="checkbox">\n\t\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t\t</label>\n\t\t\t\t</article>\n\t\t\t\t<article class="notifications-input">\n\t\t\t\t\t<div class="input-icon"><i class="fas fa-phone-alt"></i></div>\n\t\t\t\t\t<input name="phone" type="tel" required>\n\t\t\t\t\t<label class="switch is-hidden">\n\t\t\t\t\t\t<input type="checkbox">\n\t\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t\t</label>\n\t\t\t\t</article>\n\t\t\t</section>\n\t\t\t<section class="notifications-links">\n\t\t\t\t<a href="https://telegram.org/faq#nombres-de-usuario-y-t-me" target="_blank" rel="noopener nofollow">Qué es un alias de Telegram</a>\n\t\t\t\t<a href="https://t.me/globalnety_bot" target="_blank" rel="noopener">Cómo conectar Globalnety con Telegram</a>\n\t\t\t</section>\n\t\t\t<a class="button notifications-button" href="#/add-interest">+ Añadir interés</a>\n\t\t</main>\n\t</main>');t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(i("notifications"));let e=t.querySelector("input[name=mail]"),a=t.querySelector("input[name=mail-active]"),s=t.querySelector("input[name=telegram]"),l=t.querySelector("input[name=telegram-active]"),o=t.querySelector("input[name=phone]");return isLogged.value.then((t=>{t&&post("get-user").then((t=>{e.value=t.email,a.checked=t.is_email_active,t.tg_alias&&(s.value=t.tg_alias,l.checked=t.is_tg_active),t.phone&&(o.value=t.phone)}))})),a.addEventListener("change",(async function(){await isLogged.value||await signIn().catch((()=>{throw a.checked=!1}));let t=a.checked;if(t&&!o.reportValidity())return a.checked=!1;post(t?"enable-email-notifications":"disable-email-notifications",{phone:o.value}).catch((e=>{"FORBIDDEN"==e?location.hash="/plans/investor":e.msg?alert(e.msg):alert("Error, vuelva a intentarlo"),a.checked=!t}))})),l.addEventListener("change",(async function(){await isLogged.value||await signIn().catch((()=>{throw l.checked=!1}));let t=l.checked;if(t&&(!s.reportValidity()||!o.reportValidity()))return l.checked=!1;post(t?"set-telegram-alias":"disable-telegram-alias",{tg_alias:s.value,is_tg_active:t,phone:o.value}).catch((e=>{"FORBIDDEN"==e?location.hash="/plans/investor":e.msg?alert(e.msg):alert("Error, vuelva a intentarlo"),l.checked=!t}))})),isLogged.subscribe(t,loadURI),t}():(t=s.match(/#\/interests$/))?w():(t=s.match(/#\/add-interest$/))?function(){let t=htmlToElement('<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<form class="interest-filters">\n\t\t\t<article class="filters">\n\t\t\t\t<label for="text">Búsqueda</label>\n\t\t\t\t<input id="text" type="text">\n\t\t\t\t<label for="operation">Operación</label>\n\t\t\t\t<div class="select-wrapper">\n\t\t\t\t\t<select id="operation">\n\t\t\t\t\t\t<option value="buy">Comprar</option>\n\t\t\t\t\t\t<option value="rent">Alquilar</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<label for="city">Ciudad</label>\n\t\t\t\t<input id="city" type="text" required>\n\t\t\t\t<label for="area">Barrio</label>\n\t\t\t\t<input id="area" type="text">\n\t\t\t\t<label for="min_price">Precio mínimo</label>\n\t\t\t\t<input id="min_price" type="number" min="0">\n\t\t\t\t<label for="max_price">Precio máximo</label>\n\t\t\t\t<input id="max_price" type="number" min="0">\n\t\t\t\t<label for="min_m2">m<sup>2</sup> mínimos</label>\n\t\t\t\t<input id="min_m2" type="number" min="0">\n\t\t\t\t<label for="max_m2">m<sup>2</sup> máximos</label>\n\t\t\t\t<input id="max_m2" type="number" min="0">\n\t\t\t\t<label for="professional">Profesionales</label>\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input id="professional" type="checkbox" checked>\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t\t<label for="private">Particulares</label>\n\t\t\t\t<label class="switch">\n\t\t\t\t\t<input id="private" type="checkbox" checked>\n\t\t\t\t\t<div class="slider"></div>\n\t\t\t\t</label>\n\t\t\t\t<label>Habitaciones</label>\n\t\t\t\t<div class="checkboxes">\n\t\t\t\t\t<label><input name="beds" value="0" type="checkbox"><span>0</span></label>\n\t\t\t\t\t<label><input name="beds" value="1" type="checkbox"><span>1</span></label>\n\t\t\t\t\t<label><input name="beds" value="2" type="checkbox"><span>2</span></label>\n\t\t\t\t\t<label><input name="beds" value="3" type="checkbox"><span>3</span></label>\n\t\t\t\t\t<label><input name="beds" value="4" type="checkbox"><span>4</span></label>\n\t\t\t\t\t<label><input name="beds" value="5+" type="checkbox"><span>+</span></label>\n\t\t\t\t</div>\n\t\t\t\t<label>Baños</label>\n\t\t\t\t<div class="checkboxes">\n\t\t\t\t\t<label><input name="baths" value="0" type="checkbox"><span>0</span></label>\n\t\t\t\t\t<label><input name="baths" value="1" type="checkbox"><span>1</span></label>\n\t\t\t\t\t<label><input name="baths" value="2" type="checkbox"><span>2</span></label>\n\t\t\t\t\t<label><input name="baths" value="3" type="checkbox"><span>3</span></label>\n\t\t\t\t\t<label><input name="baths" value="4" type="checkbox"><span>4</span></label>\n\t\t\t\t\t<label><input name="baths" value="5+" type="checkbox"><span>+</span></label>\n\t\t\t\t</div>\n\t\t\t\t<label for="type">Tipo</label>\n\t\t\t\t<div class="select-wrapper">\n\t\t\t\t\t<select id="type">\n\t\t\t\t\t\t<option></option>\n\t\t\t\t\t\t<option>áticos</option>\n\t\t\t\t\t\t<option>pisos</option>\n\t\t\t\t\t\t<option>estudios</option>\n\t\t\t\t\t\t<option>lofts</option>\n\t\t\t\t\t\t<option>duplex</option>\n\t\t\t\t\t\t<option>casas</option>\n\t\t\t\t\t\t<option>chalets</option>\n\t\t\t\t\t\t<option>casas rurales</option>\n\t\t\t\t\t\t<option>vacacional</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<label for="type"><i class="fas fa-caret-down"></i></label>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t\t<button class="button">+ Añadir Interés</button>\n\t\t</form>\n\t</main>');t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(i("interests"));let e=t.querySelector("form"),a=!0;return e.onsubmit=async function(t){t.preventDefault(),a&&(await isLogged.value||await signIn(),a=!1,post("subscribe-to-feed",p(e)).then((()=>location.hash="/interests")).catch((t=>{"FORBIDDEN"==t?location.hash="/plans/investor":t.msg?alert(t.msg):alert("Error, vuelva a intertarlo"),a=!0})))},t}():(t=s.match(/#\/marketing$/))?function(){let t=htmlToElement('<main>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<div class="info-block"><p><span class="is-bold">Llega a tus clientes a través de Globalnety</span>\n\t\t\t\n\t\t\t\tLos usuarios de Globalnety son principalmente agencias e inversores inmobiliarios en busca de activos.\n\t\t\t\t\n\t\t\t\tPor ello si tienes servicios relacionados como un despacho de abogados o tienes propiedades que deseas destacar puedes hacerlo a través de esta sección.\n\t\t\t</p><a class="button" href="mailto:globalnety.com@gmail.com" target="_black" rel="noopener">+ Crea tu anuncio</a>\n\t\t</div>\n\t</main>');return t.querySelector("header").replaceWith(n()),t.querySelector("nav").replaceWith(i("marketing")),t}():(t=s.match(/#\/account$/))?$():(t=s.match(/#\/plans\/([^/]+)$/))?T(t[1]):r(),e=await e,a==I&&(document.querySelector("main").replaceWith(e),document.querySelectorAll("[scrollintoview]").forEach((t=>t.scrollIntoView(!1))),await waitForGoogle,document.querySelector("#g-signin2")&&!googleFailed&&gapi.signin2.render("g-signin2"))},window.onpopstate=loadURI,loadURI()}();
