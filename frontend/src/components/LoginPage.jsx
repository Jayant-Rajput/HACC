import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useFirebase } from "../context Api/Firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Signin = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [user, setUser] = useState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(()=>{
    onAuthStateChanged(firebase.firebaseAuth, (user) => {
        if(user){
            setUser(user);
        }else{{
            setUser(null);
        }}
    })
  },[onAuthStateChanged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleGoogleSignIn = async () => {
    await firebase.signInWithGoogle();
  };

  const handleGithubSignIn = async () => {
    await firebase.signInWithGithub();
  };

  if (isLoggingIn) {
    return <h1>Logging In...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email ID */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Id
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-4 space-y-3">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>

          <button
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
          >
            <FaGithub className="mr-2" /> Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
