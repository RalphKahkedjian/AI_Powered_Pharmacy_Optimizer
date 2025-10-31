import axiosClient from "../../axiosClient";

export const addMedicine = async (formData: FormData) => {
  const response = await axiosClient.post("/medicines", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
