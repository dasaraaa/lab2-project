import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

const DistrictRequestsList = () => {
  const [districtRequests, setDistrictRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Track sort order

  const handleApprove = async (requestId, currentStatus) => {
    if (currentStatus !== 'pending') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Action',
        text: `You cannot approve this request as it is already ${currentStatus}.`,
        showConfirmButton: true,
      });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/district-requests/${requestId}`, { status: 'approved' });
      setDistrictRequests(districtRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'approved' } : request
      ));
      Swal.fire({
        icon: 'success',
        title: 'Request Approved',
        text: 'The district request has been approved successfully.',
        showConfirmButton: true,
      });
    } catch (error) {
      console.error('Error approving request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error approving the request.',
        showConfirmButton: true,
      });
    }
  };

  const handleReject = async (requestId, currentStatus) => {
    if (currentStatus !== 'pending') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Action',
        text: `You cannot reject this request as it is already ${currentStatus}.`,
        showConfirmButton: true,
      });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/district-requests/${requestId}`, { status: 'rejected' });
      setDistrictRequests(districtRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'rejected' } : request
      ));
      Swal.fire({
        icon: 'success',
        title: 'Request Rejected',
        text: 'The district request has been rejected successfully.',
        showConfirmButton: true,
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error rejecting the request.',
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    const fetchDistrictRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/district-requests");
        setDistrictRequests(response.data);
      } catch (error) {
        console.error("Error fetching district requests:", error);
        setError("Failed to fetch district requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictRequests();
  }, []);

  // Sorting Functionality
  const sortDistrictRequests = () => {
    const sortedRequests = [...districtRequests].sort((a, b) => {
      return sortOrder === "asc"
        ? a.District.name.localeCompare(b.District.name) // Sort A-Z
        : b.District.name.localeCompare(a.District.name); // Sort Z-A
    });
    setDistrictRequests(sortedRequests);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="text-xl font-semibold">Loading district requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="text-xl text-red-500 font-semibold">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-6">
        <div className="bg-white p-8 rounded-md w-full shadow-md">
          <h2 className="text-xl font-semibold mb-4">District Requests List</h2>

          {/* Sorting Button above the table */}
          <div className="flex justify-between mb-4">
            <button
              className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-lg"
              onClick={sortDistrictRequests}
            >
              {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
            </button>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="px-6 py-3">District</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {districtRequests.length > 0 ? (
                districtRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{request.District.name}</td>
                    <td className="px-6 py-4">{request.Item.name}</td>
                    <td className="px-6 py-4">{request.quantity}</td>
                    <td className="px-6 py-4">{request.message || 'No message'}</td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                      {request.status === 'approved' && (
                        <span className="text-green-600 font-bold">Approved</span>
                      )}
                      {request.status === 'rejected' && (
                        <span className="text-red-600 font-bold">Rejected</span>
                      )}
                      {request.status === 'pending' && (
                        <span className="text-gray-600 font-bold">Pending</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button 
                        className="bg-green-500 text-white px-3 mb-2 py-1 rounded mr-2"
                        onClick={() => handleApprove(request.id, request.status)}
                      >
                        Approve
                      </button>
                      <button 
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleReject(request.id, request.status)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No district requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistrictRequestsList;
