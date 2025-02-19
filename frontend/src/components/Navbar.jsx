import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';



const Navbar = () => {

  const { authUser } = useAuthStore();
  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <div className="flex space-x-4">
        
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {!authUser && <Link to="/signup" className="hover:text-gray-300">Signup</Link>}
          {!authUser && <Link to="/login" className="hover:text-gray-300">Login</Link>}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
