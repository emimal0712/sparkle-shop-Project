import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";

import OrderDetails from "./pages/OrderDetails";

import CompareProducts from "./pages/CompareProducts";

import InventoryDashboard
from "./pages/InventoryDashboard";

import AdminDashboard
from "./pages/AdminDashboard";

import AdminProducts
from "./pages/AdminProducts";

import AddProduct
from "./pages/AddProduct";

import EditProduct
from "./pages/EditProduct";

import AdminOrders from "./pages/AdminOrders";

import AdminUsers
from "./pages/AdminUsers";

import AdminActivityLogs
from "./pages/AdminActivityLogs";

import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <div
        className="min-vh-100"
    >
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
  path="/inventory"
  element={
    <AdminRoute>
      <InventoryDashboard />
    </AdminRoute>
  }
/>

        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

      <Route
  path="/admin-products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>

      <Route
  path="/add-product"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>

        <Route
  path="/edit-product/:id"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/>

        <Route
          path="/admin-orders"
          element={
            <AdminOrders />
          }
        />

<Route
  path="/admin-users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>


<Route
  path="/admin-logs"
  element={
    <AdminRoute>
      <AdminActivityLogs />
    </AdminRoute>
  }
/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;