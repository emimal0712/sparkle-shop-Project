import React from "react";

function OrderTimeline({ status }) {
  const steps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap">

        {steps.map((step, index) => (
          <div
            key={step}
            className="text-center flex-fill"
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                margin: "0 auto",
                lineHeight: "40px",
                color: "#fff",
                fontWeight: "bold",
                background:
                  index <= currentStep
                    ? "#22c55e"
                    : "#6b7280",
              }}
            >
              {index + 1}
            </div>

            <small
              style={{
                display: "block",
                marginTop: "8px",
                fontWeight: "600",
              }}
            >
              {step}
            </small>

            {index !== steps.length - 1 && (
              <div
                style={{
                  height: "4px",
                  margin: "12px auto",
                  width: "100%",
                  background:
                    index < currentStep
                      ? "#22c55e"
                      : "#6b7280",
                }}
              />
            )}
          </div>
        ))}

      </div>
    </div>
  );
}

export default OrderTimeline;