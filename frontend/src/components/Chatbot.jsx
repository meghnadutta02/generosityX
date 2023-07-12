import React, { useState } from "react";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <df-messenger
        intent="WELCOME"
        chat-title="Helpy"
        agent-id="af682445-7d3d-40ea-8c84-a479f26fc35b"
        language-code="en"
      ></df-messenger>
    </div>
  );
}

export default Chatbot;
