import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import * as React from "react";
import "../components/burgermenu.css";
export const BurgerMenu = () => {
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu>
      <h2>
        <Link id="home" className="menu-item" to="/">
          Topics
        </Link>
      </h2>

      <Link className="menu-item" to="/">
        All Articles
      </Link>
      <Link className="menu-item" to="/?topic=coding">
        Coding
      </Link>
      <Link className="menu-item" to="/?topic=cooking">
        Cooking
      </Link>
      <Link className="menu-item" to="/?topic=football">
        Football
      </Link>
      <h2>
        <Link id="home" className="menu-item" to="/signin">
          Users
        </Link>
      </h2>
      <h2>
        <Link id="home" className="menu-item" to="/">
          Home
        </Link>
      </h2>
    </Menu>
  );
};
