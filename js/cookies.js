// ÇEREZLER

const btnCookies = document.querySelector('[data-cookies-accept]');
const sectionCookies = document.querySelector('[data-cookies]');

function setCookies (cName, cValue, expdays){
    let date = new Date();
    date.setTime(date.getTime() + (expdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cName}=${cValue}; ${expires}; path=/`;
}

function getCookie (cName) {
    const name = cName + '=';
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split(';');
    let value;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) value = val.substring(name.length);
    });

    return value;
}

function cookieMessage() {
    if(!getCookie('cookie')){
        sectionCookies.style.display = 'block';
    }
}

window.addEventListener('load', cookieMessage);

btnCookies.addEventListener('click', () => {
    sectionCookies.style.display = 'none';
    setCookies('cookie', true, 30);
});