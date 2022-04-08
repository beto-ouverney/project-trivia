export function setToLocalStorage(player) {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (ranking) {
    ranking.push(player);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  } else {
    const array = [player];
    localStorage.setItem('ranking', JSON.stringify(array));
  }
}

export function getRanking() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return ranking;
}
