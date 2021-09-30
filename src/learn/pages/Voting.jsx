import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Voting.css";
import AttentionMessage from "../../common/components/AttentionMessage";
import Image from "../../common/components/Image";
import TimeUp from "../../common/components/TimeUp";
import Timer from "../../common/components/Timer";
import Title from "../../common/components/Title";
import aiImg from "../../image/aiImg.svg";
import SelectionLabel from "../components/SelectionLabel";

export default function Voting() {
  const [data, setData] = useState();
  const [myChoice, setMyChoice] = useState(-1);
  const history = useHistory();
  const [attentionMessage, setAttentionMessage] =
    useState("投票する作品を選んでください");
  const [errorMessage, setErrorMessage] = useState("読み込み中");
  const params = new FormData();
  const [time, setTime] = useState(90);
  const timer = useRef(null);
  const skipTimer = useRef(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Learn/GetLearnResult.php", {
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
    document.getElementById("choice" + data.playerID).disabled = true;
  }, [data]);

  const handleChange = (event) => {
    setMyChoice(event.target.value);
    setAttentionMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (myChoice >= 0) {
      document.getElementById("skip").disabled = true;
      console.log(myChoice);
      // params.append("playerID", myChoice);
      // axios
      //     .post("http://localhost/API/Game/Vote.php", params, {
      //         withCredentials: true,
      //     })
      //     .then(() => {});
      skipTimer.current = setInterval(() => {
        console.log("通信");
        // axios
        //     .get("http://localhost/API/Game/GetVoter.php", {
        //         withCredentials: true,
        //     })
        //     .then((res) => {
        //         if (res.data.playerNum === 0) {
        //             clearInterval(timer.current);
        //             clearInterval(skipTimer.current);
        //             history.push("/learn/award");
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
      }, 1000);
    } else {
      console.log(myChoice);
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
        })
        .then(() => {});
    }
    // setTimeout(() => {
    //     history.push("/learn/award");
    // }, 5000);
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
      <div className="learn" id="learnVoting">
        <Title text="優秀な作品を決めよう" />
        <Image src={data.pictureURL} alt="explanationImg" />
        <form className="votingForm">
          <AttentionMessage text={attentionMessage} />
          <div className="selections">
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={0}
                onChange={handleChange}
                id="choiceAI"
              />
              <label htmlFor="choiceAI">
                <SelectionLabel icon={aiImg} name="AI" explanation={data.AI} />
              </label>
            </div>
            <div className="selection">
              <input
                type="radio"
                name="selectDescription"
                value={1}
                onChange={handleChange}
                id="choice1"
              />
              <label htmlFor="choice1">
                <SelectionLabel
                  icon={data.player[1].icon}
                  name={data.player[1].name}
                  explanation={data.player[1].explanation}
                />
              </label>
            </div>
            {/*<div className="selection">*/}
            {/*    <input*/}
            {/*        type="radio"*/}
            {/*        name="selectDescription"*/}
            {/*        value={2}*/}
            {/*        onChange={handleChange}*/}
            {/*        id="choice2"*/}
            {/*    />*/}
            {/*    <label htmlFor="choice2">*/}
            {/*        <SelectionLabel*/}
            {/*            icon={data.player[2].icon}*/}
            {/*            name={data.player[2].name}*/}
            {/*            explanation={data.player[2].explanation}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*</div>*/}
            {/*<div className="selection">*/}
            {/*    <input*/}
            {/*        type="radio"*/}
            {/*        name="selectDescription"*/}
            {/*        value={3}*/}
            {/*        onChange={handleChange}*/}
            {/*        id="choice3"*/}
            {/*    />*/}
            {/*    <label htmlFor="choice3">*/}
            {/*        <SelectionLabel*/}
            {/*            icon={data.player[3].icon}*/}
            {/*            name={data.player[3].name}*/}
            {/*            explanation={data.player[3].explanation}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*</div>*/}
            {/*<div className="selection">*/}
            {/*    <input*/}
            {/*        type="radio"*/}
            {/*        name="selectDescription"*/}
            {/*        value={4}*/}
            {/*        onChange={handleChange}*/}
            {/*        id="choice4"*/}
            {/*    />*/}
            {/*    <label htmlFor="choice4">*/}
            {/*        <SelectionLabel*/}
            {/*            icon={data.player[4].icon}*/}
            {/*            name={data.player[4].name}*/}
            {/*            explanation={data.player[4].explanation}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*</div>*/}
          </div>
        </form>
        <form onClick={handleSubmit} className="submitForm">
          <input type="submit" id="skip" value="確定する" />
        </form>
        <Timer time={time} />
        {/*<TimeUp time={time}/>*/}
      </div>
    );
  }
}
