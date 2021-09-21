import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Voting.css";
import Title from "../../common/components/Title";
import DescriptionRow from "../components/DescriptionRow";
import AttentionMessage from "../../common/components/AttentionMessage";
import Timer from "../../common/components/Timer";
import TimeUp from "../../common/components/TimeUp";

export default function Voting() {
  const [data, setData] = useState();
  const [myChoice, setMyChoice] = useState(0);
  const history = useHistory();
  const [attentionMessage, setAttentionMessage] =
    useState("投票する作品を選んでください");
  const [errorMessage, setErrorMessage] = useState("読み込み中");
  const [time, setTime] = useState(90);
  const timer = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost/API/Quiz/GetVoteInfo.php")
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
    document.getElementById("myChoice" + data.playerID).disabled = true;
  }, [data]);

  const getNgWord = (number) => {
    let ngWord = "";
    for (let i = 0; i < data.player[number].ng.length; i++) {
      ngWord += data.player[number].ng[i];
      if (i !== data.player[number].ng.length - 1) ngWord += ", ";
    }
    return ngWord;
  };

  if (time === 0) {
    clearInterval(timer.current);
    setTimeout(() => {
      history.push("/quiz/award");
    }, 5000);
  }

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
  });

  if (!data) return <div>{errorMessage}</div>;
  else {
    return (
      <div className="quiz" id="quizVoting">
        <Title text="優秀な作品を決めよう" />
        <form id="votingForm">
          <AttentionMessage text="投票する作品を選んでください" />
          <div id="descriptionTable">
            <DescriptionRow
              number={1}
              icon={data.player[1].icon}
              name={data.player[1].name}
              image={data.player[1].pictureURL}
              ngWord={getNgWord(1)}
              description={data.player[1].explanation}
              setMyChoice={setMyChoice}
            />
            <DescriptionRow
              number={2}
              icon={data.player[2].icon}
              name={data.player[2].name}
              image={data.player[2].pictureURL}
              ngWord={getNgWord(2)}
              description={data.player[2].explanation}
              setMyChoice={setMyChoice}
            />
            <DescriptionRow
              number={3}
              icon={data.player[3].icon}
              name={data.player[3].name}
              image={data.player[3].pictureURL}
              ngWord={getNgWord(3)}
              description={data.player[3].explanation}
              setMyChoice={setMyChoice}
            />
            <DescriptionRow
              number={4}
              icon={data.player[4].icon}
              name={data.player[4].name}
              image={data.player[4].pictureURL}
              ngWord={getNgWord(4)}
              description={data.player[4].explanation}
              setMyChoice={setMyChoice}
            />
          </div>
        </form>
        <Timer time={time} />
        <TimeUp time={time} />
      </div>
    );
  }
}
