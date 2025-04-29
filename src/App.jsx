import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignupPage from "./pages/Signup/Signup";
import "./App.css";
import LoginPage from "./pages/Login/Login";
import DashboardPage from "./components/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import GreetingCard from "./pages/greeting/Greeting";
import Chatbot from "./components/Chatbot/Chatbot";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem("darkMode");
    return storedValue === "true";
  });
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="main-content">
          <Routes>
          <Route path="/" element={
              <>
                <Home />
                <GreetingCard />
                <Chatbot/>
              </>
            } />

            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      
      </div>
    </Router>
  );
}

export default App;
