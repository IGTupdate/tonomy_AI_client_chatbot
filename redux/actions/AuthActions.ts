import axios from "axios";

export const login = async (loginData: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    loginData
  );
  return Promise.resolve({ data: res.data });
};
