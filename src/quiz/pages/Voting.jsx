import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Voting.css";
import Title from "../../common/components/Title";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import Image from "../../common/components/Image";
import OtherDescription from "../../common/components/OtherDescription";
import AttentionMessage from "../../common/components/AttentionMessage";

export default function Voting() {
  const [data, setData] = useState();
  let myChoice = 0;
  const [attentionMessage, setAttentionMessage] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");

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

  const handleChange = (event) => {
    myChoice = event.target.value;
  };

  const handleSubmit = (event) => {
    if (myChoice === 0) {
      event.preventDefault();
      setAttentionMessage("投票する作品を選んでください");
      return 0;
    }
    history.push("/quiz/award");
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
            <div className="descriptionRow">
              <input
                type="radio"
                name="selectDescription"
                value={1}
                onChange={handleChange}
                id="myChoice1"
              />
              <label htmlFor="myChoice1" id="description1">
                <Icon src={data.player[1].icon} />
                <Name text={data.player[1].name} />
                <Image
                  src={data.player[1].pictureURL}
                  alt="各プレイヤーのお題画像"
                  class="image"
                />
                <OtherDescription
                  title={"NGワード：" + getNgWord(1)}
                  text={data.player[1].explanation}
                />
              </label>
            </div>
            <div className="descriptionRow">
              <input
                type="radio"
                name="selectDescription"
                value={2}
                onChange={handleChange}
                id="myChoice2"
              />
              <label htmlFor="myChoice2" id="description2">
                <Icon src={data.player[2].icon} />
                <Name text={data.player[2].name} />
                <Image
                  src={data.player[2].pictureURL}
                  alt="各プレイヤーのお題画像"
                  class="image"
                />
                <OtherDescription
                  title={"NGワード：" + getNgWord(2)}
                  text={data.player[2].explanation}
                />
              </label>
            </div>
            <div className="descriptionRow">
              <input
                type="radio"
                name="selectDescription"
                value={3}
                onChange={handleChange}
                id="myChoice3"
              />
              <label htmlFor="myChoice3" id="description3">
                <Icon src={data.player[3].icon} />
                <Name text={data.player[3].name} />
                <Image
                  src={data.player[3].pictureURL}
                  alt="各プレイヤーのお題画像"
                  class="image"
                />
                <OtherDescription
                  title={"NGワード：" + getNgWord(3)}
                  text={data.player[3].explanation}
                />
              </label>
            </div>
            <div className="descriptionRow">
              <input
                type="radio"
                name="selectDescription"
                value={4}
                onChange={handleChange}
                id="myChoice4"
              />
              <label htmlFor="myChoice4" id="description4">
                <Icon src={data.player[4].icon} />
                <Name text={data.player[4].name} />
                <Image
                  src={data.player[4].pictureURL}
                  alt="各プレイヤーのお題画像"
                  class="image"
                />
                <OtherDescription
                  title={"NGワード：" + getNgWord(4)}
                  text={data.player[4].explanation}
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
