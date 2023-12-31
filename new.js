import { apiUrl, hostUrl, route } from './config';

const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";

const navBar = document.querySelector('#navBar');

const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const id = location.href.split("=")[1];

const saveChangeBtn = document.querySelector('#saveChanges');
const cancelEditingBtn = document.querySelector('#cancelEditing');

const token = localStorage.getItem("token");

cancelEditingBtn.addEventListener("click", function(){
  window.location.href = `${hostUrl}${route}/backboard.html`;
});

function addAttraction(){
  axios.post(`${apiUrl}/views`,{
      "name": placeName.value,
      "description": placeDetail.value
  },{
    headers:{
        "authorization": `Bearer ${token}` // Bearer是加密用
    }
  }).then(function(res){
      console.log(res.response);
      alert("新增成功");
      window.location.href = `${hostUrl}${route}/backboard.html`;
  }).catch(function(error) {
      console.log("新增景點時出錯了：");
      console.log(error.response);
  });
  }

saveChangeBtn.addEventListener("click", function(){
  console.log("按了新增");
  addAttraction();
});

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