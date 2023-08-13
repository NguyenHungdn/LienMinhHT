import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home({ cl, setCl, handleCl }) {
  const [champions, setChampions] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChampionClick = (id) => {
    navigate(`/${id}`);
  };
  useEffect(() => {
    async function getDataChampion() {
      try {
        const response = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/12.21.1/data/vn_VN/champion.json`
        );
        const data = response.data;
        setChampions(Object.values(data.data));
      } catch (error) {
        console.error("Error fetching champions:", error);
      }
    }
    getDataChampion();
  }, []);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredChampions =
    champions &&
    champions.filter((champion) => {
      return champion.name.toLowerCase().includes(searchValue.toLowerCase());
    });

  return (
    <div className="all-home flex flex-col items-center justify-center">
      <div className="header-home w-[1440px] h-[131px] bg-slate-500 ">
        <div className="title-home">Liên Minh Huyền Thoại</div>
      </div>

      <div className="search-home h-[50px] w-[350px] my-[68px] flex justify-center items-center ">
        <input
          className="input-home w-[90%] h-[90%] bg-slate-500  "  
          type="text"
          placeholder="Tìm theo tên tướng"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="cham-box-home w-[1440px] flex flex-wrap gap-[46px] items-center px-[204px] text-white   " >
        {champions ? (
          filteredChampions.map((champion) => (
            <div
              className="champion-home relative  "
              key={champion.id}
              onClick={() => handleChampionClick(champion.id)}
            >
              <img
                className="cham-img-home h-[420px] w-[312px] rounded-xl shadow "
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                alt={champion.name}
              />
              <div className="mark absolute bottom-0 bg-black opacity-60 bg w-full h-[147px] rounded-xl "></div>
              <div className="cham-info absolute bottom-0 bg-transparent bg w-full h-[147px] rounded-xl ">
                <div className="cham-name absolute top-[30px] left-[26px] text-white text-[20px] font-semibold tracking-wider "> {champion.id} </div>
                <div className="cham-role">
                  <div>
                    {champion.tags.slice(0, 2).map((tag, index) => (
                      <div key={index} className={`cham-role${index + 1}`}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}

export default Home;
