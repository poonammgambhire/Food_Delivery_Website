import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // ✅ Safe access to quantity
  const quantity = cartItems?.[id] || 0;

  // ✅ Fallback image (optional)
  const imageSrc = image
    ? `${url}/uploads/${image}`
    : assets.default_food_image || assets.logo; // use fallback if missing

  return (
    <div className="food-item">
      {/* ✅ Food Image + Add/Remove Buttons */}
      <div className="food-item-img-container">
        <img className="food-item-image" src={imageSrc} alt={name} />

        {quantity === 0 ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{quantity}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>

      {/* ✅ Food Info Section */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
