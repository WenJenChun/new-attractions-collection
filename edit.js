import { apiUrl, hostUrl, route } from './config';


const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const userId = localStorage.getItem("userId");

const navBar = document.querySelector('#navBar');

const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const id = location.href.split("=")[1];

const saveChangeBtn = document.querySelector('#saveChanges');
const cancelEditingBtn = document.querySelector('#cancelEditing');

function getAttractionDetail() {
  axios.get(apiUrl+"/views/"+id)
  .then(function(response){

    console.log(response.data);
    const apiData = response.data;
    placeName.value = apiData.name;
    placeDetail.textContent = apiData.description;
    
  });
}

getAttractionDetail()

cancelEditingBtn.addEventListener("click", function(){
  window.location.href = `${hostUrl}${route}/backboard.html`;
});

function saveChanges() {
  axios.patch(`${apiUrl}/views/${id}`, {
    "name": placeName.value,
    "description": placeDetail.value
  }).then(function(res) {
    console.log(res.response);
    alert("修改成功");
    window.location.href = `${hostUrl}${route}/backboard.html`;
  }).catch(function(error) {
    console.log("修改景點時出錯了：");
    console.log(error.response);
  });
}

saveChangeBtn.addEventListener("click", function() {
  saveChanges();
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