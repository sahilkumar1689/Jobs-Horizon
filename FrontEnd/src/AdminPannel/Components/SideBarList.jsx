import React from "react";
import { Link } from "react-router-dom";

function SideBarList({ elemObj, isSet, setIsActive, isLogOut, setLogOut }) {
  return (
    <li
      className={`${isSet ? "active" : ""}`}
      onClick={() => {
        if (isLogOut === 1) {
          setLogOut(0);
        }
        setIsActive();
      }}
    >
      <Link to={elemObj.link}>
        <img src={elemObj.imagePath} alt="Dashboard" />
        <span>{elemObj.name}</span>
      </Link>
    </li>
  );
}

export default SideBarList;
