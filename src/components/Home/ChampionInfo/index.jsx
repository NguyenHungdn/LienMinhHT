import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Skill from "./Skills";

function ChampionInfo() {
  const { id } = useParams();
  const [championData, setChampionData] = useState(null);

  // skin

  const [selectedSkin, setSelectedSkin] = useState(0);

  const handleSkinClick = (index) => {
    setSelectedSkin(index);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/12.21.1/data/vn_VN/champion/${id}.json`
        );
        setChampionData(response.data.data);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    }
    fetchData();
  }, []);
  // use championData.${chamid}.data
  // liệu có thể truyền cả hàm useEffect vào giá trị của championData không
  return (
    <div className="all-info flex flex-col justify-center items-center w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px]  bg-slate-800 ">
      {!championData ? (
        <>Loadding</>
      ) : (
        <div className=" flex flex-col items-center justify-center overflow-hidden visible">
          <div className="header-info h-[100px] w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1080px] 2xl:w-[1440px] bg-slate-300 flex mx-auto justify-center items-end pb-[10px] ">
            <p className="text-[40px] font-bold tracking-widest ">
              {championData[id].id}
            </p>
          </div>
          <Link
            to="/"
            className="back-link  h-[100px] text-[50px] cursor-pointer text-sky-500"
            onClick={() => {
              setChampionData(null);
            }}
          >
            Back to Home
          </Link>
{/* ---------------------------------InFo------------------------------ */}
          <div className="container-info mx-auto flex items-center flex-col w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px] text-white">
            <img
              className="cham-bg w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px] xl:h-[620px] mb-[30px] "
              src={
                championData &&
                `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`
              }
              alt={id}
            />
            <div className="lore-text w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px] flex justify-center items-center h-[40px] bg-slate-500 mb-[30px] ">
              <p>LORE</p>
            </div>
            <div className="cham-lore w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px] mb-[30px]">
              {championData[id].lore}
            </div>
            <div className="skill-box w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px] ">
              <div className="skill-text w-full flex justify-center items-center h-[40px] bg-slate-500 mb-[30px] ">
                <p>SKILL</p>
              </div>
              <Skill
                passive={championData[id].passive}
                spells={championData[id].spells}
              />
            </div>
            <div className="skin-text  flex justify-center items-center h-[40px] w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px] bg-slate-500 mb-[30px] ">
              <p>SKIN</p>
            </div>
            <div>
              <div className="list-skins flex flex-col  mb-[30px] w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px] h-[180px] flex-wrap overflow-auto">
                {championData[id].skins.map((data, index) => {
                  return (
                    <div className="skin-container relative h-[150px] cursor-pointer  " key={data.num}>
                      <img
                        className="skins h-[150px] rounded-md "
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${data.num}.jpg`}
                        alt={data.name}
                        onClick={() => handleSkinClick(index)}
                      />
                      <div className="overlay-text absolute bottom-[10px] bg-black  ml-2 p-1 rounded-md">{data.name}</div>
                    </div>
                  );
                })}
              </div>
              {selectedSkin !== null && (
                <div className="modal w-[480px] sm:w-[600px] md:w-[720px] xl:w-[1024px]">
                  <div className="modal-content ">
                    <img
                      className="full-skin hover:scale-[1.2] "
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${championData[id].skins[selectedSkin].num}.jpg`}
                      alt={championData[id].skins[selectedSkin].name}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChampionInfo;
