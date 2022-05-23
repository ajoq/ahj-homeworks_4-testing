const form = document.getElementById('form');
const cards = Array.from(document.querySelectorAll('.cards-item'));
const formInput = document.getElementById('card-number');
const tooltip = document.querySelector('.tooltip');
const luhnSucces = document.querySelector('.luhn-succes');
const luhnError = document.querySelector('.luhn-error');
const noBankError = document.querySelector('.no-bank');

formInput.addEventListener('input', (e) => {
    clearMessages();
    clearCardStyles();
    checkBank(e.target.value);
    if (e.target.value === '') return;
    checkCardNumber(e.target.value);
});

form.addEventListener('submit', (e) => formSubmit(e));

function formSubmit(e) {
    e.preventDefault();
    clearMessages();

    let num = formInput.value.trim();

    if (!checkCardNumber(num)) return;

    if (checkLuhn(num)) {
        luhnSucces.classList.add('display');
    } else {
        luhnError.classList.add('display');
    }

    if (!checkBank(num)) {
        console.log('К сожалению, принадлежность карты не определена'); // Тут не корректно, поправить
    }
}

function checkLuhn(value) {
    let ch = 0;
    const num = value;
    const isOdd = num.length % 2 !== 0;

    if (value.length < 12) return false;

    for (let i = 0; i < num.length; i++) {
        let n = parseInt(num[i], 10);

        ch += (isOdd | 0) === (i % 2) && 9 < (n *= 2) ? (n - 9) : n;
    }

    return 0 === (ch % 10);
}

function checkCardNumber(value) { 

    if (isNaN(value)) {
        showNumCheckError();
        return false;
    } 

    return value;
}

function showNumCheckError() {
    tooltip.classList.add('display');
}

function clearMessages() {
    luhnSucces.classList.remove('display');
    luhnError.classList.remove('display');
    tooltip.classList.remove('display');
    noBankError.classList.remove('display');
}

function clearCardStyles() {
    cards.forEach(item => {
        item.classList.remove('cards-opacity');
    })
}

function checkBank(value) {
    //VISA
    if (value.startsWith(4)) {
        showBank('.visa');
    }

    //MasterCard
    if (value.match(/^5[1-5]/) || value.substring(0, 4) >= 2221 && value.substring(0, 4) <= 2720) {
        showBank('.master');
    }

    // // МИР
    if (value.match(/^220[0-4]/)) {
        showBank('.mir');
    }

    //American Express
    if (value.match(/^3[47]/)) {
        showBank('.amex');
    }

    //Discover
    if (value.startsWith(6011)) {
        showBank('.discover');
    }

    //JCB
    if (value.startsWith(2131) || value.startsWith(1800) || value.startsWith(35)) {
        showBank('.jcb');
    }

    // Diners Club
    if (value.match(/^30[0-5]/) || value.startsWith(36) || value.startsWith(38)) {
        showBank('.diners_club');
    }

    return;
}

function showBank(bankName) {
    cards.forEach(item => {
        item.classList.add('cards-opacity');
    });

    document.querySelector(bankName).closest('.cards-opacity').classList.remove('cards-opacity'); 
}