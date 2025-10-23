import type { Supplier } from "./Supplier";

export interface Medicine {
  id: number;
  name: string;
  image_url: string | null;
  batch: string | null;
  quantity: number;
  expiry_date: string;
  supplier_id: number;
  supplier: Supplier;
  created_at: string;
  updated_at: string;
}