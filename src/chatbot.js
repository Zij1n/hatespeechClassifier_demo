import React, { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const url = `https://1c3a-35-227-10-137.ngrok.io/api/chatbot?message=${message}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setChatHistory([...chatHistory, { user: message, bot: data.message }]);
        setMessage("");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleClearHistory = () => {
    setChatHistory([]);
  };

  return (
    <div>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <p>input: {message.user}</p>
            <p>result: {message.bot}</p>
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={handleClearHistory}>Clear</button>
      </div>
    </div>
  );
}

export default Chatbot;
