import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/pages/index";
import Login from "../src/pages/auth/login";
import AboutUs from "../src/pages/about-us";
import Signup from "../src/pages/auth/signUp";
import ForgotPassword from "../src/pages/auth/forgot-password";
import ContactUs from "../src/pages/contact-us";
import Account from "../src/pages/account/index";
import MyOrders from "../src/pages/account/my-orders";
import PlaceOrder from "../src/pages/account/place-order";
import Cart from "../src/pages/account/my-cart";
import Order from "../src/pages/account/[orderId]";
import AddProduct from "@/pages/admin/add-product";
import Admin from "../src/pages/admin/index";
import ViewOrders from "../src/pages/admin/view-orders/index";
import ViewRequests from "../src/pages/admin/view-requests/index";
import ViewProducts from "../src/pages/admin/view-products/index";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/my-orders" element={<MyOrders />} />
        <Route path="/account/place-order" element={<PlaceOrder />} />
        <Route path="/account/my-cart" element={<Cart />} />
        <Route path="/account/:orderId" element={<Order />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/view-orders" element={<ViewOrders />} />
        <Route path="/admin/view-requests" element={<ViewRequests />} />
        <Route path="/admin/view-products" element={<ViewProducts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routes;
