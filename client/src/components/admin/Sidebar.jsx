import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";
import { MdProductionQuantityLimits, MdEmojiTransportation } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import "../../App.css";

const Sidebar = () => {
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("User");
  const [notification, setNotification] = useState(null); // Notification state
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("username");
    if (storedRole) setRole(storedRole);
    if (storedName) setUsername(storedName);
  }, []);

  // Handle sign out and redirect to login
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setNotification("You have successfully logged out!"); // Show notification
    setTimeout(() => {
      navigate("/"); // Redirect to login page
    }, 1000); // Wait 1 second before redirecting
  };

  // Check if the user is logged in (based on accessToken)
  const isLoggedIn = localStorage.getItem("accessToken");

  // If the user is not logged in, do not show the sidebar
  if (!isLoggedIn) {
    return <div>Please log in to access the sidebar.</div>;
  }

  // Admin menu items
  const adminMenus = [
    { name: "Dashboard", link: "/dashboard", icon: BsHouse },
    { name: "Category", link: "/category", icon: RiBillLine },
    { name: "Items", link: "/items", icon: MdProductionQuantityLimits },
    { name: "District", link: "/district", icon: FaUniversity },
    { name: "Supplier", link: "/supplier", icon: MdEmojiTransportation },
    { name: "District Stock", link: "/district-stock", icon: GiShoppingBag },
    { name: "Orders", link: "/orders", icon: GiShoppingBag },
  ];

  // Staff menu items (for non-admin users)
  const staffMenus = [
    // { name: "Orders", link: "/orders", icon: GiShoppingBag },
  ];

  // Request submenus (only visible for admins)
  const requestSubmenus = [
    { name: "Orders List", link: "/ordersList" },
    { name: "District Requests", link: "/requests" },
  ];

  return (
    <div className="flex gap-6">
      <div className="bg-blue-900 p-6 min-h-screen w-72 text-gray-100 px-4 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-white text-xl">Hi {username}</h2>
          <div className="mt-8 gap-6 flex flex-col relative">
            <h1>Menu</h1>

            {/* Show admin menus only if role is admin */}
            {(role === "admin" || role === "superadmin") ? (
              adminMenus.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.link}
                  className={({ isActive }) =>
                    `flex items-center text-sm gap-3.5 font-medium p-2 rounded-md cursor-pointer ${
                      isActive ? "bg-gray-800" : "hover:bg-gray-700"
                    }`
                  }
                >
                  {React.createElement(menu.icon, { size: "20", color: "white" })}
                  <h2>{menu.name}</h2>
                </NavLink>
              ))
            ) : (
              staffMenus.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.link}
                  className={({ isActive }) =>
                    `flex items-center text-sm gap-3.5 font-medium p-2 rounded-md cursor-pointer ${
                      isActive ? "bg-gray-800" : "hover:bg-gray-700"
                    }`
                  }
                >
                  {React.createElement(menu.icon, { size: "20", color: "white" })}
                  <h2>{menu.name}</h2>
                </NavLink>
              ))
            )}

            {/* Toggle "Requests" submenu (only for admins) */}
            {(role === "admin" || role === "superadmin") && (
              <div className="mt-4">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsRequestsOpen(!isRequestsOpen)}
                >
                  <h2 className="text-sm font-medium">Requests</h2>
                  {isRequestsOpen ? (
                    <IoIosArrowDown size={20} color="white" />
                  ) : (
                    <IoIosArrowForward size={20} color="white" />
                  )}
                </div>

                {/* Show requests submenu */}
                {isRequestsOpen && (
                  <div className="pl-6 mt-2 flex flex-col gap-2">
                    {requestSubmenus.map((submenu, i) => (
                      <NavLink
                        key={i}
                        to={submenu.link}
                        className={({ isActive }) =>
                          `flex items-center text-sm gap-3.5 font-medium p-2 rounded-md cursor-pointer ${
                            isActive ? "bg-gray-800" : "hover:bg-gray-700"
                          }`
                        }
                      >
                        <h2>{submenu.name}</h2>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full"
        >
          Sign Out
        </button>
      </div>

      {/* Notification Popup */}
      {notification && (
        <div className="notification-popup">
          <div className="notification-content">
            <span>{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
