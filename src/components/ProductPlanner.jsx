import { useState, useEffect } from "react";
import "./ProductPlanner.css";

export default function ProductPlanner() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", cost: "", price: "" });

  // Load saved products from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add product
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.cost || !form.price) return alert("Please fill all fields");

    const profit = Number(form.price) - Number(form.cost);
    const newProduct = {
      id: Date.now(),
      name: form.name,
      cost: Number(form.cost),
      price: Number(form.price),
      profit,
    };

    setProducts([...products, newProduct]);
    setForm({ name: "", cost: "", price: "" });
  };

  // Delete product
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  return (
    <div className="planner-container">
      <h2>🧾 Add Product</h2>

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
        <button type="submit">Add</button>
      </form>

      <h3>📦 Product List</h3>
      <table>
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
                  <button onClick={() => handleDelete(p.id)}>❌</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
