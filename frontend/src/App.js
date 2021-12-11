import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import store from "./store";
import { getUser } from "./_actions/userAction";
import { useSelector } from "react-redux";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import Metadata from "./components/layout/Metadata";
import NotFound from "./components/layout/NotFound/NotFound";

import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import UpdatePassword from "./components/Auth/UpdatePassword/UpdatePassword";

import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import ProductDetail from "./components/Product/ProductDetail";
import About from "./components/About/About";
import ProductsHelp from "./components/Help/ProductsHelp";
import ShippingHelp from "./components/Help/ShippingHelp";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import CreateOrder from "./components/Order/CreateOrder";
import OrderSuccess from "./components/Order/OrderSuccess";
import MyProfile from "./components/My/MyProfile.js";
import MyOrder from "./components/My/MyOrder";

import AdminSidebar from "./components/layout/Admin/AdminSidebar/AdminSidebar";
import AdminTopbar from "./components/layout/Admin/AdminTopbar/AdminTopbar";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ProductList from "./components/Admin/Product/ProductList";
import ProductUpdate from "./components/Admin/Product/ProductUpdate";
import UserList from "./components/Admin/User/UserList";
import UserUpdate from "./components/Admin/User/UserUpdate";

function App() {
  const { loading, user, isAuth } = useSelector((state) => state.userState);
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />

        <PublicRoute exact path='/' component={Home} metadata='Home' />

        <PublicRoute exact path='/product' component={Product} metadata='Product' />
        <PublicRoute
          path='/product/:productId'
          component={ProductDetail}
          metadata='Product'
        />

        <PublicRoute exact path='/about' component={About} metadata='About Us' />
        <PublicRoute
          exact
          path='/help/products'
          component={ProductsHelp}
          metadata='Help'
        />
        <PublicRoute
          exact
          path='/help/shipping'
          component={ShippingHelp}
          metadata='Help'
        />

        <PublicRoute path='/cart' component={Cart} metadata='Cart' />

        <ProtectedRoute path='/checkout' component={Checkout} metadata='Checkout' />

        <ProtectedRoute
          path='/order/create'
          component={CreateOrder}
          metadata='Create Order'
        />
        <ProtectedRoute
          path='/order/success'
          component={OrderSuccess}
          metadata='Order Success'
        />

        <ProtectedRoute
          path='/me'
          component={MyProfile}
          metadata={user ? `${user.name}'s Profile` : "My Profile"}
        />
        <ProtectedRoute path='/order/me' component={MyOrder} metadata='My Order' />

        <ProtectedRoute
          path='/password/update'
          component={UpdatePassword}
          metadata='Update Password'
        />

        <Route
          path='/admin'
          render={({ match: { url } }) => {
            if (loading === false) {
              if (isAuth === false) {
                return <Redirect to='/login' />;
              }
              if (user.role !== "admin") {
                return <Redirect to='/' />;
              }
              return (
                <>
                  <Metadata title='Pertiwi | Admin' />
                  <AdminSidebar />
                  <div className='adminContainer'>
                    <AdminTopbar user={user} isAuth={isAuth} />
                    <Route path={`${url}/dashboard`} component={Dashboard} />

                    <Route path={`${url}/products`} component={ProductList} />
                    <Route path={`${url}/product/:productId`} component={ProductUpdate} />

                    <Route path={`${url}/users`} component={UserList} />
                    <Route path={`${url}/user/:userId`} component={UserUpdate} />
                  </div>
                </>
              );
            }
          }}
        />

        <Route exact path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
