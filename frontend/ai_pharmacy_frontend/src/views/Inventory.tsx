import { useEffect, useState } from "react";
import { fetchMedicines } from "../services/medicineServices/medicine";
import type { Medicine } from "../models/Medicine";
import "../assets/styles/inventory.css";

export default function Inventory() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const data = await fetchMedicines();
        setMedicines(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadMedicines();
  }, []);

  return (
    <div className="inventory-container">
      {/* Medicines Table */}
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m.id} onClick={() => setSelectedMedicine(m)}>
              <td>{m.name}</td>
              <td>{m.batch}</td>
              <td>{m.quantity}</td>
              <td>{m.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {selectedMedicine && (
        <div className="modal-overlay" onClick={() => setSelectedMedicine(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedMedicine(null)}>
              ✖
            </button>
            <h3>{selectedMedicine.name}</h3>
            <img
              src={selectedMedicine.image_url ?? "https://via.placeholder.com/150"}
              alt={selectedMedicine.name}
              className="medicine-image"
            />
            <p><strong>Supplier ID:</strong> {selectedMedicine.supplier_id}</p>
            <p><strong>Batch:</strong> {selectedMedicine.batch ?? "—"}</p>
            <p><strong>Quantity:</strong> {selectedMedicine.quantity}</p>
            <p><strong>Expiry Date:</strong> {selectedMedicine.expiry_date ?? "—"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
