"use client";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Plan {
  id: number;
  name: string;
  price: number;
}

const SubscriptionPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch plans
  const fetchPlans = async () => {
    try {
      const res = await fetch("https://paper-deal-server.onrender.com/api/subscription-plans");
      const data = await res.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Create / Update plan
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `https://paper-deal-server.onrender.com/api/subscription-plans/${editId}`
        : "https://paper-deal-server.onrender.com/api/subscription-plans";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });

      setName("");
      setPrice("");
      setEditId(null);
      fetchPlans();
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  // Delete plan
  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://paper-deal-server.onrender.com/api/subscription-plans/${id}`, {
        method: "DELETE",
      });
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  // Edit plan
  const handleEdit = (plan: Plan) => {
    setName(plan.name);
    setPrice(plan.price.toString());
    setEditId(plan.id);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Form */}
      <h2 className="text-xl font-semibold mb-4">
        {editId ? "Edit Subscription Plan" : "Add Subscription Plan"}
      </h2>
      <form
        className="bg-white shadow rounded-lg p-6 mb-6 space-y-4"
        onSubmit={handleSave}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {editId ? "Update" : "Save"}
        </button>
      </form>

      {/* Table */}
      <h2 className="text-xl font-semibold mb-4">Subscription Plans</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">ID</th>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Price</th>
              <th className="px-4 py-2 border">Edit</th>
              <th className="px-4 py-2 border">Delete</th>

            </tr>
          </thead>
          <tbody>
            {plans.length > 0 ? (
              plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{plan.id}</td>
                  <td className="px-4 py-2 border">{plan.name}</td>
                  <td className="px-4 py-2 border">{plan.price}</td>
                  <td className="px-4 py-2 border space-x-2 text-center">
                    <button
                      className="px-3 py-1  rounded text-green-600"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit />
                    </button>
                  </td>
                  <td className="px-4 py-2 border space-x-2 text-center">
                    <button
                      className="px-3 py-1   rounded text-red-500"
                      onClick={() => handleDelete(plan.id)}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No Plans Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
