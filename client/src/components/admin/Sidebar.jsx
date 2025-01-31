import React from 'react';
import { Outlet } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { BsHouse } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { HiOutlineUsers } from 'react-icons/hi';
import { RiBillLine } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { MdEmojiTransportation } from 'react-icons/md';
import { MdSupportAgent } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { MdNotificationsActive } from 'react-icons/md';

const Sidebar = () => {
  const menus = [
    { name: 'Dashboard', link: '/admin', icon: BsHouse },
    { name: 'Admin', link: '/admintable', icon: MdOutlineAdminPanelSettings },
    { name: 'Users', link: '/users', icon: HiOutlineUsers },
    { name: 'Orders', link: '/orders', icon: GiShoppingBag },
    { name: 'Products', link: '/products', icon: MdProductionQuantityLimits },
    { name: 'Category', link: '/category', icon: RiBillLine },
    { name: 'PostMan', link: '/postman', icon: MdEmojiTransportation },
    { name: 'Customer Support', link: '/agent', icon: MdSupportAgent },
    { name: 'SignOut', link: '/', icon: FaSignOutAlt, margin: true },
  ];

  return (
    <div className="flex gap-6">
      <span className="absolute bg-transparent border-2 cursor-pointer flex items-center justify-center w-12 h-12 top-6 right-6 rounded-full">
        <MdNotificationsActive fill="grey" size={30} />
      </span>
      <div className="bg-blue-900 p-6 min-h-screen w-72 text-gray-100 px-4">
        <div className="flex gap-x-3 items-center">
          <h2 className="font-bold text-white origin-left text-xl">Hi User</h2>
        </div>

        <div className="mt-8 gap-6 flex flex-col relative">
          <h1>User Menu</h1>
          {menus.map((menu, i) => (
            <ul
              key={i}
              className="flex cursor-pointer items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
            >
              <div>
                {React.createElement(menu.icon, {
                  size: '20',
                  color: 'white',
                })}
              </div>
              <h2>{menu.name}</h2>
            </ul>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
