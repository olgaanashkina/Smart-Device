'use strict';
var ESC_KEYCODE = 27;

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
    closedModal.addEventListener('click', removeSuccessModal);
    document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeSuccessModal();
    }
  });
}

var validationName = function () {
  var inputName = document.querySelector('.modal__name');
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

// var validationPhone = function () {
//   var inputPhone = document.querySelector('.modal__phone');
// }

var openModal = document.querySelector('.page-header__toggle');
openModal.addEventListener('click', function () {
    renderModal();
    document.querySelector('.modal__name').focus();
    validationName();
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
