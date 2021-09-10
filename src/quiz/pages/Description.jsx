import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/quiz.css";
import "./css/Description.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import OtherDescription from "../../common/components/OtherDescription";
import NgWord from "../../common/components/NgWord";
import AttentionMessage from "../../common/components/AttentionMessage";
import Timer from "../../common/components/Timer";
import TimeUp from "../../common/TimeUp";

export default function Description() {
  const [data, setData] = useState();
  const [ngWord, setNgWord] = useState("");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myDescription, setMyDescription] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(30);
  const timer = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost/API/Start.php", {})
      .then((res) => {
        console.log(res);
        setData(res);
        getNgWord(res);
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  }, []);

  const getNgWord = (data) => {
    console.log(data.data.ng.length);
    for (let i = 0; i < data.data.ng.length; i++) {
      setNgWord((ngWord) => ngWord + data.data.ng[i]);
      if (i !== data.data.ng.length - 1) setNgWord((ngWord) => ngWord + ", ");
    }
  };

  const handleChange = (event) => {
    setMyDescription(event.target.value);
    for (let i = 0; i < data.data.ng.length; i++)
      if (myDescription.indexOf(data.data.ng[i]) !== -1) {
        setAttentionMessage("NGワードが含まれています");
        return 0;
      }
    setAttentionMessage("");
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);

  if (time === 0) {
    clearInterval(timer.current);
    setTimeout(() => {
      history.push("/quiz/answer");
    }, 5000);
  }

  if (!data) return <div>読み込み中</div>;
  return (
    <div id="description">
      <Title text="この画像を説明しよう" />
      <Image src={data.data.pictureURL} alt="問題の画像" />
      <OtherDescription title="AIの説明文" text={data.data.AI} />
      <NgWord text={ngWord} />
      <form id="descriptionForm">
        <AttentionMessage text={attentionMessage} />
        <input
          type="text"
          value={myDescription}
          onChange={handleChange}
          className="textBox"
        />
      </form>
      <Timer time={time} />
      <TimeUp time={time} />
    </div>
  );
}
