import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function RecentlyViewed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const viewed =
      JSON.parse(
        localStorage.getItem("recentlyViewed")
      ) || [];

    setProducts(viewed);
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="glass recently-viewed p-4 mt-5">

      <h3 className="text-center text-white mb-4">
        👀 Recently Viewed
      </h3>

      <div className="row g-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default RecentlyViewed;