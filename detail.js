import { apiUrl, hostUrl, route } from './config';


const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const userId = localStorage.getItem("userId");

const navBar = document.querySelector('#navBar');
let viewInfo;
const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const viewId = location.href.split("=")[1];
const collectBtn = document.querySelector('#collectBtn');

let userCollects;
let collectId;

//1. 獲取景點資訊
//2. 判斷用戶是否登入
//   已登入：抓取用戶已收藏資料 > 比對 > btn 文字&navBar 
//   未登入：btn 文字 & navBar


async function getViewInfo() {
  try {
    const response = await axios.get(apiUrl + "/views/" + viewId);
    const apiData = response.data;
    placeName.textContent = apiData.name;
    placeDetail.textContent = apiData.description;
    viewInfo = apiData;

    // 取得用戶收藏
    await getUserCollection();
    // 檢查是否登入並比對
    checkLogIn();

  } catch (error) {
    console.error("獲取景點資訊時出錯了：", error);
  }
}

// 取得用戶收藏
async function getUserCollection() {
  try {
    const response = await axios.get(apiUrl + "/collections?userId=" + userId);
    userCollects = response.data;
    console.log("用户收藏：");
    console.log(userCollects);
  } catch (error) {
    console.error("獲取用戶收藏時出錯了：", error);
  }
}

function checkLogIn() {
  if (!isLogIn) {
    navBar.innerHTML = `
      <a class="me-3" href="${route}/login.html">登入</a>
      <a class="me-3" href="${route}/register.html">註冊</a>
      `;
    collectBtn.addEventListener("click", function () {
      alert("請先登入!");
      window.location.href = `${hostUrl}${route}/login.html`;;
    });
    collectBtn.textContent = "尚未收藏";
  } else {
    if (isAdmin) {
      navBar.innerHTML = `
        <a class="me-3" href="${route}/backboard.html">後台</a>
        <a class="me-3" href="${route}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `;
    } else {
      navBar.innerHTML = `
        <a class="me-3" href="${route}/collections.html">我的收藏</a>
        <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `;
    }
    const logoutBtn = document.querySelector('#logoutBtn');
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      location.reload();
      window.location.href = `${hostUrl}${route}/index.html`;;
    });

    //.find()會找到符合資料的物件並回傳整個物件
    const isCollected = userCollects.find(collection => collection.viewId === viewId);
    
    if (isCollected) {
      collectId = isCollected.id;
      collectBtn.textContent = "已收藏";
      console.log('已收藏，id=' + collectId);
    } else {
      collectBtn.textContent = "尚未收藏";
    }

    
    collectBtn.addEventListener("click", async function () {
      if (collectBtn.textContent === "尚未收藏") {
        collectBtn.textContent = "已收藏";
        try {
          const response = await axios.post(apiUrl + "/collections", {
            userId: userId,
            viewId: viewId,
          });
          console.log(response.status);
          
        } catch (error) {
          console.error("收藏景點時出錯了：", error);
        }
      } else {
        collectBtn.textContent = "尚未收藏";
        try {
          axios.delete(`${apiUrl}/collections/${collectId}`)
          .then(function(res){
            console.log("response 回傳");
            console.log(res.data);
        })
        } catch (error) {
          console.error("取消收藏景點時出錯了：", error);
        }
      }
    });
  }
}

getViewInfo();
