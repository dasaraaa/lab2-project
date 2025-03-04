import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Sidebar from "./Sidebar";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [supplierId, setSupplierId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch suppliers when component loads
  useEffect(() => {
    axios.get("http://localhost:5000/supplier")
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  // Sort suppliers A-Z
  const sortAZ = () => {
    const sortedSuppliers = [...suppliers].sort((a, b) => a.name.localeCompare(b.name));
    setSuppliers(sortedSuppliers);
  };

  // Sort suppliers Z-A
  const sortZA = () => {
    const sortedSuppliers = [...suppliers].sort((a, b) => b.name.localeCompare(a.name));
    setSuppliers(sortedSuppliers);
  };

  // Open modal for Add or Edit
  const openModal = (id = null, name = "", contactInfo = "", paymentTerms = "") => {
    setSupplierId(id);
    setName(name);
    setContactInfo(contactInfo);
    setPaymentTerms(paymentTerms);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setSupplierId(null);
    setName("");
    setContactInfo("");
    setPaymentTerms("");
    setIsModalOpen(false);
  };

  // Handle Add/Edit Supplier
  const handleSupplierSubmit = () => {
    if (name.trim() === "" || contactInfo.trim() === "" || paymentTerms.trim() === "") {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    const supplierData = { name, contact_info: contactInfo, payment_terms: paymentTerms };

    if (supplierId) {
      // Edit Supplier
      axios.put(`http://localhost:5000/supplier/${supplierId}`, supplierData)
        .then(response => {
          setSuppliers(prev => prev.map(supplier => supplier.id === supplierId ? response.data : supplier));
          closeModal();
          Swal.fire("Success", "Supplier updated successfully", "success");
        })
        .catch(error => {
          console.error("Error updating supplier:", error);
        });
    } else {
      // Add Supplier
      axios.post("http://localhost:5000/supplier", supplierData)
        .then(response => {
          setSuppliers(prev => [...prev, response.data]);
          closeModal();
          Swal.fire("Success", "Supplier added successfully", "success");
        })
        .catch(error => {
          console.error("Error adding supplier:", error);
        });
    }
  };

  // Handle Delete Supplier
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/supplier/${id}`)
          .then(() => {
            setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
            Swal.fire("Deleted!", "Supplier has been deleted.", "success");
          })
          .catch(error => {
            console.error("Error deleting supplier:", error);
          });
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Suppliers List</h2>

        <div className="w-full sm:w-[600px] p-6 bg-white rounded-lg shadow-lg">
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mb-6 w-full"
            onClick={() => openModal()}
          >
            Add a new Supplier
          </button>

          <div className="flex space-x-4 mb-4">
            <button onClick={sortAZ} className="bg-green-500 text-white p-2 rounded-lg">
              Sort A-Z
            </button>
            <button onClick={sortZA} className="bg-red-500 text-white p-2 rounded-lg">
              Sort Z-A
            </button>
          </div>

          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="px-6 py-3">NAME</th>
                <th className="px-6 py-3">CONTACT INFO</th>
                <th className="px-6 py-3">PAYMENT TERMS</th>
                <th className="px-6 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{supplier.name}</td>
                  <td className="px-6 py-4">{supplier.contact_info}</td>
                  <td className="px-6 py-4">{supplier.payment_terms}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(supplier.id, supplier.name, supplier.contact_info, supplier.payment_terms)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <BsFillTrash3Fill size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Add/Edit Supplier */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px]">
                <h3 className="text-xl font-semibold mb-4">{supplierId ? "Edit Supplier" : "Add Supplier"}</h3>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  placeholder="Contact Info"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  placeholder="Payment Terms"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                />
                <div className="flex justify-between">
                  <button
                    onClick={closeModal}
                    className="text-gray-500 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSupplierSubmit}
                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
                  >
                    {supplierId ? "Update Supplier" : "Add Supplier"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Supplier;
