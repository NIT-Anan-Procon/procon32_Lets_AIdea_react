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
          <LibraryRow
            icon={data[4].icon}
            name={data[4].name}
            image={data[4].pictureURL}
            ngWord={data[4].ng}
            description={data[4].explanation}
          />
          <LibraryRow
            icon={data[5].icon}
            name={data[5].name}
            image={data[5].pictureURL}
            ngWord={data[5].ng}
            description={data[5].explanation}
          />
          <LibraryRow
            icon={data[6].icon}
            name={data[6].name}
            image={data[6].pictureURL}
            ngWord={data[6].ng}
            description={data[6].explanation}
          />
          <LibraryRow
            icon={data[7].icon}
            name={data[7].name}
            image={data[7].pictureURL}
            ngWord={data[7].ng}
            description={data[7].explanation}
          />
          <LibraryRow
            icon={data[8].icon}
            name={data[8].name}
            image={data[8].pictureURL}
            ngWord={data[8].ng}
            description={data[8].explanation}
          />
          <LibraryRow
            icon={data[10].icon}
            name={data[10].name}
            image={data[10].pictureURL}
            ngWord={data[10].ng}
            description={data[10].explanation}
          />
          <LibraryRow
            icon={data[11].icon}
            name={data[11].name}
            image={data[11].pictureURL}
            ngWord={data[11].ng}
            description={data[11].explanation}
          />
          <LibraryRow
            icon={data[12].icon}
            name={data[12].name}
            image={data[12].pictureURL}
            ngWord={data[12].ng}
            description={data[12].explanation}
          />
          <LibraryRow
            icon={data[13].icon}
            name={data[13].name}
            image={data[13].pictureURL}
            ngWord={data[13].ng}
            description={data[13].explanation}
          />
          <LibraryRow
            icon={data[14].icon}
            name={data[14].name}
            image={data[14].pictureURL}
            ngWord={data[14].ng}
            description={data[14].explanation}
          />
          <LibraryRow
            icon={data[15].icon}
            name={data[15].name}
            image={data[15].pictureURL}
            ngWord={data[15].ng}
            description={data[15].explanation}
          />
          <LibraryRow
            icon={data[16].icon}
            name={data[16].name}
            image={data[16].pictureURL}
            ngWord={data[16].ng}
            description={data[16].explanation}
          />
          <LibraryRow
            icon={data[17].icon}
            name={data[17].name}
            image={data[17].pictureURL}
            ngWord={data[17].ng}
            description={data[17].explanation}
          />
          <LibraryRow
            icon={data[18].icon}
            name={data[18].name}
            image={data[18].pictureURL}
            ngWord={data[18].ng}
            description={data[18].explanation}
          />
          <LibraryRow
            icon={data[19].icon}
            name={data[19].name}
            image={data[19].pictureURL}
            ngWord={data[19].ng}
            description={data[19].explanation}
          />
        </div>
      </div>
    );
  }
}
