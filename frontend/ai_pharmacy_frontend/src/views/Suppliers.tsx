import { useState, useEffect } from "react";
import "../assets/styles/supplier.css";
import { addSupplier } from "../services/supplierServices/PostSupplier";
import { fetchSuppliers } from "../services/supplierServices/GetSupplier";
import axiosClient from "../axiosClient";
import type { Supplier } from "../models/Supplier";
import type { Medicine } from "../models/Medicine";

export default function Suppliers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    loadSuppliers();
    loadMedicines();
  }, []);

  const loadSuppliers = async () => {
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const loadMedicines = async () => {
    try {
      const response = await axiosClient.get("/medicines");
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSupplier = await addSupplier(formData);
      console.log("Supplier added:", newSupplier);
      setShowAddModal(false);
      setFormData({
        name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
      });
      await loadSuppliers();
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const openDetailsModal = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailsModal(true);
  };

  const supplierMedicines = selectedSupplier
    ? medicines.filter((med) => med.supplier_id === selectedSupplier.id)
    : [];

  return (
    <div className="supplier-container">
      {/* Add Supplier Button */}
      <button className="add-btn" onClick={() => setShowAddModal(true)}>
        Add Supplier
      </button>

      {/* Supplier Table */}
      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Person</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                onClick={() => openDetailsModal(supplier)}
              >
                <td>{supplier.name}</td>
                <td>{supplier.contact_person}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowAddModal(false)}
            >
              ✖
            </button>
            <h3>Add New Supplier</h3>
            <form onSubmit={handleSubmit} className="supplier-form">
              <input
                type="text"
                name="name"
                placeholder="Supplier Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contact_person"
                placeholder="Contact Person"
                value={formData.contact_person}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <button type="submit" className="submit-btn">
                Save Supplier
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Supplier Details Modal */}
      {showDetailsModal && selectedSupplier && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowDetailsModal(false)}
            >
              ✖
            </button>
            <h3>{selectedSupplier.name}</h3>
            {selectedSupplier.phone && (
              <p>
                Phone:{" "}
                <a href={`tel:${selectedSupplier.phone}`} style={{
                  color: 'black'
                }}>{selectedSupplier.phone}</a>
              </p>
            )}
            {selectedSupplier.email && (
              <p>
                Email:{" "}
                <a href={`mailto:${selectedSupplier.email}`} style={{
                  color: 'black'
                }}>{selectedSupplier.email}</a>
              </p>
            )}

            <h4>Supplied Medicines:</h4>
            <ul>
              {supplierMedicines.length > 0 ? (
                supplierMedicines.map((med) => <li style={{
                  listStyle:'none',
                  marginRight:'40px'
                }} key={med.id}>{med.name}</li>)
              ) : (
                <li>No medicines found for this supplier.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
