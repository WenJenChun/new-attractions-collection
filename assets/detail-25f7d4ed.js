import{a as c,r as o,h as d}from"./config-2b8a8b87.js";const m=localStorage.getItem("token")!==null,g=localStorage.getItem("role")==="admin",u=localStorage.getItem("userId"),s=document.querySelector("#navBar");let h;const f=document.querySelector("#placeName"),p=document.querySelector("#placeDetail"),r=location.href.split("=")[1],t=document.querySelector("#collectBtn");let i,a;async function I(){try{const l=(await axios.get(c+"/views/"+r)).data;f.textContent=l.name,p.textContent=l.description,h=l,await w(),y()}catch(n){console.error("獲取景點資訊時出錯了：",n)}}async function w(){try{i=(await axios.get(c+"/collections?userId="+u)).data,console.log("用户收藏："),console.log(i)}catch(n){console.error("獲取用戶收藏時出錯了：",n)}}function y(){if(!m)s.innerHTML=`
      <a class="me-3" href="${o}/login.html">登入</a>
      <a class="me-3" href="${o}/register.html">註冊</a>
      `,t.addEventListener("click",function(){alert("請先登入!"),window.location.href=`${d}${o}/login.html`}),t.textContent="尚未收藏";else{g?s.innerHTML=`
        <a class="me-3" href="${o}/backboard.html">後台</a>
        <a class="me-3" href="${o}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `:s.innerHTML=`
        <a class="me-3" href="${o}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href=`${d}${o}/index.html`});const l=i.find(e=>e.viewId===r);l?(a=l.id,t.textContent="已收藏",console.log("已收藏，id="+a)):t.textContent="尚未收藏",t.addEventListener("click",async function(){if(t.textContent==="尚未收藏"){t.textContent="已收藏";try{const e=await axios.post(c+"/collections",{userId:u,viewId:r});console.log(e.status)}catch(e){console.error("收藏景點時出錯了：",e)}}else{t.textContent="尚未收藏";try{axios.delete(`${c}/collections/${a}`).then(function(e){console.log("response 回傳"),console.log(e.data)})}catch(e){console.error("取消收藏景點時出錯了：",e)}}})}}I();
