// Проверка наличия tg.ThemeParams
var tg = window.Telegram ? window.Telegram.WebApp : null;

function updateColors() {
	var colorElements = document.querySelectorAll('.color-item');

	colorElements.forEach(function(element) {
		var colorType = element.getAttribute('data-color');
		var colorValue;

		if (tg && tg.ThemeParams[colorType]) {
			colorValue = tg.ThemeParams[colorType];
		} else {
			// Значения по умолчанию (замените на свои)
			switch(colorType) {
				case 'bg_color':
					colorValue = '#FFFFFF'; // пример
					break;
				// Добавьте другие цвета
			}
		}

		element.querySelector('.color-circle').style.backgroundColor = colorValue;
	});
}

// Обработчик события изменения темы
if (tg) {
	tg.onEvent('themeChanged', updateColors);
}

// Инициализация при загрузке страницы
updateColors();
