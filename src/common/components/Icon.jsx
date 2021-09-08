import React from "react";
import "./css/Icon.css";
import Image from "./Image";

export default function Icon(props) {
  return <Image src={props.src} alt="アイコン" class="icon" />;
}
