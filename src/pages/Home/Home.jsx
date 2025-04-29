import React, { useContext } from 'react';
import './Home.css'; 
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="home-container">
        {!token ? (
          <>
      <h1 className="welcome-text">Welcome to My Journal App!</h1>
      <h3 className="home-title">Here you can add, view, edit & delete your daily journals</h3>
      <h2 className="register-text">Please register yourself to view the dashboard page</h2>
          </>
        ) : (
          <>
      <h1 className="welcome-text">Welcome to My Journal App!</h1>
      <h3 className="home-title">Here you can add, view, edit & delete your daily journals</h3>
      <h2 className="register-text">Click on the dashboard button to check your daily journals.</h2>
          </>
        )}

    
    </div>
  );
}

export default Home;
