import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Voting.css";
import AttentionMessage from "../../common/components/AttentionMessage";
import TimeUp from "../../common/components/TimeUp";
import Timer from "../../common/components/Timer";
import Title from "../../common/components/Title";
import DescriptionRow from "../components/DescriptionRow";

export default function Voting() {
  const [data, setData] = useState();
  const [myChoice, setMyChoice] = useState(-1);
  const history = useHistory();
  const [attentionMessage, setAttentionMessage] =
    useState("投票する作品を選んでください");
  const params = new FormData();
  const [errorMessage, setErrorMessage] = useState("読み込み中");
  const [time, setTime] = useState(90);
  const timer = useRef(null);
  const skipTimer = useRef(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Quiz/GetVoteInfo.php", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (myChoice >= 0) {
      document.getElementById("skip").disabled = true;
      document.getElementById("MyChoice1").disabled = true;
      document.getElementById("MyChoice2").disabled = true;
      document.getElementById("MyChoice3").disabled = true;
      document.getElementById("MyChoice4").disabled = true;
      console.log(myChoice);
      params.append("playerID", myChoice);
      axios
        .post(import.meta.env.VITE_API_HOST + "/API/Game/Vote.php", params, {
          withCredentials: true,
        })
        .then(() => {});
      skipTimer.current = setInterval(() => {
        axios
          .get(import.meta.env.VITE_API_HOST + "/API/Game/GetVoter.php", {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.playerNum === 0) {
              clearInterval(timer.current);
              clearInterval(skipTimer.current);
              history.push("/quiz/award");
            }
          });
      }, 1000);
    } else {
      return 0;
    }
  };

  if (time === 0) {
    clearInterval(timer.current);
    params.append("playerID", myChoice);
    if (myChoice >= 0) {
      axios
        .post(import.meta.env.VITE_API_HOST + "/API/Game/Vote.php", params, {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then(() => {});
    }
    setTimeout(() => {
      history.push("/quiz/award");
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
      <div className="quiz" id="quizVoting">
        <Title text="優秀な作品を決めよう" />
        <form onSubmit={handleSubmit} id="votingForm">
          <AttentionMessage text={attentionMessage} />
          <div id="descriptionTable">
            <DescriptionRow
              number={1}
              icon={data.player[1].icon}
              name={data.player[1].name}
              image={data.player[1].pictureURL}
              ngWord={getNgWord(1)}
              description={data.player[1].explanation}
              setMyChoice={setMyChoice}
              setAttentionMessage={setAttentionMessage}
            />
            <DescriptionRow
              number={2}
              icon={data.player[2].icon}
              name={data.player[2].name}
              image={data.player[2].pictureURL}
              ngWord={getNgWord(2)}
              description={data.player[2].explanation}
              setMyChoice={setMyChoice}
              setAttentionMessage={setAttentionMessage}
            />
            <DescriptionRow
              number={3}
              icon={data.player[3].icon}
              name={data.player[3].name}
              image={data.player[3].pictureURL}
              ngWord={getNgWord(3)}
              description={data.player[3].explanation}
              setMyChoice={setMyChoice}
              setAttentionMessage={setAttentionMessage}
            />
            <DescriptionRow
              number={4}
              icon={data.player[4].icon}
              name={data.player[4].name}
              image={data.player[4].pictureURL}
              ngWord={getNgWord(4)}
              description={data.player[4].explanation}
              setMyChoice={setMyChoice}
              setAttentionMessage={setAttentionMessage}
            />
          </div>
          <input type="submit" id="skip" value="確定する" />
        </form>
        <Timer time={time} />
        <TimeUp time={time} />
      </div>
    );
  }
}
