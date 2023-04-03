//====================================================== Function TO Fill Post Data  of Table -------------------------------------

const getPostUser = async function (user, row) {
  let response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/?userId=${user.id}` // Performance wise Serch in only elemnt That hava user Id same to Current user
  );
  let posts = await response.json();
  let col = document.createElement("td");
  let list = document.createElement("ul");
  col.appendChild(list);
  for (post of posts) {
    // Add Post  To Html Element
    list.innerHTML += `<li>${post.title}</li>`;
  }
  row.appendChild(col);
};

//====================================================== Function TO Bulild Strcture of Table -------------------------------------
const BuiltTable = function (users) {
  let parentElement = document.getElementById("parent");
  for (user of users) {
    let childElement = document.createElement("tr");
    childElement.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.company.name}</td>
        <td> lat = ${user.address.geo.lat} & lng = ${user.address.geo.lng}  </td>
        
          `;
    getPostUser(user, childElement);
    parentElement.appendChild(childElement);
  }
};

// ---------------------------Finaly mehod That Call  BuiltTable TO Display The Data IIFE Pattern Mehod
const getUsers = (async function () {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await response.json();
    BuiltTable(users);
  } catch (error) {}
})();
