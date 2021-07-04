window.addEventListener('DOMContentLoaded', function() {

// ----------------Табы---------------- 

const tabs = document.querySelectorAll('.tabheader__item'),
tabsContent = document.querySelectorAll('.tabcontent'),
tabsParent = document.querySelector('.tabheader__items');

// Скрываем все табы
function hideTabContent() {
tabsContent.forEach(allTab => {
  allTab.classList.add('hide');
  allTab.classList.remove('show','fade');
});

// Убираем класс активности
tabs.forEach(tab => {
  tab.classList.remove('tabheader__item_active');
});
}

// Показывает табы
function showTabContent(i = 0) {
tabsContent[i].classList.add('show', 'fade');
tabsContent[i].classList.remove('hide');
tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

// Переключает контент по табу
tabsParent.addEventListener('click', (event) => {
const target = event.target;

if (target && target.classList.contains('tabheader__item')) {
   tabs.forEach((item, i) => {
      if (target == item) {
          hideTabContent();
          showTabContent(i);
      }
   });
}
});

// ----------------Табы----------------



// ----------------Таймер----------------

// Начальное время:
const deadLine = '2021-12-16';     

// Операции по рассчёту времени
function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
          days = Math.floor( t / (1000 * 60 * 60 * 24) ),
          hours = Math.floor( (t / (1000 * 60 * 60) % 24) ),
          minutes = Math.floor( (t / 1000 / 60)  % 60),
          seconds = Math.floor( (t / 1000)  % 60);

    return {
        'total': t, 
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

// Добавляет 0, если мы имеем одно натуральное число в тайймере
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}


// Получаем элемеенты со страницы
function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),

        //   Задаем интервал
          timeInterval = setInterval(updateClock, 1000);
          updateClock();// --Убирает баг с обновлением, т.к. функцию вызываем раньше

    // Обновляет Таймер
    function updateClock() {
        const t = getTimeRemaining(endTime);

        // Помещаем данные на страницу
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        // Останавливаем таймер
        if (t.total <=0) {
            clearInterval(timeInterval);
        }

    }
}
setClock('.timer', deadLine);

// ----------------/Таймер----------------



// ----------------Модальные окна----------------
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');


// Показывает модальные окна
function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
        
    // Убирает скролл
    document.body.style.overflow = 'hidden';

    clearInterval(modalTimerId);
}      

modalTrigger.forEach(i => {
    i.addEventListener('click', openModal);
});

// Скрывает модальные окна
function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');

    // Возвращает скролл
    document.body.style.overflow = '';
}

// Скрывает по клику на область вокруг модального окна
modal.addEventListener('click', (e)=> {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
});

// Скрывает по клику клавишу Esc
// *Найти код кнопки можно по event.code*
document.addEventListener('keydown', (e)=> {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});


// Вызов модального окна через определённое время
const modalTimerId = setTimeout(openModal, 1000000);


// Вызов модального окна, когда пользователь долистал до конца страницы
function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);
// ----------------/Модальные окна----------------



// -----------Создание карточек товара через классы ES6 + rest и параметр по умолчанию-----------
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 78;
        this.changeToRUB(); 
    }

    changeToRUB() {
        this.price = this.price * this.transfer; 
    }

    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
        `;
        this.parent.append(element);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
).render();

// -----------/Создание карточек товара через классы ES6 + rest и параметр по умолчанию----------

// ----------------Отправка данных с формы----------------
const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Gracias! Скоро мы с вами свяжемся!',
    failure: 'Oh, no... Error!!!'
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e)=> {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        fetch('serve1r.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(()=> {
            showThanksModal(message.failure);
        }).finally(()=> {
            form.reset();
        });
    });
}

// ======== Работа с пользователем в модальном окне

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(()=> {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}


// ----------------/Отправка данных с формы----------------

});