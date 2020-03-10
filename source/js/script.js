'use strict';
var ESC_KEYCODE = 27;
var formName = document.querySelector('.form__name');

var renderModal = function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#modal')
    .content
    .querySelector('.modal__block');
  var successModal = successTemplate.cloneNode(true);
  main.appendChild(successModal);
  var removeSuccessModal = function () {
    successModal.remove();
  };
  var closedModal = successModal.querySelector('.modal__toggle');
  closedModal.addEventListener('click', function (evt) {
    evt.preventDefault();
    removeSuccessModal();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      removeSuccessModal();
    }
  });
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.modal__block')) {
      removeSuccessModal();
    }
  });
}

var validationName = function (inputName) {
  inputName.oninput = function () {
    localStorage.setItem('inputName', inputName.value);
  }
  inputName.addEventListener('invalid', function (evt) {
    if (inputName.validity.tooShort) {
      inputName.setCustomValidity('Имя должно быть не менее 3-х символов');
    } else if (inputName.validity.tooLong) {
      inputName.setCustomValidity('Имя не должно быть больше 20-ти символов');
    } else if (inputName.validity.valueMissing) {
      inputName.setCustomValidity('Поле обязательно для заполнения');
    } else {
      inputName.setCustomValidity('');
    }
  });
}

var validationPhone = function (inputPhone) {
  inputPhone.onfocus = function () {
    inputPhone.value = '+7(';
  }
  inputPhone.oninput = function (evt) {
    if (!(evt.data >= '0' && evt.data <= '9')) {
      inputPhone.value = inputPhone.value.substring(0, inputPhone.value.length - 1);
    }
    localStorage.setItem('inputPhone', inputPhone.value);
    if (inputPhone.value.length == 6) {
      inputPhone.value = inputPhone.value + ')';
    }
    if (inputPhone.value.length == 10) {
      inputPhone.value = inputPhone.value + '-';
    }
    if (inputPhone.value.length == 13) {
      inputPhone.value = inputPhone.value + '-';
    }
  }
}

var validationMessage = function (inputMessage) {
  inputMessage.oninput = function () {
    localStorage.setItem('inputMessage', inputMessage.value);
  }
  inputMessage.addEventListener('invalid', function (evt) {
    if (inputMessage.validity.valueMissing) {
      inputMessage.setCustomValidity('Задайте Ваш вопрос');
    } else {
      inputMessage.setCustomValidity('');
    }
  });
}

var openModal = document.querySelector('.page-header__toggle');
openModal.addEventListener('click', function () {
  renderModal();
  document.querySelector('.modal__name').focus();
  var form = document.querySelector('.modal__form');
  var inputName = document.querySelector('.modal__name');
  var inputPhone = document.querySelector('.modal__phone');
  var inputMessage = document.querySelector('.modal__text');
  inputName.value = localStorage.getItem('inputName');
  inputPhone.value = localStorage.getItem('inputPhone');
  inputMessage.value = localStorage.getItem('inputMessage');

  validationName(inputName);
  validationPhone(inputPhone);
  validationMessage(inputMessage);

  form.addEventListener('submit', function () {
    localStorage.setItem('inputName', '');
    localStorage.setItem('inputPhone', '');
    localStorage.setItem('inputMessage', '');
  });
});

var letterForm = document.querySelector('.prime__toggle');
letterForm.addEventListener('click', function () {
  document.querySelector('.form__name').focus();
  var form = document.querySelector('.form');
  var inputName = document.querySelector('.form__name');
  var inputPhone = document.querySelector('.form__phone');
  var inputMessage = document.querySelector('.form__text');
  inputName.value = localStorage.getItem('inputName');
  inputPhone.value = localStorage.getItem('inputPhone');
  inputMessage.value = localStorage.getItem('inputMessage');

  validationName(inputName);
  validationPhone(inputPhone);
  validationMessage(inputMessage);

  form.addEventListener('submit', function () {
    localStorage.setItem('inputName', '');
    localStorage.setItem('inputPhone', '');
    localStorage.setItem('inputMessage', '');
  });
});

var accordionItem = document.querySelectorAll('.accordion');
var open = document.getElementsByClassName('accordion-open');
Array.from(accordionItem).forEach(function(item, i, accordionItem) {
  item.addEventListener('click', function(e) {
    if (open.length > 0 && open[0] !== this)
    open[0].classList.remove('accordion-open');
    this.classList.toggle('accordion-open');
  });
});
