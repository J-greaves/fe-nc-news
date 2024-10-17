import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export const UserPage = ({ users }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleSignIn = (user) => {
    setLoggedInUser(user);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2 style={{ color: "black", fontSize: "clamp(16px, 10vw, 40px)" }}>
        Select a user to sign in
      </h2>
      {loggedInUser ? (
        <p style={{ color: "green" }}>
          You are currently signed in as: {loggedInUser.name}
        </p>
      ) : null}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {users.map((user) => (
          <div
            key={user.username}
            onClick={() => handleSignIn(user)}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <img
              src={user.avatar_url}
              alt={user.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p style={{ color: "black" }}>{user.name}</p>
          </div>
        ))}
      </div>
      {loggedInUser ? (
        <button onClick={() => handleSignIn(null)}>Log Out</button>
      ) : null}
    </div>
  );
};
