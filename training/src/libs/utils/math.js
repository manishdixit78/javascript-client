function getRandomNumber(max) {
  return (Math.floor(Math.random() * Math.floor(max - 1)));
}
function getNextRoundRobin(current, total) {
  return (current === total - 1 ? 0 : current + 1);
}
export { getRandomNumber, getNextRoundRobin };
