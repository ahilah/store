'use strict';



/**
 *            CHAPTERS DATA FROM JSON
 */

const chaptersContainer = document.getElementById('chapters_section');

// Завантажуємо JSON-файл зі списком частин
fetch('chapters.json')
  .then(response => response.json())
  .then(chapters => {
    // Для кожної частини в JSON-файлі створюємо HTML-блок
    chapters.forEach(chapter => {
      const chapterElement = document.createElement('li');
      chapterElement.innerHTML = `
        <div class="chapter-card">
        <p class="card-subtitle">${chapter.number}</p>
        <h3 class="h3 card-title">${chapter.title}</h3>
        <p class="card-text">${chapter.text}</p>
        </div>
      `;

      // Додаємо HTML-блок до контейнера
      chaptersContainer.appendChild(chapterElement);
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
 *            ACHIEVEMENTS DATA FROM JSON
 */


  const achievementsContainer = document.getElementById('achievements_section');

  // Завантажуємо JSON-файл зі списком частин
  fetch('achievements.json')
    .then(response => response.json())
    .then(achievements => {
      // Для кожної частини в JSON-файлі створюємо HTML-блок
      achievements.forEach(achievement => {
        const achievementsElement = document.createElement('li');
        achievementsElement.innerHTML = `
        <div class="achievement-card">
        <figure class="card-banner img-holder" style="--width: 450; --height: 300;">
        <img src=${achievement.imageSrc} width="450" height="300" loading="lazy" alt=${achievement.imgCaption}
                      class="img-cover">
        </figure>
        <div class="card-content">
        <img src=".\\assets\\images\\award.svg" width="80" height="80" loading="lazy" alt="trophy"
                      class="abs-img">
        <h3 class="h3 card-title">${achievement.title}</h3>
        <p class="card-text">${achievement.description}</p>
        </div>
        </div>
        `;
  
        // Додаємо HTML-блок до контейнера
        achievementsContainer.appendChild(achievementsElement);
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




/**
 *        BUTTON SEND FEEDBACK DISAPPEAR
 */

const hideEmailBtn = document.getElementById('send-feedback');

hideEmailBtn.addEventListener('click', function() {
  hideEmailBtn.style.display = 'none';
});






// Select the form and add an event listener to it
var form = document.getElementById('contact-form');
form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault(); // Prevent the form from being submitted

  // Get the values from the form fields
  var formData = {
    'name': document.querySelector('input[name="name"]').value,
    'email': document.querySelector('input[name="email_address"]').value,
    'subject': document.querySelector('input[name="subject"]').value,
    'message': document.querySelector('textarea[name="message"]').value
  };

  // Convert the form data to JSON format
  var jsonData = JSON.stringify(formData);

  // Send the JSON data to the server
  fetch('user-data.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Form data saved successfully');
    alert('Form data saved successfully');
    form.reset(); // Reset the form
  })
  .catch(error => {
    console.error('There was a problem saving the form data:', error);
    alert('There was a problem saving the form data. Please try again later.');
  });
}