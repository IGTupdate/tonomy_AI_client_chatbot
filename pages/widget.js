// pages/widget.js
import { useEffect } from "react";
import ReactDOM from "react-dom";
import ChatbotWidget from "../components/ChatbotWidget";

const Widget = () => {
    useEffect(() => {
        const targetElement = document.getElementById("chatbot-widget-container");
        if (targetElement) {
            ReactDOM.render(<ChatbotWidget />, targetElement);
        }
    }, []);

    return <div id="chatbot-widget-container"></div>;
};

export default Widget;
