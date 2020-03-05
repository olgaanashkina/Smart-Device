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

var openModal = document.querySelector('.page-header__toggle');
openModal.addEventListener('click', function () {
    renderModal();
});
