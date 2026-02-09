import "./style.css";
import loadHome from "./home.js";
import loadMenu from "./menu.js";
import loadContact from "./contact.js";

const tabs = { home: loadHome, menu: loadMenu, contact: loadContact };

function clearContent() {
  const content = document.getElementById("content");
  content.innerHTML = "";
}

function setActiveButton(activeTab) {
  const buttons = document.querySelectorAll("nav button");
  buttons.forEach((btn) => {
    if (btn.dataset.tab === activeTab) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function switchTab(tabName) {
  clearContent();
  setActiveButton(tabName);
  tabs[tabName]();
}

document.querySelectorAll("nav button").forEach((button) => {
  button.addEventListener("click", () => {
    switchTab(button.dataset.tab);
  });
});

// Load home tab by default
switchTab("home");
