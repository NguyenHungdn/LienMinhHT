import { useState } from "react";

const Skills = (props) => {
  // Use Array
  const skillImg = [
    `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/passive/${props.passive.image.full}`,
    `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[0].image.full}`,
    `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[1].image.full}`,
    `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[2].image.full}`,
    `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[3].image.full}`
  ];
  const skillData = [
    props.passive.description,
    props.spells[0].description,
    props.spells[1].description,
    props.spells[2].description,
    props.spells[3].description
  ];
  const skillName = [
    props.passive.name,
    props.spells[0].name,
    props.spells[1].name,
    props.spells[2].name,
    props.spells[3].name
  ];
  const [selectedSkill, setSelectedSkill] = useState(0);

  const handleSkillClick = (index) => {
    setSelectedSkill(index);
  };
  return (
    <div className="container">
      <div className="top-section">
        {skillImg.map((img, index) => (
          <span
            key={index}
            className={`skill-img ${selectedSkill === index ? "selected" : ""}`}
            onClick={() => handleSkillClick(index)}
          >
            <img src={img} alt={`skill ${index}`} />
          </span>
        ))}
      </div>
      <div className="skill-name"> Name: {skillName[selectedSkill]} </div>
      <div className="bottom-section">
        <div className="skill-content">
          <p>{skillData[selectedSkill]}</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;

/* 
use Obj 
const skillImg = {
    p: `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/passive/${props.passive.image.full}`,
    q: `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[0].image.full}`,
    w: `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[1].image.full}`,
    e: `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[2].image.full}`,
    r: `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${props.spells[3].image.full}`
  };
  const skillData = {
    p: props.passive.description,
    q: props.spells[0].description,
    w: props.spells[1].description,
    e: props.spells[2].description,
    r: props.spells[3].description
  };

  const [selectedRank, setSelectedRank] = useState("A");

  const handleRankClick = (skill) => {
    setSelectedRank(skill);
  };

  return (
    <div className="container">
      <div className="top-section">
        {Object.keys(skillData).map((skill) => (
          <div
            key={skill}
            className={`skill ${selectedRank === skill ? "selected" : ""}`}
            onClick={() => handleRankClick(skill)}
          >
            <img src={skillImg[skill]} alt={skill} />
          </div>
        ))}
      </div>
      <div className="bottom-section">
        {selectedRank && (
          <div className="skill-content">
            <p>{skillData[selectedRank]}</p>
          </div>
        )}
      </div>
    </div>
  );

*/
