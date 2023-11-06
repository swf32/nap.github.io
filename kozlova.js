// Инициализация начальных значений
let tempValue = 400;
let waterValue = 50; // в процентах
let pressureValue = 6;
let tempChangeRange, pressureChangeRange;

// Обновление фона для div на основе значения
function updateBackgroundColor(elementId, value, min, max) {
    // Вычисляем середину диапазона для зелёного цвета
    const normalValue = (min + max) / 2;
    // Вычисляем отклонение от нормы
    const deviation = Math.abs(value - normalValue);
    // Вычисляем максимальное отклонение
    const maxDeviation = (max - normalValue);
    // Вычисляем процентное отклонение от нормы
    const deviationPercentage = (deviation / maxDeviation);

    // Вычисляем оттенок (hue) для HSL цвета
    // 120 - зелёный (норма), 0 или 360 - красный (максимальное отклонение)
    let hue = 120 - (deviationPercentage * 120);

    // Устанавливаем насыщенность и светлоту на постоянные значения
    const saturation = '100%';
    const lightness = '50%';

    // Преобразуем HSL в строку CSS
    const color = `hsl(${hue}, ${saturation}, ${lightness})`;

    // Устанавливаем цвет фона элемента
    document.getElementById(elementId).style.backgroundColor = color;
}




// Функция для получения цвета в зависимости от значения
function getColorForValue(value, min, max) {
    const ratio = (value - min) / (max - min);
    const hue = ((1 - ratio) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`;
}

// Функция для обновления значений параметров
// Функция для обновления значений параметров с учетом их границ
function updateParameters() {
    // Проверяем значение waterValue и устанавливаем соответствующий диапазон изменений
    if (waterValue < 40 || waterValue > 60) {
        tempChangeRange = 20;
        pressureChangeRange = 0.2;
    }
    if (waterValue < 30 || waterValue > 70) {
        tempChangeRange = 30;
        pressureChangeRange = 0.3;
    }
    if (waterValue < 20 || waterValue > 80) {
        tempChangeRange = 40;
        pressureChangeRange = 0.4;
    }
    if (waterValue >= 40 && waterValue <= 60) {
        tempChangeRange = 10;
        pressureChangeRange = 0.1;
    }

    // Случайное изменение с ограничениями на максимум и минимум
    tempValue = Math.min(600, Math.max(200, tempValue + getRandomValue(-tempChangeRange, tempChangeRange)));
    pressureValue = Math.min(10, Math.max(4, pressureValue + getRandomValue(-pressureChangeRange, pressureChangeRange)));
    waterValue = Math.min(100, Math.max(0, waterValue + getRandomValue(-5, 5)));


    // Обновление значений на странице
    document.getElementById('tempdata').textContent = tempValue.toFixed(0);
    document.getElementById('waterdata').textContent = waterValue.toFixed(0) + '%';
    document.getElementById('pressdata').textContent = pressureValue.toFixed(1);

    // Обновление фона на основе значений
    updateBackgroundColor('temperature', tempValue, 300, 500);
    updateBackgroundColor('water', waterValue, 10, 90);
    updateBackgroundColor('pressure', pressureValue, 4, 8);
}


// Функция для получения случайного изменения значения
function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

// Изначальное обновление фонов
updateParameters();

// Чередование двух состояний: пауза и изменение параметров
let updateInProgress = false;
// Настройки по умолчанию
// Переменные для хранения значений слайдеров
let pauseTime = 2000;
let updateTime = 10000;
let updateSpeed = 1000;

// Функция для обновления значений и текста для паузы
function onPauseSliderChange() {
    pauseTime = pauseSlider.value * 1000;
    pauseLabel.textContent = pauseTime/1000 + ' сек';
}

// Функция для обновления значений и текста для времени обновления
function onUpdateIntervalSliderChange() {
    updateTime = updateIntervalSlider.value * 1000;
    updateIntervalLabel.textContent = updateTime/1000 + ' сек';
}

// Функция для обновления значений и текста для скорости обновления
function onUpdateSpeedSliderChange() {
    updateSpeed = updateSpeedSlider.value;
    updateRateLabel.textContent = updateSpeed + ' мс';
}

// Получаем элементы слайдеров по их ID
const pauseSlider = document.getElementById('pauseSlider');
const updateIntervalSlider = document.getElementById('updateIntervalSlider');
const updateSpeedSlider = document.getElementById('updateSpeedSlider');

// Получаем элементы label по их ID
const pauseLabel = document.getElementById('pauseLabel');
const updateIntervalLabel = document.getElementById('updateIntervalLabel');
const updateRateLabel = document.getElementById('updateRateLabel');

// Назначаем обработчики событий для слайдеров
pauseSlider.addEventListener('input', onPauseSliderChange);
updateIntervalSlider.addEventListener('input', onUpdateIntervalSliderChange);
updateSpeedSlider.addEventListener('input', onUpdateSpeedSliderChange);

// Инициализация значений лейблов при загрузке
pauseLabel.textContent = pauseSlider.value + ' сек';
updateIntervalLabel.textContent = updateIntervalSlider.value + ' сек';
updateRateLabel.textContent = updateSpeedSlider.value + ' мс';

setInterval(() => {
    if (!updateInProgress) {
        // Переключаемся на состояние обновления параметров
        updateInProgress = true;
        // Запускаем обновление параметров каждую секунду в течение 0.5 секунд
        const intervalId = setInterval(updateParameters, updateSpeed);
        setTimeout(() => {
            clearInterval(intervalId);
            updateInProgress = false;
        }, updateTime);
        console.log(pauseTime, updateTime, updateSpeed)
    }
}, updateTime+pauseTime);
