import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Assuming you have a Sidebar component for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2

const DistrictRequestsList = () => {
  const [districtRequests, setDistrictRequests] = useState([]);
  const [loading, setLoading] = useState(true);  // To manage the loading state
  const [error, setError] = useState(null);  // To manage errors

  // Functions for handling approve/reject actions
  const handleApprove = async (requestId, currentStatus) => {
    // Only allow approve if the current status is 'pending'
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
    // Only allow reject if the current status is 'pending'
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
        icon: 'error',
        title: 'Request Rejected',
        text: 'The district request has been rejected.',
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

  // Fetch district requests from API
  useEffect(() => {
    const fetchDistrictRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/district-requests");
        setDistrictRequests(response.data);
      } catch (error) {
        console.error("Error fetching district requests:", error);
        setError("Failed to fetch district requests.");
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    };

    fetchDistrictRequests();
  }, []);

  // Loading and error handling UI
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
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-8 ml-6"> {/* Adjusting margin for sidebar width */}
        <div className="bg-white p-8 rounded-md w-full shadow-md">
          <h2 className="text-xl font-semibold mb-4">District Requests List</h2>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="px-6 py-3">District</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Message</th>
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
