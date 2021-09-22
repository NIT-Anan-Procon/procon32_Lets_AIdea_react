import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Voting.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import aiImg from "../../image/aiImg.svg";
import AttentionMessage from "../../common/components/AttentionMessage";
import SelectionLabel from "../components/SelectionLabel";
import Timer from "../../common/components/Timer";
import TimeUp from "../../common/components/TimeUp";

export default function Voting() {
  const [data, setData] = useState();
  const [myChoice, setMyChoice] = useState(-1);
  const history = useHistory();
  const [attentionMessage, setAttentionMessage] =
    useState("投票する作品を選んでください");
  const [errorMessage, setErrorMessage] = useState("読み込み中");
  const params = new FormData();
  const [time, setTime] = useState(90);
  const timer = useRef(null);

  useEffect(() => {
    axios
      .get(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Learn/GetLearnResult.php"
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!data) return 0;
    document.getElementById("choice" + data.playerID).disabled = true;
  }, [data]);

  const handleChange = (event) => {
    setMyChoice(event.target.value);
    setAttentionMessage("");
  };

  if (time === 0) {
    clearInterval(timer.current);
    params.append("playerID", myChoice);
    if (myChoice >= 0) {
      axios
        .post(
          "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Game/Vote.php",
          params
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.request.status);
        });
    }
    setTimeout(() => {
      history.push("/learn/award");
    }, 5000);
  }

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

  if (!data) return <div>{errorMessage}</div>;
  else {
    return (
      <div className="learn" id="learnVoting">
        <Title text="優秀な作品を決めよう" />
        <Image src={data.pictureURL} alt="explanationImg" />
        <form className="votingForm">
          <AttentionMessage text={attentionMessage} />
          <div className="selections">
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={0}
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
                value={1}
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
                value={2}
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
                value={3}
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
                value={4}
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
        </form>
        <Timer time={time} />
        <TimeUp time={time} />
      </div>
    );
  }
}
