import Home from "./components/Home/Home";
import ChampionInfo from "./components/Home/ChampionInfo/";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App flex flex-col justify-center items-center  bg-slate-800 ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ChampionInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
