import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "../pages/NotFound";
import Pagination from "../components/Pagination"; // Import Pagination

const InventoryItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; // Change based on how many items per page

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredItems(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (err) {
      setError("Error fetching items");
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category");
      setCategories(response.data);
    } catch (err) {
      setError("Error fetching categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredItems.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="p-4 mt-20">
        <h1 className="text-black text-2xl font-bold ml-4 mb-4">UBT Inventory Items</h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search items..."
            className="px-4 py-3 ml-5 border-2 border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out placeholder-gray-400 text-sm shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {currentProducts.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-sm bg-blue-50 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={`http://localhost:5000/uploads/${item.image}`} // Use the 'image' field from the database
                alt={item.name}
              />
              <div className="px-6 py-4">
                <h5 className="text-xl font-semibold text-gray-800">{item.name}</h5>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Quantity: {item.quantity}</p>
                  <p>Min Stock: {item.minimumStock}</p>
                  <p>Max Stock: {item.maximumStock}</p>
                  <p>
                    Category:{" "}
                    {categories.find((cat) => cat.id === item.categoryId)?.name || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredItems.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InventoryItems;
