export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function getRandomColor() {
  return `rgb(${getRandomInt(0, 256)}, 
    ${getRandomInt(0, 256)}, 
    ${getRandomInt(0, 256)}
  )`;
}

export function appendPX(num) {
  return `${num}px`;
}
