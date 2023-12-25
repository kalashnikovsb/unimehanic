const container = document.querySelector('.table-container');
const inputElement = document.querySelector('.table-input');
let tableElement = null;


const requestAndRender = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
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
        tableElement = document.createElement('table');
        tableElement.setAttribute('border', 1);
        tableElement.style = "background: #ccc; border: 1px solid black; width: 50%; padding: 0; border-collapse: collapse";
        container.appendChild(tableElement);

        renderHeader(tableElement);
        renderPosts(allPosts, tableElement);
        
    })
    .catch((message) => {
        console.log(`Ошибка загрузки данных. ${message}`);
    });
  };


  requestAndRender();


  // Вспомогаательные функции:

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
  };