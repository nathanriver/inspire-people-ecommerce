import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "./components/Container";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
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
import Dashboard from "./pages/Admin/Dashboard";
import Category from "./pages/Admin/Category";
import ProductSize from "./pages/Admin/ProductSize";
import Products from "./pages/Admin/Products";
import ProductDetail from "./pages/Admin/ProductDetail";
import Banner from "./pages/Admin/Banner";
import Order from "./pages/Admin/Order";
import AdminOrderDetail from "./pages/Admin/OrderDetail";

const authRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

const privateRoutes = [
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
    path: "/account/orders/:orderNumber",
    component: OrderDetail,
  },
];

const Routes = () => {
  const { auth: authState, cart: cartState } = useSelector((state) => state);
  return (
    <Container>
      <Switch>
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/banners" component={Banner} />
        <Route exact path="/admin/categories" component={Category} />
        <Route exact path="/admin/orders" component={Order} />
        <Route
          exact
          path="/admin/orders/:orderId"
          component={AdminOrderDetail}
        />
        <Route
          exact
          path="/admin/categories/:categoryId/product-sizes"
          component={ProductSize}
        />
        <Route
          exact
          path="/admin/categories/:categoryId/products"
          component={Products}
        />
        <Route
          exact
          path="/admin/categories/:categoryId/products/:productId/stock"
          component={ProductDetail}
        />

        <Route exact path="/" component={Home} />
        <Route exact path="/products/:slug" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout">
          {authState.isLoading || cartState.isLoading ? (
            <Loader />
          ) : authState.user && cartState.cartItems.length ? (
            <Checkout />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        {authRoutes.map(({ path, component }, i) => (
          <AuthRoute
            key={i}
            exact
            path={path}
            component={component}
            authState={authState}
          />
        ))}
        {privateRoutes.map(({ path, component }, i) => (
          <PrivateRoute
            key={i}
            exact
            path={path}
            component={component}
            authState={authState}
          />
        ))}
      </Switch>
    </Container>
  );
};

export default Routes;
