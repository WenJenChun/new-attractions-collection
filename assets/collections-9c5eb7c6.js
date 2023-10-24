import{a as c,r as t,h as s}from"./config-2b8a8b87.js";const i=localStorage.getItem("token")!==null,r=localStorage.getItem("role")==="admin",d=localStorage.getItem("userId"),a=document.querySelector("#navBar"),m=document.querySelector("#collections");function u(){axios.get(c+"/collections?userId="+d+"&_expand=view").then(function(e){console.log(e.data);const l=e.data;let n="";l.forEach(function(o){n+=`
          <div class="col-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${o.view.name}</h5>
                <p class="card-text">${o.view.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${o.view.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`}),m.innerHTML=n})}u();function h(){i?(r?a.innerHTML=` 
      <a class="me-3" href="${t}/backboard.html">後台</a>
      <a class="me-3" href="${t}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `:a.innerHTML=` 
      <a class="me-3" href="${t}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href=`${s}${t}/index.html`})):a.innerHTML=` 
      <a class="me-3" href="${t}/login.html">登入</a>
      <a class="me-3" href="${t}/register.html">註冊</a>
      `}h();
