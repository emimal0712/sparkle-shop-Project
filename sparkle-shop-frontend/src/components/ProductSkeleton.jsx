function ProductSkeleton() {
  return (
    <div className="product-card h-100">

      <div className="placeholder-glow p-3">
        <span
          className="placeholder w-100 rounded"
          style={{
            height: "220px",
            display: "block",
            background: "rgba(255,255,255,0.15)",
          }}
        ></span>
      </div>

      <div className="card-body">

        <p className="placeholder-glow">
          <span
            className="placeholder col-10"
            style={{
              background: "rgba(255,255,255,0.18)",
            }}
          ></span>
        </p>

        <p className="placeholder-glow">
          <span
            className="placeholder col-4"
            style={{
              background: "rgba(168,85,247,0.6)",
            }}
          ></span>
        </p>

        <p className="placeholder-glow">
          <span
            className="placeholder col-8"
            style={{
              background: "rgba(255,255,255,0.18)",
            }}
          ></span>
        </p>

        <p className="placeholder-glow">
          <span
            className="placeholder col-6"
            style={{
              background: "rgba(255,255,255,0.18)",
            }}
          ></span>
        </p>

        <button
          className="btn w-100 mt-3"
          disabled
          style={{
            background:
              "linear-gradient(135deg,#7c3aed,#a855f7)",
            color: "#fff",
            border: "none",
            borderRadius: "15px",
          }}
        >
          Loading...
        </button>

      </div>

    </div>
  );
}

export default ProductSkeleton;