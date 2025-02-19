import { NavLink } from "react-router-dom";
const NavBar = ({ navItemList }) => {
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <ul className="navbar-nav flex-row gap-5 fs-5">
          {navItemList.map((navItem,index) => {
            return (
              <li className="nav-item" key={index}>
                <NavLink className="nav-link" to={navItem.path}>
                  {navItem.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
