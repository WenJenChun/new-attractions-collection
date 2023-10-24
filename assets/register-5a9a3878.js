import{h as o,r as e,a}from"./config-2029f25f.js";const r=localStorage.getItem("token")!==null,s=localStorage.getItem("role")==="admin",n=document.querySelector("#navBar"),l=document.querySelector("#newName"),c=document.querySelector("#newEmail"),i=document.querySelector("#newPassword"),u=document.querySelector("#registerBtn");function m(){axios.post(a+"/register",{name:l.value,email:c.value,password:i.value,role:"general"}).then(function(t){console.log(t.data)}).catch(function(t){console.log(t.response)})}u.addEventListener("click",function(t){m(),alert("註冊成功!"),window.location.href=`${o}${e}/index.html`});function d(){r?s?n.innerHTML=` 
        <a class="me-3" href="${e}/backboard.html">後台</a>
        <a class="me-3" href="${e}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
        `:n.innerHTML=` 
        <a class="me-3" href="${e}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
        `:n.innerHTML=` 
        <a class="me-3" href="${e}/login.html">登入</a>
        <a class="me-3" href="${e}/register.html">註冊</a>
        `}d();
