import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const NavBar = ({ toggle }) => {
  const {
    auth: { user },
    cart: { cartItems },
  } = useSelector((state) => state);
  const itemCount = cartItems.reduce((a, b) => a + b.quantity, 0);

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
        <div className="items-center flex">
          <Link className="p-2" to="/cart">
            <div className="flex items-center space-x-1">
              <div className="relative">
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
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <div
                  className={`${
                    itemCount < 1 ? "hidden" : ""
                  }bg-white text-black rounded-full px-1 font-semibold text-xs self-start absolute -right-1 top-0`}
                >
                  {itemCount}
                </div>
              </div>
              <p className="hidden md:block">Cart</p>
            </div>
          </Link>

          {user ? (
            <Link className="p-2" to="/account">
              <div className="flex items-center space-x-1">
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
                    strokeWidth={1}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="hidden md:block">{user.name}</p>
              </div>
            </Link>
          ) : (
            <>
              <Link className="p-2" to="/register">
                Sign Up
              </Link>
              <Link className="p-2" to="/login">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
