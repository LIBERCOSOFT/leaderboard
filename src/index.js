import axios from 'axios';
import './styles.css';

const scoreContainer = document.querySelector('.scores__container');
const form = document.querySelector('.form');

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

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  const newEntry = { user, score };
  const response = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/OyocFXKFUQkDPXgPKE3n/scores/', newEntry);
  if (response.status === 201) addToScoreContainer(newEntry);
});