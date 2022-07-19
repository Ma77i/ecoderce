import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/user/Login";
import SignUp from "./components/user/Register";
import Cart from "./components/Cart/Cart";
import ItemListContainer from "./components/Items/ItemListContainer";
import ItemDetailContainer from "./components/Items/ItemDetailContainer";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";
import Order from "./components/Cart/Order";
// import { CartProvider } from "./Context/CartContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* <CartProvider> */}
          <NavBar />
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/store" element={
              <ProtectedRoute>
                <ItemListContainer />
              </ProtectedRoute>
              } />
            <Route path="/store/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/order" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
          </Routes>
        {/* </CartProvider> */}
      </AuthProvider>
    </Router>
  );
};

export default App;
