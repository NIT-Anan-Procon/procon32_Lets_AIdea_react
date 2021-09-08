import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Voting.css";
import Title from "../common/Title";
import Icon from "../common/Icon";
import Name from "../common/Name";
import Image from "../common/Image";
import OtherDescription from "../common/OtherDescription";
import AttentionMessage from "../common/AttentionMessage";

export default function Voting() {
  const [data, setData] = useState({
    playerId: [
      {
        playerDescription: "百獣の王は静かに微笑みを湛えている",
        aiDescription: "草原でライオンが座っています",
        ngWord: ["草原", "ライオン"],
      },
      {
        playerDescription: "幾重の鳥居が私たちを待っている",
        aiDescription: "草に囲まれた赤い建物に光が当たっています",
        ngWord: ["草", "赤い", "光"],
      },
      {
        playerDescription: "プレイヤー説明文",
        aiDescription: "AI説明文",
        ngWord: ["NG1", "NG2", "NG3"],
      },
      {
        playerDescription: "プレイヤー説明文",
        aiDescription: "AI説明文",
        ngWord: ["NG1", "NG2", "NG3"],
      },
    ],
  });
  const [ngWord, setNgWord] = useState("");
  let myChoice = 0;
  const [attentionMessage, setAttentionMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    // TODO: APIとの通信
    for (let i = 0; i < data.playerId[0].ngWord.length; i++) {
      setNgWord((ngWord) => ngWord + data.playerId[0].ngWord[i]);
      if (i !== data.playerId[0].ngWord.length - 1)
        setNgWord((ngWord) => ngWord + ", ");
    }
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
    history.push("/quiz/award");
  };

  return (
    <div id="voting">
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
              <Icon src="https://source.unsplash.com/featured/?random" />
              <Name text="Togo" />
              <Image
                src="https://source.unsplash.com/featured/?lion"
                alt="各プレイヤーのお題画像"
                class="image"
              />
              <OtherDescription
                title={"NGワード：" + ngWord}
                text={data.playerId[0].playerDescription}
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
