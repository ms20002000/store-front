import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


function ContactUs() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "T", 
    resume: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("/api/contact_us/", formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        
          toast.success("Request successfully Sent!");
          navigate('/');
    } catch (error) {
        console.error("Error:", error);
    
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Send Request failed!");
        } else {
          toast.error("Send Request failed!");
        }
      }


  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Contact Us</h1>

        {/* Site Information */}
        <div className="mb-8 p-3 bg-indigo-200 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-center text-indigo-700 mb-6">Store Information</h3>
          <p className="text-gray-600 mb-2">📍 Address: 123 Education St, Knowledge City</p>
          <p className="text-gray-600 mb-2">📧 Email: info@mysite.com</p>
          <p className="text-gray-600 mb-2">📞 Phone: +1 234 567 890</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-3 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-center text-indigo-700 mb-6">Your Request</h3>
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="T">Teacher</option>
              <option value="S">Student</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Resume / Document</label>
            <input
              type="file"
              name="resume"
              onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Write your message here"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
