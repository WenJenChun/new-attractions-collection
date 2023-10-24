import{h as s,r as t,a as c}from"./config-2b8a8b87.js";const r=localStorage.getItem("token")!==null,i=localStorage.getItem("role")==="admin",o=document.querySelector("#navBar"),u=document.querySelector("#userEmail"),m=document.querySelector("#userPassword"),d=document.querySelector("#loginBtn");let n,l,a;function g(){axios.post(c+"/login",{email:u.value,password:m.value}).then(function(e){console.log("response 回傳"),console.log(e.data),n=e.data.accessToken,l=e.data.user.role,a=e.data.user.id,localStorage.setItem("token",n),localStorage.setItem("role",l),localStorage.setItem("userId",a)}).catch(function(e){console.log("錯誤訊息"),console.log(e.response)})}d.addEventListener("click",function(e){g(),alert("歡迎回來！"),window.location.href=`${s}${t}/index.html`});function h(){r?i?o.innerHTML=` 
        <a class="me-3" href="${t}/backboard.html">後台</a>
        <a class="me-3" href="${t}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
        `:o.innerHTML=` 
        <a class="me-3" href="${t}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
        `:o.innerHTML=` 
        <a class="me-3" href="${t}/login.html">登入</a>
        <a class="me-3" href="${t}/register.html">註冊</a>
        `}h();
