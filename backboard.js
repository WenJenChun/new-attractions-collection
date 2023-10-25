import { apiUrl, hostUrl, route } from './config';

const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const userId = localStorage.getItem("userId");
const navBar = document.querySelector('#navBar');


const attractionList = document.querySelector('#attractionList');

//獲取 api 資料並顯示在網頁上
function init(){
  axios.get(apiUrl+"/views")
  .then(function(response){
    console.log(response.data);
    const apiDatas = response.data;
    let str = "";
    apiDatas.forEach(function(item){
    str += `
        <tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>
              <a href="${route}/edit.html?id=${item.id}" class="btn btn-sm btn-secondary text-white">編輯</a>
              <input data-attraction-id=${item.id} type="button" class="mt-1 deleteAttraction btn btn-sm btn-warning text-white" value="刪除">
            </td>
        </tr>`;
    });
    attractionList.innerHTML = str;

    const deleteAttractionBtns = document.querySelectorAll('.deleteAttraction');

    deleteAttractionBtns.forEach(function(btn) {
      btn.addEventListener("click", function () {
        const attractionId = btn.getAttribute('data-attraction-id');
        
        axios.delete(`${apiUrl}/views/${attractionId}`)
          .then(function (res) {
            alert("刪除成功！");
            location.reload();
          })
          .catch(function (error) {
            console.error("刪除失敗：" + error);
          });
      });
    });
  });
};

//確認權限
function checkUser(){
  if(!isAdmin){
    alert("無權限");
    window.location.href = `${hostUrl}${route}/index.html`;
  } else {
    init();
  }
}

checkUser();


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
