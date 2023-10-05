import React, { useState } from "react";
import { OpenAI } from "openai";
import { BsRobot } from "react-icons/bs";
import ScrollableFeed from "react-scrollable-feed";
const key = import.meta.env.VITE_API_KEY;
const openai = new OpenAI({
  apiKey: `${key}`,
  dangerouslyAllowBrowser: true
});

const Chatbot = ({ isBoatVisible }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      role: "assistant",
      content:
        "Oh, hello there! How can I assist you today, or am I just here to be your personal source of sarcasm?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses."
          },
          ...chats
        ]
      })
      .then((res) => {
        msgs.push(res.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={isBoatVisible ? "chatboat-container" : "hide"}
      style={{ marginTop: "6rem" }}
    >
      <div className="header">
        <BsRobot
          style={{
            fontSize: "1.5rem",
            backgroundColor: "black",
            color: "white"
          }}
        />
        <h1>Your Sarcastic Friend </h1>
      </div>
      <ScrollableFeed className="scrollbar">
        <div className="msg-wrapper">
          <div className="msg-container">
            {chats && chats.length
              ? chats.map((chat, index) => (
                  <p
                    key={index}
                    className={chat.role === "user" ? "user_msg" : ""}
                  >
                    <span>
                      {chat.role !== "user" ? (
                        <BsRobot
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            fontSize: "1.5rem",
                            borderRadius: "5px"
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </span>
                    <span>{chat.content}</span>
                  </p>
                ))
              : ""}
          </div>
          <div className={isTyping ? "" : "hide"}>
            <p>
              <i>
                {isTyping ? (
                  <>
                    {" "}
                    <BsRobot
                      style={{ backgroundColor: "black", color: "white" }}
                    />{" "}
                    <span>Thinking...</span>
                  </>
                ) : (
                  ""
                )}
              </i>
            </p>
          </div>
        </div>
      </ScrollableFeed>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type here and hit Enter :)"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Chatbot;
