import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const NavBar = ({ toggle }) => {
  return (
    <nav className="bg-black text-white px-4">
      <div className="container flex justify-between mx-auto items-center h-16">
        <div className="flex items-center">
          <div className="px-4 cursor-pointer md:hidden " onClick={toggle}>
            <svg
              className="w-6 h-6"
              data-darkreader-inline-stroke=""
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <Link to="/">
            <img className="h-8" src={Logo} alt="Inspire People" />
          </Link>
        </div>
        <div className="items-center md:flex hidden">
          <Link className="p-2" to="/cart">
            Cart
          </Link>
          <Link className="p-2" to="/register">
            Sign Up
          </Link>
          <Link className="p-2" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
