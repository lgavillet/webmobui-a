var q=Object.defineProperty;var M=(e,t,s)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var l=(e,t,s)=>M(e,typeof t!="symbol"?t+"":t,s);var L=(e,t,s)=>new Promise((n,i)=>{var a=o=>{try{h(s.next(o))}catch(y){i(y)}},p=o=>{try{h(s.throw(o))}catch(y){i(y)}},h=o=>o.done?n(o.value):Promise.resolve(o.value).then(a,p);h((s=s.apply(e,t)).next())});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();var m;customElements.define("artist-cover",(m=class extends HTMLElement{connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.innerHTML=`
      <a href="${this.getAttribute("href")}">
        <img src="${this.getAttribute("cover")}" />
        <div class="artist-list-item-title">${this.getAttribute("title")}</div>
      </a>
     `}},l(m,"observedAttributes",["cover","title","href"]),m));customElements.define("search-bar",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <div id="search-wrapper">
        <!-- ajouter la classe "active" à #search-input pour l'afficher-->
        <input id="search-input" type="search" spellcheck="false" autocapitalize="false" autofocus />

        <button id="search-trigger" class="icon-button" type="button">
          <span class="material-icons">search</span>
        </button>
      </div>
     `;const e=this.querySelector("#search-input");this.querySelector("#search-trigger").addEventListener("click",()=>{e.classList.toggle("active")}),e.addEventListener("change",()=>{window.location.hash=`#search/${e.value}`})}});const k=new CustomEvent("play_click"),A=new CustomEvent("favorite_click");var f;customElements.define("song-item",(f=class extends HTMLElement{connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.getAttribute("favorite")=="true"?"favorite":"favorite_border";this.innerHTML=`
      <div class="list-item-title">${this.getAttribute("title")}</div>
      <div class="list-item-actions">
        <button type="button" class="icon-button favorite-button ">
          <span class="material-icons">${e}</span>
        </button>
        <button type="button" class="icon-button play-button">
          <span class="material-icons">play_arrow</span>
        </button>
      </div>`,this.querySelector(".play-button").addEventListener("click",()=>{this.dispatchEvent(k)}),this.querySelector(".favorite-button").addEventListener("click",()=>{this.dispatchEvent(A)})}},l(f,"observedAttributes",["favorite","href","title"]),f));customElements.define("spot-footer",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <nav>
        <a href="#home" class="active">
          <span class="material-icons">home</span>
          <span>Home</span>
        </a>
        <a href="#player">
          <span class="material-icons">subscriptions</span>
          <span>Lecteur</span>
        </a>
        <a href="#artists">
          <span class="material-icons">library_music</span>
          <span>Musique</span>
        </a>
        <a href="#favorites">
          <span class="material-icons">favorite</span>
          <span>Favoris</span>
        </a>
      </nav>
    `,this.hashChange=this.hashChange.bind(this),window.addEventListener("hashchange",this.hashChange),this.hashChange()}hashChange(){var t,s;const e=window.location.hash.split("/")[0];(t=this.querySelector("nav a.active"))==null||t.classList.remove("active"),(s=this.querySelector(`nav a[href="${e}"]`))==null||s.classList.add("active")}});const C="https://webmob-ui-22-spotlified.herokuapp.com",g=e=>fetch(`${C}${e}`).then(t=>t.json()),H=()=>g("/api/artists"),I=e=>g(`/api/artists/${e}/songs`),w=e=>g(`/api/songs/search/${e}`);customElements.define("page-artists",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <h4>Artistes</h4>

      <artist-list>
      </artist-list>
    `;const e=this.querySelector("artist-list");H().then(t=>{t.forEach(s=>{e.innerHTML+=`<artist-cover href="#artists/${s.id}" title="${s.name}" cover="${s.image_url}" />`})})}});customElements.define("page-home",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <h1 class="hero">Bienvenue</h1>
      <h4>Playlists</h4>
    `}});const r=document.querySelector("#audio-player");let u=[],c=null;const v=(e,t)=>{c=e,t&&(u=t),r.src=e.audio_url,r.play()},$=()=>{let e=u.indexOf(c)+1;e==u.length&&(e=0),v(u[e])},_=()=>{let e=u.indexOf(c)-1;e==-1&&(e=u.length-1),v(u[e])};function E(e){e=parseInt(e,10);let t=Math.floor(e/3600),s=Math.floor((e-t*3600)/60),n=e-t*3600-s*60;return s<10&&(s="0"+s),n<10&&(n="0"+n),s+":"+n}customElements.define("page-player",class extends HTMLElement{constructor(){super(...arguments);l(this,"playerThumbnail");l(this,"playerSongTitle");l(this,"playerArtistName");l(this,"playerPrev");l(this,"playerNext");l(this,"playerPlay");l(this,"playerPlayIcon");l(this,"playerTimeCurrent");l(this,"playerTimeDuration");l(this,"playerProgress")}connectedCallback(){this.innerHTML=`
      <div id="player">
        <div id="player-thumbnail">
          <!-- utiliser l'id de cet élément pour changer la cover de la chanson -->
          <img src="http://placecats.com/200/300" id="player-thumbnail-image" />
        </div>

        <div id="player-infos">
          <div id="player-infos-song">
            <span class="material-icons">music_note</span>
            <!-- utiliser l'id de cet élément pour changer le titre de la chanson -->
            <span id="player-infos-song-title">
              -
            </span>
          </div>

          <div id="player-infos-artist">
            <span class="material-icons">person</span>
            <!-- utiliser l'id de cet élément pour changer le nom de l'artiste -->
            <span id="player-infos-artist-name">
              -
            </span>
          </div>
        </div>

        <div id="player-controls">
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur précédent -->
          <button type="button" class="player-control player-control-small" id="player-control-previous">
            <span class="material-icons">skip_previous</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur play/pause -->
          <button type="button" class="player-control" id="player-control-play">
            <span class="material-icons">play_arrow</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur suivant -->
          <button type="button" class="player-control player-control-small" id="player-control-next">
            <span class="material-icons">skip_next</span>
          </button>
        </div>

        <div id="player-progress">
          <input type="range" id="player-progress-bar" />
          <div id="player-times">
            <!-- utiliser l'id de cet élément pour changer le temps écoulé -->
            <span id="player-time-current">--:--</span>
            <!-- utiliser l'id de cet élément pour changer la durée totale -->
            <span id="player-time-duration">--:--</span>
          </div>
        </div>
      </div>
      `,this.playerThumbnail=this.querySelector("#player-thumbnail-image"),this.playerSongTitle=this.querySelector("#player-infos-song-title"),this.playerArtistName=this.querySelector("#player-infos-artist-name"),this.playerPrev=this.querySelector("#player-control-previous"),this.playerNext=this.querySelector("#player-control-next"),this.playerPlay=this.querySelector("#player-control-play"),this.playerPlayIcon=this.playerPlay.querySelector(".material-icons"),this.playerTimeCurrent=this.querySelector("#player-time-current"),this.playerTimeDuration=this.querySelector("#player-time-duration"),this.playerProgress=this.querySelector("#player-progress-bar"),this.bindEvents()}bindEvents(){this.updatePlayerInfos=this.updatePlayerInfos.bind(this),this.updatePlayButton=this.updatePlayButton.bind(this),r.addEventListener("loadeddata",this.updatePlayerInfos),this.updatePlayerInfos(),this.updatePlayButton(),this.playerPlay.addEventListener("click",()=>{r.paused?r.play():r.pause()}),this.playerPrev.addEventListener("click",_),this.playerNext.addEventListener("click",$),this.playerProgress.addEventListener("change",t=>{r.currentTime=t.currentTarget.value}),r.addEventListener("timeupdate",()=>{this.playerProgress.value=r.currentTime,this.playerTimeCurrent.innerText=E(r.currentTime)}),r.addEventListener("play",this.updatePlayButton),r.addEventListener("pause",this.updatePlayButton)}updatePlayerInfos(){c&&(this.playerSongTitle.innerText=c.title,this.playerArtistName.innerText=c.artist.name,this.playerThumbnail.src=c.artist.image_url,this.playerProgress.max=r.duration,this.playerTimeDuration.innerText=E(r.duration))}updatePlayButton(){r.paused?this.playerPlayIcon.innerText="play_arrow":this.playerPlayIcon.innerText="pause"}});const b="favorites",P=(e,t)=>localStorage.setItem(e,JSON.stringify(t)),N=e=>localStorage.getItem(e)&&JSON.parse(localStorage.getItem(e)),d=()=>{var e;return(e=N(b))!=null?e:[]},S=e=>!!d().find(t=>t.id==e.id),O=e=>{const t=d();t.push(e),P(b,t)},B=e=>{const t=d(),s=t.findIndex(n=>n.id==e.id);t.splice(s,1),P(b,t)};class T extends HTMLElement{constructor(){super(...arguments);l(this,"songs",null)}getSongsData(){}getTitle(){}connectedCallback(){this.getSongsData().then(s=>{this.songs=s,this.innerHTML=`
          <h4>
          </h4>

          <div class="list">
          </div>
        `,this.querySelector("h4").innerText=this.getTitle();const n=this.querySelector(".list");s.length==0&&(n.innerText="Aucun résultat"),s.forEach(i=>{const a=document.createElement("song-item");a.setAttribute("title",i.title),a.setAttribute("favorite",S(i)),a.addEventListener("play_click",()=>v(i,s)),a.addEventListener("favorite_click",()=>{S(i)?(B(i),a.setAttribute("favorite",!1)):(O(i),a.setAttribute("favorite",!0))}),n.append(a)})})}}customElements.define("page-artist-songs",class extends T{getSongsData(){const e=this.getAttribute("artist-id");return I(e)}getTitle(){return`Artistes > ${this.songs[0].artist.name}`}});customElements.define("page-search-songs",class extends T{getSongsData(){const e=this.getAttribute("query");return w(e)}getTitle(){return`Résultats pour : ${this.getAttribute("query")}`}});customElements.define("page-favorites",class extends T{getSongsData(){return L(this,null,function*(){return d()})}getTitle(){return"Favoris"}});const x=()=>{const e=document.querySelector("main"),t=(window.location.hash||"#home").split("/");t[0]=="#home"?e.innerHTML="<page-home />":t[0]=="#player"?e.innerHTML="<page-player />":t[0]=="#search"&&t[1]?e.innerHTML=`<page-search-songs query="${t[1]}" />`:t[0]=="#artists"&&t[1]?e.innerHTML=`<page-artist-songs artist-id="${t[1]}" />`:t[0]=="#artists"&&!t[1]?e.innerHTML="<page-artists />":t[0]=="#favorites"&&(e.innerHTML="<page-favorites />")};window.addEventListener("hashchange",x);x();
