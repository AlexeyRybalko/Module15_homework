const button = document.querySelector('.button');
const buttonIconFirst = document.querySelector('.button-icon__first');
const buttonIconSecond = document.querySelector('.button-icon__second');

buttonIconSecond.classList.add('hidden');

button.addEventListener('click', () => {
    buttonIconFirst.classList.toggle('hidden');
    buttonIconSecond.classList.toggle('hidden');
});