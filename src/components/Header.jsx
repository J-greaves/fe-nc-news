import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import globeLogo from "../assets/logo.png";
import ncLogo from "../assets/NC.svg";
import unknownUser from "../assets/unknownUser.png";

export const Header = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <header className="header">
      <Link to="/">
        <div className="logo-set">
          <img
            className="logo globeLogo"
            src={globeLogo}
            alt="NC News globe logo"
          />
          <img className="logo" src={ncLogo} alt="NC News logo text" />
        </div>
      </Link>
      <input className="searchbar" type="text" placeholder="Search.."></input>
      <Link to="/signin">
        <img
          src={loggedInUser ? loggedInUser.avatar_url : unknownUser}
          alt="Right Side Image"
          className="userImg"
        />
      </Link>
    </header>
  );
};
