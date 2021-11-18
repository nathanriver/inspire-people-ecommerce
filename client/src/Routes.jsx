import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "./components/Container";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import MyAddress from "./pages/MyAddress";
import MyOrder from "./pages/MyOrder";
import OrderDetail from "./pages/OrderDetail";
import Loader from "./components/Loader";

const privateRoutes = [
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/account/address",
    component: MyAddress,
  },
  {
    path: "/account/orders",
    component: MyOrder,
  },
  {
    path: "/account/orders/:id",
    component: OrderDetail,
  },
];

const Routes = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/products/:slug" component={Product} />
        <Route exact path="/cart" component={Cart} />
        {isLoading ? (
          <Loader />
        ) : (
          privateRoutes.map(({ path, component }, i) => (
            <PrivateRoute
              key={i}
              exact
              path={path}
              component={component}
              user={user}
            />
          ))
        )}
      </Switch>
    </Container>
  );
};

export default Routes;
