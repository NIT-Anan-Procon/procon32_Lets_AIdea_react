import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Voting.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import aiImg from "../../image/aiImg.svg";
import AttentionMessage from "../../common/components/AttentionMessage";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import OtherDescription from "../../common/components/OtherDescription";

export default function Voting() {
  const [data, setData] = useState();
  const [attentionMessage, setAttentionMessage] = useState("");
  const history = useHistory();
  let myChoice = 0;

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

  if (!data) return <div>読み込み中</div>;
  else {
    return (
      <div id="learnVoting">
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
              />
              <label>
                <Icon src={aiImg} />
                <Name text="AI" />
                <OtherDescription text={data.AI} />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={2}
                onChange={handleChange}
              />
              <label>
                <Icon src={data.player[1].icon} />
                <Name text={data.player[1].name} />
                <OtherDescription text={data.player[1].explanation} />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={3}
                onChange={handleChange}
              />
              <label>
                <Icon src={data.player[2].icon} />
                <Name text={data.player[2].name} />
                <OtherDescription text={data.player[2].explanation} />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={4}
                onChange={handleChange}
              />
              <label>
                <Icon src={data.player[3].icon} />
                <Name text={data.player[3].name} />
                <OtherDescription text={data.player[3].explanation} />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={5}
                onChange={handleChange}
              />
              <label>
                <Icon src={data.player[4].icon} />
                <Name text={data.player[4].name} />
                <OtherDescription text={data.player[4].explanation} />
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
