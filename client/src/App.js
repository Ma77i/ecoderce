import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/Containers/ItemListContainer";
import ItemDetailContainer from "./components/Containers/ItemDetailContainer";
import SignContainer from "./components/Containers/SignContainer";
import Logout from "./components/Sign/Logout";
import Cart from "./components/Cart/Cart";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Order from "./components/Cart/Order";
import Account from "./components/user/Account";
import AdminContainer from "./components/Admin/AdminContainer";
import UserAdmin from "./components/Admin/UserAdmin";
import ProductAdmin from "./components/Admin/ProductAdmin";
import OrderAdmin from "./components/Admin/OrderAdmin";
import AddProduct from "./components/Admin/AddProduct";
import Chat from "./components/Chat/Chat";

import store from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        {/* <CartProvider> */}
          <NavBar />
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/:sign" element={<SignContainer />} />

            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store"
              element={
                <ProtectedRoute>
                  <ItemListContainer />
                </ProtectedRoute>
              }
            />
            <Route path="/store/:id" element={<ItemDetailContainer />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <UserAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <ProductAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <OrderAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
          </Routes>
        {/* </CartProvider> */}
      </Provider>
    </Router>
  );
};

export default App;
