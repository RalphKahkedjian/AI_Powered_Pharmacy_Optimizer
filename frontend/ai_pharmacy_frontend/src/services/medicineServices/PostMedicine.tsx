import axiosClient from "../../axiosClient";
import type { Medicine, MedicineInput } from "../../models/Medicine";


export const addMedicine = async (medicineData: MedicineInput): Promise<Medicine> => {
  const response = await axiosClient.post("/medicines", medicineData);
  return response.data as Medicine;
};

