import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Skills from "./Skills";

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
    <div className="all-info">
      <Link
        to="/"
        className="back-link"
        onClick={() => {
          setChampionData(null);
        }}
      >
        Back to Home
      </Link>

      {!championData ? (
        <>Loadding</>
      ) : (
        <div>
          <div className="header-info">
            <p>{championData[id].id}</p>
          </div>
          <div className="container-info">
            <img
              className="cham-bg"
              src={
                championData &&
                `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`
              }
              alt={id}
            />
            <div className="lore-text">LORE</div>
            <div className="cham-lore">{championData[id].lore}</div>
            <div className="skill-box">
              <div className="skill-text"> SKILL</div>
              <Skills
                passive={championData[id].passive}
                spells={championData[id].spells}
              />
            </div>
            <div className="skin-text">SKIN</div>
            <div>
              <div className="list-skins">
                {championData[id].skins.map((data, index) => {
                  return (
                    <div className="skin-container" key={data.num}>
                      <img
                        className="skins"
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${data.num}.jpg`}
                        alt={data.name}
                        onClick={() => handleSkinClick(index)}
                      />
                      <div className="overlay-text">{data.name}</div>
                    </div>
                  );
                })}
              </div>
              {selectedSkin !== null && (
                <div className="modal">
                  <div className="modal-content">
                    <img
                      className="full-skin"
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
