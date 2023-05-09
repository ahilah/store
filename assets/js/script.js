'use strict';



/**
 *            CHAPTERS DATA FROM JSON
 */

const productsContainer = document.getElementById('chapters_section');

// Завантажуємо JSON-файл зі списком частин
fetch('chapters.json')
  .then(response => response.json())
  .then(products => {
    // Для кожної частини в JSON-файлі створюємо HTML-блок
    products.forEach(product => {
      const productElement = document.createElement('li');
      productElement.innerHTML = `
        <div class="chapter-card">
        <p class="card-subtitle">${product.number}</p>
        <h3 class="h3 card-title">${product.title}</h3>
        <p class="card-text">${product.text}</p>
        </div>
      `;

      // Додаємо HTML-блок до контейнера
      productsContainer.appendChild(productElement);
    });
  })
  .catch(error => console.error(error));






/**
 *            BOOKS DATA FROM JSON
 */

const booksContainer = document.getElementById('books_section');

// Завантажуємо JSON-файл зі списком книжок
fetch('books.json')
  .then(response => response.json())
  .then(books => {
    // Для кожної книжки в JSON-файлі створюємо HTML-блок
    books.forEach(book => {
      const bookElement = document.createElement('li');
      bookElement.innerHTML = `
      <div class="books-card has-before has-after">
      <div class="card-icon">
      <img src=${book.imageSrc} width="40" height="40" loading="lazy" alt=${book.imgCaption}>
      </div>
      <h3 class="h3 card-title">${book.title}</h3>
      <p class="card-text">${book.description}</p>
      <a href=${book.goodreadsUrl} target="_blank" class="btn-link">
      <span class="span">
                    Read more
      </span>
      <ion-icon name="chevron-forward-outline" aria-hidden="true">
      </ion-icon>
      </a>
      </div>
      `;

      // Додаємо HTML-блок до контейнера
      booksContainer.appendChild(bookElement);
    });
  })
  .catch(error => console.error(error));







/**
 * adding event on element
 */

const addEventOnelem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnelem(navToggler, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnelem(navbarLinks, "click", closeNavbar);

const header = document.querySelector("[data-header]");
const activeHeader = function() {
    if (window.scrollY > 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}
addEventOnelem(window, "scroll", activeHeader);



/**
 * open chapter prereading tab
 */

const tabCard = document.querySelectorAll("[data-tab-card]");
let lastTabCard = tabCard[0];
const navigateTab = function() {
  lastTabCard.classList.remove("active");
  this.classList.add("active");
  lastTabCard = this;
}

addEventOnelem(tabCard, "click", navigateTab);
