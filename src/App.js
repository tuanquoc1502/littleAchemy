import React from 'react'
import Body from "./components/Body";
import Navbar from "./components/Navbar";

function App() {
  const [board, setBoard] = React.useState([]);
  const [icons, setIcons] = React.useState(['air', 'earth', 'fire', 'water']);
  return (
    <div className="App">
      <Body board={board} setBoard={setBoard} setIcons={setIcons} />
      <Navbar icons={icons} setIcons={setIcons} setBoard={setBoard} />
    </div>
  );
}

export default App;
