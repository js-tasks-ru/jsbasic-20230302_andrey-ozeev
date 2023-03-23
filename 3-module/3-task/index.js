function camelize(str) {
  let newArr = str
    .split("-")
    .map((el, i) => (i == 0 ? el : el[0].toUpperCase() + el.slice(1)))
    .join("");
  return newArr;
}
