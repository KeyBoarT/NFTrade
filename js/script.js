'use strict';

const navbar = document.querySelector('[data-navbar]');
const navToggler = document.querySelector('[data-nav-toggler]');

// Header menü butonlarına tıklanınca, menü açılması ve kapanmasını sağlamak için aşağıdaki kodları yazıyoruz.
navToggler.addEventListener('click', () => {
    navbar.classList.toggle('active');
    this.classList.toggle('active');
});

// HEADER ve BAŞA DÖN butonu
// ekran 200px aşağı kaydırılınca header ve başa dön butonu görünür olması için aşağıdaki kodları yazıyoruz.

const header = document.querySelector('[data-header]');
const backToTop = document.querySelector('[data-back-to-top-btn]');

const activeElementOnScroll = () => {
    if (window.scrollY >= 200){
        header.classList.add('active');
        backToTop.classList.add('active');
    }
    else
    {
        header.classList.remove('active');
        backToTop.classList.remove('active');
    }
}

window.addEventListener('scroll',activeElementOnScroll);

// SLIDER: Koleksiyonlar arasında gezinmek için butonlara gerekli eventleri ekliyoruz

const sliders = document.querySelectorAll('[data-slider]');

const sliderInit = (currentSlider) => {
    const sliderContainer = currentSlider.querySelector('[data-slider-container]');
    const sliderPrevBtn = currentSlider.querySelector('[data-slider-prev]');
    const sliderNextBtn = currentSlider.querySelector('[data-slider-next]');

    const totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue('--slider-item'));

    const totalSliderItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    let currentSlidePos = 0;

    const moveSliderItem = () => {
        sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    }

    // SONRAKİ SLIDE

    // slideNext isimli fonksiyon ile bir sonraki slide'a geçmek için gerekli kod aşağıdadır. Daha sonra bu fonksiyonu gerekli evente atayacağız.
    const slideNext = () => {
        const slideEnd = currentSlidePos >= totalSliderItems;

        currentSlidePos = (slideEnd) ? 0 : currentSlidePos+1;

        moveSliderItem();
    }

    // Next butonunun 'click' eventine slideNext isimli fonksiyonu atıyoruz.
    sliderNextBtn.addEventListener('click', slideNext);

    // ÖNCEKİ SLIDE
    // Tıpkı slideNext'te olduğu gibi 'önceki' butonu için slidePrev isimli fonksiyonu yazıyoruz.
    const slidePrev = () => {
        currentSlidePos = (currentSlidePos <= 0) ? totalSliderItems : currentSlidePos-1;

        moveSliderItem();
    }


    sliderPrevBtn.addEventListener('click', slidePrev);

    // ETKİSİZLEŞTİRME: Henüz herhangi bir koleksiyon sitemize eklenmemişse önceki ve sonraki butonlarına gerek yoktur. İşte bu yüzden butonları 'disabled' hale getiriyoruz. Daha sonra bu butonların 'disabled' halde iken görünmemesini sağlayacağız.

    const dontHaveExtraItem = totalSliderItems <= 0;

    if (dontHaveExtraItem) {
        sliderNextBtn.settAttribute('disabled', '');
        sliderPrevBtn.settAttribute('disabled', '');
    }

    // OTO KAYDIRMA

    let autoSlideInterval;

    // Bu kısımda javascript'e otomatik olarak tanımlanmış olan ve asenkron fonksiyonlamaya yarayan setInterval fonksiyonunu kullanacağız.
    const startAutoSlide = () => autoSlideInterval = setInterval(slideNext, 3000);
    startAutoSlide();

    // Bu kısımda ise yine javascriptte tanımlı olan 'clearInterval' fonksiyonunu kullanarak başlattığımız interval fonksiyonu durduruyoruz.
    const stopAutoSlide = () => clearInterval(autoSlideInterval);

    // aşağıdaki kod ile de eğer kullanıcı sliderın üzerine mouse ile gelirse oto kaydırmayı durduruyoruz ki: Eğer kullanıcı slider üzerinde bir şey inceliyorsa diğer slidera geçmesin.
    currentSlider.addEventListener('mouseover', stopAutoSlide);
    currentSlider.addEventListener('mouseout', startAutoSlide);

    // RESPONSIVE
    window.addEventListener('resize', moveSliderItem);
}

for(let i = 0, len = sliders.length; i < len; i++) {
    sliderInit(sliders[i]);
}

// SORU CEVAP

// soru cevap elementlerini buluyoruz.
const accordions = document.querySelectorAll('[data-accordion]');

let lastActiveAccordion;

// tüm soru-cevap elementlerine göster - kapat fonksiyonu ekliyoruz
const accordionInit = (currentAccordion) => {
    const accordionBtn = currentAccordion.querySelector('[data-accordion-btn');
    accordionBtn.addEventListener('click', () => {
        if(currentAccordion.classList.contains('active')) {
            currentAccordion.classList.toggle('active');
        }
        else {
            if (lastActiveAccordion) lastActiveAccordion.classList.remove('active');
            currentAccordion.classList.add('active');
        }

        lastActiveAccordion = currentAccordion;
    });
}

for(let i = 0, len = accordions.length; i < len; i++) { accordionInit(accordions[i]); }

// GİZLİLİK POLİTİKASI
const btnPrivacyOpen = document.querySelector('[data-privacy-open]');
const btnPrivacyClose = document.querySelector('[data-privacy-close]');
const sectionPrivacy = document.querySelector('[data-privacy]');


function privacyOpen() {
    sectionPrivacy.style.display = 'block';
}

function privacyClose() {
    sectionPrivacy.style.display = 'none';
}
btnPrivacyOpen.addEventListener('click', privacyOpen);
btnPrivacyClose.addEventListener('click', privacyClose);


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
