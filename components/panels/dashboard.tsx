import React, { Fragment, useState, useEffect } from "react";
import {
  getDashboardInfo,
  get_conversation,
} from "../../redux/actions/settingActions";
import Head from "next/head";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import Title from "./Title";

import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [avgNumber, setAvgNumber] = useState<number>(0);
  const [logList, setLogList] = useState([]);
  const [messages, setMessages] = useState([]);

  const router = useRouter();
  const { chatbotId } = router.query;

  useEffect(() => {
    // console.log("bbbbbbbbbbbbbb", chatbotId);

    getDashboardInfo({ chatbot_id: chatbotId })
      .then((res) => {
        const data = res?.data?.data;
        setAvgNumber(data && data?.avg);
        setTotalNumber(data && data?.total_conversation);
        setLogList(data && data?.conversations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chatbotId]);

  const [modalState, setModalState] = useState<boolean>(false);

  const handleClose = () => setModalState(false);

  const log_select = async (conversation_id: any) => {
    localStorage.setItem("conversation_id", conversation_id);

    get_conversation({ id: conversation_id })
      .then((res) => {
        setMessages(res.data.data);
        setModalState(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Head>
        <title>Setting</title>
      </Head>
      <Modal open={modalState} onClose={handleClose}>
        <div id="chatlog-container">
          <div className="chatlog-widget">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <ArrowPathIcon className="reload" />
            </div>
            <hr />
            <div className="widget">
              {/* Render the messages */}
              <div className="chat-widget">
                <div className="chat-content">
                  {messages.map((message: any, index) => (
                    <div
                      key={index}
                      className={`message ${
                        message.role === "1" ? "user" : "bot"
                      }`}
                    >
                      {message?.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <section id="dashboardPage">
        <div className="widget">
          <Title title="Dashboard" />
          <div className="description">
            <span>
              {` Currently dashboard doesn't show conversations that happended
              through the API`}
            </span>
          </div>
          <div className="form">
            <span className="title">Last 7 days</span>
            <div className="log-form">
              <div className="log-element">
                <span className="log-title">Total Conversations</span>
                <span className="log-number">{totalNumber}</span>
              </div>
              <div className="log-element">
                <span className="log-title">Avg. Messages / Conversations</span>
                <span className="log-number">{avgNumber}</span>
              </div>
            </div>
          </div>
          <div className="form">
            <span className="title">Conversations</span>
            <ul className="msglog-list">
              {logList?.map((log: any, index) => (
                <>
                  <li
                    key={log.Id}
                    className="msglog-form"
                    onClick={() => log_select(log["Id"])}
                  >
                    <div className="msg-1">
                      <span className="user-msg">{"User: " + log.usermsg}</span>
                      <span className="msg-time">{log.msgtime}</span>
                    </div>
                    <div className="msg-2">
                      <span className="bot-msg">{"Bot: " + log.botmsg}</span>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
