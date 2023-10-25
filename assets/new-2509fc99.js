import{h as n,r as e,a}from"./config-2b8a8b87.js";const l=localStorage.getItem("token")!==null,c=localStorage.getItem("role")==="admin",o=document.querySelector("#navBar"),r=document.querySelector("#placeName"),i=document.querySelector("#placeDetail");location.href.split("=")[1];const s=document.querySelector("#saveChanges"),u=document.querySelector("#cancelEditing"),m=localStorage.getItem("token");u.addEventListener("click",function(){window.location.href=`${n}${e}/backboard.html`});function d(){axios.post(`${a}/views`,{name:r.value,description:i.value},{headers:{authorization:`Bearer ${m}`}}).then(function(t){console.log(t.response),alert("新增成功"),window.location.href=`${n}${e}/backboard.html`}).catch(function(t){console.log("新增景點時出錯了："),console.log(t.response)})}s.addEventListener("click",function(){console.log("按了新增"),d()});function h(){l?(c?o.innerHTML=` 
      <a class="me-3" href="${e}/backboard.html">後台</a>
      <a class="me-3" href="${e}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `:o.innerHTML=` 
      <a class="me-3" href="${e}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href=`${n}${e}/index.html`})):o.innerHTML=` 
      <a class="me-3" href="${e}/login.html">登入</a>
      <a class="me-3" href="${e}/register.html">註冊</a>
      `}h();
