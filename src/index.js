import axios from 'axios';
import './styles.css';

const gameOwner = {
  name: "Kolapo's leaderboard game",
};
const response = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/OyocFXKFUQkDPXgPKE3n/scores/', gameOwner);
console.log(response);