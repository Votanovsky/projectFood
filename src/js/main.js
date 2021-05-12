window.addEventListener('DOMContentLoaded', function() {

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
});