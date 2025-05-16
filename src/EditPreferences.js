import React, { useState, useEffect } from 'react';
// axios можно оставить, но мы его "обманем"
import axios from 'axios';

function EditPreferences() {
  const [preferences, setPreferences] = useState({
    preference1: '',
    preference2: '',
    preference3: '',
  });
  const [error, setError] = useState('');
  const preferencesId = window.localStorage.getItem('preference_id') || 'mock-id';
  const authToken = window.localStorage.getItem('authToken') || 'mock-token';

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // 🧪 MOCK DATA вместо реального API
        const mockData = {
          preference1: 'Mock Value 1',
          preference2: 'Mock Value 2',
          preference3: 'Mock Value 3',
        };

        // имитируем задержку как у настоящего запроса
        await new Promise((res) => setTimeout(res, 500));
        setPreferences(mockData);
        console.log('🔧 Loaded mocked preferences');
      } catch (err) {
        setError('Failed to load preferences.');
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🧪 MOCK PUT вместо настоящего запроса
      await new Promise((res) => setTimeout(res, 500));
      console.log('✅ Preferences updated (mock):', preferences);
      alert('Preferences updated successfully (mock)');
    } catch (err) {
      setError('Failed to update preferences.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <header className="bg-white shadow-md dark:bg-gray-800 p-4 mb-6">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Edit Preferences (Mock)</h1>
      </header>
      <main className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-gray-300">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {['preference1', 'preference2', 'preference3'].map((pref, idx) => (
            <div className="mb-4" key={pref}>
              <label className="block text-gray-700 dark:text-gray-400">
                Preference {idx + 1}:
              </label>
              <input
                type="text"
                name={pref}
                value={preferences[pref]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                required={idx === 0}
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Update Preferences
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditPreferences;
