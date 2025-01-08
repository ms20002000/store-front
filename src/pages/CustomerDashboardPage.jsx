import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderList from "../components/OrderList";
import CourseList from "../components/CourseList";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useAuthRedirect from "../components/UseAuthRedirect";


const CustomerDashboard = () => {
  useAuthRedirect();
  const [orders, setOrders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.get("access_token");
      try {
        const [ordersRes, coursesRes] = await Promise.all([
          axios.get("/api/order/order_history/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/account/user/products/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setOrders(ordersRes.data);
        setCourses(coursesRes.data.products);

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
        Customer Dashboard
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-10">
          <CourseList courses={courses} />
          <OrderList orders={orders} />
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
