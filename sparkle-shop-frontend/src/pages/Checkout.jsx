import { useState } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  CLEAR_CART,
} from "../redux/actions";

import {
  getInventory,
  updateInventory,
} from "../utils/inventory";

import {
  logActivity,
} from "../utils/activityLogger";


function Checkout() {


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const cart = useSelector(
    (state) => state.cart
  );



  const [formData,setFormData] = useState({

    name:"",
    email:"",
    phone:"",
    address:"",

  });



  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };





  const saveOrder = (paymentResponse)=>{


    const inventory =
    getInventory();



    cart.forEach((item)=>{

      inventory[item.id] =
      Math.max(
        0,
        (inventory[item.id] || 0)
        -
        item.qty
      );

    });



    updateInventory(inventory);



    const order = {


      id: Date.now(),


      date:
      new Date().toLocaleString(),


      status:
      "PAID",



      paymentId:
      paymentResponse.razorpay_payment_id,



      razorpayOrderId:
      paymentResponse.razorpay_order_id,



      customer:{

        name:
        formData.name,

        email:
        formData.email,

        phone:
        formData.phone,

        address:
        formData.address

      },



      items:cart,



      total:
      cart.reduce(
        (total,item)=>
        total +
        item.price * item.qty,
        0
      )


    };



    const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];



    orders.unshift(order);



    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );



    dispatch({
      type:CLEAR_CART
    });



    logActivity(
      `Payment completed Order #${order.id}`,
      formData.email
    );



    navigate(
      "/order-success",
      {
        state:{
          orderId:order.id
        }
      }
    );


  };






  const handleSubmit = async(e)=>{


    e.preventDefault();



    const total =
    cart.reduce(
      (sum,item)=>
      sum +
      item.price * item.qty,
      0
    );

    try{

      const response = await axios.post(
  `http://localhost:8081/payment/create?amount=${total}`
);


const razorpayOrder =
    typeof response.data === "string"
    ? JSON.parse(response.data)
    : response.data;



      const options = {

key: "rzp_test_TAzRPPGucbmSDo",

amount: razorpayOrder.amount,

currency: "INR",

name: "Sparkle's Shop",

description: "Order Payment",

order_id: razorpayOrder.id,


handler:function(response){

saveOrder(response);

},


prefill:{
name: formData.name,
email: formData.email,
contact: formData.phone
},


method:{
card:true,
netbanking:true,
upi:true,
wallet:true
},


theme:{
color:"#7c3aed"
}

};



      const razorpay =
      new window.Razorpay(options);



      razorpay.open();



    }

    catch(error){


      console.log(error);


      alert(
        "Payment Failed"
      );


    }


  };





return (

<div className="container mt-4">


<div className="row justify-content-center">


<div className="col-md-8">


<div className="card p-4 shadow">


<h2>
Checkout
</h2>



<form onSubmit={handleSubmit}>


<input
className="form-control mb-3"
placeholder="Name"
name="name"
value={formData.name}
onChange={handleChange}
required
/>



<input
className="form-control mb-3"
placeholder="Email"
name="email"
type="email"
value={formData.email}
onChange={handleChange}
required
/>



<input
className="form-control mb-3"
placeholder="Phone"
name="phone"
value={formData.phone}
onChange={handleChange}
required
/>



<textarea
className="form-control mb-3"
placeholder="Address"
name="address"
value={formData.address}
onChange={handleChange}
required
/>



<button
  className="btn btn-primary w-100"
  type="submit"
>
  Pay ₹{cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )}
</button>



</form>


</div>


</div>


</div>


</div>


);


}


export default Checkout;