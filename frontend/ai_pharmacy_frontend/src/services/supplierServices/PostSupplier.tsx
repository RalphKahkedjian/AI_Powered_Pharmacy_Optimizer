import axiosClient from "../../axiosClient";
import type { Supplier } from "../../models/Supplier";

export const addSupplier = async (supplierData: Omit<Supplier, "id">): Promise<Supplier> => {
  try {
    const response = await axiosClient.post("/suppliers", supplierData);
    return response.data as Supplier;
  } catch (error) {
    console.error("An error occurred while adding a new supplier:", error);
    throw error;
  }
};
