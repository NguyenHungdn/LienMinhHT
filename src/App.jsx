import Home from "./components/Home/Home";
import ChampionInfo from "./components/Home/ChampionInfo/";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App bg-slate-800 flex flex-col justify-center items-center ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ChampionInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
