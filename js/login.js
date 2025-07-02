const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');
const scoreTableBody = document.getElementById('score-table-body');

const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();

  const playerName = input.value;
  localStorage.setItem('player', playerName);
  window.location = 'pages/game.html';
}

const displayScores = () => {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  // Ordenar do menor para o maior tempo
  scores.sort((a, b) => a.score - b.score);

  scoreTableBody.innerHTML = scores.map((score, index) => {
    let medal = '';
    if (index === 0) medal = '🥇';
    else if (index === 1) medal = '🥈';
    else if (index === 2) medal = '🥉';

    return `
      <tr>
        <td>${medal}${score.name}</td>
        <td>${score.score}</td>
      </tr>
    `;
  }).join('');
};


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', displayScores);

const resetButton = document.querySelector('.reset__button');

const resetScores = () => {
  if (confirm("Tem certeza que deseja apagar todas as pontuações?")) {
    localStorage.removeItem('scores');
    scoreTableBody.innerHTML = '';
  }
};

resetButton.addEventListener('click', resetScores);
