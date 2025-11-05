import React from "react";

const Greeting = ({ username = "사용자" }) => {
  return <div className="greeting">안녕하세요, {username}님!</div>;
};

export default Greeting;
