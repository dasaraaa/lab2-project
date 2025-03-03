import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";
import { MdProductionQuantityLimits, MdEmojiTransportation } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"; // Icons for dropdown

const Sidebar = () => {
  const [isRequestsOpen, setIsRequestsOpen] = useState(false); // State to toggle dropdown

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: BsHouse },
    { name: "Items", link: "/items", icon: MdProductionQuantityLimits },
    { name: "District", link: "/district", icon: FaUniversity },
    { name: "Category", link: "/category", icon: RiBillLine },
    { name: "Supplier", link: "/supplier", icon: MdEmojiTransportation },
  ];

  const requestSubmenus = [
    { name: "Orders List", link: "/ordersList" },
    { name: "District Requests", link: "/requests" },
    {name:"DistrictStockManagement", link:"/district-stock"}
  ];

  return (
    <div className="flex gap-6">
      <span className="absolute bg-transparent border-2 cursor-pointer flex items-center justify-center w-12 h-12 top-6 right-6 rounded-full">
        <MdNotificationsActive fill="grey" size={30} />
      </span>
      <div className="bg-blue-900 p-6 min-h-screen w-72 text-gray-100 px-4">
        <h2 className="font-bold text-white origin-left text-xl">Hi User</h2>
        <div className="mt-8 gap-6 flex flex-col relative">
          <h1>User Menu</h1>
           {/* Dropdown Menu for Requests */}
           <div>
            <div
              className="flex items-center justify-between text-sm font-medium p-2 rounded-md cursor-pointer hover:bg-gray-700"
              onClick={() => setIsRequestsOpen(!isRequestsOpen)}
            >
              <div className="flex items-center gap-3.5">
                <GiShoppingBag size={20} color="white" />
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

         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
