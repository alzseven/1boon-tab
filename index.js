const BASEURL = "http://advanced-webapps-class.github.io/classroom/2021/test1/";
const PARAM_RECENT = "recent.json";
const PARAM_HOT = "view.json";
const PARAM_POPULAR = "popular.json";
const $tabs = document.querySelector(".nav-tabs").children;
const $list = document.getElementById("list");
const $loadingIcon = document
  .getElementById("list")
  .querySelector(".text-center");
const $showMoreBtn = document.querySelector(".btn");

const tabs = [
  { DOM: $tabs[0], PARAM: PARAM_RECENT },
  { DOM: $tabs[1], PARAM: PARAM_HOT },
  { DOM: $tabs[2], PARAM: PARAM_POPULAR },
];

let selectedTab = tabs[0];

function setList(json) {
  let html = '<div class="list-group">';
  for (let i = 0; i < json.length; i += 1) {
    html += `<a href="${json[i]["url"]}" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <img src="${json[i]["img"]}" class="img img-thumbnail"></img>
            </div>
            <p class="mb-1">${json[i]["title"]}</p>
            <small>${json[i]["cp"]}</small>
          </a>`;
  }
  html += "</div>";
  $list.innerHTML = html;
}

function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setList(json);
    });
}

for (let i = 0; i < tabs.length; i += 1) {
  tabs[i].DOM.addEventListener("click", (event) => {
    getData(`${BASEURL}${tabs[i].PARAM}`);
    activateSelectedTab(tabs[i]);
  });
}

function activateSelectedTab(tab) {
  selectedTab.DOM.className = "";
  selectedTab = tab;
  selectedTab.DOM.className = "active";
}
