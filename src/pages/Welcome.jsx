import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Welcome() {
  const { username } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      {username ? (
        <h1 style={styles.welcomeText}>
          Welcome, {username}! Feel free to share your experience
        </h1>
      ) : (
        <h2 style={styles.welcomeText}>Username not found...</h2>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
  },
  welcomeText: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#000",
  },
};

export default Welcome;
