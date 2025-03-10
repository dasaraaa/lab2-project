import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Sidebar from "./Sidebar";

const Contract = () => {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]); // State for filtered contracts
  const [employees, setEmployees] = useState([]);
  const [contractName, setContractName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [contractId, setContractId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDate, setFilterDate] = useState(""); // Filter by date
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(""); // State for selected employee

  // Fetch contracts and employees
  useEffect(() => {
    axios.get("http://localhost:5000/contracts")
      .then(response => {
        setContracts(response.data);
        setFilteredContracts(response.data); // Initialize filteredContracts with all contracts
      })
      .catch(error => console.error("Error fetching contracts:", error));

    axios.get("http://localhost:5000/employees")
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  // Open modal for Add/Edit
  const openModal = (id = null, name = "", startDate = "", empId = "") => {
    setContractId(id);
    setContractName(name);
    setStartDate(startDate);
    setEmployeeId(empId);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setContractId(null);
    setContractName("");
    setStartDate("");
    setEmployeeId("");
    setIsModalOpen(false);
  };

  // Handle Add/Edit Contract
  const handleContractSubmit = () => {
    if (!contractName || !startDate || !employeeId) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    const contractData = { name: contractName, startDate, EmployeeId: employeeId };

    if (contractId) {
      // Edit Contract
      axios.put(`http://localhost:5000/contracts/${contractId}`, contractData)
        .then(response => {
          setContracts(prev => prev.map(contract => contract.id === contractId ? response.data : contract));
          setFilteredContracts(prev => prev.map(contract => contract.id === contractId ? response.data : contract)); // Update the filtered list as well
          closeModal();
          Swal.fire("Success", "Contract updated successfully", "success");
        })
        .catch(error => console.error("Error updating contract:", error));
    } else {
      // Add Contract
      axios.post("http://localhost:5000/contracts", contractData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      })
        .then(response => {
          setContracts(prev => [...prev, response.data]);
          setFilteredContracts(prev => [...prev, response.data]); // Update the filtered list as well
          closeModal();
          Swal.fire("Success", "Contract added successfully", "success");
        })
        .catch(error => console.error("Error adding contract:", error));
    }
  };

  // Handle Delete Contract
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
        axios.delete(`http://localhost:5000/contracts/${id}`)
          .then(() => {
            setContracts(prev => prev.filter(contract => contract.id !== id));
            setFilteredContracts(prev => prev.filter(contract => contract.id !== id)); // Update the filtered list as well
            Swal.fire("Deleted!", "Contract has been deleted.", "success");
          })
          .catch(error => console.error("Error deleting contract:", error));
      }
    });
  };

  // Sort contracts alphabetically
  const sortContracts = () => {
    const sortedContracts = [...filteredContracts].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setFilteredContracts(sortedContracts); // Apply sorting to the filtered list
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter contracts by date
  const handleDateFilter = () => {
    if (!filterDate) {
      Swal.fire("Error", "Please select a date", "error");
      return;
    }

    // Normalize the filterDate to the format "YYYY-MM-DD"
    const normalizedFilterDate = new Date(filterDate).toISOString().split('T')[0];

    // Filter contracts based on the normalized date
    const filtered = contracts.filter(contract => {
      // Normalize the contract's startDate to the format "YYYY-MM-DD"
      const normalizedContractDate = new Date(contract.startDate).toISOString().split('T')[0];
      return normalizedContractDate === normalizedFilterDate;
    });

    setFilteredContracts(filtered); // Set the filtered list based on date
  };

  // Reset filter (show all contracts)
  const resetFilter = () => {
    setFilteredContracts(contracts);
    setFilterDate("");
  };

  const handleEmployeeFilter = () => {
    if (!selectedEmployeeId) {
        // If no employee is selected, show all contracts
        setFilteredContracts(contracts);
    } else {
        // Filter contracts based on selected employee
        const filteredByEmployee = contracts.filter(contract => {
            return contract.EmployeeId.toString() === selectedEmployeeId; // Ensure both are the same type for comparison
        });
        setFilteredContracts(filteredByEmployee);
    }
};


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">

        <div className="w-full sm:w-[600px] p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Contracts List</h2>

          {/* Sorting & Add Button */}
          <div className="flex justify-between mb-4">
            <button
              className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-lg"
              onClick={sortContracts}
            >
              {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
            </button>
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
              onClick={() => openModal()}
            >
              Add a new Contract
            </button>
          </div>

          {/* Employee Filter */}
          <div className="mb-4">
            <select
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            <button
              onClick={handleEmployeeFilter}
              className="text-white bg-purple-600 hover:bg-purple-700 p-2 rounded-lg w-full"
            >
              Filter by Employee
            </button>
          </div>

          {/* Date Filter */}
          <div className="mb-4">
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <button
              onClick={handleDateFilter}
              className="text-white bg-orange-600 hover:bg-orange-700 p-2 rounded-lg w-full"
            >
              Filter by Date
            </button>
            <button
              onClick={resetFilter}
              className="text-white bg-gray-600 hover:bg-gray-700 p-2 rounded-lg w-full mt-2"
            >
              Reset Filter
            </button>
          </div>

          {/* Contracts Table */}
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="px-6 py-3">NAME</th>
                <th className="px-6 py-3">START DATE</th>
                <th className="px-6 py-3">EMPLOYEE</th>
                <th className="px-6 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{contract.name}</td>
                  <td className="px-6 py-4">
                    {new Date(contract.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {employees.find(emp => emp.id === contract.EmployeeId)?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(contract.id, contract.name, contract.startDate, contract.EmployeeId)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(contract.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <BsFillTrash3Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Add/Edit Contract */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px]">
                <h3 className="text-xl font-semibold mb-4">{contractId ? "Edit Contract" : "Add Contract"}</h3>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  placeholder="Contract Name"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <select
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
                <button onClick={handleContractSubmit} className="text-white bg-blue-500 hover:bg-green-700 px-4 py-2 rounded-lg">
                  {contractId ? "Update Contract" : "Add Contract"}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contract;
