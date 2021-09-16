import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Library.css";
import Title from "../common/components/Title";
import LibraryRow from "./LibraryRow";

export default function Library() {
  const [data, setData] = useState();
  const params = new FormData();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get("http://localhost/API/Library/GetLibrary.php", {
        params: {
          search: 0,
          sort: 0,
          period: 0,
          page: 1,
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  const handleSubmit = () => {
    history.push("/");
  };

  if (!data) return <div>{errorMessage}</div>;
  else {
    return (
      <div id="library">
        <Title text="ライブラリ" />
        <form onSubmit={handleSubmit} className="buttonForm">
          <input type="submit" value="戻る" />
        </form>
        <div id="libraryTable">
          <LibraryRow
            icon={data[0].icon}
            name={data[0].name}
            image={data[0].pictureURL}
            ngWord={data[0].ng}
            description={data[0].explanation}
          />
          <LibraryRow
            icon={data[1].icon}
            name={data[1].name}
            image={data[1].pictureURL}
            ngWord={data[1].ng}
            description={data[1].explanation}
          />
          <LibraryRow
            icon={data[2].icon}
            name={data[2].name}
            image={data[2].pictureURL}
            ngWord={data[2].ng}
            description={data[2].explanation}
          />
          <LibraryRow
            icon={data[3].icon}
            name={data[3].name}
            image={data[3].pictureURL}
            ngWord={data[3].ng}
            description={data[3].explanation}
          />
        </div>
      </div>
    );
  }
}
