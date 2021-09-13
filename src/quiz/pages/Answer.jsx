import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Answer.css";
import Title from "../../common/components/Title";
import OtherDescription from "../../common/components/OtherDescription";
import AttentionMessage from "../../common/components/AttentionMessage";
import Image from "../../common/components/Image";
import Timer from "../../common/components/Timer";
import circle from "../../image/circle.svg";
import cross from "../../image/cross.svg";

export default function Answer() {
  const [data, setData] = useState();
  let myChoice = 0;
  let correct = [0, 0, 0, 0];
  const [mark, setMark] = useState([]);
  const history = useHistory();
  const [time, setTime] = useState(40);
  let timeCopy = time;

  useEffect(() => {
    axios.get("http://localhost/API/Quiz/GetPicture.php").then((result) => {
      console.log(result.data);
      setData(result.data);
    });
  }, []);

  const handleChange = (event) => {
    myChoice = event.target.value;
  };

  useEffect(() => {
    if (!data) return 0;
    deleteMark();
    if (data.playerID == 4 - Math.floor(time / 10) + Math.floor(time / 40)) {
      document.getElementById("myChoice1").disabled = true;
      document.getElementById("myChoice2").disabled = true;
      document.getElementById("myChoice3").disabled = true;
      document.getElementById("myChoice4").disabled = true;
    }
    for (let i = 0; i < correct.length; i++)
      for (let j = 0; j < data.player[i + 1].picture.length; j++)
        if (data.player[i + 1].picture[j].answer == 1) {
          correct[i] = j + 1;
          break;
        }
    function startTimer() {
      const timer = setInterval(() => {
        setTime((time) => time - 1);
        timeCopy--;
        if (timeCopy % 10 === 0) {
          addMark();
          clearInterval(timer);
          setTimeout(() => {
            if (timeCopy === 0) history.push("/quiz/result");
            startTimer();
            deleteMark();
          }, 4000);
          setTimeout(() => {
            setTime(timeCopy);
          }, 5000);
        }
      }, 1000);
    }
    startTimer();
  }, [data]);

  function addMark() {
    if (!data) return 0;
    document.getElementById("mark1").style.display = "";
    document.getElementById("mark2").style.display = "";
    document.getElementById("mark3").style.display = "";
    document.getElementById("mark4").style.display = "";
    document.getElementById("myChoice1").disabled = true;
    document.getElementById("myChoice2").disabled = true;
    document.getElementById("myChoice3").disabled = true;
    document.getElementById("myChoice4").disabled = true;
    let markArray = [cross, cross, cross, cross];
    markArray[correct[3 - timeCopy / 10] - 1] = circle;
    setMark(markArray.slice());
  }

  function deleteMark() {
    if (!data) return 0;
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
  }

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
  });

  if (!data) return <div>読み込み中...</div>;
  else
    return (
      <div id="answer">
        <Title text="元画像を当てよう" />
        <OtherDescription
          title={
            data.player[4 - Math.floor(time / 10) + Math.floor(time / 40)].name
          }
          text={
            data.player[4 - Math.floor(time / 10) + Math.floor(time / 40)]
              .explanation
          }
        />
        <AttentionMessage text="写真をクリックしてください" />
        <form id="answerForm">
          <input
            type="radio"
            name="selectImage"
            value={1}
            onChange={handleChange}
            id="myChoice1"
          />
          <label htmlFor="myChoice1" id="image1">
            <Image
              src={
                data.player[4 - Math.floor(time / 10) + Math.floor(time / 40)]
                  .picture[0].pictureURL
              }
              alt="選択肢の画像"
            />
            <Image src={mark[0]} alt="マーク" class="mark" id="mark1" />
          </label>
          <input
            type="radio"
            name="selectImage"
            value={2}
            onChange={handleChange}
            id="myChoice2"
          />
          <label htmlFor="myChoice2" id="image2">
            <Image
              src={
                data.player[4 - Math.floor(time / 10) + Math.floor(time / 40)]
                  .picture[1].pictureURL
              }
              alt="選択肢の画像"
            />
            <Image src={mark[1]} alt="マーク" class="mark" id="mark2" />
          </label>
          <input
            type="radio"
            name="selectImage"
            value={3}
            onChange={handleChange}
            id="myChoice3"
          />
          <label htmlFor="myChoice3" id="image3">
            <Image
              src={
                data.player[4 - Math.floor(time / 10) + Math.floor(time / 40)]
                  .picture[2].pictureURL
              }
              alt="選択肢の画像"
            />
            <Image src={mark[2]} alt="マーク" class="mark" id="mark3" />
          </label>
          <input
            type="radio"
            name="selectImage"
            value={4}
            onChange={handleChange}
            id="myChoice4"
          />
          <label htmlFor="myChoice4" id="image4">
            <Image
              src={
                data.player[4 - Math.floor(time / 10) + Math.floor(time / 40)]
                  .picture[3].pictureURL
              }
              alt="選択肢の画像"
            />
            <Image src={mark[3]} alt="マーク" class="mark" id="mark4" />
          </label>
        </form>
        <Timer
          time={time - Math.floor(time / 10) * 10 + Math.floor(time / 40) * 10}
        />
      </div>
    );
}
