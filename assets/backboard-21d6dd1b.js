import{a as l,r as e,h as s}from"./config-2b8a8b87.js";const d=localStorage.getItem("token")!==null,u=localStorage.getItem("role")==="admin";localStorage.getItem("userId");const n=document.querySelector("#navBar"),m=document.querySelector("#attractionList");function h(){axios.get(l+"/views").then(function(o){console.log(o.data);const r=o.data;let a="";r.forEach(function(t){a+=`
        <tr>
            <th scope="row">${t.id}</th>
            <td>${t.name}</td>
            <td>${t.description}</td>
            <td>
              <a href="${e}/edit.html?id=${t.id}" class="btn btn-sm btn-secondary text-white">編輯</a>
              <input data-attraction-id=${t.id} type="button" class="mt-1 deleteAttraction btn btn-sm btn-warning text-white" value="刪除">
            </td>
        </tr>`}),m.innerHTML=a,document.querySelectorAll(".deleteAttraction").forEach(function(t){t.addEventListener("click",function(){const i=t.getAttribute("data-attraction-id");axios.delete(`${l}/views/${i}`).then(function(c){alert("刪除成功！"),location.reload()}).catch(function(c){console.error("刪除失敗："+c)})})})})}h();function g(){d?(u?n.innerHTML=` 
      <a class="me-3" href="${e}/backboard.html">後台</a>
      <a class="me-3" href="${e}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `:n.innerHTML=` 
      <a class="me-3" href="${e}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href=`${s}${e}/index.html`})):n.innerHTML=` 
      <a class="me-3" href="${e}/login.html">登入</a>
      <a class="me-3" href="${e}/register.html">註冊</a>
      `}g();
