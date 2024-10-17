import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import * as React from "react";
import "../components/burgermenu.css";
export const BurgerMenu = () => {
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu>
      <h3>
        <Link id="home" className="menu-item" to="/">
          Topics
        </Link>
      </h3>

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
      <h3>
        <Link id="home" className="menu-item" to="/signin">
          Users
        </Link>
      </h3>
      <h3>
        <Link id="home" className="menu-item" to="/">
          Home
        </Link>
      </h3>
    </Menu>
  );
};
