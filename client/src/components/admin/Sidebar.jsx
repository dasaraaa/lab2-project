import React from "react";
import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { RiBillLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { MdProductionQuantityLimits, MdEmojiTransportation, MdSupportAgent, MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/admin", icon: BsHouse },
    // { name: "Admin", link: "/admintable", icon: MdOutlineAdminPanelSettings },
    // { name: "Users", link: "/users", icon: HiOutlineUsers },
    { name: "Items", link: "/items", icon: MdProductionQuantityLimits },
    { name: "Category", link: "/category", icon: RiBillLine },
    { name: "District", link: "/district", icon: MdEmojiTransportation },
    // { name: "Orders", link: "/orders", icon: GiShoppingBag },
    // { name: "PostMan", link: "/postman", icon: MdEmojiTransportation },
    // { name: "Customer Support", link: "/agent", icon: MdSupportAgent },
    // { name: "SignOut", link: "/", icon: FaSignOutAlt, margin: true },
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
