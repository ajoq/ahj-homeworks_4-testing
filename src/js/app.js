const form = document.getElementById('form');
const cards = Array.from(document.querySelectorAll('.cards-item'));
const formInput = document.getElementById('card-number');
const tooltip = document.querySelector('.tooltip');
const luhnSucces = document.querySelector('.luhn-succes');
const luhnError = document.querySelector('.luhn-error');
const noBankError = document.querySelector('.no-bank');

formInput.addEventListener('input', (e) => {
    const num = e.target.value.replace(/ /g, '');
    clearMessages();
    clearCardStyles();
    checkBank(num);
    if (num === '') return;
    checkCardNumber(num);
});

form.addEventListener('submit', (e) => formSubmit(e));

function formSubmit(e) {
    e.preventDefault();
    clearMessages();

    const num = formInput.value.replace(/ /g, '');

    if (!checkCardNumber(num)) return;

    if (checkLuhn(num)) {
        luhnSucces.classList.add('display');
    } else {
        luhnError.classList.add('display');
    }

    if (!checkBank(num)) {
        noBankError.classList.add('display')
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
        return true;
    }

    //MasterCard
    if (value.match(/^5[1-5]/) || value.substring(0, 4) >= 2221 && value.substring(0, 4) <= 2720) {
        showBank('.master');
        return true;
    }

    // // МИР
    if (value.match(/^220[0-4]/)) {
        showBank('.mir');
        return true;
    }

    //American Express
    if (value.match(/^3[47]/)) {
        showBank('.amex');
        return true;
    }

    //Discover
    if (value.startsWith(6011)) {
        showBank('.discover');
        return true;
    }

    //JCB
    if (value.startsWith(2131) || value.startsWith(1800) || value.startsWith(35)) {
        showBank('.jcb');
        return true;
    }

    // Diners Club
    if (value.match(/^30[0-5]/) || value.startsWith(36) || value.startsWith(38)) {
        showBank('.diners_club');
        return true;
    }

    return false;
}

function showBank(bankName) {
    cards.forEach(item => {
        item.classList.add('cards-opacity');
    });

    document.querySelector(bankName).closest('.cards-opacity').classList.remove('cards-opacity'); 
}