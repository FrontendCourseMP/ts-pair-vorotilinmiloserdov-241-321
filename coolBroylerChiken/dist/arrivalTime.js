function calculateArrivalTime(scheduledHour, delayHours) {
    if (!Number.isInteger(scheduledHour) || !Number.isInteger(delayHours)) {
        return "Ошибка: введите целые числа";
    }
    if (scheduledHour < 0 || scheduledHour > 23) {
        return "Ошибка: час прибытия должен быть от 0 до 23";
    }
    if (delayHours < 0) {
        return "Ошибка: опоздание не может быть отрицательным";
    }
    const newHour = (scheduledHour + delayHours) % 24;
    const formattedHour = newHour.toString().padStart(2, '0');
    return `${formattedHour}:00`;
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const arrivalTimeInput = document.getElementById('arrivalTime');
    const lateInput = document.getElementById('late');
    const resultDiv = document.querySelector('.result');
    if (form && arrivalTimeInput && lateInput && resultDiv) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const timeValue = arrivalTimeInput.value;
            const delayHours = parseInt(lateInput.value);
            if (!timeValue || isNaN(delayHours)) {
                resultDiv.textContent = "Заполните все поля";
                resultDiv.style.color = "red";
                return;
            }
            const hourString = timeValue.split(':')[0];
            if (!hourString) {
                resultDiv.textContent = "Ошибка: неверный формат времени";
                resultDiv.style.color = "red";
                return;
            }
            const scheduledHour = parseInt(hourString);
            const result = calculateArrivalTime(scheduledHour, delayHours);
            if (result.startsWith("Ошибка")) {
                resultDiv.style.color = "red";
                resultDiv.textContent = result;
            }
            else {
                resultDiv.style.color = "green";
                resultDiv.textContent = `Новое время прибытия: ${result}`;
            }
        });
    }
});
export {};
//# sourceMappingURL=arrivalTime.js.map