import { Route, Redirect } from "react-router-dom";
import Loader from "./Loader";

const AdminRoute = ({ authState, component: Component, ...props }) => {
  return (
    <Route {...props}>
      {authState.isLoading ? (
        <Loader />
      ) : authState.user?.isAdmin ? (
        <Component />
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
};

export default AdminRoute;
