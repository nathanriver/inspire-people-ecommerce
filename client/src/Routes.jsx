import { Route, Switch } from "react-router-dom";
import Container from "./components/Container";
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

const Routes = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/products/:slug" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/account/address" component={MyAddress} />
        <Route exact path="/account/orders" component={MyOrder} />
        <Route exact path="/account/orders/:id" component={OrderDetail} />
      </Switch>
    </Container>
  );
};

export default Routes;
