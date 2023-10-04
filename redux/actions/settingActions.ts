import axios from "axios";

export const getSetting = (chatbot_id: string) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    // console.log("token: ", token);
    axios.defaults.headers.common["x-auth-token"] = token;
  }
  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/setting/get/${chatbot_id}`
  );
};

export const updateSetting = (settingData: any) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/setting/update`, settingData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getDashboardInfo = (settingData: any) => {
  console.log("xxxxxxxxxxx", settingData);

  return axios.post(
   `${process.env.NEXT_PUBLIC_BASE_URL}/chat/getDashboard`,
    settingData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const get_conversation = (settingData: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/chat/getChatHistory`,
    settingData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};

export const iconUpload = (settingData: any) => {
  return axios.post(
   `${process.env.NEXT_PUBLIC_BASE_URL}/setting/iconUpload`,
    settingData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const createSetting = (settingData: any) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  }
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/setting/create`, settingData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const retrain = (settingData: any) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/setting/retrain`, settingData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getChatbotList = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  }
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/setting/getChatList`);
};

export const get_embedded_visibleList = () => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/setting/get_embedded_visiblelist`
  );
};

export const update_embedded_visible = (sendData: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/setting/update_embedded_visible`,
    sendData
  );
};

export const update_embedded_domains = (sendData: any) => {
  return axios.post(
   `${process.env.NEXT_PUBLIC_BASE_URL}/setting/update_embedded_domains`,
    sendData
  );
};

export const delete_chatbot = (sendData: any) => {
  return axios.post(
   `${process.env.NEXT_PUBLIC_BASE_URL}/setting/delete_chatbot`,
    sendData
  );
};

export const share_chatbot = (sendData: any) => {
  return axios.post(
   `${process.env.NEXT_PUBLIC_BASE_URL}/setting/share_chatbot`,
    sendData
  );
};

export const require_login = (sendData: any) => {
  return axios.post(
   `${process.env.NEXT_PUBLIC_BASE_URL}/setting/get_require_login`,
    sendData
  );
};

export const scraping_url = (sendData: any) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/setting/webScrape`, sendData);
};

export const web_scraping_chatbot = (sendData: any) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    console.log("token: ", token);
    axios.defaults.headers.common["x-auth-token"] = token;
  }
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/setting/web_scraping_chatbot`,
    sendData
  );
};
