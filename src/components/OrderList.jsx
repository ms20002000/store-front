import React from "react";

const OrderList = ({ orders }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-indigo-600 mb-4">Your Orders</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold">Order ID: {order.id}</p>
                <p>Status: {order.status}</p>
                <p>Total Price: ${order.total_price}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-bold">Producs</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id} className="text-gray-600">
                      {item.product} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
