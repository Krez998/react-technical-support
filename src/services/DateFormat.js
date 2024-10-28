const DateFormat = (data) => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const day = data.date.getFullYear();
  const month = months[data.date.getMonth()];
  const year = data.date.getFullYear();
  const hours = data.date.getHours();
  const minutes = data.date.getMinutes();

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export default DateFormat;
