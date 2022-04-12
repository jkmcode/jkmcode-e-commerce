import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductsEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserOrders from "./screens/UserOrders";
import AdminScreen from "./screens/AdminScreen";
import ResetPassword from "./screens/ResetPassword";
import NewPassword from "./screens/NewPassword";

//Djoser
import ActivateScreen from "./screens/ActivateScreen";
import LoginDjoserScreen from "./screens/LoginDjoserScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ResetPasswordConfirmScreen from "./screens/ResetPasswordConfirmScreen";
import SignupScreen from "./screens/SignupScreen";

import { HashRouter as Router, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <Header />
      <main className="mt-5">
        <Container>
          <ScrollToTop />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:_id" component={ProductScreen} />
          <Route path="/cart/:_id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/forgotpassword" component={ResetPassword} />
          <Route path="/newpassword" component={NewPassword} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin" component={AdminScreen} />
          <Route path="/orders" component={UserOrders} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

          {/* Djoser */}
          <Route path="/login-djoser" component={LoginDjoserScreen} />
          <Route path="/signup" component={SignupScreen} />
          <Route path="/reset-password" component={ResetPasswordScreen} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirmScreen}
          />
          <Route path="/activate/:uid/:token" component={ActivateScreen} />

          {/* //Tutorial
          <Route path='/tutorial' component={ReactTutorial}/> */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
