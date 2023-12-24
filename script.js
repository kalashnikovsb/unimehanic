const container = document.querySelector('.table-container');
const inputElement = document.querySelector('.table-input');
let tableElement = null;
let userIdElement = null;
let idCellElement = null;
let titleCellElement = null;
let bodyCellElement =  null;

const SortTypes = {
  LOW_HIGH: 'LOW_HIGH',
  HIGH_LOW: 'HIGH_LOW',
};

let sortingSettings = {
  sortByUserId: null,
  sortById: null,
  sortByTitle: null,
  sortByBody: null,
};

let allPosts = null;
let currentPosts = null;
let currentInput = '';


// Функция, которая делает запрос
const posts = fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    else {
      throw Error(response.status);
    }
  })
  .then((data) => {
    allPosts = data.slice();
    renderTable(allPosts);
    
  })
  .catch((message) => {
    console.log(`Ошибка загрузки данных. ${message}`);
  });


// Функция которая выводит на странице полученные данные в виде таблицы без использования сторонних библиотек. 
const renderTable = (posts) => {
  tableElement = document.createElement('table');
  tableElement.setAttribute('border', 1);
  tableElement.style = "background: #ccc; border: 1px solid black; width: 50%; padding: 0; border-collapse: collapse";
  container.appendChild(tableElement);

  renderHeader(tableElement);
  renderPosts(posts, tableElement);
  currentPosts = allPosts.slice();
};


const getFilteredPosts = (post) => {
  if (!currentInput) {
    return true;
  }
  if (post.title.includes(currentInput) || post.body.includes(currentInput)) {
    return true;
  }
  return false;
};


const renderPosts = (posts, container) => {
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const userIdCell = document.createElement('td');
    const idCell = document.createElement('td');
    const titleCell = document.createElement('td')
    const bodyCell = document.createElement('td')

    userIdCell.innerText = post.userId;
    idCell.innerText = post.id;
    titleCell.innerText = post.title;
    bodyCell.innerText = post.body;

    userIdCell.style = "width: 5%";
    idCell.style = "width: 5%";
    titleCell.style = "width: 30%";
    bodyCell.style = "width: 60%";

    const tableRow = document.createElement('tr');
    tableRow.appendChild(userIdCell);
    tableRow.appendChild(idCell);
    tableRow.appendChild(titleCell);
    tableRow.appendChild(bodyCell);
    fragment.appendChild(tableRow);
  });
  container.appendChild(fragment);
};


const deletePosts = () => {
  const posts = Array.from(tableElement.children).slice(1);
  posts.forEach((post) => post.remove());
};


const renderHeader = (container) => {
  const headerRow = document.createElement('tr');
  headerRow.style = 'color: blue; cursor: pointer';

  const userIdCell = document.createElement('th');
  const idCell = document.createElement('th')
  const titleCell = document.createElement('th')
  const bodyCell = document.createElement('th')

  userIdCell.style = "width: 5%";
  idCell.style = "width: 5%";
  titleCell.style = "width: 30%";
  bodyCell.style = "width: 60%";

  userIdCell.innerText = 'userId';
  idCell.innerText = 'id';
  titleCell.innerText = 'title';
  bodyCell.innerText = 'body';

  userIdElement = userIdCell;
  idCellElement = idCell;
  titleCellElement = titleCell;
  bodyCellElement =  bodyCell;

  headerRow.appendChild(userIdCell);
  headerRow.appendChild(idCell);
  headerRow.appendChild(titleCell);
  headerRow.appendChild(bodyCell);
  container.appendChild(headerRow);

  userIdElement.addEventListener('click', () => {
    currentPosts = sortByUserId();
    reRenderPosts();
  });

  idCellElement.addEventListener('click', () => {
    currentPosts = sortById();
    reRenderPosts();
  });

  titleCellElement.addEventListener('click', () => {
    currentPosts = sortByTitle();
    reRenderPosts();
  });

  bodyCellElement.addEventListener('click', () => {
    currentPosts = sortByBody();
    reRenderPosts();
  });
};


inputElement.addEventListener('input', (evt) => {
  currentInput = evt.target.value;
  reRenderPosts()
});

inputElement.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 8 && evt.target.value.length === 1) {
    currentPosts = allPosts.slice();
    reRenderPosts();
  }
});


const reRenderPosts = () => {
  if (!tableElement) {
    return;
  }
  deletePosts();
  if (currentInput.length <= 3) {
    renderPosts(currentPosts, tableElement);
  } else {
    currentPosts = currentPosts.filter(getFilteredPosts)
    renderPosts(currentPosts, tableElement);
  }
};


const sortByUserId = () => {
  sortingSettings.sortById = null;
  sortingSettings.sortByTitle = null;
  sortingSettings.sortByBody = null;

  switch(sortingSettings.sortByUserId) {
    case null:
      sortingSettings.sortByUserId = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => b.userId - a.userId).slice();
    case SortTypes.HIGH_LOW:
      sortingSettings.sortByUserId = SortTypes.LOW_HIGH;
      return currentPosts.sort((a, b) => a.userId - b.userId).slice();
    case SortTypes.LOW_HIGH:
      sortingSettings.sortByUserId = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => b.userId - a.userId).slice();
  }
};


const sortById = () => {
  sortingSettings.sortByUserId = null;
  sortingSettings.sortByTitle = null;
  sortingSettings.sortByBody = null;

  switch(sortingSettings.sortById) {
    case null:
      sortingSettings.sortById = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => b.id - a.id).slice();
    case SortTypes.HIGH_LOW:
      sortingSettings.sortById = SortTypes.LOW_HIGH;
      return currentPosts.sort((a, b) => a.id - b.id).slice();
    case SortTypes.LOW_HIGH:
      sortingSettings.sortById = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => b.id - a.id).slice();
  }
};


const sortByTitle = () => {
  sortingSettings.sortByUserId = null;
  sortingSettings.sortById = null;
  sortingSettings.sortByBody = null;

  switch(sortingSettings.sortByTitle) {
    case null:
      sortingSettings.sortByTitle = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => a.title.length - b.title.length).slice();
    case SortTypes.HIGH_LOW:
      sortingSettings.sortByTitle = SortTypes.LOW_HIGH;
      return currentPosts.sort((a, b) => b.title.length - a.title.length).slice();
    case SortTypes.LOW_HIGH:
      sortingSettings.sortByTitle = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => a.title.length - b.title.length).slice();
  }
};


const sortByBody = () => {
  sortingSettings.sortByUserId = null;
  sortingSettings.sortById = null;
  sortingSettings.sortByTitle = null;

  switch(sortingSettings.sortByBody) {
    case null:
      sortingSettings.sortByBody = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => a.body.length - b.body.length).slice();
    case SortTypes.HIGH_LOW:
      sortingSettings.sortByBody = SortTypes.LOW_HIGH;
      return currentPosts.sort((a, b) => b.body.length - a.body.length).slice();
    case SortTypes.LOW_HIGH:
      sortingSettings.sortByBody = SortTypes.HIGH_LOW;
      return currentPosts.sort((a, b) => a.body.length - b.body.length).slice();
  }
};
