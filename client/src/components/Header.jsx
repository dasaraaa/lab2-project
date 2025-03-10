import React, { useState, useEffect,useContext  } from 'react';
import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import logo from "../assets/images/logo.png";
import { Button } from '@headlessui/react';
import axios from 'axios';
const services = [
  { id: 1, name: 'Equipment and Technology' },
  { id: 2, name: 'Furniture' },
  { id: 3, name: 'Library Resources' },
  { id: 4, name: 'Classroom Supplies' },
];
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [authState, setAuthState] = useState({name:"", id:0, status:false,});
   useEffect(() => {
      axios.get("http://localhost:5000/auth/auth", {
        headers: {
          accessToken : localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if(response.data.error) {
          setAuthState({...authState, status: false});
        } else {
          setAuthState({name: response.data.name, id: response.data.id, status: true});
        }
        
      })
    } , [])  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({name:"", id:0, status:false,});
    navigate("/signin")
  }
 
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="UBT" />
          {/* <span className="color-blue-800 self-center text-2xl font-bold whitespace-nowrap">UBT</span> */}
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        {!authState.status ? (
            <Link
              to="/signup"
              className="text-white bg-blue-900 hover:bg-white hover:text-black font-medium rounded-md border border-black text-sm px-4 py-2 text-center"
            >
              Get Started
            </Link>
          ) : (
            <Button
              onClick={logout}
              to="/"
              className="text-white bg-orange-600 hover:bg-white hover:text-black font-medium rounded-md border border-orange-900 text-sm px-6 py-2 text-center"
            >
              Logout
             
            </Button> 
          )}
         <h1 className="text-lg font-semibold text-gray-700 dark:text-white   px-4 py-2 rounded-lg ">
            {authState.name}
          </h1>

          {/* <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
          </button> */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)} // Toggle the state
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <XIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className={`items-center text-xl justify-between md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0 hover:text-black"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0 hover:text-black"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0 hover:text-black"
              >
                Inventory Items
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0 hover:text-black"
              >
                Help Center
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Shopping Cart Slideover
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-white w-80 h-full shadow-lg p-4">
            <button
              type="button"
              className="mb-4 text-gray-500 hover:text-gray-700"
              onClick={() => setCartOpen(false)}
            >
              <XIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <h2 className="ml-10px text-xl font-semibold">Shopping Cart</h2>
          </div>
          <div className="flex-grow bg-black opacity-50" onClick={() => setCartOpen(false)}></div>
        </div>
      )} */}
    </nav>
  );
};

export default Header;
