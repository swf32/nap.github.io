const tele = window.Telegram.WebApp;
tele.expand();

$(document).ready(function() {
    // Задержка в 1000 мс
    setTimeout(function() {
        // Выбираем все блоки с классами main_module и stories
        let elements = $('.main_module, .stories');

        // Применяем функцию к каждому элементу с индексом
        elements.each(function(index, element) {
            // Задержка в 50 мс для каждого следующего элемента
            setTimeout(function() {
                $(element).css('opacity', '1');
            }, index * 75);
        });
    }, 1000);
});

setTimeout(function() {
    window.TelegramWebviewProxy.postEvent('web_app_trigger_haptic_feedback', JSON.stringify({
        type: 'notification',
        notification_type: 'success'
    }));
}, 200);

let animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'), // ID контейнера для анимации
    renderer: 'svg',
    loop: false, // Не зацикливать анимацию
    autoplay: true, // Автоматически начать воспроизведение
    path: 'content/loader.json', // Укажите путь к вашей анимации
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
});

animation.addEventListener('DOMLoaded', function() {
    const computedStyle = getComputedStyle(document.documentElement);
    const fillColor = computedStyle.getPropertyValue('--tg-theme-button-color') || '#50a8eb';
    const elements = document.querySelectorAll("#lottie-animation svg path, #lottie-animation svg rect, #lottie-animation svg circle, #lottie-animation svg polygon, #lottie-animation svg polyline");
    elements.forEach(el => {
        el.style.fill = fillColor.trim();
    });
});
setTimeout(function() {
    const overlay = document.getElementById('overlay');
    overlay.style.transition = 'opacity 300ms';
    overlay.style.opacity = '0';

    // Удаление подложки после завершения анимации исчезновения
    setTimeout(function() {
        overlay.remove();
        setTimeout(function () {
            const lottie = document.getElementById('lottie-animation');
            lottie.remove();
        }, 100);
    }, 300);
}, 900);