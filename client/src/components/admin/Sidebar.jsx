import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";
import { MdProductionQuantityLimits, MdEmojiTransportation } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import "../../App.css";

const Sidebar = () => {
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: BsHouse },
    { name: "Category", link: "/category", icon: RiBillLine },
    { name: "Items", link: "/items", icon: MdProductionQuantityLimits },
    { name: "District", link: "/district", icon: FaUniversity },
    { name: "Supplier", link: "/supplier", icon: MdEmojiTransportation },
    { name: "District Stock Management", link: "/district-stock", icon: GiShoppingBag }, 
    { name: "Orders", link: "/orders", icon: GiShoppingBag  },

  ];

  const requestSubmenus = [
    { name: "Orders List", link: "/ordersList" },
    { name: "District Requests", link: "/requests" },
  ];

  return (
    <div className="flex gap-6">
      <div className="bg-blue-900 p-6 min-h-screen w-72 text-gray-100 px-4">
        <h2 className="font-bold text-white origin-left text-xl">Hi User</h2>
        <div className="mt-8 gap-6 flex flex-col relative">
          <h1>User Menu</h1>

          {/* Main Menus (Moved Before Requests) */}
          {menus.map((menu, i) => (
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
          ))}

          {/* Dropdown Menu for Requests */}
          <div>
            <div
              className="flex items-center justify-between text-sm font-medium p-2 rounded-md cursor-pointer hover:bg-gray-700"
              onClick={() => setIsRequestsOpen(!isRequestsOpen)}
            >
              <div className="flex items-center gap-3.5">
                <h2>Requests</h2>
              </div>
              {isRequestsOpen ? (
                <IoIosArrowDown size={16} />
              ) : (
                <IoIosArrowForward size={16} />
              )}
            </div>
            {isRequestsOpen && (
              <div className="ml-6 mt-2">
                {requestSubmenus.map((submenu, index) => (
                  <NavLink
                    key={index}
                    to={submenu.link}
                    className={({ isActive }) =>
                      `block text-sm py-1 px-2 rounded-md ${
                        isActive ? "bg-gray-800" : "hover:bg-gray-700"
                      }`
                    }
                  >
                    {submenu.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
