import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/user/Login";
import SignUp from "./components/user/Register";
import Logout from "./components/user/Logout";
import Cart from "./components/Cart/Cart";
import ItemListContainer from "./components/Containers/ItemListContainer";
import ItemDetailContainer from "./components/Containers/ItemDetailContainer";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";
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
import SignContainer from "./components/Sign/SignContainer";

// import { CartProvider } from "./Context/CartContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* <CartProvider> */}
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/log" element={<SignIn />} />
            <Route path="/:sign" element={<SignContainer />} />
            <Route path="/register" element={<SignUp />} />

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
        </Provider>
        {/* </CartProvider> */}
      </AuthProvider>
    </Router>
  );
};

export default App;
