import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null); // не используется, но можно оставить
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !userName || !password) {
      setError('Please fill in all required fields');
      setSuccess('');
      return;
    }

    // Мокаем создание пользователя и токена
    const mockUserId = `mock-user-${Date.now()}`;
    const mockToken = `mock-token-${Date.now()}`;

    window.localStorage.setItem("authToken", mockToken);
    window.localStorage.setItem("userId", mockUserId);

    setSuccess('Registration successful (mock)!');
    setError('');

    setTimeout(() => {
      navigate("/profile");
    }, 500);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
            Profile Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="img"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
