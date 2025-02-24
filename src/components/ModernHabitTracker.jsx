import React, { useState } from 'react';

const ModernHabitTracker = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [habits, setHabits] = useState([
    { id: 1, text: 'Morning Meditation', category: 'Health', completed: false, progress: 0.65, streak: 7 },
    { id: 2, text: 'Read 30 Pages', category: 'Learning', completed: false, progress: 0.42, streak: 3 },
    { id: 3, text: 'Exercise', category: 'Health', completed: true, progress: 0.9, streak: 14 },
    { id: 4, text: 'Practice Coding', category: 'Work', completed: false, progress: 0.78, streak: 10 },
    { id: 5, text: 'Journaling', category: 'Personal', completed: false, progress: 0.35, streak: 2 },
    { id: 6, text: 'Drink Water', category: 'Health', completed: true, progress: 0.95, streak: 21 },
  ]);
  
  const [newHabit, setNewHabit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Health');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const categories = ['All', 'Work', 'Health', 'Learning', 'Personal'];
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };
  
  const addHabit = () => {
    if (newHabit.trim()) {
      const newHabitObj = {
        id: habits.length + 1,
        text: newHabit,
        category: selectedCategory,
        completed: false,
        progress: 0,
        streak: 0
      };
      setHabits([...habits, newHabitObj]);
      setNewHabit('');
    }
  };
  
  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };
  
  const filteredHabits = activeCategory === 'All' 
    ? habits 
    : habits.filter(habit => habit.category === activeCategory);
  
  const getFormattedDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getMonthData = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    
    const firstDay = new Date(year, month, 1).getDay();
    const dateArray = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      dateArray.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      dateArray.push(new Date(year, month, i));
    }
    
    return dateArray;
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      {/* Navbar */}
      <nav className={`py-4 px-6 flex justify-between items-center ${darkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-80'} backdrop-blur-lg shadow-md sticky top-0 z-10`}>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg transition-colors duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Habit Tracker</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <div className="relative">
            <button className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600">
              <span className="sr-only">Profile</span>
            </button>
          </div>
        </div>
      </nav>
      
      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${isSidebarOpen ? 'w-64' : 'w-20'} ${darkMode ? 'bg-gray-800' : 'bg-white'} h-screen sticky top-16 transition-all duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-0'} shadow-lg`}
        >
          <div className="p-4">
            <h2 className={`font-semibold uppercase text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${isSidebarOpen ? 'block' : 'hidden'} mb-4`}>Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                      activeCategory === category 
                        ? darkMode 
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : darkMode 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className={`ml-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>{category}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header & Date */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold">{getFormattedDate(selectedDate)}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                Track your daily habits and build consistency
              </p>
            </div>
            
            {/* Add New Habit */}
            <div className={`mb-8 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} backdrop-blur-sm`}>
              <h3 className="text-xl font-semibold mb-4">Add New Habit</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Enter a new habit..."
                  className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 focus:ring-indigo-500 text-white placeholder-gray-400'
                      : 'bg-gray-100 focus:ring-purple-500 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 focus:ring-indigo-500 text-white'
                      : 'bg-gray-100 focus:ring-purple-500 text-gray-900'
                  }`}
                >
                  {categories.filter(c => c !== 'All').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  onClick={addHabit}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Habit
                </button>
              </div>
            </div>
            
            {/* Calendar Component */}
            <div className={`mb-8 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} backdrop-blur-sm`}>
              <h3 className="text-xl font-semibold mb-4">Calendar</h3>
              <div className="calendar-grid">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {getMonthData().map((date, index) => (
                    <div
                      key={index}
                      onClick={() => date && setSelectedDate(date)}
                      className={`
                        text-center p-2 rounded-lg cursor-pointer transition-all duration-200
                        ${!date ? 'opacity-0 pointer-events-none' : ''}
                        ${
                          date && date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth()
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                            : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      {date && date.getDate()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Habits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHabits.map((habit) => (
                <div
                  key={habit.id}
                  className={`p-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                    darkMode
                      ? 'bg-gray-800 bg-opacity-60 hover:bg-opacity-80'
                      : 'bg-white hover:bg-gray-50'
                  } backdrop-blur-sm`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold ${habit.completed ? 'line-through opacity-70' : ''}`}>
                        {habit.text}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {habit.category}
                      </span>
                    </div>
                    
                    {/* Circular Progress */}
                    <div className="relative flex items-center justify-center w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="15"
                          fill="none"
                          stroke={darkMode ? '#374151' : '#E5E7EB'}
                          strokeWidth="3"
                        />
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="15"
                          fill="none"
                          stroke={habit.category === 'Health' ? '#8B5CF6' : habit.category === 'Work' ? '#3B82F6' : habit.category === 'Learning' ? '#10B981' : '#EC4899'}
                          strokeWidth="3"
                          strokeDasharray={`${habit.progress * 94.2}, 94.2`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                        <text 
                          x="18" 
                          y="18" 
                          dominantBaseline="middle" 
                          textAnchor="middle" 
                          className="text-xs font-medium"
                          fill="currentColor"
                        >
                          {Math.round(habit.progress * 100)}%
                        </text>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm font-medium">{habit.streak} day streak</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          habit.completed
                            ? 'bg-green-500 bg-opacity-20 text-green-500'
                            : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600 text-red-400 hover:text-red-500' : 'bg-gray-200 hover:bg-gray-300 text-red-500 hover:text-red-600'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernHabitTracker;