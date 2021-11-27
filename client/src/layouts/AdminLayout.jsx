import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-between">
        <div className="hidden md:block w-1/5">
          <div className="card">
            <ul>
              <li className="mb-4">
                <Link to="/admin" className="font-bold">
                  Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/admin/categories" className="font-medium">
                  Categories
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/admin/orders" className="font-medium">
                  Orders
                </Link>
              </li>
              <li className="mb-8">
                <Link to="/admin/banners" className="font-medium">
                  Banners
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
        <div className="py-2 px-4 w-full md:w-9/12">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
