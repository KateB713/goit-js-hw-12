import{a as L,S as b,i as s}from"./assets/vendor-BgmC94F3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();const S="52975697-1a0d4c1008252be130962ab4a",P="https://pixabay.com/api/",R=15;async function h(r,o=1){try{return(await L.get(P,{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:R}})).data}catch(e){throw console.error("Error fetching data:",e),e}}const g=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector(".load-more-btn"),q=new b(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const o=r.map(e=>`
            <li class="gallery-item">
                <a a class= "gallery-link" href = "${e.largeImageURL}" >
                     <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" width="360" />
                </a>
                <div class="img-info">
                    <div class="img-info-box">
                        <h2 class="img-info-title">Likes</h2>
                        <p class="img-info-value">${e.likes}</p>
                    </div>
                    <div class="img-info-box">
                        <h2 class="img-info-title">Views</h2>
                        <p class="img-info-value">${e.views}</p>
                    </div>
                    <div class="img-info-box">
                        <h2 class="img-info-title">Comments</h2>
                        <p class="img-info-value">${e.comments}</p>
                    </div>
                    <div class="img-info-box">
                        <h2 class="img-info-title">Downloads</h2>
                        <p class="img-info-value">${e.downloads}</p>
                    </div>
                </div>
            </li>`).join("");g.insertAdjacentHTML("beforeend",o),q.refresh()}function x(){g.innerHTML=""}function v(){m.classList.remove("hidden")}function d(){m.classList.add("hidden")}function w(){p.classList.remove("hidden")}function n(){p.classList.add("hidden")}const f=document.querySelector(".form"),E=document.querySelector(".load-more-btn");let l="",a=1;n();f.addEventListener("submit",async r=>{r.preventDefault();const o=r.currentTarget.elements["search-text"].value.trim();if(!o){s.warning({title:"Ooops!",message:"Please enter a search query before searching!",position:"topRight"});return}o!==l&&(l=o,a=1,x()),v(),n();try{const e=await h(l,a);if(e.hits.length===0){s.info({title:"Ooops!",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d();return}y(e.hits),f.reset(),a<Math.ceil(e.totalHits/15)?w():(n(),s.info({title:"Ooops!",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{s.error({title:"Error!",message:"Something went wrong. Please try again!",position:"topRight"})}finally{d()}});E.addEventListener("click",async()=>{a+=1,v(),n();try{const r=await h(l,a);y(r.hits);const o=document.querySelector(".gallery-item");if(o){const{height:e}=o.getBoundingClientRect();window.scrollBy({top:e*4,behavior:"smooth"})}a<Math.ceil(r.totalHits/15)?w():(n(),s.info({title:"Ooops!",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{s.error({title:"Error!",message:"Something went wrong. Please try again!",position:"topRight"})}finally{d()}});
//# sourceMappingURL=index.js.map
