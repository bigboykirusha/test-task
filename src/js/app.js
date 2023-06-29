// Burger

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

// Form validation and sending

const overlay = document.querySelector('.overlay');
const modal = document.getElementById('thanks');
const closeModal = document.querySelector('.modal__close');

const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');

function showError(input) {
  const parent = input.parentElement;
  parent.classList.add('error');
}

function removeError(input) {
  const parent = input.parentElement;
  parent.classList.remove('error');
}

function isValidEmail(email) {
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

async function handleSubmit(event) {
  event.preventDefault(); 
  const data = new FormData(event.target);

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
