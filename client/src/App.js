import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utilities/themeProvider";
import store from "./redux/store";
import { Provider } from "react-redux";
import PageNotFound from "./pages/404/PageNotFound";

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign/:sign" element={<SignContainer />} />
            <Route path="/store" element={<ItemListContainer />} />
            <Route path="/store/:id" element={<ItemDetailContainer />} />
            <Route path="/admin" element={<AdminContainer />} />
            <Route path="/admin/users" element={<UserAdmin />} />
            <Route path="/admin/products" element={<ProductAdmin />} />
            <Route path="/admin/orders" element={<OrderAdmin />} />
            <Route path="/admin/products/add" element={<AddProduct />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/logout" element={<Logout />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/account" element={<Account />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </Router>
  );
};

export default App;
