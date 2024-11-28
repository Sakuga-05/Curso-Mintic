import './App.css'
import { useState } from 'react';

function Recuadro({value, onSquareClick}) {
  return(  
    <button className="recuadro" onClick={onSquareClick}>{value}</button>
  )
}

export default function Tablero() {
  const [siguiente, setSiguiente] = useState(true);
  const [recuadro, setRecuadro] = useState(Array(9).fill(null));
  
  function handleClick(i) {
    if(recuadro[i] || calcularGanador(recuadro)) {
      return;
    }

    const siguienteJugador = recuadro.slice();
    
    if(siguiente) {
      siguienteJugador[i] = "X";
    }
    else {
      siguienteJugador[i] = "O";
    }
    setRecuadro(siguienteJugador);
    setSiguiente(!siguiente);
  }

  //Definir ganador
  const ganador = calcularGanador(recuadro);
    
  let estado;

  if (ganador) {
    estado = "Ganador: " + ganador;
  } 
  else {
    estado = "Siguiente jugador: " + (siguiente ? "X" : "O");
  }

  return (
    <>
      <div className='estado'>{estado}</div>
      <div className='filas'>
        <Recuadro value={recuadro[0]} onSquareClick={() => handleClick(0)}/>
        <Recuadro value={recuadro[1]} onSquareClick={() => handleClick(1)}/>
        <Recuadro value={recuadro[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='filas'>
        <Recuadro value={recuadro[3]} onSquareClick={() => handleClick(3)}/>
        <Recuadro value={recuadro[4]} onSquareClick={() => handleClick(4)}/>
        <Recuadro value={recuadro[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='filas'>
        <Recuadro value={recuadro[6]} onSquareClick={() => handleClick(6)}/>
        <Recuadro value={recuadro[7]} onSquareClick={() => handleClick(7)}/>
        <Recuadro value={recuadro[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

function calcularGanador(recuadro) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (recuadro[a] && recuadro[a] === recuadro[b] && recuadro[a] === recuadro[c]) {
      return recuadro[a];
    }
  }
  return null;
}