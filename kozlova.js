// Инициализация начальных значений
let tempValue = 400;
let waterValue = 50; // в процентах
let pressureValue = 6;

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
    // Случайное изменение с ограничениями на максимум и минимум
    tempValue = Math.min(600, Math.max(200, tempValue + getRandomValue(-10, 10)));
    waterValue = Math.min(100, Math.max(0, waterValue + getRandomValue(-5, 5)));
    pressureValue = Math.min(10, Math.max(4, pressureValue + getRandomValue(-0.1, 0.1)));

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

setInterval(() => {
    if (!updateInProgress) {
        // Переключаемся на состояние обновления параметров
        updateInProgress = true;
        // Запускаем обновление параметров каждую секунду в течение 5 секунд
        const intervalId = setInterval(updateParameters, 500);
        setTimeout(() => {
            clearInterval(intervalId);
            updateInProgress = false;
        }, 10000);
    }
}, 13000); // 5 секунд пауза + 5 секунд обновление
