import { apiUrl, hostUrl, route } from './config';
console.log(apiUrl);
console.log(hostUrl);

const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";

const navBar = document.querySelector('#navBar');

const greeting = document.querySelector('#greeting');
const attraction = document.querySelector('#attraction');

let collectBtns;

//獲取 api 資料並顯示在網頁上
function init(){
  axios.get(apiUrl+"/views")
  .then(function(response){
    console.log(response.data);
    const apiDatas = response.data;
    let str = "";
    apiDatas.forEach(function(item){
      str += `
          <div class="col-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${item.name}</h5>
                <p class="card-text">${item.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${item.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`;
    });

    attraction.innerHTML = str;
   
    
  });
};

init();

function checkLogIn(){
  if(!isLogIn){
    console.log('還沒登入');
    navBar.innerHTML =
      ` 
      <a class="me-3" href="${route}/login.html">登入</a>
      <a class="me-3" href="${route}/register.html">註冊</a>
      `;
  } else {
    console.log('已登入');
    
    greeting.textContent = "把喜歡的景點都收藏起來！";
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