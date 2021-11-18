import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const AccountLayout = ({ children, title }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-between">
        <div className="hidden md:block w-1/5">
          <div className="card">
            <ul>
              <li className="mb-4">
                <Link to="/account" className="font-bold">
                  My Account
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/account/address" className="font-medium">
                  Address
                </Link>
              </li>
              <li className="mb-8">
                <Link to="/account/orders" className="font-medium">
                  Orders
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="font-medium"
                  onClick={() => dispatch(logout())}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-2 px-4 w-full md:w-9/12">
          <p className="font-bold mb-4">{title}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
