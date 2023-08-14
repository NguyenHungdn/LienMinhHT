import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="all-home bg-slate-800 flex flex-col items-center justify-center mx-[auto] ">
      <div className="header-home w-full h-[131px] bg-slate-500 ">
        <div className="title-home flex justify-center text-center ">
          <p className="text-[30px] pt-8 font-extrabold text-gray-800">
            League of Legend Champions
          </p>
        </div>
      </div>

      <div className="search-home h-[50px] w-[350px] my-[68px] flex justify-center items-center ">
        <input
          className="input-home w-[90%] h-[90%] bg-slate-500 pl-2 rounded-lg text-zinc-800"
          type="text"
          placeholder="Tìm theo tên tướng"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="cham-box-home md:w-[100%] xl:w-[80%] lg:w-[70%]  flex flex-wrap gap-[40px] items-center justify-center  text-white   ">
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
                <div className="cham-name absolute top-[30px] left-[26px] text-white text-[20px] font-semibold tracking-wider ">
                  {" "}
                  {champion.id}{" "}
                </div>
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
          <div className="h-[100vh] bg-slate-500"> </div>
        )}
      </div>
      <div className="bg-slate-500 h-[68vh]"></div>
    </div>
  );
}

export default Home;
