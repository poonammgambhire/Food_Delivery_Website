import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const cart = cartItems || {};
  const subtotal = getTotalCartAmount() || 0;
  const delivery = subtotal === 0 ? 0 : 2;
  const total = subtotal + delivery;

  return (
    <div className="cart" id="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list?.map((item) => {
          const quantity = cart[item._id] || 0;

          if (quantity > 0) {
            const imageUrl = `${url}/uploads/${item.image}`; // ✅ fixed image path

            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-items">
                  <img src={imageUrl} alt={item.name} className="cart-item-img" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{quantity}</p>
                  <p>${item.price * quantity}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>

              <hr />
              <div className="cart-total-details">
                <p>Delivery Fees</p>
                <p>${delivery}</p>
              </div>

              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${total}</b>
              </div>
            </div>

            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
