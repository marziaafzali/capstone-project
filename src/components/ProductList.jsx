// src/components/ProductList.jsx
function ProductList({ products, onDelete }) {
  if (products.length === 0)
    return (
      <p className="text-center mt-4 text-gray-500">No products added yet.</p>
    );

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Profit</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.cost}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2 font-semibold">{p.profit}</td>
              <td className="border p-2">
                <button
                  onClick={() => onDelete(p.id)}
                  className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
