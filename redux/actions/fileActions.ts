import axios from "axios";

export const uploadPdfs = (formData: any) => {
  return axios.post(
    "https://tonomy-ai-chatbot-api.vercel.app/api/setting/upload-pdfs",
    formData,
    {}
  );
};
