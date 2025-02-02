import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";

const District = () => {
  const [districts, setDistricts] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [districtId, setDistrictId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch districts when component loads
  useEffect(() => {
    axios.get("http://localhost:5000/district")
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        console.error("Error fetching districts:", error);
      });
  }, []);

  // Open modal for Add or Edit
  const openModal = (id = null, name = "") => {
    setDistrictId(id);
    setDistrictName(name);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setDistrictId(null);
    setDistrictName("");
    setIsModalOpen(false);
  };

  // Handle Add/Edit District
  const handleDistrictSubmit = () => {
    if (districtName.trim() === "") {
      Swal.fire("Error", "District name is required", "error");
      return;
    }

    const districtData = { name: districtName };

    if (districtId) {
      // Edit District
      axios.put(`http://localhost:5000/district/${districtId}`, districtData)
        .then(response => {
          setDistricts(prev => prev.map(district => district.id === districtId ? response.data : district));
          closeModal();
          Swal.fire("Success", "District updated successfully", "success");
        })
        .catch(error => {
          console.error("Error updating district:", error);
        });
    } else {
      // Add District
      axios.post("http://localhost:5000/district", districtData, {
        headers: {
          accessToken:localStorage.getItem("accessToken"),
        }
      })
        .then(response => {
          setDistricts(prev => [...prev, response.data]);
          closeModal();
          Swal.fire("Success", "District added successfully", "success");
        })
        .catch(error => {
          console.error("Error adding district:", error);
        });
    }
  };

  // Handle Delete District
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
        axios.delete(`http://localhost:5000/district/${id}`)
          .then(() => {
            setDistricts(prev => prev.filter(district => district.id !== id));
            Swal.fire("Deleted!", "Your district has been deleted.", "success");
          })
          .catch(error => {
            console.error("Error deleting district:", error);
          });
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-[500px] p-6 bg-white rounded-lg shadow-lg">
        <button
          className="text-white bg-green-500 hover:bg-green-700 p-2 rounded-lg mb-4 w-full"
          onClick={() => openModal()}
        >
          Add District
        </button>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((district) => (
              <tr key={district.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{district.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(district.id, district.name)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(district.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <BsFillTrash3Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Add/Edit District */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px]">
              <h3 className="text-xl font-semibold mb-4">{districtId ? "Edit District" : "Add District"}</h3>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                placeholder="District Name"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="text-gray-500 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDistrictSubmit}
                  className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  {districtId ? "Update District" : "Add District"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default District;
