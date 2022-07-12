import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Store from "./components/Home/Store";
import NavBar from "./components/NavBar";
import SignIn from "./components/user/Login";
import SignUp from "./components/user/Register";
import Cart from "./components/Cart/Cart";
import ItemListContainer from "./components/Items/ItemListContainer";
import ItemDetailContainer from "./components/Items/ItemDetailContainer";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/store" element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <ItemListContainer />
            </ProtectedRoute>
            } />
          <Route path="/products/:id" element={<ItemDetailContainer />} />
          <Route path="/cart/:id" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
