import React, { useState, useEffect } from 'react';
import axios from 'axios'; // можно оставить, не мешает

function EditUser() {
  const [user, setUser] = useState({
    email: '',
    userName: '',
    password: '',
  });
  const [error, setError] = useState('');

  const userId = window.localStorage.getItem('user_id') || 'mock-user-id';
  const authToken = window.localStorage.getItem('authToken') || 'mock-token';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 🧪 MOCK вместо реального API
        const mockUser = {
          email: 'mockuser@example.com',
          userName: 'mockUser123',
          password: ''
        };

        await new Promise((res) => setTimeout(res, 500));
        setUser(mockUser);
        console.log('🔧 Mock user loaded:', mockUser);
      } catch (err) {
        setError('Failed to load user.');
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🧪 MOCK отправка обновлений
      await new Promise((res) => setTimeout(res, 500));
      console.log('✅ Mock user updated:', user);
      alert('User updated successfully (mock)');
    } catch (err) {
      setError('Failed to update user.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <header className="bg-white shadow-md dark:bg-gray-800 p-4 mb-6">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Edit User (Mock)</h1>
      </header>
      <main className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-gray-300">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-400">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-400">Username:</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-400">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Update User
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditUser;
