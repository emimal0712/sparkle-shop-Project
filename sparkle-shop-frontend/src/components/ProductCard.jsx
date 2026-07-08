import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions";
import ProductRating from "./ProductRating";
import WishlistButton from "./WishlistButton";
import { toast } from "react-toastify";
import { getInventory } from "../utils/inventory";

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
  "Adjustable Dumbbells": "dumbbells.jpg"
};

function ProductCard({ product }) {

  if (!product) return null;

  const dispatch = useDispatch();

  const inventory = getInventory();

  const stock = inventory[product.id] ?? product.quantity ?? 0;

  const cart = useSelector((state) => state.cart);

  const alreadyInCart = cart.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product Added To Cart");
  };

  return (
    <div className="card h-100 shadow-sm">

      <img
        src={product.image}
        alt={product.name}
        className="card-img-top p-3"
        style={{
          height: "250px",
          objectFit: "contain",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h6
          style={{
            minHeight: "60px",
          }}
        >
          {product.name}
        </h6>

        <h5 className="text-success">
          ₹ {product.price}
        </h5>

        <ProductRating
          rating={
            typeof product.rating === "number"
              ? product.rating
              : product.rating?.rate || 0
          }
        />

        {stock > 10 && (
          <p className="text-success fw-bold">
            ✅ In Stock
          </p>
        )}

        {stock > 0 && stock <= 10 && (
          <p className="text-warning fw-bold">
            ⚠ Only {stock} Left
          </p>
        )}

        {stock === 0 && (
          <p className="text-danger fw-bold">
            ❌ Out Of Stock
          </p>
        )}

        <div className="mt-auto">

          <Link
            to={`/product/${product.id}`}
            className="btn btn-info w-100 mb-2"
          >
            View Details
          </Link>

          <WishlistButton product={product} />


          {alreadyInCart ? (
            <Link
              to="/cart"
              className="btn btn-success w-100"
            >
              ✓ Added To Cart
            </Link>
          ) : (
            <button
              className="btn btn-primary w-100"
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              {stock === 0
                ? "Out Of Stock"
                : "Add To Cart"}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProductCard;