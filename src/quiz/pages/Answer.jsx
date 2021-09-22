import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Answer.css";
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
  const params = new FormData();
  const [time, setTime] = useState(20);
  let timeCopy = time;
  const [timeCount, setTimeCount] = useState(1);
  let timeCountCopy = timeCount;
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get("http://localhost/API/Quiz/GetPicture.php")
      .then((result) => {
        setData(result.data);
      })
      .catch(() => {
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  const handleChange = (event) => {
    myChoice = event.target.value;
  };

  useEffect(() => {
    if (!data) return 0;
    deleteMark();
    if (data.playerID == timeCount) {
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
        if (timeCopy === 0) {
          addPoint();
          addMark();
          clearInterval(timer);
          setTimeout(() => {
            if (timeCountCopy === 4) history.push("/quiz/result");
            startTimer();
            deleteMark();
            setTimeCount((timeCount) => timeCount + 1);
            timeCountCopy++;
            setTime(20);
            timeCopy = time;
          }, 4000);
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
    markArray[correct[timeCountCopy - 1] - 1] = circle;
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

  const addPoint = () => {
    let elements = document.getElementsByName("selectImage");
    for (let i = 0; i < elements.length; i++) {
      if (elements.item(i).checked) {
        myChoice = elements.item(i).value;
        break;
      }
      myChoice = 0;
    }
    if (myChoice == correct[timeCountCopy - 1]) {
      params.append("playerID", timeCountCopy);
      axios
        .post("http://localhost/API/Quiz/AddPoint.php", params, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then(() => {
          params.delete("playerID");
        });
    }
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

  if (!data) return <div>{errorMessage}</div>;
  else
    return (
      <div className="quiz" id="quizAnswer">
        <OtherDescription
          title={data.player[timeCount].name}
          text={data.player[timeCount].explanation}
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
              src={data.player[timeCount].picture[0].pictureURL}
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
              src={data.player[timeCount].picture[1].pictureURL}
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
              src={data.player[timeCount].picture[2].pictureURL}
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
              src={data.player[timeCount].picture[3].pictureURL}
              alt="選択肢の画像"
            />
            <Image src={mark[3]} alt="マーク" class="mark" id="mark4" />
          </label>
        </form>
        <Timer time={time} />
      </div>
    );
}
