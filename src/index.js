import axios from 'axios';
import './styles.css';

const scoreContainer = document.querySelector('.scores__container');
const form = document.querySelector('.form');
const refresh = document.querySelector('#refresh');
const indicator = document.querySelector('#indicator');

const addToScoreContainer = (person) => {
  const pElement = document.createElement('p');
  pElement.innerText = `${person.user}: ${person.score}`;

  scoreContainer.appendChild(pElement);
};

const getScores = async () => {
  const response = await axios.get('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/OyocFXKFUQkDPXgPKE3n/scores/');
  const { result } = response.data;
  result.forEach((val) => addToScoreContainer(val));
};

getScores();

refresh.addEventListener('click', () => {
  scoreContainer.innerHTML = '';
  getScores();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  const newEntry = { user, score };
  const response = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/OyocFXKFUQkDPXgPKE3n/scores/', newEntry);
  if (response.status === 201) {
    addToScoreContainer(newEntry);
    const pElement = document.createElement('p');
    pElement.id = 'indicator__text';
    pElement.style.color = '#008000';
    pElement.innerText = 'Score create success.';

    indicator.innerHTML = '';
    indicator.appendChild(pElement);
    setTimeout(() => {
      document.getElementById('indicator__text').remove();
    }, 2000);
  }

  form.reset();
});