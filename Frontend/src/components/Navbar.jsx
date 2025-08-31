import React, { useState } from "react";
import logo from '../assets/logoo.png'
import Login from '../components/Login'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate
  const [open, setOpen] = useState(false);
  const LoginSignUp = ()=>{
    const [action ,setAction] = useState("Sign up");
    
  }

  return (
    <>
      {/* Navbar */}
      <div className='fixed h-26 z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 '>

            <img src={logo} alt="logo" className=' w-32 sm:w-44 cursor-pointer' onClick={()=>navigate('/')}  />

            
              
                    <button onClick={() => setOpen(true)}     className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get Started </button>
                
            



        </div>

      {/* Popup (Modal) */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">Welcome</h2>

            {/* Login/Signup form */}
            
          <Login/>
            
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;


