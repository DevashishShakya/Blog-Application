import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  // const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  const username = userInfo?.username;
  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      console.log("logged out");
      setUserInfo(null);
    });
  }
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
        {`    ${username ? username : ""}`}
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="./login">Login</Link>
            <Link to="./register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
