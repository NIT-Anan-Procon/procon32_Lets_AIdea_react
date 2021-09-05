import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Answer.css";
import Timer from "../common/Timer";
import circle from "../image/circle.png";
import cross from "../image/cross.png";

export default function Answer() {
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
  const [otherDescription, setOtherDescription] = useState();
  let myChoice = 0;
  const urlOption = ["lion", "torii", "idol", "nature"];
  const [imageUrl, setImageUrl] = useState();
  let correct = [1, 2, 3, 4];
  const [mark, setMark] = useState([]);
  const history = useHistory();
  const [time, setTime] = useState(40);
  let timeCopy = time;

  useEffect(() => {
    // TODO: APIとの通信
  }, []);

  const handleChange = (event) => {
    myChoice = event.target.value;
  };

  useEffect(() => {
    setOtherDescription(data.playerId[4 - time / 10].playerDescription);
    setImageUrl(
      "https://source.unsplash.com/featured/?" + urlOption[4 - time / 10]
    );
    function startTimer() {
      const timer = setInterval(() => {
        setTime((time) => time - 1);
        timeCopy--;
        if (timeCopy % 10 === 0) {
          // TODO: APIとの通信
          document.getElementById("myChoice1").disabled = true;
          document.getElementById("myChoice2").disabled = true;
          document.getElementById("myChoice3").disabled = true;
          document.getElementById("myChoice4").disabled = true;
          document.getElementById("mark1").style.display = "";
          document.getElementById("mark2").style.display = "";
          document.getElementById("mark3").style.display = "";
          document.getElementById("mark4").style.display = "";
          let markArray = [cross, cross, cross, cross];
          markArray[correct[3 - timeCopy / 10] - 1] = circle;
          setMark(markArray.slice());
          clearInterval(timer);
          setTimeout(() => {
            if (timeCopy === 0) history.push("/quiz/result");
            startTimer();
            setTime(40);
            document.getElementById("mark1").style.display = "none";
            document.getElementById("mark2").style.display = "none";
            document.getElementById("mark3").style.display = "none";
            document.getElementById("mark4").style.display = "none";
            document.getElementById("myChoice1").checked = false;
            document.getElementById("myChoice2").checked = false;
            document.getElementById("myChoice3").checked = false;
            document.getElementById("myChoice4").checked = false;
            document.getElementById("myChoice1").disabled = false;
            document.getElementById("myChoice2").disabled = false;
            document.getElementById("myChoice3").disabled = false;
            document.getElementById("myChoice4").disabled = false;
          }, 4000);
          setTimeout(() => {
            setTime(timeCopy);
          }, 5000);
        }
      }, 1000);
    }
    startTimer();
  }, []);

  useEffect(() => {
    if (time % 10 === 0 && time !== 40) {
      setTimeout(() => {
        setOtherDescription(data.playerId[4 - time / 10].playerDescription);
        setImageUrl(
          "https://source.unsplash.com/featured/?" + urlOption[4 - time / 10]
        );
      }, 4000);
    }
  }, [time]);

  return (
    <div id="answer">
      <div className="title">元画像を当てよう</div>
      <div className="textBox otherDescription">
        プレイヤー名
        <p>{otherDescription}</p>
      </div>
      <p className="attentionMessage">写真をクリックしてください</p>
      <form id="answerForm">
        <input
          type="radio"
          name="selectImage"
          value={1}
          onChange={handleChange}
          id="myChoice1"
        />
        <label htmlFor="myChoice1" id="image1">
          <img src={imageUrl} alt="" />
          <img src={mark[0]} alt="" className="mark" id="mark1" />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={2}
          onChange={handleChange}
          id="myChoice2"
        />
        <label htmlFor="myChoice2" id="image2">
          <img src={imageUrl} alt="" />
          <img src={mark[1]} alt="" className="mark" id="mark2" />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={3}
          onChange={handleChange}
          id="myChoice3"
        />
        <label htmlFor="myChoice3" id="image3">
          <img src={imageUrl} alt="" />
          <img src={mark[2]} alt="" className="mark" id="mark3" />
        </label>
        <input
          type="radio"
          name="selectImage"
          value={4}
          onChange={handleChange}
          id="myChoice4"
        />
        <label htmlFor="myChoice4" id="image4">
          <img src={imageUrl} alt="" />
          <img src={mark[3]} alt="" className="mark" id="mark4" />
        </label>
      </form>
      <Timer
        time={time - Math.floor(time / 10) * 10 + Math.floor(time / 40) * 10}
      />
    </div>
  );
}
