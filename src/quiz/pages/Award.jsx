import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/quiz.css";
import "./css/Award.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import OtherDescription from "../../common/components/OtherDescription";
import NgWord from "../../common/components/NgWord";

export default function Award() {
  const data = {};
  const history = useHistory();

  const againHandleSubmit = () => {
    history.push("");
  };

  const leaveHandleSubmit = () => {
    history.push("");
  };

  return (
    <div id="award">
      <Title text="" />
      <Image src="" alt="" />
      <div className="player">
        <Icon src="" />
        <Name text="" />
        <NgWord text="" />
        <OtherDescription title="AIの説明文" text="" />
      </div>
      <form className="buttonForm">
        <input
          type="submit"
          className="again"
          value="もう一度遊ぶ"
          onClick={againHandleSubmit}
        />
        <input
          type="submit"
          className="leave"
          value="部屋を抜ける"
          onClick={leaveHandleSubmit}
        />
      </form>
    </div>
  );
}
