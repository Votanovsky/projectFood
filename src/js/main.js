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
const deadLine = '2021-05-16';     

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
});