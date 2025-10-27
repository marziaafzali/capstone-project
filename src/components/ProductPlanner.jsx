import { useState, useEffect } from "react";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import "./ProductPlanner.css";

export default function ProductPlanner() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", cost: "", price: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.cost || !form.price) return alert("Please fill all fields");

    const profit = Number(form.price) - Number(form.cost);
    const newProduct = { id: Date.now(), ...form, cost: Number(form.cost), price: Number(form.price), profit };
    setProducts([...products, newProduct]);
    setForm({ name: "", cost: "", price: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const totalCost = products.reduce((sum, p) => sum + p.cost, 0);
  const totalProfit = products.reduce((sum, p) => sum + p.profit, 0);

  return (
    <div className="planner-page">
     

      {/* Top Stats Cards */}
      <div className="top-stats">
        <div className="top-card">
          <div className="icon user">📦</div>
          <div>
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>
        </div>
        <div className="top-card">
          <div className="icon calendar">💵</div>
          <div>
            <h3>Total Revenue</h3>
            <p>${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="top-card">
          <div className="icon video">💰</div>
          <div>
            <h3>Total Cost</h3>
            <p>${totalCost.toFixed(2)}</p>
          </div>
        </div>
        <div className="top-card">
          <div className="icon like">📈</div>
          <div>
            <h3>Total Profit</h3>
            <p>${totalProfit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="chart-box">
        <h2>Add New Product</h2>
        <form onSubmit={handleAdd} className="planner-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={form.cost}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <button type="submit">
            <AiFillPlusCircle className="icon-btn" /> Add Product
          </button>
        </form>
      </div>

      {/* Product List Table */}
      <div className="stats-box">
        <h2>Product List</h2>
        <table className="planner-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Profit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No products yet
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>${p.cost}</td>
                  <td>${p.price}</td>
                  <td>${p.profit}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
