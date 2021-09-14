import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Voting.css";
import Player from "../components/Player";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import aiImg from "../../image/aiImg.svg";
import AttentionMessage from "../../common/components/AttentionMessage";

function Voting() {
  const [data, setData] = useState({
    playerId: 1,
    AI: "草原でライオンが座っています",
    pictureURL: "https://source.unsplash.com/featured/?lion",
    picture: [
      {
        name: "Togo",
        icon: "https://source.unsplash.com/featured/?lion",
        explanation: "百獣の王は静かに微笑みを湛えている",
      },
      {
        name: "Togo",
        icon: "https://source.unsplash.com/featured/?lion",
        explanation: "百獣の王は静かに微笑みを湛えている",
      },
      {
        name: "Togo",
        icon: "https://source.unsplash.com/featured/?lion",
        explanation: "百獣の王は静かに微笑みを湛えている",
      },
      {
        name: "Togo",
        icon: "https://source.unsplash.com/featured/?lion",
        explanation: "百獣の王は静かに微笑みを湛えている",
      },
    ],
  });
  const [attentionMessage, setAttentionMessage] = useState("");
  const history = useHistory();
  let myChoice = 0;

  useEffect(() => {
    // axios
    //     .get("http://localhost/API/Quiz/GetVoteInfo.php")
    //     .then((res) => {
    //         console.log(res.data);
    //         setData(res.data);
    //     })
    //     .catch((error) => {
    //         console.log(error.request.status);
    //     });
  }, []);

  const handleChange = (event) => {
    myChoice = event.target.value;
  };

  const handleSubmit = (event) => {
    if (myChoice === 0) {
      event.preventDefault();
      setAttentionMessage("投票する作品を選んでください");
      return 0;
    }
    history.push("/learn/award");
  };

  return (
    <div id="learnVoting">
      <Title text="優秀な作品を決めよう" />
      <Image src={data.pictureURL} alt="explanationImg" />
      <form onSubmit={handleSubmit} className="votingForm">
        <div className="selections">
          <div className="selection">
            <input type="radio" value={1} onChange={handleChange} />
            <label>
              <Player src={aiImg} name="AI" explanation={data.AI} />
            </label>
          </div>
          <div className="selection">
            <input type="radio" value={2} onChange={handleChange} />
            <label>
              <Player
                src={data.picture[1].icon}
                name={data.picture[1].name}
                explanation={data.picture[1].explanation}
              />
            </label>
          </div>
          <div className="selection">
            <input type="radio" value={3} onChange={handleChange} />
            <label>
              <Player
                src={data.picture[2].icon}
                name={data.picture[2].name}
                explanation={data.picture[2].explanation}
              />
            </label>
          </div>
          <div className="selection">
            <input type="radio" value={4} onChange={handleChange} />
            <label>
              <Player
                src={data.picture[3].icon}
                name={data.picture[3].name}
                explanation={data.picture[3].explanation}
              />
            </label>
          </div>
          <div className="selection">
            <input type="radio" value={5} onChange={handleChange} />
            <label>
              <Player
                src={data.picture[0].icon}
                name={data.picture[0].name}
                explanation={data.picture[0].explanation}
              />
            </label>
          </div>
        </div>
        <AttentionMessage text={attentionMessage} />
        <input type="submit" value="投票する" />
      </form>
    </div>
  );
}

export default Voting;
