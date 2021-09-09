import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Result.css";
import Title from "../../common/components/Title";
import PointRow from "../components/PointRow";

export default function Result() {
  // const history = useHistory();
  const [data, setData] = useState();

  const params = new FormData();
  params.append("name", "orikami");
  params.append("password", "0514");
  // useEffect(() => {
  //   axios
  //     .post("http://localhost/API/User/Login.php", params, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     })
  //     .then((result) => {
  //       console.log(result.status);
  //       console.log(result);
  //       setData(result);
  //     })
  //     .catch((error) => {
  //       console.log(error.request.status);
  //     });
  // }, []);

  useEffect(() => {
    // GetQuizResult
    axios
      .get("http://localhost/API/Quiz/GetQuizResult.php", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, []);

  // useEffect(() => { // GetUserInfo
  //     axios
  //         .get("http://localhost/API/User/GetUserInfo.php", {
  //           withCredentials: true,
  //         })
  //         .then(result => {
  //           console.log(result);
  //           setData(result);
  //         })
  // }, []);

  // const handleSubmit = () => {
  //   history.push("/quiz/voting");
  // };

  return (
    <div id="result">
      {/*<Title text="結果発表" />*/}
      {/*<div id="pointTable">*/}
      {/*  <PointRow*/}
      {/*    id="firstPlayer"*/}
      {/*    rank="1st"*/}
      {/*    icon="https://source.unsplash.com/featured/?random"*/}
      {/*    name="Togo"*/}
      {/*    descriptionPoint={data.playerId[0].descriptionPoint}*/}
      {/*    answerPoint={data.playerId[0].answerPoint}*/}
      {/*  />*/}
      {/*  <PointRow*/}
      {/*    id="secondPlayer"*/}
      {/*    rank="2nd"*/}
      {/*    icon="https://source.unsplash.com/featured/?random"*/}
      {/*    name="Taiki"*/}
      {/*    descriptionPoint={data.playerId[1].descriptionPoint}*/}
      {/*    answerPoint={data.playerId[1].answerPoint}*/}
      {/*  />*/}
      {/*  <PointRow*/}
      {/*    id="thirdPlayer"*/}
      {/*    rank="3rd"*/}
      {/*    icon="https://source.unsplash.com/featured/?random"*/}
      {/*    name="Ibuki"*/}
      {/*    descriptionPoint={data.playerId[2].descriptionPoint}*/}
      {/*    answerPoint={data.playerId[2].answerPoint}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<form onSubmit={handleSubmit} className="buttonForm">*/}
      {/*  <input type="submit" value="投票へ" />*/}
      {/*</form>*/}
    </div>
  );
}
