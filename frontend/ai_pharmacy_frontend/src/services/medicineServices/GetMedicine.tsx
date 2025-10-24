import axiosClient from "../../axiosClient";
import type { Medicine } from "../../models/Medicine";

export const fetchMedicines = async (): Promise<Medicine[]> => {
  try {
    const response = await axiosClient.get("/medicines");
    console.log(response.data)
    return response.data as Medicine[];
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
};
