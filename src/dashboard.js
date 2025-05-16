import React, { useState, useEffect, useRef } from 'react';
import SendbirdApp from '@sendbird/uikit-react/App'; // оставить, чтоб не крашился импорт
import './custom.css';
import { useSwipeable } from 'react-swipeable';

function Dashboard() {
  const [avatar, setAvatar] = useState('/soij.jpg');
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState('Demo User');
  const [swipeDirection, setSwipeDirection] = useState(null);
  const profileRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [matchMessage, setMatchMessage] = useState('');
  const [likeMessage, setLikeMessage] = useState('');
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  const fetchProfiles = async () => {
    // Заглушка: мок-профили
    const mockProfiles = [
      {
        avatar: '/soijak.png',
        profile: {
          fullName: 'Alice',
          age: 25,
          shortDesc: 'Loves cats and hiking',
          about: 'Software engineer from SF'
        }
      },
      {
        avatar: '/soij.jpg',
        profile: {
          fullName: 'Bob',
          age: 30,
          shortDesc: 'Musician and traveler',
          about: 'Enjoys long walks on the beach'
        }
      }
    ];
    setProfiles(mockProfiles);
  };

  const fetchUser = async () => {
    localStorage.setItem('profileId', 'mock-profile-id');
    localStorage.setItem('preference_id', 'mock-preference-id');
    localStorage.setItem('userId', 'mock-user-id');
    setUser('Demo User');
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .sendbird-ui-header__right.sendbird-ui-header--is-desktop {
        display: none !important;
      }
      .container {
        overflow: hidden;
        position: relative;
      }
      .card {
        transition: transform 0.5s ease;
        will-change: transform;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .card.swiped-left {
        transform: translateX(-120%);
      }
      .card.swiped-right {
        transform: translateX(120%);
      }
    `;
    document.head.appendChild(style);

    fetchUser();
    fetchProfiles();
  }, []);

  const handleNextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousProfile = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const likeProfile = async () => {
    setLikeMessage('Profile liked!');
    setTimeout(() => setLikeMessage(''), 3000);
  };

  const checkMatch = async () => {
    const matched = Math.random() > 0.5;
    if (matched) {
      setMatchMessage("It's a match!");
      localStorage.setItem('matchId', 'mock-match-id');
    } else {
      setMatchMessage('No match.');
    }
    setTimeout(() => setMatchMessage(''), 3000);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark', !isDarkTheme);
  };

  const toggleWidgetVisibility = () => {
    setIsWidgetVisible(!isWidgetVisible);
  };

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      setSwipeDirection(null);
    }, 500);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => {
      handleSwipe('right');
      likeProfile();
      checkMatch();
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className={`h-screen bg-gray-100 flex flex-col bg-gradient-to-r from-pink-500 to-purple-500 ${isDarkTheme ? 'dark' : ''}`}>
      <header className="flex justify-between items-center p-4 bg-white shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">Cupid</h1>
        <div className="relative">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden cursor-pointer" onClick={toggleDropdown}>
            <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 dark:bg-gray-700">
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600" onClick={toggleTheme}>
                {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
              </button>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600" onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="h-screen flex-1 flex justify-center items-center p-6 dark:bg-gray-900">
        <div className={`card bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl dark:bg-gray-800 dark:text-gray-300 ${swipeDirection === 'right' ? 'swiped-right' : swipeDirection === 'left' ? 'swiped-left' : ''}`} {...swipeHandlers}>
          {error && <p className="text-red-500">{error}</p>}
          {matchMessage && <p className="text-green-500">{matchMessage}</p>}
          {likeMessage && <p className="text-green-500">{likeMessage}</p>}
          {profiles.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md h-96 bg-gray-300 rounded-lg overflow-hidden mb-4">
                <img src={profiles[currentIndex].avatar} alt="Profile Avatar" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-4">
                {profiles[currentIndex].profile.fullName}, {profiles[currentIndex].profile.age}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{profiles[currentIndex].profile.shortDesc}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{profiles[currentIndex].profile.about}</p>
              <div className="flex mt-4 space-x-2">
                <button className="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full dark:bg-gray-600" onClick={handlePreviousProfile}>⟲</button>
                <button className="w-12 h-12 flex justify-center items-center bg-green-500 text-white rounded-full" onClick={likeProfile}>❤</button>
                <button className="w-12 h-12 flex justify-center items-center bg-blue-500 text-white rounded-full" onClick={checkMatch}>⭐</button>
              </div>
              <div className="mt-4">
                <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={handleNextProfile} disabled={currentIndex === profiles.length - 1}>Next</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center shadow-md dark:bg-gray-800 dark:text-gray-300">
        <p>© 2024 Cupid. All rights reserved.</p>
      </footer>

      <div className="fixed bottom-5 right-5">
        <button className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg" onClick={toggleWidgetVisibility}>💬</button>
      </div>

      {isWidgetVisible && (
        <div className="fixed bottom-20 right-5 w-200 h-96 bg-white shadow-lg rounded-lg flex items-center justify-center">
          <p className="text-gray-700">🔌 Chat widget placeholder</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
