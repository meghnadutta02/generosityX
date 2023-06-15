import React, { useState } from "react";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        className="fixed bottom-8 bg-blue-700 rounded-full border-black border-2 right-6 p-3 z-10"
        onClick={togglePopup}
      >
        <InsertCommentRoundedIcon
          fontSize="large"
          sx={{ color: "orange" }}
        ></InsertCommentRoundedIcon>
      </button>
      {isOpen && (
        <div className="popup fixed bottom-16 right-2 p-4 m-2 z-10">
          <iframe
            width="350"
            height="430"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/713f38ad-c406-441a-b49e-6f36dd5f1bd6"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
