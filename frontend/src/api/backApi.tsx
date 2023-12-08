// backApi.js
import axios from 'axios';

class UserApi {
  registerUser(data) {
    console.log("data", data)
    axios
      .post('http://localhost:3001/api/users', {
        data
      })
      .then((response) => {
        console.log('Usuario registrado:', response.data);
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });
  }

  getUserId(username) {
    return axios
      .get(`http://localhost:3001/api/users/${username}`)
      .then((response) => {
        console.log('Id del Usuario:', response.data);
        return response.data.data
      })
      .catch((error) => {
        console.error('Error al obtener el Id:', error);
      });
  }
}

class ScoreApi {
  saveScore(data) {
    axios
      .post('http://localhost:3001/api/results', {
        data
      })
      .then((response) => {
        // console.log('Puntuación guardada:', response.data);
      })
      .catch((error) => {
        console.error('Error al guardar la puntuación:', error);
      });
  }

  getUserScores(data) {
    return axios
      .get(`http://localhost:3001/api/results/${data.gameId}/${data.userId}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error al obtener las puntuaciones:', error);
      });
  }

  getTotalScores(data) {
    return axios
      .get(`http://localhost:3001/api/results/${data.gameId}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error('Error al obtener las puntuaciones:', error);
      });
  }
}

class GameApi {
  getGameDataByName(gameName) {
    return axios
      .get(`http://localhost:3001/api/games/gameData/${gameName}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => {
        console.error('Error al obtener las puntuaciones:', error);
      });
  }

  saveGameData(data) {
    return axios
      .post('http://localhost:3001/api/games', {
        data
      })
      .then((response) => {
        console.log('Datos guardados:', response.data);
      })
      .catch((error) => {
        console.error('Error al guardar los datos:', error);
      });
  }
}

export { 
  UserApi,
  ScoreApi,
  GameApi
}
