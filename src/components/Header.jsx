import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export const Header = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <header className="header">
      <Link to="/">
        <div className="logo-set">
          <img
            className="logo globeLogo"
            src="src/assets/logo.png"
            alt="NC News globe logo"
          />
          <img
            className="logo"
            src="src/assets/NC.svg"
            alt="NC News logo text"
          />
        </div>
      </Link>
      <input className="searchbar" type="text" placeholder="Search.."></input>
      <Link to="/signin">
        <img
          src={
            loggedInUser
              ? loggedInUser.avatar_url
              : "src/assets/unknownUser.png"
          }
          alt="Right Side Image"
          className="userImg"
        />
      </Link>
    </header>
  );
};
