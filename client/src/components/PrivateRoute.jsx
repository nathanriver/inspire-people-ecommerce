import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ user, component: Component, ...props }) => {
  return (
    <Route {...props}>{user ? <Component /> : <Redirect to="/login" />}</Route>
  );
};

export default PrivateRoute;
