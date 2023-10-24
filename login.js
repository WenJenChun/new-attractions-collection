import { apiUrl, hostUrl, route } from './config';

const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const navBar = document.querySelector('#navBar');

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const loginBtn = document.querySelector("#loginBtn");

let token;
let role;
let userId;

// admin
// "email": "admin@mail.com",
// "password": "1234",
// "name": "admin",
// "role": "admin"

function logIn(){
    axios.post(apiUrl+"/login",{
        "email": userEmail.value,
        "password": userPassword.value,
    }).then(function(res){
        console.log("response 回傳");
        console.log(res.data);
        token = res.data.accessToken;
        role = res.data.user.role;
        userId = res.data.user.id;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
    }).catch(function(error){
        console.log("錯誤訊息");
        console.log(error.response)
    });
};


loginBtn.addEventListener("click", function(e){
    logIn();
    alert("歡迎回來！");
    window.location.href = `${hostUrl}${route}/index.html`;;

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
    //   const logoutBtn = document.querySelector('#logoutBtn');
  
    //   logoutBtn.addEventListener("click", function(){
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("role");
    //     localStorage.removeItem("userId");
    //     location.reload();
    //     window.location.href = "https://wenjenchun.github.io/attractions-collection/index.html";
    //   });
    }
  }
  
  checkLogIn();
