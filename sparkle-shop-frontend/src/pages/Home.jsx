import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/actions";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import ProductSkeleton from "../components/ProductSkeleton";

import {
  initializeInventory,
} from "../utils/inventory";

import {
  seedProducts,
} from "../utils/seedProducts";

function Home() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products
  );

  console.log(products);

  const loading = useSelector(
    (state) => state.loading
  );

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [ratingFilter, setRatingFilter] =
    useState("");

  const [priceFilter, setPriceFilter] =
    useState("");

  const [popularOnly, setPopularOnly] =
    useState(false);

  const productsPerPage = 8;

useEffect(() => {
  dispatch(fetchProducts());
}, [dispatch]);

useEffect(() => {
  console.log("🔥 Redux Products:", products);
}, [products]);

useEffect(() => {
  if (
    products.length > 0
  ) {
initializeInventory(
  products
);

seedProducts(
  products
);

  }
}, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    sortBy,
    ratingFilter,
    priceFilter,
    popularOnly,
  ]);

  const categories = [
  "all",
  ...new Set(
    products
      .map(
        (product) =>
          product.category
      )
      .filter(Boolean)
  ),
];

  const filteredProducts =
    products.filter(
      (product) => {

        const searchText =
          search?.toLowerCase() || "";


        const matchSearch =
          product.name
            ?.toLowerCase()
            .includes(searchText) ||
          product.category
            ?.toLowerCase()
            .includes(searchText) ||
          product.description
            ?.toLowerCase()
            .includes(searchText);


        const matchCategory =
          category === "all"
            ? true
            : product.category === category;


        const matchRating =
          ratingFilter === ""
            ? true
            : product.rating >=
              Number(ratingFilter);


        let matchPrice = true;


        if (priceFilter === "under25") {
          matchPrice =
            product.price < 25;
        }


        if (priceFilter === "25to50") {
          matchPrice =
            product.price >= 25 &&
            product.price <= 50;
        }


        if (priceFilter === "50to100") {
          matchPrice =
            product.price > 50 &&
            product.price <= 100;
        }


        if (priceFilter === "above100") {
          matchPrice =
            product.price > 100;
        }


        const matchPopular =
          !popularOnly
            ? true
            : product.rating?.count > 300;


        return (
          matchSearch &&
          matchCategory &&
          matchRating &&
          matchPrice &&
          matchPopular
        );

      }
    );

  const sortedProducts = [
    ...filteredProducts,
  ];

  if (sortBy === "low-high") {
    sortedProducts.sort(
      (a, b) =>
        a.price - b.price
    );
  }

  if (sortBy === "high-low") {
    sortedProducts.sort(
      (a, b) =>
        b.price - a.price
    );
  }

  if (sortBy === "rating") {
    sortedProducts.sort(
      (a, b) =>
        (b.rating || 0) -
        (a.rating || 0)
    );
  }

  if (sortBy === "name") {
    sortedProducts.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    );
  }

  const lastProductIndex =
    currentPage *
    productsPerPage;

  const firstProductIndex =
    lastProductIndex -
    productsPerPage;

  const currentProducts =
    sortedProducts.slice(
      firstProductIndex,
      lastProductIndex
    );

  const totalPages =
    Math.ceil(
      sortedProducts.length /
        productsPerPage
    );

const clearFilters = () => {
  setSearch("");
  setCategory("all");
  setSortBy("");
  setRatingFilter("");
  setPriceFilter("");
  setPopularOnly(false);
};

  if (loading) {
  return (
    <div className="container glass mt-5 p-4">
      <div className="row">
          {[...Array(8)].map(
            (_, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
              >
                <ProductSkeleton />
              </div>
            )
          )}
        </div>
      </div>
    );
  }

 return (
<>
  
<div className="container-fluid glass text-white p-4 mb-4">
    <h1 className="text-center">
      Sparkle's Shop 🛒
    </h1>

    <p className="text-center mb-0">
      Premium products at best prices
    </p>

  </div>



  <SearchBar
    search={search}
    setSearch={setSearch}
  />



<div className="container glass mb-3 p-3">

    <div className="d-flex justify-content-between align-items-center flex-wrap">


      <p className="text-muted">
        Showing {sortedProducts.length} product(s)
      </p>


      <button
        className="btn btn-outline-danger"
        onClick={clearFilters}
      >
        Clear Filters
      </button>


    </div>


  </div>




  <div className="container">

    <div className="row g-3 mb-4">


      <div className="col-md-3">

        <select
          className="form-select glass"
          value={category}
          onChange={(e)=>
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



      <div className="col-md-3">

        <select
          className="form-select glass"
          value={sortBy}
          onChange={(e)=>
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

          <option value="rating">
            Highest Rated
          </option>

          <option value="name">
            A → Z
          </option>

        </select>

      </div>



      <div className="col-md-3">

        <select
          className="form-select glass"
          value={ratingFilter}
          onChange={(e)=>
            setRatingFilter(e.target.value)
          }
        >

          <option value="">
            All Ratings
          </option>

          <option value="4">
            ⭐ 4+
          </option>

          <option value="3">
            ⭐ 3+
          </option>

        </select>


      </div>



      <div className="col-md-3">

        <select
          className="form-select glass"
          value={priceFilter}
          onChange={(e)=>
            setPriceFilter(e.target.value)
          }
        >

          <option value="">
            All Prices
          </option>

          <option value="under25">
            Under ₹2500
          </option>

          <option value="25to50">
            ₹2500 - ₹5000
          </option>

          <option value="above100">
            Above ₹1000
          </option>

        </select>

      </div>


    </div>



    <div className="mb-4">

      <input
        type="checkbox"
        checked={popularOnly}
        onChange={()=>
          setPopularOnly(!popularOnly)
        }
      />

      <span className="ms-2">
        🔥 Popular Products
      </span>

    </div>





    <div className="row g-4">


    {
      currentProducts.length > 0 ? (

        currentProducts.map((product)=>(

          <div
            key={product.id}
            className="
            col-xl-3 
            col-lg-4 
            col-md-6 
            col-sm-12
            "
          >

            <ProductCard
              product={product}
            />

          </div>


        ))

      ) : (

        <div className="text-center py-5">

          <h3>
            😔 No Products Found
          </h3>

        </div>

      )
    }


    </div>


  </div>





{
currentProducts.length > 0 &&
totalPages > 1 && (

<div className="d-flex justify-content-center mt-5 mb-5">


<button
className="btn btn-secondary me-2"
disabled={currentPage===1}
onClick={()=>
setCurrentPage(currentPage-1)
}
>
Previous
</button>



{
[...Array(totalPages)].map((_,index)=>(

<button

key={index}

className={`btn mx-1 ${
currentPage===index+1
?
"btn-primary"
:
"btn-outline-primary"
}`}

onClick={()=>
setCurrentPage(index+1)
}

>

{index+1}

</button>

))

}



<button
className="btn btn-secondary ms-2"
disabled={currentPage===totalPages}
onClick={()=>
setCurrentPage(currentPage+1)
}
>
Next
</button>


</div>

)
}


</>

);
}

export default Home;