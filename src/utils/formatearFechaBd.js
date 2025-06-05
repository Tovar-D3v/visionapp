export function formatDateToDisplay(dateString) {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const d = new Date(dateString);
  const day = d.getDate();
  const month = meses[d.getMonth()];
  const year = d.getFullYear();
  return `${day} de ${month} de ${year}`;
}

export function formatearFechaBd(date = new Date()) {
  return date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
}
