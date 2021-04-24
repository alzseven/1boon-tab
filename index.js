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

function setList() {
  $list.innerHTML = `<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
    </div>
    <p class="mb-1">Some placeholder content in a paragraph.</p>
    <small>And some small print.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
    </div>
    <p class="mb-1">Some placeholder content in a paragraph.</p>
    <small class="text-muted">And some muted small print.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
    </div>
    <p class="mb-1">Some placeholder content in a paragraph.</p>
    <small class="text-muted">And some muted small print.</small>
  </a>
  </div>`;
}

setList();
