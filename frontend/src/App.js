import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Pages/Products/Product";
import Product from "./Pages/Admin/Product";
import UserInfoPage from "./Pages/User/UserInfo";
import CartTable from "./Pages/Cart/Cart";
import OrderManag from "./Pages/Admin/OrderManag";
import ProductList from "./Pages/Products/ProductList";
import Transaction from "./Pages/Transaction/CheckForm";
import TransactionResult from "./Pages/Transaction/TransactionResult";
import OrderTable from "./Pages/Order/Order";
import OrderDetail from "./Pages/Order/OrderDetail";
import RevenueChart from "./Pages/Admin/Revenue";
import BrandM from "./Pages/Admin/BrandM";
import OrderDetailM from "./Pages/Admin/OrderDetailM";
import Error from "./Pages/ErrorPages/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/cart" element={<CartTable />} />
        <Route path="/order" element={<OrderTable />} />
        <Route path="/order/detail/:id" element={<OrderDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Product />} />
        <Route path="/admin/order" element={<OrderManag />} />
        <Route path="/userInfo" element={<UserInfoPage />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transaction-result" element={<TransactionResult />} />
        <Route path="/admin/revenue" element={<RevenueChart />} />
        <Route path="/admin/brand" element={<BrandM />} />
        <Route path="/admin/orderDetail/:id" element={<OrderDetailM />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
