const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const menuLinks = menu.querySelectorAll('.menu__list a');

hamburger.addEventListener('click', () => {
  menu.classList.add('active');
});

const close = () => {
  menu.classList.remove('active');
};

closeElem.addEventListener('click', close);
menuLinks.forEach((link) => {
  link.addEventListener('click', close);
});

const percents = document.querySelectorAll('.instruments__charts-percentage');
const charts = document.querySelectorAll('.instruments__charts-item__filler');

for (let i = 0; i < percents.length; i++) {
  charts[i].style.width = percents[i].textContent;

  if (parseInt(percents[i].textContent) > 100) {
    charts[i].style.width = 100 + '%';
  } else if (parseInt(percents[i].textContent) < 0) {
    charts[i].style.width = 0 + '%';
  }
}


const overlay = document.querySelector('.overlay');
const modal = document.getElementById('thanks');
const closeModal = document.querySelector('.modal__close');

const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const textareaInput = document.querySelector('#message');

async function handleSubmit(event) {
  event.preventDefault(); // Отмена стандартного действия отправки формы
  const data = new FormData(event.target);
  // Проверка вводимых данных
  if (nameInput.value.trim() === '') {
    showError(nameInput);
  } else {
    removeError(nameInput);
  }

  if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
    showError(emailInput);
  } else {
    removeError(emailInput);
  }

  // Если форма прошла валидацию, можно отправить данные
  if (!formContainsErrors(form)) {

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
    .then(() => {
      overlay.style.display = 'block';
      modal.style.display = 'block';
      form.reset();
    })
    .catch(error => {
      console.log('Error sending data:', error);
    });
  }
};

form.addEventListener('submit', handleSubmit);

function showError(input) {
  const parent = input.parentElement;
  parent.classList.add('error');
}

function removeError(input) {
  const parent = input.parentElement;
  parent.classList.remove('error');
}

function isValidEmail(email) {
  // Проверка валидности email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formContainsErrors(form) {
  const errorElements = form.querySelectorAll('.error');
  return errorElements.length > 0;
}

closeModal.addEventListener('click', () => {
  overlay.style.display = 'none';
  modal.style.display = 'none';
});