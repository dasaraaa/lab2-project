import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Sidebar from "./Sidebar";

const DistrictStock = () => {
  const [stocks, setStocks] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [items, setItems] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");  // New state to store the selected item name
  const [quantity, setQuantity] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    districtId: "",
    itemId: "",
    quantity: "",
  });

  // Define closeModal function
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch all district stocks when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockResponse = await axios.get("http://localhost:5000/districtStock");
        setStocks(stockResponse.data);

        const districtResponse = await axios.get("http://localhost:5000/district");
        setDistricts(districtResponse.data);

        const itemResponse = await axios.get("http://localhost:5000/items");
        setItems(itemResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (district_id = "", item_id = "", quantity = "") => {
    if (!district_id && !item_id) {
      setSelectedStock(null);  // For "Add" mode
    } else {
      setSelectedStock({ district_id, item_id, quantity });  // For "Edit" mode
    }

    setDistrictId(district_id);
    setItemId(item_id);
    setQuantity(quantity);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    setItemName(e.target.value);  // Update selected item name to trigger re-render
    setItemId(items.find(item => item.name === e.target.value)?.id || "");  // Find itemId by name
  };

  // Filter stocks based on the selected item name
  const filteredStocks = itemName
    ? stocks.filter((stock) => items.find(item => item.id === stock.item_id)?.name === itemName)  // Filter by item name
    : stocks; // If no item is selected, show all stocks

  // Reset the filter
  const resetFilter = () => {
    setItemName("");  // Clear selected item name
    setItemId("");  // Clear item ID
  };

  // Validate form fields
  const validateForm = () => {
    const formErrors = {};
    if (!districtId) formErrors.districtId = "District ID is required";
    if (!itemId) formErrors.itemId = "Item ID is required";
    if (!quantity) formErrors.quantity = "Quantity is required";
    else if (isNaN(quantity)) formErrors.quantity = "Quantity must be a number";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const stockData = {
      district_id: districtId,
      item_id: itemId,
      quantity,
    };

    try {
      if (selectedStock && selectedStock.district_id && selectedStock.item_id) {
        if (districtId !== selectedStock.district_id || itemId !== selectedStock.item_id) {
          Swal.fire("Error", "You cannot change the district ID or item ID.", "error");
          return;
        }

        const response = await axios.put(`http://localhost:5000/districtStock/${districtId}/${itemId}`, stockData);
        setStocks((prev) =>
          prev.map((stock) => (stock.district_id === districtId && stock.item_id === itemId ? response.data : stock))
        );
        closeModal();
        Swal.fire("Success", "District stock updated successfully", "success");
      } else {
        const response = await axios.post("http://localhost:5000/districtStock", stockData);
        setStocks((prev) => [...prev, response.data]);
        closeModal();
        Swal.fire("Success", "District stock added successfully", "success");
      }
    } catch (error) {
      console.error("Error submitting district stock:", error);
    }
  };

  const handleDelete = async (district_id, item_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/districtStock/${district_id}/${item_id}`);
        setStocks((prev) => prev.filter((stock) => stock.district_id !== district_id || stock.item_id !== item_id));
        Swal.fire("Deleted!", "Your district stock has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting district stock:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="w-full sm:w-[500px] p-6 bg-white rounded-lg shadow-lg">
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mb-4 w-full"
            onClick={() => openModal()}
          >
            Add a new District Stock
          </button>

          {/* Dropdown to filter by item */}
          <div className="flex space-x-2 mb-4">
            <select
              value={itemName}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Reset Filter Button */}
            <button
              onClick={resetFilter}
              className="text-white bg-gray-500 hover:bg-gray-700 p-2 rounded-md"
            >
              Reset Filter
            </button>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th scope="col" className="px-6 py-3">District Name</th>
                <th scope="col" className="px-6 py-3">Item Name</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <tr key={`${stock.district_id}-${stock.item_id}`} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{districts.find(district => district.id === stock.district_id)?.name || 'Unknown District'}</td>
                    <td className="px-6 py-4">{items.find(item => item.id === stock.item_id)?.name || 'Unknown Item'}</td>
                    <td className="px-6 py-4">{stock.quantity}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openModal(stock.district_id, stock.item_id, stock.quantity)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(stock.district_id, stock.item_id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <BsFillTrash3Fill />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">No stock available for this item</td>
                </tr>
              )}
            </tbody>
          </table>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px]">
                <h3 className="text-xl font-semibold mb-4">
                  {selectedStock ? "Edit District Stock" : "Add District Stock"}
                </h3>

                <select
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  className={`border border-gray-300 rounded-lg p-2 mb-4 w-full ${errors.districtId ? 'border-red-500' : ''}`}
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.districtId && <p className="text-red-500 text-xs">{errors.districtId}</p>}

                <select
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  className={`border border-gray-300 rounded-lg p-2 mb-4 w-full ${errors.itemId ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Item</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.itemId && <p className="text-red-500 text-xs">{errors.itemId}</p>}

                <input
                  type="number"
                  className={`border border-gray-300 rounded-lg p-2 mb-4 w-full ${errors.quantity ? 'border-red-500' : ''}`}
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}

                <div className="flex justify-between">
                  <button
                    onClick={closeModal}
                    className="text-gray-500 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="text-white bg-blue-500 hover:bg-green-700 px-4 py-2 rounded-lg"
                  >
                    {selectedStock ? "Update Stock" : "Add Stock"}
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

export default DistrictStock;
