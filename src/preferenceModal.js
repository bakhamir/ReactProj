import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreferencesPage = () => {
  const [sex, setSex] = useState('');
  const [ageRangeMin, setAgeRangeMin] = useState('');
  const [ageRangeMax, setAgeRangeMax] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    const profileId = localStorage.getItem('profileId');

    if (!profileId) {
      setError('Missing profile ID (mock)');
      return;
    }

    if (!sex || !ageRangeMin || !ageRangeMax) {
      setError('Please fill all fields');
      return;
    }

    // Мок-сохранение
    const mockPreferenceId = `mock-pref-${Date.now()}`;
    localStorage.setItem('preference_id', mockPreferenceId);

    setSuccess('Preferences saved (mock)!');
    setError('');

    // Переход на дэшборд через 0.5 секунды
    setTimeout(() => navigate("/dashboard"), 500);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Set Preferences</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Preferred Sex</label>
          <select
            className="mb-2 w-full p-2 border border-gray-300 rounded"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="" disabled>Select Gender</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>

        <input
          className="mb-2 w-full p-2 border border-gray-300 rounded"
          type="number"
          placeholder="Minimum Age"
          value={ageRangeMin}
          onChange={(e) => setAgeRangeMin(e.target.value)}
        />
        <input
          className="mb-2 w-full p-2 border border-gray-300 rounded"
          type="number"
          placeholder="Maximum Age"
          value={ageRangeMax}
          onChange={(e) => setAgeRangeMax(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPage;
