import{h as n,r as e,a as c}from"./config-2b8a8b87.js";const s=localStorage.getItem("token")!==null,u=localStorage.getItem("role")==="admin";localStorage.getItem("userId");const o=document.querySelector("#navBar"),l=document.querySelector("#placeName"),i=document.querySelector("#placeDetail"),r=location.href.split("=")[1],m=document.querySelector("#saveChanges"),d=document.querySelector("#cancelEditing");function h(){axios.get(c+"/views/"+r).then(function(t){console.log(t.data);const a=t.data;l.value=a.name,i.textContent=a.description})}h();d.addEventListener("click",function(){window.location.href=`${n}${e}/backboard.html`});function g(){axios.patch(`${c}/views/${r}`,{name:l.value,description:i.value},{}).then(function(t){console.log(t.response)}).catch(function(t){console.log(t.response)})}m.addEventListener("click",function(){g(),window.location.href=`${n}${e}/backboard.html`});function f(){s?(u?o.innerHTML=` 
      <a class="me-3" href="${e}/backboard.html">後台</a>
      <a class="me-3" href="${e}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `:o.innerHTML=` 
      <a class="me-3" href="${e}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href=`${n}${e}/index.html`})):o.innerHTML=` 
      <a class="me-3" href="${e}/login.html">登入</a>
      <a class="me-3" href="${e}/register.html">註冊</a>
      `}f();
