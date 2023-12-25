const openPopupButton = document.querySelector('.show-popup');
const closePopupButton = document.querySelector('.close-popup');
const popup = document.querySelector('.popup');
const closeLink = popup.querySelector('.form__cancel-button');

// Открытие закрытие попапа:

const openPopup = () => {
  popup.classList.remove('visually-hidden');
  window.addEventListener('keydown', escPressHandler);
  closeLink.addEventListener('click', closePopup);
};

const closePopup = () => {
  popup.classList.add('visually-hidden');
  popup.removeEventListener('click', closePopup);
  window.removeEventListener('keydown', escPressHandler);
  closeLink.removeEventListener('click', closePopup);
  openPopupButton.focus();
};

const escPressHandler = (evt) => {
  if (evt.keyCode === 27) {
    closePopup();
  }
};

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

// Валидация номера телефона

const phoneInput = popup.querySelector('#phone-number');
const MAX_LENGTH = 11;
const BACKSPACE_KEYCODE = 8;
isPasted = false;

const isNumber = (symbol) => (!isNaN(+symbol) && symbol !== ' ') ? true : false;

// Очищает строку от букв и символов
const getNumbersValue = (value) => {
  return value.split('').filter((symbol) => isNumber(symbol)).join('');
};

// Валидация длины номера
const checkInputLength = (evt) => {
  const numbersValueLength = getNumbersValue(evt.target.value).length;
  if (numbersValueLength < MAX_LENGTH) {
    phoneInput.classList.remove('phone-number__input--ok');
    phoneInput.classList.add('phone-number__input--error');
    phoneInput.setCustomValidity(`Введите пожалуйста еще ${MAX_LENGTH - numbersValueLength} символов`);
  } else {
    phoneInput.classList.remove('phone-number__input--error')
    phoneInput.classList.add('phone-number__input--ok');
    phoneInput.setCustomValidity('');
  }
  phoneInput.reportValidity();
};

const getFormattedData = (inputValue, isPasted) => {
  const firstSymbols = '+7 (';
  let result = '';
  // Если значение было вставлено, то первый символ не обрезается
  // Если ввод начался с 7ки, то +7 не вставляется вначале
  if (inputValue.length === 1) {
    result = (inputValue[0] === '7') ? firstSymbols : firstSymbols + inputValue;
  }
  if (inputValue.length > 1) {
    result += firstSymbols + ((isPasted) ? inputValue.substring(0, 3) : inputValue.substring(1, 4));
  }
  if (inputValue.length >= 5) {
    result += ') ' + ((isPasted) ? inputValue.substring(3, 6) : inputValue.substring(4, 7));
  }
  if (inputValue.length >= 8) {
    result += '-' + ((isPasted) ? inputValue.substring(6, 8) : inputValue.substring(7, 9));
  }
  if (inputValue.length >= 10) {
    result += '-' + ((isPasted) ? inputValue.substring(8, 10) : inputValue.substring(9, MAX_LENGTH));
  }
  return result;
};

// Нужно для удаления последнего символа при очистке поля
const phoneBackspaceHandler = (evt) => {
  const inputValue = getNumbersValue(evt.target.value);
  // 2ка это длина строки, когда первый символ это 7ка от маски номера "+7", а второе число последний символ при удалении
  if (evt.keyCode === BACKSPACE_KEYCODE && (inputValue.length === 2 || inputValue.length === 1)) {
    evt.target.value = '';
  }
  checkInputLength(evt);
};

const phonePasteHandler = () => {
  isPasted = true;
};

const phoneInputHandler = (evt) => {
  let input = evt.target;
  input.setCustomValidity('');
  let numbersValue = getNumbersValue(input.value);
  const selectionStart = input.selectionStart;

  if (!numbersValue) {
    input.value = '';
    return;
  }
  if (input.value.length !== selectionStart) {
    if (!isNumber(evt.data)) {
      input.value = numbersValue;
    }
    return;
  }

  // Нужно чтобы при вставке полного номера не добавлялось +7, 7, 8 к маске
  if (numbersValue.length > 10 && isPasted && (evt.target.value.substring(0, 2) === '+7' || evt.target.value[0] === '7' || evt.target.value[0] === '8')) {
    numbersValue = numbersValue.substring(1);
  }

  const formattedData = getFormattedData(numbersValue, isPasted);
  input.value = formattedData;
  checkInputLength(evt);
  isPasted = false;
};

phoneInput.addEventListener('blur', (evt) => checkInputLength(evt));
phoneInput.addEventListener('paste', phonePasteHandler);
phoneInput.addEventListener('keydown', phoneBackspaceHandler);
phoneInput.addEventListener('input', phoneInputHandler);




const arr = [10, 12, 15, 21];

// Первоначальный код выводит 4 раза Bad: undefined
// Это происходит потому что к первому выполнению функции setTimeout переменная i уже будет равна 4,
// а элемента массива с таким индексом не существует


// 1е решение, использовать let вместо var
for (let i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
  }, 3000);
}


// 2е решение, использовать замыкания для запоминания текущего i
for (var i = 0; i < arr.length; i++) {
  setTimeout(function(i) {
    return function() {
      console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }
  }(i), 3000);
}