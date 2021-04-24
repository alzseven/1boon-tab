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

const tabs = [
  { DOM: $tabs[0], PARAM: PARAM_RECENT },
  { DOM: $tabs[1], PARAM: PARAM_HOT },
  { DOM: $tabs[2], PARAM: PARAM_POPULAR },
];

let selectedTab = tabs[0];
let maxListItemNumber = 10;
let lastItemListNumber = 0;

function hideContents() {
  maxListItemNumber = 10;
  lastItemListNumber = 0;
  $list.childNodes.forEach((n) => {
    if (n !== $loadingIcon) {
      $list.removeChild(n);
    }
  });
}

function setList(json) {
  const node = document.createElement('div');
  node.className = 'list-group';

  for (
    let i = lastItemListNumber;
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
    node.appendChild(listItem);
    lastItemListNumber += 1;
  }
  $list.insertBefore(node, $loadingIcon);
  //$list.prepend(node);
}

function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setList(json);
    });
}

function showLoading() {
  $loadingIcon.style.display = '';
}

function hideLoading() {
  $loadingIcon.style.display = 'none';
}

function activateSelectedTab(tab) {
  selectedTab.DOM.className = '';
  selectedTab = tab;
  selectedTab.DOM.className = 'active';
}

for (let i = 0; i < tabs.length; i += 1) {
  tabs[i].DOM.addEventListener('click', () => {
    showLoading();
    hideContents();
    setTimeout(() => {
      hideLoading();
      getData(`${BASEURL}${tabs[i].PARAM}`);
      activateSelectedTab(tabs[i]);
    }, 1000);
  });
}

$showMoreBtn.addEventListener('click', () => {
  showLoading();
  setTimeout(() => {
    hideLoading();
    maxListItemNumber += 10;
    getData(`${BASEURL}${selectedTab.PARAM}`);
  }, 1000);
});

hideLoading();
