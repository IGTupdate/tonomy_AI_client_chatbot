// pages/widget.js
// import { useEffect } from "react";
// import ReactDOM from "react-dom";
// import ChatbotWidget from "../components/ChatbotWidget";

// const Widget = () => {
//     useEffect(() => {
//         const targetElement = document.getElementById("chatbot-widget-container");
//         if (targetElement) {
//             ReactDOM.render(<ChatbotWidget />, targetElement);
//         }
//     }, []);

//     return <div id="chatbot-widget-container"></div>;
// };

// export default Widget;


import { useEffect } from "react";
import ReactDOM from "react-dom";
import ChatbotWidget from "../components/ChatbotWidget";
import { useRouter } from "next/router";

const Widget = () => {
    const router = useRouter(); // Get the router object

    useEffect(() => {
        const targetElement = document.getElementById("chatbot-widget-container");
        if (targetElement) {
            const root = ReactDOM.createRoot(targetElement);
            const param1Value = router.query.chatbotId;

            root.render(<ChatbotWidget chatbot_id={'651a6d957441db742d8bb6a5'} />);
        }
    }, []);


    return <div id="chatbot-widget-container">


    </div>;
};

export default Widget;
