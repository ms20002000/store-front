import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone_number", phoneNumber);
      formData.append("address", address);

      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }
  
      const response = await axios.post("/api/account/register/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      toast.success("Registration successful! Check your email for the OTP.");
      
      navigate(`/otpVerification/?email=${email}&is_login_code=${false}`);
    } catch (error) {
      console.error("Error:", error);
  
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Registration failed!");
      } else {
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Register</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">First Name</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your first name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Last Name</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Re-enter your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your phone number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
              <input
                type="file"
                className="border rounded w-full py-2 px-3"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
