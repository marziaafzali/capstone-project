// src/components/ProductForm.jsx
import { useState } from "react";

function ProductForm({ onAdd }) {
  const [formData, setFormData] = useState({ name: "", cost: "", price: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cost = parseFloat(formData.cost);
    const price = parseFloat(formData.price);
    const profit = price - cost;

    if (!formData.name || isNaN(cost) || isNaN(price)) {
      alert("Please fill all fields correctly");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      cost,
      price,
      profit,
    };

    onAdd(newProduct);
    setFormData({ name: "", cost: "", price: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-xl shadow-sm grid gap-2 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Add Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="cost"
        placeholder="Cost"
        value={formData.cost}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
