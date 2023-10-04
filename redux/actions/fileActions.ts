import axios from "axios";

export const uploadPdfs = (formData: any) => {
  return axios.post(
  `${process.env.NEXT_PUBLIC_BASE_URL}/setting/upload-pdfs`,
    formData,
    {}
  );
};
