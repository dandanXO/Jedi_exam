// pages/find-the-cheese.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function FindTheCheese({  }) {
  const [mazes, setMazes] = useState([]);
  const [solving, setSolving] = useState(new Array(10).fill(false));
  const [shouldContinue, setShouldContinue] = useState(new Array(10).fill(true));


  useEffect(()=>{
    axios.get('/api/maze').then(res=>{
      setMazes(res.data)
    });
  }, [])
  // DFS function to solve the maze
  const  dfs = async(maze, x, y, path = [], callback, startSIndex) => {
    if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length || maze[x][y] !== 'path' && maze[x][y] !== 'start' && maze[x][y] !== 'end') {
      return false;
    }
    // if (!shouldContinue[startSIndex]) return false;  // break down 
    if (maze[x][y] === 'end') {
      path.push([x, y]);
      callback([...path]);
      return true;
    }

    maze[x][y] = 'visited'; // Mark as visited
    path.push([x, y]);
  
    // Update UI  current path
    callback([...path]);
  
    // Introduce a delay
    await new Promise(resolve => setTimeout(resolve, 100));
  
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up
    for (let [dx, dy] of directions) {
      if (await dfs(maze, x + dx, y + dy, path, callback, startSIndex)) {
        return true;
      }
    }
  
    path.pop(); // Backtracking
    maze[x][y] = 'path'; // Mark back to  path
    return false;
  };

  // Start solving the maze
  const startSolving = async(index) => {
    // setShouldContinue(shouldContinue.map((val, idx) => idx === index ? true : val)); // Enable DFS to continue for this maze
    let newShouldContinue = [...shouldContinue];
    
    newShouldContinue[index] = true; // Set DFS to stop for this maze
    setShouldContinue(pre=>newShouldContinue);
    let newMazes = [...mazes];
    let path = [];
    let start = findStart(newMazes[index]);
    let newSolving = [...solving];
    newSolving[index] = true;
    setSolving(newSolving);
    if (start) {
        await dfs(newMazes[index], start[0], start[1], path, (updatedPath) => {
          // Update the UI after each step
          let tempMazes = newMazes;
          for (let [x, y] of updatedPath) {
            if (tempMazes[index][x][y] === 'path' || tempMazes[index][x][y] === 'visited') {
              tempMazes[index][x][y] = 'mouse'; // Mark the current path
            }
            setMazes(val=>val=tempMazes);
          }
          tempMazes = [...tempMazes]
          setMazes(val=>val=tempMazes);
        }, index);
        
    }

  };

  // Find the start position in the maze
  const findStart = (maze) => {
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (maze[i][j] === 'start') return [i, j];
      }
    }
  };

  // Reset the maze to its initial state
  const resetMaze = (index) => {
    let newMazes = [...mazes];
    newMazes[index] = mazes[index].map(row => row.map(cell => cell === 'mouse' || cell === 'visited' ? 'path' : cell));
    setMazes(newMazes);

    let newShouldContinue = [...shouldContinue];
    
    newShouldContinue[index] = null; // Set DFS to stop for this maze
    setShouldContinue(pre=>[...newShouldContinue]);
    
    let newSolving = [...solving];
    newSolving[index] = false;
    
    setSolving(newSolving);
    axios.get('/api/maze').then(res=>{
      let newMazes = [...mazes]
      newMazes[index] = res.data[index]
      setMazes(newMazes)
    });
  };

  // Render the mazes with start/reset buttons
  return (
    <Layout>
    <div className='flex content-center items-center flex-col'>
      <h1>Find the Cheese</h1>
      {mazes.map((maze, index) => (
        <div key={index} className='mb-6 flex content-center items-center flex-col'>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${maze[0].length}, 20px)` }}>
            {maze.map((row, rowIndex) => row.map((cell, cellIndex) => (
              <div key={`${rowIndex}-${cellIndex}`} style={{ width: 20, height: 20, backgroundColor: getCellColor(cell) }}></div>
            )))}
          </div>
          {solving[index] ? (
            <button onClick={() => resetMaze(index)} className={'bg-amber-500 hover:bg-amber-400 mt-2' }>Reset</button>
          ) : (
            <button onClick={() => startSolving(index)} className={'bg-amber-500 hover:bg-amber-400 mt-2' }>Start</button>
          )}
        </div>
      ))}
    </div>
    </Layout>
  );
}

// Determine the cell color based on its type
const getCellColor = (cellType) => {
  switch (cellType) {
    case 'wall':
      return '#065f46'; // green-800
    case 'path':
    case 'visited':
      return '#ecfccb'; // lime-50
    case 'start':
    case 'mouse':
      return '#d1d5db'; // neutral-500
    case 'end':
      return '#fdba74'; // amber-400
    default:
      return '#ffffff';
  }
};

// Fetch mazes on server-side rendering

