import{a as l,h as c,r as t}from"./config-2029f25f.js";console.log(l);console.log(c);const r=localStorage.getItem("token")!==null,i=localStorage.getItem("role")==="admin",n=document.querySelector("#navBar"),d=document.querySelector("#greeting"),m=document.querySelector("#attraction");function u(){axios.get(l+"/views").then(function(e){console.log(e.data);const s=e.data;let a="";s.forEach(function(o){a+=`
          <div class="col-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${o.name}</h5>
                <p class="card-text">${o.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${o.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`}),m.innerHTML=a})}u();function g(){r?(console.log("已登入"),d.textContent="把喜歡的景點都收藏起來！",i?n.innerHTML=` 
      <a class="me-3" href="${t}/backboard.html">後台</a>
      <a class="me-3" href="${t}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `:n.innerHTML=` 
      <a class="me-3" href="${t}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href=`${c}${t}/index.html`})):(console.log("還沒登入"),n.innerHTML=` 
      <a class="me-3" href="${t}/login.html">登入</a>
      <a class="me-3" href="${t}/register.html">註冊</a>
      `)}g();
