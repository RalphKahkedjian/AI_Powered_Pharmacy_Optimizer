import axiosClient from "../../axiosClient";
import type { Supplier } from "../../models/Supplier";

export const fetchSuppliers = async(): Promise<Supplier[]>=> {
  try {
    const response = await axiosClient.get('/suppliers');
    return response.data as Supplier[];
  } catch(error) {
    console.error("An error occurred while attempting to fetch suppliers data: ", error);
    throw error;
  }
}