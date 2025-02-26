import './index.css'; // Or the name of your Tailwind CSS file
import { BrowserRouter , Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from './pages/Home';
import News from './components/News';
import AboutUs from './pages/AboutUs';
import ContactUs from "./pages/ContactUs"
// import ItemCard from './components/Items/ItemCard';
import Category from './components/admin/Category';
import { ModalProvider } from 'react-hooks-use-modal';
import Sidebar from './components/admin/Sidebar';
import District from './components/admin/District';
import Items from './components/admin/Items';
import {AuthContext} from "./helpers/AuthContext"
import { useState} from 'react';
import InventoryItems from './pages/InventoryItems';
import NotFound from './pages/NotFound';
import Dashboard from './components/admin/Dashboard';
import Supplier from './components/admin/Supplier';
import Orders from './components/admin/Orders';
import OrdersList from './components/admin/OrdersList';
import DistrictRequestsList from './components/admin/DistrictRequestsList';
function App() {
  const [authState, setAuthState] = useState({name:"", id:0, status:false,});
  

  return (
    <div style={{ fontFamily: 'Lato, sans-serif' }}>
      <AuthContext.Provider value = {{authState,setAuthState}}>
     <BrowserRouter>
     <ModalProvider>
      <Routes>
        
      <Route path="signin" element={<SignIn/>} />
      <Route path="signup" element={<SignUp/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<AboutUs/>} />
      <Route path='/contact' element={<ContactUs/>} />
      <Route path='/news' element ={<News/>} />
      <Route path='/sidebar' element= {<Sidebar />} />
      <Route path='/category' element= {<Category />} />
      <Route path='/district' element= {<District />} />
      <Route path='/items' element={<Items/>} />
      <Route path='/inventory' element={<InventoryItems/>} />
      <Route path='/notfound' element={<NotFound/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/supplier' element={<Supplier/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/ordersList' element={<OrdersList/>} />
      <Route path='/requests' element={<DistrictRequestsList/>} />

       </Routes>
     </ModalProvider>
     </BrowserRouter>
     </AuthContext.Provider>
    </div>
  );
}

export default App;
