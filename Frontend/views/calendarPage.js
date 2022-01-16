function numberOfDaysArray(year, month) {
  return Array.from(
    Array(new Date(year, month + 1, 0).getDate()),
    (x, y) => y + 1
  );
}

function calculateFirstDayOfTheMonth(dayOfTheWeek) {
  const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const firstDayOfTheMonth = `is-${weekDays[dayOfTheWeek]}`;

  return firstDayOfTheMonth;
}

function createButton(direction, symbol, handler) {
  const button = document.createElement("button");
  button.className = `Calendar-${direction}Button`;
  button.innerHTML = symbol;
  button.addEventListener("click", handler);
  return button;
}

function prevHandler(event) {
  event.preventDefault();
  console.log("previous button was clicked!");
  // return
}

function nextHandler(event) {
  event.preventDefault();
  console.log("next button was clicked!");
  // return
}

function getDays(month, year) {
  const date = new Date();
  const today = date.getDate();
  const firstDay = new Date(year, month, 1);
  const dayOfTheWeek = firstDay.getDay();
  const days = numberOfDaysArray(year, month).map((dayy) => {
    const day = document.createElement("div");
    day.className = "Calendar-day";
    day.innerHTML = dayy;
    return day;
  });
  days[today - 1].classList.add("is-today");
  days[0].classList.add(calculateFirstDayOfTheMonth(dayOfTheWeek));
  return days;
}

export default function calendar() {
  const calendarControls = document.createElement("div");
  calendarControls.className = "Calendar-controls";

  const buttonContainer = document.createElement("div");
  const prevButton = createButton("prev", "<", prevHandler);
  const nextButton = createButton("next", ">", nextHandler);

  const month = document.createElement("div");
  month.className = "Calendar-month";
  const date = new Date();
  const currentMonth = date.toLocaleString("default", { month: "long" });
  month.innerHTML = currentMonth;

  const year = document.createElement("div");
  year.className = "Calendar-year";
  const currentYear = date.getFullYear();
  year.innerHTML = currentYear;

  const calendar = document.createElement("div");
  calendar.className = "Calendar";

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weekdays.forEach((day) => {
    const weekday = document.createElement("div");
    weekday.className = "Calendar-weekday";
    weekday.innerHTML = day;
    calendar.appendChild(weekday);
  });

  // console.log(date.getMonth, "date", date.getMonth + 1, "date +1");
  const days = getDays(date.getMonth(), date.getYear());
  calendar.append(...days);

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);
  calendarControls.appendChild(buttonContainer);
  calendarControls.appendChild(month);
  calendarControls.appendChild(year);
  body.append(calendarControls);
  body.append(calendar);
}
