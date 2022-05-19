/* 
    1. Сделать визуальную часть + добавить МИР, т.е. написать стили
    2. Сделать функцию проверки валидности номера карты + добавление текста об успешной / неуспешной проверки
    3. Функция выяснения принадлежности карты
*/

const form = document.getElementById('form');
const formInput = document.getElementById('card-number');

form.addEventListener('submit', (e) => formSubmit(e));

function formSubmit(e) {
    e.preventDefault();
    
    const inputText = formInput.value.trim();

    // console.log(checkLuhn(inputText));
    checkLuhn(inputText);
}

function checkLuhn(value) {
    let ch = 0;
    const num = String(value).replace(/\D/g, '');
    const isOdd = num.length % 2 !== 0;

    if ('' === num) return false;

    for (let i = 0; i < num.length; i++) {
        let n = parseInt(num[i], 10);

        ch += (isOdd | 0) === (i % 2) && 9 < (n *= 2) ? (n - 9) : n;
    }

    return 0 === (ch % 10);
}

// console.log(checkLuhn(371449635398431));