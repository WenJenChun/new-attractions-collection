import { apiUrl, hostUrl, route } from './config';


const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const userId = localStorage.getItem("userId");

const navBar = document.querySelector('#navBar');

const collections = document.querySelector('#collections');

//獲取 api 資料並顯示在網頁上
function init(){
  axios.get(apiUrl+"/collections?userId="+userId+"&_expand=view")
  .then(function(response){
    console.log(response.data);
    const apiDatas = response.data;
    let str = "";
    apiDatas.forEach(function(item){
      str += `
          <div class="col-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${item.view.name}</h5>
                <p class="card-text">${item.view.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${item.view.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`;
    });

    collections.innerHTML = str;
  });
};

init();

function checkLogIn(){
  if(!isLogIn){
    
    navBar.innerHTML =
      ` 
      <a class="me-3" href="${route}/login.html">登入</a>
      <a class="me-3" href="${route}/register.html">註冊</a>
      `;
  } else {
    if(isAdmin){
      navBar.innerHTML =
      ` 
      <a class="me-3" href="${route}/backboard.html">後台</a>
      <a class="me-3" href="${route}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `;
    } else {
      navBar.innerHTML =
      ` 
      <a class="me-3" href="${route}/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `;
    }
    const logoutBtn = document.querySelector('#logoutBtn');

    logoutBtn.addEventListener("click", function(){
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      location.reload();
      window.location.href = `${hostUrl}${route}/index.html`;
    });
  }
}

checkLogIn();