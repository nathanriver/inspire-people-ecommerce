import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => {
  return (
    <>
      <nav className={isOpen ? "sidebar active" : "sidebar"}>
        <div className="flex text-white justify-end p-4">
          <button onClick={toggle}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul>
          <li>
            <Link className="sidebar-item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="sidebar-item" to="/cart">
              Cart
            </Link>
          </li>
          <li>
            <Link className="sidebar-item" to="/register">
              Sign Up
            </Link>
          </li>
          <li>
            <Link className="sidebar-item" to="/login">
              Sign In
            </Link>
          </li>
          <p className="font-bold pl-2 mt-4">Account</p>
          <li>
            <Link className="sidebar-item" to="/account">
              Profile
            </Link>
          </li>
          <li>
            <Link className="sidebar-item" to="/account/address">
              Address
            </Link>
          </li>
          <li>
            <Link className="sidebar-item" to="/account/orders">
              Orders
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
