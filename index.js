const BASEURL = 'http://advanced-webapps-class.github.io/classroom/2021/test1/';
const PARAM_RECENT = 'recent.json';
const PARAM_HOT = 'view.json';
const PARAM_POPULAR = 'popular.json';
const $tabs = document.querySelector('.nav-tabs').children;
const $list = document.getElementById('list');
const $loadingIcon = document
  .getElementById('list')
  .querySelector('.text-center');
const $showMoreBtn = document.querySelector('.btn');
const listgroup = document.createElement('div');
listgroup.className = 'list-group-item';
listgroup.classList.add('list-group-item-action');
$list.prepend(listgroup);
const $listGroup = $list.querySelector('.list-group-item');
const tabs = [
  { node: $tabs[0], url: `${BASEURL}${PARAM_RECENT}` },
  { node: $tabs[1], url: `${BASEURL}${PARAM_HOT}` },
  { node: $tabs[2], url: `${BASEURL}${PARAM_POPULAR}` },
];

const listItemNumberPerLoad = 10;
let selectedTab;
let maxListItemNumber = 0;

function hideContents() {
  maxListItemNumber = listItemNumberPerLoad;

  for (let i = $listGroup.children.length - 1; i >= 0; i -= 1) {
    $listGroup.removeChild($listGroup.children[i]);
  }
  $listGroup.style.display = 'none';
}

function showListItems(json) {
  $listGroup.style.display = 'block';

  for (
    let i = $listGroup.children.length;
    i < json.length && i < maxListItemNumber;
    i += 1
  ) {
    const listItem = document.createElement('a');
    listItem.href = `${json[i].url}`;
    listItem.className = 'list-group-item';
    listItem.classList.add('list-group-item-action');

    const img = document.createElement('img');
    img.src = `${json[i].img}`;
    img.className = 'img';
    img.classList.add('img-thumbnail');

    const title = document.createElement('p');
    title.className = 'mb-1';
    title.innerText = `${json[i].title}`;

    const cp = document.createElement('small');
    cp.innerText = `${json[i].cp}`;

    listItem.appendChild(img);
    listItem.appendChild(title);
    listItem.appendChild(cp);
    $listGroup.appendChild(listItem);
  }
}

function showFetchedData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      showListItems(json);
    });
}

function showLoading() {
  $loadingIcon.style.display = 'block';
}

function hideLoading() {
  $loadingIcon.style.display = 'none';
}

function activateSelectedTab(tab) {
  if (selectedTab !== undefined) {
    selectedTab.node.className = '';
  }
  selectedTab = tab;
  selectedTab.node.className = 'active';
}

function onClickTab(tab) {
  hideContents();
  activateSelectedTab(tab);
  showLoading();
  setTimeout(() => {
    hideLoading();
    showFetchedData(tab.url);
  }, 1000);
}

function onClickShowMore() {
  showLoading();
  setTimeout(() => {
    hideLoading();
    maxListItemNumber += listItemNumberPerLoad;
    showFetchedData(selectedTab.url);
  }, 1000);
}

tabs.forEach((tab) => {
  tab.node.addEventListener('click', () => {
    onClickTab(tab);
  });
});
$showMoreBtn.addEventListener('click', onClickShowMore);
onClickTab(tabs[0]);
