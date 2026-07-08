import React from "react";

function OrderTimeline({ status }) {

  const steps = [
    {
      key: "PAID",
      label: "Order Placed",
    },
    {
      key: "PROCESSING",
      label: "Processing",
    },
    {
      key: "SHIPPED",
      label: "Shipped",
    },
    {
      key: "OUT_FOR_DELIVERY",
      label: "Out For Delivery",
    },
    {
      key: "DELIVERED",
      label: "Delivered",
    },
  ];

  const currentStep = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="my-4">

      <div className="d-flex justify-content-between align-items-center">

        {steps.map((step, index) => (

          <React.Fragment key={step.key}>

            <div className="text-center flex-fill">

              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  lineHeight: "45px",
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundColor:
                    index <= currentStep
                      ? "#22c55e"
                      : "#6b7280",
                  transition: "0.3s",
                }}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "600",
                  color:
                    index <= currentStep
                      ? "#22c55e"
                      : "#d1d5db",
                }}
              >
                {step.label}
              </div>

            </div>

            {index < steps.length - 1 && (

              <div
                style={{
                  flex: 1,
                  height: "4px",
                  margin: "0 10px",
                  marginBottom: "35px",
                  backgroundColor:
                    index < currentStep
                      ? "#22c55e"
                      : "#6b7280",
                  transition: "0.3s",
                }}
              />

            )}

          </React.Fragment>

        ))}

      </div>

    </div>
  );
}

export default OrderTimeline;