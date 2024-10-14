import { useState } from "react";
import ConverterForm from "./components/ConverterForm";

const App = () => {
  // Manage dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // Apply dark mode class conditionally
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-tl from-sky-300 to-white dark:bg-gradient-to-tl dark:from-sky-950 dark:to-black flex justify-center items-center px-4">
        <div className="container max-w-3xl mx-auto bg-transparent dark:bg-transparent shadow-2xl rounded-lg p-6 md:p-12 lg:p-16">
          {/* Flex container for header and theme toggle button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
              Currency Converter
            </h2>
            {/* Theme Toggle Button */}
            <button
              className="w-10 h-6 bg-blue-900 dark:bg-sky-800 rounded-full flex justify-center items-center transition-all ease-in-out duration-300"
              onClick={toggleDarkMode}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Main Converter Form Component */}
          <ConverterForm />
        </div>
      </div>
    </div>
  );
};

export default App;
