import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { logActivity } from "../utils/activityLogger";
import { addNotification } from "../utils/notifications";

const imageMap = {
  "Gaming Keyboard": "gaming-keyboard.jpg",
  "Wireless Gaming Mouse": "gaming-mouse.jpg",
  "27 Gaming Monitor": "gaming-monitor.jpg",
  "Gaming Headset": "gaming-headset.jpg",
  "Ergonomic Office Chair": "office-chair.jpg",
  "Laptop Backpack": "laptop-backpack.jpg",
  "Smart Watch": "smart-watch.jpg",
  "Wireless Earbuds": "wireless-earbuds.jpg",
  "Power Bank": "powerbank.jpg",
  "Bluetooth Speaker": "speaker.jpg",
  "Samsung Smartphone": "samsung-phone.jpg",
  "Apple iPhone": "iphone.jpg",
  "Dell Laptop": "dell-laptop.jpg",
  "Apple MacBook Air": "macbook.jpg",
  "Canon DSLR Camera": "camera.jpg",
  "Lamp": "lamp.jpg",
  "Sneakers": "sneakers.jpg",
  "Men's Hoodie": "hoodie.jpg",
  "Women's Handbag": "handbag.jpg",
  "Stainless Steel Bottle": "bottle.jpg",
  "Coffee Maker": "coffee-maker.jpg",
  "Air Fryer": "air-fryer.jpg",
  "LED Desk Lamp": "led-lamp.jpg",
  "Wireless Charger": "wireless-charger.jpg",
  "External SSD 1TB": "ssd.jpg",
  "Mechanical Pencil Set": "pencil-set.jpg",
  "Study Table": "study-table.jpg",
  "Premium Notebook Planner": "notebook.jpg",
  "Premium Perfume": "perfume.jpg",
  "Adjustable Dumbbells": "dumbbells.jpg",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  console.log(
  JSON.parse(localStorage.getItem("adminProducts"))
);

  const loadProducts = () => {
    const localProducts =
      JSON.parse(
        localStorage.getItem("adminProducts")
      ) || [];

    setProducts(localProducts);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    const inventory =
      JSON.parse(
        localStorage.getItem("inventory")
      ) || {};

    delete inventory[productId];

    localStorage.setItem(
      "inventory",
      JSON.stringify(inventory)
    );

    setProducts(updatedProducts);

    toast.success(
      "Product Deleted Successfully"
    );

    addNotification(
      "Product Deleted",
      `Product ID ${productId} deleted`
    );

    logActivity(
      `Deleted Product ID ${productId}`,
      "Admin"
    );
  };

  const categories = [
    "all",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchSearch =
        product.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        category === "all"
          ? true
          : product.category === category;

      return matchSearch && matchCategory;
    }
  );

  const sortedProducts = [...filteredProducts];

  if (sortBy === "low-high") {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high-low") {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "a-z") {
    sortedProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortBy === "z-a") {
    sortedProducts.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  if (sortBy === "newest") {
    sortedProducts.sort(
      (a, b) => b.id - a.id
    );
  }

  console.log("Products:", products);
console.log("First Product:", products[0]);

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between mb-4">
        <h2>Product Management</h2>

        <Link
          to="/add-product"
          className="btn btn-success"
        >
          + Add Product
        </Link>
      </div>

      <div className="row mb-4">

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Product"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            {categories.map((cat, index) => (
              <option
                key={`${cat}-${index}`}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="">
              Sort Products
            </option>
            <option value="low-high">
              Price Low → High
            </option>
            <option value="high-low">
              Price High → Low
            </option>
            <option value="a-z">
              A → Z
            </option>
            <option value="z-a">
              Z → A
            </option>
            <option value="newest">
              Newest First
            </option>
          </select>
        </div>

      </div>

      <p className="mb-3">
        Showing {sortedProducts.length} Product(s)
      </p>

<table className="table table-bordered table-hover align-middle text-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {sortedProducts.length > 0 ? (
    sortedProducts.map((product, index) => (
      <tr key={`${product.id}-${index}`}>
        <td>{product.id}</td>

        <td>
          <img
            src={
              product.image ||
              `/products/${imageMap[product.name || product.title] || "default.jpg"}`
            }
            alt={product.name || product.title}
            width="60"
            height="60"
            style={{ objectFit: "contain" }}
          />
        </td>

        <td className="fw-semibold text-white">
          {product.name}
        </td>

        <td className="text-success fw-bold">
          ₹{product.price}
        </td>

        <td>
  <span
    className="badge"
    style={{
      background: "#7c3aed",
      color: "#fff",
      padding: "8px 15px",
      borderRadius: "20px"
    }}
  >
    {product.category || "Electronics"}
  </span>
</td>

        <td>
          <Link
            to={`/edit-product/${product.id}`}
            className="btn btn-sm me-2"
            style={{
              background: "#7c3aed",
              color: "#fff",
              border: "none",
            }}
          >
            ✏️ Edit
          </Link>

          <button
            className="btn btn-danger btn-sm px-3"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center">
        No Products Found
      </td>
    </tr>
  )}
</tbody>

      </table>

    </div>
  );
}

export default AdminProducts;