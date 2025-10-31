// models/Medicine.ts
export interface Medicine {
  id: number;
  name: string;
  image_url: string | null;
  batch: string | null;
  quantity: number;
  expiry_date: string;
  supplier_id: number;
  created_at: string;
  updated_at: string;
}

// 👇 Add this:
export type MedicineInput = Pick<
  Medicine,
  "name" | "image_url" | "batch" | "quantity" | "expiry_date" | "supplier_id"
>;
