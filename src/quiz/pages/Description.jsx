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
  // const [data, setData] = useState({
  //     playerId: [
  //         {
  //             ng: ["草原", "ライオン"],
  //             AI: "草原でライオンが座っています",
  //             pictureURl: "https://source.unsplash.com/featured/?",
  //             gamemode: null,
  //         },
  //         {
  //             ng: ["草", "赤い", "光"],
  //             AI: "草に囲まれた赤い建物に光が当たっています",
  //             pictureURl: "",
  //             gamemode: null,
  //         },
  //         {
  //             ng: ["NG1", "NG2", "NG3"],
  //             AI: "AI説明文",
  //             pictureURl: "",
  //             gamemode: null,
  //         },
  //         {
  //             ng: ["NG1", "NG2", "NG3"],
  //             AI: "AI説明文",
  //             pictureURl: "",
  //             gamemode: null,
  //         },
  //     ],
  // });
  const params = new FormData();
  const [ngWord, setNgWord] = useState("");
  const [attentionMessage, setAttentionMessage] = useState("");
  const [myDescription, setMyDescription] = useState("");
  const history = useHistory();
  const [time, setTime] = useState(30);
  const timer = useRef(null);

  // useEffect(() => {
  //     axios
  //         .post("http://localhost/API/User/Login.php", params, {
  //             headers: {
  //                 "content-type": "multipart/form-data",
  //             },
  //         })
  //         .then((login) => {
  //             console.log(login.status);
  //             console.log(login);
  //             //setData(login);
  //             getStart();
  //         })
  //         .catch((error) => {
  //             console.log(error.request.status);
  //         });
  // }, []);
  //
  // function getStart() {
  //     // GetStart
  //     axios
  //         .get("http://localhost/API/Start.php", {
  //             withCredentials: true,
  //         })
  //         .then((description) => {
  //             console.log(description);
  //             setData(description);
  //             getNgWord();
  //         });
  // }
  useEffect(() => {
    axios
      .get("http://localhost/API/Start.php", {
        withCredentials: true,
      })
      .then((description) => {
        console.log(description);
        setData(description);
        getNgWord();
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  }, []);

  function getNgWord() {
    for (let i = 0; i < data.ng.length; i++) {
      setNgWord((ngWord) => ngWord + data.ng[i]);
      if (i !== data.ng.length - 1) setNgWord((ngWord) => ngWord + ", ");
    }
  }

  // useEffect(() => {
  //     // TODO: APIとの通信
  //     for (let i = 0; i < data.ng.length; i++) {
  //         setNgWord((ngWord) => ngWord + data.ng[i]);
  //         if (i !== data.ng.length - 1)
  //             setNgWord((ngWord) => ngWord + ", ");
  //     }
  // }, []);

  const handleChange = (event) => {
    setMyDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (myDescription.length === 0) {
      event.preventDefault();
      setAttentionMessage("説明文を記入して下さい");
      return 0;
    }
    for (let i = 0; i < ngWord.length; i++)
      if (myDescription.indexOf(ngWord[i]) !== -1) {
        event.preventDefault();
        setAttentionMessage("NGワードが含まれています");
        return 0;
      }
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

  return (
    <div id="description">
      {/*<Title text="この画像を説明しよう"/>*/}
      {/*<Image*/}
      {/*    src={data.pictureURL}*/}
      {/*    alt="問題の画像"*/}
      {/*/>*/}
      {/*<OtherDescription*/}
      {/*    title="AIの説明文"*/}
      {/*    text={data.AI}*/}
      {/*/>*/}
      {/*<NgWord text={ngWord}/>*/}
      {/*<form onSubmit={handleSubmit} id="descriptionForm">*/}
      {/*    <AttentionMessage text={attentionMessage}/>*/}
      {/*    <input*/}
      {/*        type="text"*/}
      {/*        value={myDescription}*/}
      {/*        onChange={handleChange}*/}
      {/*        className="textBox"*/}
      {/*    />*/}
      {/*    <input type="submit" value="送信"/>*/}
      {/*</form>*/}
      {/*<Timer time={time}/>*/}
      {/*<TimeUp time={time}/>*/}
    </div>
  );
}
