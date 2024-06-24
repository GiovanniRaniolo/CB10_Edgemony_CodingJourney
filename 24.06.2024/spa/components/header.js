function getHeaderHTML() {
  const menuHTML = getMenuHTML();

  return `
      <header>
          <div class="container">
              <div class="wrapper">
                  <div class="logo">Logo</div>
                  ${menuHTML}
              </div>
          </div>
      </header>
      `;
}

// creare una nuova function getMenu
// creare una nuova function getMenuItem

function getMenuHTML() {
  const menuItems = [
    { label: "About us" },
    { label: "Blog", href: "https://google.it" },
    { label: "Contacts" },
  ];

  //   let menuItemsHTML = '';
  //   for(let item of menuItems){
  //     menuItemsHTML += getMenuItemHTML(item);
  //   }

  return `
      <nav class="nav">
          <ul class="list">
              ${menuItems.map((item) => getMenuItemHTML(item)).join("")}
          </ul>
      </nav>
      `;
}

function getMenuItemHTML(options = {}) {
  // destructoring, serve a tirare fuori due variabili "label" e "href" da options
  // queste variabili hanno come valore rispettivamente:
  // const label = options.label
  // const href = options.href -> se href non è definito e sotto ho {href='#'} = options, allora href avrà come valore "#"
  const { label, href = "#" } = options;

  return `
      <li class="item">
          <a href="${href}">${label}</a>
      </li>
      `;
}

export { getHeaderHTML };

// const array = [1, 2, 3];

// const double = n => n * 2;

// function myMap(array, callbackFn){
//     const output = [];

//     for(let item of array){
//         output.push( callbackFn(item) );
//     }

//     return output;
// }

// myMap(array, double)
