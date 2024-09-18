import { Link } from "react-router-dom";

export const Header = () => {
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
      <img
        src="src/assets/unknownUser.png"
        alt="Right Side Image"
        className="userImg"
      />
    </header>
  );
};
