import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Sidebar from "./Sidebar";

const District = () => {
  const [districts, setDistricts] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [districtId, setDistrictId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // Track the current sort order

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

  // Function to sort districts alphabetically
  const sortDistricts = () => {
    const sortedDistricts = [...districts].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name) // Sort A-Z
        : b.name.localeCompare(a.name); // Sort Z-A
    });
    setDistricts(sortedDistricts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">

        <div className="w-full sm:w-[500px] p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Districts List</h2>
          {/* Sorting Button on top of the table */}
          <div className="flex justify-between mb-4">
            <button
              className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-lg"
              onClick={sortDistricts}
            >
              {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
            </button>
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
              onClick={() => openModal()}
            >
              Add a new District
            </button>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th scope="col" className="px-6 py-3">NAME</th>
                <th scope="col" className="px-6 py-3">ACTIONS</th>
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
                    className="text-white bg-blue-500 hover:bg-green-700 px-4 py-2 rounded-lg"
                  >
                    {districtId ? "Update District" : "Add District"}
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

export default District;
