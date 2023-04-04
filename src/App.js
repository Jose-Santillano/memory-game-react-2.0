import React, { useState } from 'react';

//Components.
import FinishScreen from "./components/FinishScreen";
import GameScreen from "./components/GameScreen";
import MainScreen from "./components/MainScreen";

function App() {

  //Variables de estado
  const [level, setLevel] = useState(0); //0,1,2 - Dificultad
  const [stateGame, setStateGame] = useState(0); //Indicar el estado del juego
  // > para el timer
  const [intervalId, setIntervalId] = useState(0);
  const [miliseconds, setMiliseconds] = useState(0);

  //Funcion para cambiar el nivel de dificultad
  const changeDifficulty = () => {
    setLevel(level === 2 ? 0 : level + 1);
  }

  //Funcion para saber el estado el juego
  // 0: No iniciado, 1: En proceso, 2: Finalizado
  const changeStateGame = (value) => {
    setStateGame(value);
    if (value === 1) playTimer();
  } 

  //Objeto con el numero de tarjetas a crear segun el nivel.
  const cardsByLevel = {
    0: 8,
    1: 16,
    2: 24
  }

  //Funciones para el timer
  const playTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
    const newIntervalId = setInterval(() => {
      //Cada segundo se va a actualizar el contador
      setMiliseconds(miliseconds => miliseconds + 1000);
    }, 1000);

    setIntervalId(newIntervalId);
  }

  //Funcion para reiniciar el juego
  const restartGame = () => {
    setStateGame(0);
    setLevel(0);
    resetTimer();
  }

  //Funcion para detener el time
  const resetTimer = () => {
    setMiliseconds(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
  }

  //Funcion para mostrar mensaje final.

  return (
    <div className='container middle'>
      { stateGame === 0
        ? 
        <MainScreen
          level={level}
          changeDifficulty={changeDifficulty}
          setStart={changeStateGame}
        /> 
        : stateGame === 1
          ?
          <GameScreen
            numCard={cardsByLevel[level]}
            time={miliseconds}
            setRestart={restartGame}
            setFinish={changeStateGame}
          />
          :
          <FinishScreen setRestart={restartGame} />
      }
    </div>
  );
}

export default App;
