import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Voting.css";
import Title from "../../common/components/Title";
import DescriptionRow from "../components/DescriptionRow";
import AttentionMessage from "../../common/components/AttentionMessage";

export default function Voting() {
  const [data, setData] = useState();
  const [myChoice, setMyChoice] = useState(0);
  const [attentionMessage, setAttentionMessage] = useState("");
  const history = useHistory();
  const params = new FormData();
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Quiz/GetVoteInfo.php"
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
    if (myChoice === 0) {
      event.preventDefault();
      setAttentionMessage("投票する作品を選んでください");
      return 0;
    }
    params.append("playerID", myChoice + "");
    axios
      .post(
        "http://localhost/~kinoshita/procon32_Lets_AIdea_php/API/Game/AddVote.php",
        {
          params,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        history.push("/quiz/award");
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  };

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
  });

  if (!data) return <div>{errorMessage}</div>;
  else {
    return (
      <div className="quiz" id="quizVoting">
        <Title text="優秀な作品を決めよう" />
        <form onSubmit={handleSubmit} id="votingForm">
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
          <AttentionMessage text={attentionMessage} />
          <input type="submit" value="投票する" />
        </form>
      </div>
    );
  }
}
