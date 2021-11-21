import { Route, Redirect } from "react-router-dom";
import Loader from "./Loader";

const AuthRoute = ({ authState, component: Component, ...props }) => {
  return (
    <Route {...props}>
      {authState.isLoading ? (
        <Loader />
      ) : !authState.user ? (
        <Component />
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
};

export default AuthRoute;
