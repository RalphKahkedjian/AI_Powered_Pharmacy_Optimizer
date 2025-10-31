import { useEffect, useState } from "react";
import { fetchMedicines } from "../services/medicineServices/GetMedicine";
import { addMedicine } from "../services/medicineServices/PostMedicine";
import { fetchSuppliers } from "../services/supplierServices/GetSupplier";
import type { Medicine, MedicineInput } from "../models/Medicine";
import type { Supplier } from "../models/Supplier";
import "../assets/styles/inventory.css";

export default function Inventory() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newMedicine, setNewMedicine] = useState<
    MedicineInput & { image?: File | null; preview?: string | null }
  >({
    name: "",
    image_url: "",
    batch: "",
    quantity: 0,
    expiry_date: "",
    supplier_id: 0,
    image: null,
    preview: null,
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [medicineData, supplierData] = await Promise.all([
          fetchMedicines(),
          fetchSuppliers(),
        ]);
        setMedicines(medicineData);
        setSuppliers(supplierData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setShowCreateModal(false); // closes modal immediately

    try {
      const formData = new FormData();
      formData.append("name", newMedicine.name);
      formData.append("batch", newMedicine.batch ?? "");
      formData.append("quantity", newMedicine.quantity.toString());
      formData.append("expiry_date", newMedicine.expiry_date ?? "");
      formData.append("supplier_id", newMedicine.supplier_id.toString());
      if (newMedicine.image) {
        formData.append("image", newMedicine.image);
      }

      await addMedicine(formData);
      const medicineData = await fetchMedicines();
      setMedicines(medicineData);

      // Reset form
      setNewMedicine({
        name: "",
        image_url: "",
        batch: "",
        quantity: 0,
        expiry_date: "",
        supplier_id: 0,
        image: null,
        preview: null,
      });
    } catch (error) {
      console.error("Error creating medicine:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewMedicine({ ...newMedicine, image: file, preview: previewUrl });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewMedicine({ ...newMedicine, image: file, preview: previewUrl });
    }
  };

  return (
    <div className="inventory-container">
      <div className="header">
        <button
          className="create-btn"
          style={{ marginBottom: "30px" }}
          onClick={() => setShowCreateModal(true)}
        >
          + Create Medicine
        </button>
      </div>

      {/* Loading Spinner */}
      {loading || submitting ? (
        <div className="spinner-center">
          <div className="spinner"></div>
        </div>
      ) : medicines.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
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
      )}

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <div className="modal-overlay" onClick={() => setSelectedMedicine(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMedicine(null)}>
              ✖
            </button>
            <h3>{selectedMedicine.name}</h3>
            <img
              src={
                selectedMedicine.image_url?.startsWith("http")
                  ? selectedMedicine.image_url
                  : `http://127.0.0.1:8000/storage/${selectedMedicine.image_url}`
              }
              alt={selectedMedicine.name}
              className="medicine-image"
            />
            <p>
              <strong>Supplier ID:</strong> {selectedMedicine.supplier_id}
            </p>
            <p>
              <strong>Batch:</strong> {selectedMedicine.batch ?? "—"}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedMedicine.quantity}
            </p>
            <p>
              <strong>Expiry Date:</strong> {selectedMedicine.expiry_date ?? "—"}
            </p>
          </div>
        </div>
      )}

      {/* Create Medicine Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowCreateModal(false)}>
              ✖
            </button>
            <h3>Create New Medicine</h3>
            <form onSubmit={handleSubmit} className="create-form">
              <input
                type="text"
                placeholder="Medicine Name"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                required
              />

              {/* Image Drop Zone */}
              <div
                className="drop-zone"
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
              >
              <div className="file-upload">
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="fileInput"
                  className="upload-btn"
                >
                  Upload Image
                </label>

                {newMedicine.preview && (
                  <div className="image-preview">
                    <img
                      src={newMedicine.preview}
                      alt="Preview"
                      className="preview-img"
                      style={{
                        marginBottom:'10px'
                      }}
                    />
                  </div>
                )}
              </div>
              </div>

              <input
                type="text"
                placeholder="Batch"
                value={newMedicine.batch ?? ""}
                onChange={(e) => setNewMedicine({ ...newMedicine, batch: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newMedicine.quantity}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, quantity: Number(e.target.value) })
                }
              />
              <input
                type="date"
                value={newMedicine.expiry_date ?? ""}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, expiry_date: e.target.value })
                }
              />
              <select
                value={newMedicine.supplier_id}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, supplier_id: Number(e.target.value) })
                }
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="save-btn" disabled={submitting}>
                {submitting ? "Saving..." : "Save Medicine"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
