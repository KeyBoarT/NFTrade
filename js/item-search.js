// EŞYA ARAMA

const inputSearchItem = document.querySelector('[item-search]');
const items = document.querySelectorAll('[data-discover-card]');
const sortByNameBtn = document.querySelector('[sort-by-name]');

inputSearchItem.addEventListener('input', search);
sortByNameBtn.addEventListener('click', sortByName);

function search() {
    items.forEach(element => {
        let name = element.querySelector('h3').querySelector('a').innerHTML.toLowerCase();
        let search = inputSearchItem.value.toLowerCase();
        if (!name.includes(search)) {
            element.hidden =  true;
        }
        else {
            element.hidden = false;
        }
    });
}

function sortByName() {
// sort by name
items.sort((a, b) => {
  const nameA = a.querySelector('h3').querySelector('a').innerHTML.toLowerCase(); // ignore upper and lowercase
  const nameB = b.querySelector('h3').querySelector('a').innerHTML.toLowerCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
}