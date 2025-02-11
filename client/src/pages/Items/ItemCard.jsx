import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
const ItemCard = ({ item }) => {
  return (
    <div className="rounded-lg transition-shadow duration-300 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        {/* Image Section */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <a href="/">
            <img
              src={`${getImgUrl(item.photo)}`}
              alt={item.name || 'Default Image'}
              className="h-72 w-72 object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </a>
        </div>

        {/* Details Section */}
        <div>
          <a href="/">
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {item.name || 'Item Title'}
            </h3>
          </a>
          <p className="text-gray-600 mb-3">
            <span className="font-bold">Description:</span> {item.description || 'No description available.'}
          </p>
          <p className="text-gray-600 mb-3">
          </p>
          {/* <p className="text-gray-600 mb-3">
            <span className="font-bold">Location:</span> {item.location || 'Unknown'}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-bold">Quantity:</span> {item.quantity || '0'}
          </p>
          <p className="text-gray-600 mb-5">
            <span className="font-bold">Purchase Date:</span> {item.purchase_date || 'N/A'}
          </p>
           */}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
