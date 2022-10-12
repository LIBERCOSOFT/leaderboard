import axios from 'axios';
import './styles.css';

const scoreContainer = document.querySelector('.scores__container');

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