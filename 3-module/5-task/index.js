function getMinMax(str) {
  let result = {};
  let num = str.split(" ").map((number) => +number).filter((element) => isNaN(+element) ? element.delete : element);
  result.max = Math.max.apply(null, num);
  result.min = Math.min.apply(null, num);
  return result;
}
