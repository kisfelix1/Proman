import { boardsManager } from "./controller/boardsManager.js";
import {apiPost, dataHandler} from "./data/dataHandler.js";

async function init() {
  await boardsManager.loadBoards();
  let createBoardButton = document.querySelector('#create-board');
  createBoardButton.addEventListener('click', dataHandler.createNewBoard)
}

function session_check() {
  if (localStorage.getItem("username")) {
    document.getElementById("loggedInAsText").style.display = "block"
    document.getElementById("loggedInAs").style.display = "block"
    document.getElementById("loggedInAs").innerHTML = localStorage.getItem("username")
    document.getElementById("openLoginModal").style.display = "none"
    document.getElementById("openRegisterModal").style.display = "none"
    document.getElementById("logOut").style.display = "block";
  } else {
    document.getElementById("loggedInAsText").style.display = "none"
    document.getElementById("loggedInAs").style.display = "none"
    document.getElementById("openLoginModal").style.display = "block"
    document.getElementById("openRegisterModal").style.display = "block"
    document.getElementById("logOut").style.display = "none";
  }
}

document.getElementById("loginSubmit").addEventListener("click", login)
document.getElementById("registerSubmit").addEventListener("click", register)
document.getElementById("logOut").addEventListener("click", logout)

async function login() {
  let username = document.getElementById("uNameLogin").value;
  let password = document.getElementById("uPasswordLogin").value;
  let loginQueryCheck = await apiPost("/api/login", {"username":username, "password":password});
  document.getElementById("alertInvalidInput").style.display = "block";
  if (username === loginQueryCheck['user_name'] && password === loginQueryCheck['password']) {
    document.getElementById("closeButtonModal").click()
    document.getElementById("alertInvalidInput").style.display = "none";
    localStorage.setItem("id", loginQueryCheck['id'])
    localStorage.setItem("username", username)
    session_check()
  }
}

function logout() {
  localStorage.removeItem("id")
  localStorage.removeItem("username")
  session_check()
}

async function register() {
  let username = document.getElementById("uNameRegister").value;
  let password = document.getElementById("uPasswordRegister").value;
  await apiPost("/api/register", {"username":username, "password":password});
}

init();
session_check();