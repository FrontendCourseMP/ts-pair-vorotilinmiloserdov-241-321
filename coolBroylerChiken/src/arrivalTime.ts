function calculateArrivalTime(
  scheduledHour: number,
  scheduledMinute: number,
  delayMinutes: number
): string {
  if (
    !Number.isInteger(scheduledHour) ||
    !Number.isInteger(scheduledMinute) ||
    !Number.isInteger(delayMinutes)
  ) {
    return "Ошибка: введите целые числа";
  }

  if (scheduledHour < 0 || scheduledHour > 23) {
    return "Ошибка: час прибытия должен быть от 0 до 23";
  }

  if (scheduledMinute < 0 || scheduledMinute > 59) {
    return "Ошибка: минуты должны быть от 0 до 59";
  }

  if (delayMinutes < 0) {
    return "Ошибка: опоздание не может быть отрицательным";
  }

  const totalMinutes = scheduledHour * 60 + scheduledMinute + delayMinutes;
  const newHour = Math.floor(totalMinutes / 60) % 24;
  const newMinute = totalMinutes % 60;

  const formattedHour = newHour.toString().padStart(2, "0");
  const formattedMinute = newMinute.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinute}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const arrivalTimeInput = document.getElementById(
    "arrivalTime"
  ) as HTMLInputElement;
  const lateHoursInput = document.getElementById("lateHours") as HTMLInputElement;
  const lateMinutesInput = document.getElementById("lateMinutes") as HTMLInputElement;
  const resultDiv = document.querySelector(".result") as HTMLDivElement;

  if (form && arrivalTimeInput && lateHoursInput && lateMinutesInput && resultDiv) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const timeValue = arrivalTimeInput.value;
      const delayHours = parseInt(lateHoursInput.value);
      const delayMinutes = parseInt(lateMinutesInput.value);

      if (!timeValue || isNaN(delayHours) || isNaN(delayMinutes)) {
        resultDiv.textContent = "Заполните все поля";
        resultDiv.className = "result error";
        return;
      }

      const timeParts = timeValue.split(":");
      if (timeParts.length !== 2 || !timeParts[0] || !timeParts[1]) {
        resultDiv.textContent = "Ошибка: неверный формат времени";
        resultDiv.className = "result error";
        return;
      }

      const scheduledHour = parseInt(timeParts[0]);
      const scheduledMinute = parseInt(timeParts[1]);

      const totalDelayMinutes = delayHours * 60 + delayMinutes;

      const result = calculateArrivalTime(
        scheduledHour,
        scheduledMinute,
        totalDelayMinutes
      );

      if (result.startsWith("Ошибка")) {
        resultDiv.className = "result error";
        resultDiv.textContent = result;
      } else {
        resultDiv.className = "result success";
        resultDiv.textContent = `Новое время прибытия: ${result}`;
      }
    });
  }
});
