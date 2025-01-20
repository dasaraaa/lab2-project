import './index.css'; // Or the name of your Tailwind CSS file
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from './components/Header';
import Home from './pages/Home';
import News from './components/News';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
function App() {
  return (
    <div style={{ fontFamily: 'Lato, sans-serif' }}>
     <BrowserRouter>
    
      <Routes>
      <Route path="signin" element={<SignIn/>} />
      <Route path="signup" element={<SignUp/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<AboutUs/>} />
      <Route path='/contact' element={<ContactUs/>} />
      <Route path='/news' element ={<News/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
