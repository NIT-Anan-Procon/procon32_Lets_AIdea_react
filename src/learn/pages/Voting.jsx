import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Voting.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import aiImg from "../../image/aiImg.svg";
import AttentionMessage from "../../common/components/AttentionMessage";
import SelectionLabel from "../components/SelectionLabel";

export default function Voting() {
  const [data, setData] = useState();
  const [myChoice, setMyChoice] = useState(0);
  const [attentionMessage, setAttentionMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost/API/Learn/GetLearnResult.php")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  }, []);

  useEffect(() => {
    if (!data) return 0;
    document.getElementById("choice" + data.playerID).disabled = true;
  }, [data]);

  const handleChange = (event) => {
    setMyChoice(event.target.value);
  };

  const handleSubmit = (event) => {
    if (myChoice === 0) {
      event.preventDefault();
      setAttentionMessage("投票する作品を選んでください");
      return 0;
    }
    history.push("/learn/award");
  };

  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onUnload);
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      history.go(1);
    });
  });

  if (!data) return <div>読み込み中</div>;
  else {
    return (
      <div className="learn" id="learnVoting">
        <Title text="優秀な作品を決めよう" />
        <Image src={data.pictureURL} alt="explanationImg" />
        <form onSubmit={handleSubmit} className="votingForm">
          <div className="selections">
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={1}
                onChange={handleChange}
                id="choiceAI"
              />
              <label htmlFor="choiceAI">
                <SelectionLabel icon={aiImg} name="AI" explanation={data.AI} />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={2}
                onChange={handleChange}
                id="choice1"
              />
              <label htmlFor="choice1">
                <SelectionLabel
                  icon={data.player[1].icon}
                  name={data.player[1].name}
                  explanation={data.player[1].explanation}
                />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={3}
                onChange={handleChange}
                id="choice2"
              />
              <label htmlFor="choice2">
                <SelectionLabel
                  icon={data.player[2].icon}
                  name={data.player[2].name}
                  explanation={data.player[2].explanation}
                />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={4}
                onChange={handleChange}
                id="choice3"
              />
              <label htmlFor="choice3">
                <SelectionLabel
                  icon={data.player[3].icon}
                  name={data.player[3].name}
                  explanation={data.player[3].explanation}
                />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={5}
                onChange={handleChange}
                id="choice4"
              />
              <label htmlFor="choice4">
                <SelectionLabel
                  icon={data.player[4].icon}
                  name={data.player[4].name}
                  explanation={data.player[4].explanation}
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
}
