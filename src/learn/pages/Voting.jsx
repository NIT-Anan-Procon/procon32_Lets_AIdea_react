import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Voting.css";
import Player from "../components/Player";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import aiImg from "../../image/aiImg.svg";

function Voting() {
  const [data, setData] = useState();
  const history = useHistory();

  return (
    <div id="learnVoting">
      <Title text="優秀な作品を決めよう" />
      <Image
        src="https://source.unsplash.com/featured/?lion"
        alt="explanationImg"
      />
      <div className="players">
        <Player src="" name="AI" explanation="" />
        <Player
          src={userData.playerId[0].imageIcon}
          name={userData.playerId[0].name}
          explanation={wordData.playerId[0].explanation}
        />
        <Player
          src={userData.playerId[1].imageIcon}
          name={userData.playerId[1].name}
          explanation={wordData.playerId[1].explanation}
        />
        <Player
          src={userData.playerId[2].imageIcon}
          name={userData.playerId[2].name}
          explanation={wordData.playerId[2].explanation}
        />
        <Player
          src={userData.playerId[3].imageIcon}
          name={userData.playerId[3].name}
          explanation={wordData.playerId[3].explanation}
        />
      </div>
    </div>
  );
}

export default Voting;
