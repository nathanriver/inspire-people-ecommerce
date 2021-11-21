const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const parseDate = (date) => {
  const d = new Date(date);
  const dd = d.getDate();
  const F = monthNames[d.getMonth()];
  const yyyy = d.getFullYear();
  const hh = (d.getHours() < 10 ? "0" : "") + d.getHours();
  const mm = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  const ss = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();

  return `${dd} ${F} ${yyyy}, ${hh}:${mm}:${ss}`;
};

export default parseDate;
