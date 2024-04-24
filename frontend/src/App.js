import "./App.css";
// import  Login  from './Pages/Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import ProductList from "./Pages/Demo";

function App() {
  // const ProductList = [
  //   {
  //     productId: 1,
  //     productName: "Hel1oue",
  //   },
  //   {
  //     productId: 1,
  //     productName: "Hel1oue",
  //   },
  //   {
  //     productId: 1,
  //     productName: "Hel1oue",
  //   },
  //   {
  //     productId: 1,
  //     productName: "Hel1oue",
  //   },
  //   {
  //     productId: 1,
  //     productName: "Hel1oue",
  //   },

  //   {
  //     productId: 1,
  //     productName: "Hel1oue",
  //   },
  //   {
  //     productId: 1,
  //     productName: "Hel1oue",
  //   },
  // ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/demo" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
