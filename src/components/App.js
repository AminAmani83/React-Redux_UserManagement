import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "./about/AboutPage";
import HomePage from "./home/HomePage";
import UsersPage from "./users/UsersPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ManageUsers from "./users/ManageUsers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressesPage from "./addresses/AddressesPage";
import ManageAddresses from "./addresses/ManageAddresses";
import Footer from "./common/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/user/:id" component={ManageUsers} />
        <Route path="/user" component={ManageUsers} />
        <Route path="/addresses" component={AddressesPage} />
        <Route path="/address/:id" component={ManageAddresses} />
        <Route path="/address" component={ManageAddresses} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};

export default App;
