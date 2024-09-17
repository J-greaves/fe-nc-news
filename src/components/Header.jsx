export const Header = () => {
  return (
    <header className="header">
      <img
        className="globeLogo"
        src="src/assets/logo.png"
        alt="NC News globe logo"
      />
      <img className="logo" src="src/assets/NC.svg" alt="NC News logo text" />
      <input className="searchbar" type="text" placeholder="Search.."></input>
      <img
        src="src/assets/unknownUser.png"
        alt="Right Side Image"
        className="userImg"
      />
    </header>
  );
};
