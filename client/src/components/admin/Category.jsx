import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Sidebar from "./Sidebar";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories when component loads
  useEffect(() => {
    axios.get("http://localhost:5000/category")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Open modal for Add or Edit
  const openModal = (id = null, name = "") => {
    setCategoryId(id);
    setCategoryName(name);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setCategoryId(null);
    setCategoryName("");
    setIsModalOpen(false);
  };

  // Handle Add/Edit Category
  const handleCategorySubmit = () => {
    if (categoryName.trim() === "") {
      Swal.fire("Error", "Category name is required", "error");
      return;
    }

    const categoryData = { name: categoryName };

    if (categoryId) {
      // Edit Category
      axios.put(`http://localhost:5000/category/${categoryId}`, categoryData)
        .then(response => {
          setCategories(prev => prev.map(category => category.id === categoryId ? response.data : category));
          closeModal();
          Swal.fire("Success", "Category updated successfully", "success");
        })
        .catch(error => {
          console.error("Error updating category:", error);
        });
    } else {
      // Add Category
      axios.post("http://localhost:5000/category", 
      categoryData, {
        headers:{
          accessToken:localStorage.getItem("accessToken"),
        }
      } )
        .then(response => {
          setCategories(prev => [...prev, response.data]);
          closeModal();
          Swal.fire("Success", "Category added successfully", "success");
        })
        .catch(error => {
          console.error("Error adding category:", error);
        });
    }
  };

  // Handle Delete Category
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
        axios.delete(`http://localhost:5000/category/${id}`)
          .then(() => {
            setCategories(prev => prev.filter(category => category.id !== id));
            Swal.fire("Deleted!", "Your category has been deleted.", "success");
          })
          .catch(error => {
            console.error("Error deleting category:", error);
          });
      }
    });
  };

  return (
    <div className="flex  ">
        <Sidebar/> 
        <div className="flex-1 p-6">
      <div className="w-full sm:w-[500px] p-6 bg-white rounded-lg shadow-lg">
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mb-4 w-full"
          onClick={() => openModal()}
        >
          Add a new Category
        </button>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th scope="col" className="px-6 py-3">NAME</th>
              <th scope="col" className="px-6 py-3">ACTIONS</th>

            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(category.id, category.name)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <BsFillTrash3Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Add/Edit Category */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[500px]">
              <h3 className="text-xl font-semibold mb-4">{categoryId ? "Edit Category" : "Add Category"}</h3>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="text-gray-500 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCategorySubmit}
                  className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  {categoryId ? "Update Category" : "Add Category"}
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

export default Category;
