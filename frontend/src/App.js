import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Pages/Products/Product";
import Product from "./Pages/Admin/Product";
import UserInfoPage from "./Pages/User/UserInfo";
import OrderTable from "./Pages/Order/Order";
import OrderManag from "./Pages/Admin/OrderManag";
import RevenueReport from "./Pages/Admin/Revenue";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/order" element={<OrderTable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Product />} />
        <Route path="/admin/order" element={<OrderManag />} />
        <Route path="/userInfo" element={<UserInfoPage />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        {/* <Route path="/admin/revenue" element={<RevenueReport />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
