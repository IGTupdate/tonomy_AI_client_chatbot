import React, { useEffect, useState, useRef } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@/redux/hooks";
import loader from "../../assets/imges/typing.gif";
import {
  getDashboardInfo,
  get_conversation,
} from "../../redux/actions/settingActions";
import Image from "next/image";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const Chatbot = () => {
  const [chat_id, setChatId] = useState("");
  const chatbot_id = useAppSelector((state) => state.getSetting.chatbot_id);

  const [inputMessage, setInputMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [loading, setLoading] = useState(false);
  const req_qa_box = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState([
    { content: "Hi! What can I answer for you today?", role: "assistant" },
  ]);

  const [logList, setLogList] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const id: any = params.get("id");

    fetch(`${base_url}/api/chats?id=${id}&chat_id=${chat_id}`)
      .then(async (response) => await response.json())
      .then((data) => setMessages((prevMessages) => [...prevMessages, ...data]))
      .then((data) =>
        console.log(`%c ${data}`, "background: #222; color: green")
      )
      .catch((error) =>
        console.log(`%c ${error}`, "background: #222; color: red")
      );

    document
      .getElementById("input1")
      ?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          if (document.querySelector("input")?.value !== "") {
            document.getElementById("myBtn")?.click();
          }
        }
      });
  }, [chat_id]);

  const handleChatResponse = (
    message: string,
    answer: string,
    chat_id: string
  ) => {
    setLoading(false);

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: answer, role: "assistant" },
    ]);
    setChatId(chat_id);
    setInputMessage("");
    setIsFetching(false);
  };

  useEffect(() => {
    if (req_qa_box.current) {
      req_qa_box.current.scrollTop = req_qa_box.current.scrollHeight;
    }

    if (isFetching) {
      setLoading(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatbot_id: chatbot_id,
          message: inputMessage,
        }),
      };

      const dataFetch = async () => {
        const data = await (
          await fetch(`http://localhost:8080/api/chat/create`, requestOptions)
        ).json();

        setLoading(false);
        handleChatResponse(inputMessage, data.text, data.chat_id);
      };

      dataFetch();

      const inputElement = document.getElementById(
        "input1"
      ) as HTMLInputElement | null;
      if (inputElement) {
        inputElement.value = "";
      }
    }
  }, [chatbot_id, inputMessage, isFetching]);

  useEffect(() => {
    if (req_qa_box.current) {
      req_qa_box.current.scrollTop = req_qa_box.current.scrollHeight;
    }

    if (inputMessage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: inputMessage, role: "user" },
      ]);

      setIsFetching(true);
    }
  }, [inputMessage]);

  const handleSendMessageMock = (message: string) => {
    if (!inputMessage) setInputMessage(message);
  };

  const PageReload = () => {
    if (!inputMessage) {
      setMessages([
        { content: "Hi! What can I answer for you today?", role: "assistant" },
      ]);
    }
  };

  useEffect(() => {

    getDashboardInfo({ chatbot_id: chatbot_id })
      .then((res) => {
        const data = res.data.data;
        setLogList(data.conversations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chatbot_id]);

  useEffect(() => {
    logList.map((item) => {
      get_conversation({ id: item?.Id })
        .then((res) => setMessages((prevMessages) => [...res.data.data]))
        .catch((err) => console.error("error", err));
    });
  }, [logList]);

  return (
    <div id="chatdemo-container">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ArrowPathIcon className="reload" onClick={PageReload} />
      </div>
      <hr />

      <div className="widget">
        <div className="chat-widget" ref={req_qa_box}>
          <div className="chat-content">
            {messages.map((message, index) => (
              <>
                {console.log("message.role >>>", message.role)}
                <div
                  key={index}
                  className={`message ${
                    message.role === "user" ? "user" : "assistant"
                  }`}
                >
                  {message.content}
                </div>
              </>
            ))}
          </div>
          {loading && (
            <Image src={loader} width={100} height={100} alt="loading" />
          )}
        </div>

        <div className="input-container">
          <input
            id="input1"
            type="text"
            className="input-text"
            placeholder="Type your message here..."
          />

          <button
            id="myBtn"
            className="send-button"
            onClick={() =>
              handleSendMessageMock(
                document.querySelector("input")?.value || ""
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              width="1.25rem"
              height="1.25rem"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
