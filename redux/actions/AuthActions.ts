import axios from "axios";

export const login = async (loginData: any) => {
  const res = await axios.post(
    "https://tonomy-ai-chatbot-api.vercel.app/api/auth/login",
    loginData
  );
  return Promise.resolve({ data: res.data });
};
