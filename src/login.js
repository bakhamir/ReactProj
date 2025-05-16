import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🧪 Моковая авторизация (без запросов)
    try {
      if (!email || !password) {
        throw new Error("Missing credentials");
      }

      // Притворяемся, что всё хорошо
      window.localStorage.setItem("authToken", "mock-token");
      setSuccess('Login successful (mock)!');
      setError('');

      // Переход в дэшборд
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setError('Login failed (mock). Please enter email and password.');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
