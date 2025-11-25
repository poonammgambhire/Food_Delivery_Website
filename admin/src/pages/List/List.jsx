import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const List = ({url}) => {
 
  const [list, setList] = useState([]);

  // ✅ Fetch all foods
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to load food list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while fetching food list");
    }
  };

  // ✅ Remove food by ID (DELETE method)
 const removeFood = async (foodId) => {
  try {
    await axios.delete(`${url}/api/food/remove/${foodId}`);
    toast.success("Food removed successfully!");
    await fetchList(); // Refresh list
  } catch (err) {
    console.error(err);
    toast.error("Failed to remove food");
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img
              src={`${url}/uploads/${item.image}`} // ✅ correct path
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p
              onClick={() => removeFood(item._id)}
              className="cursor"
              style={{ color: "red", cursor: "pointer" }}
            >
              ✖
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
