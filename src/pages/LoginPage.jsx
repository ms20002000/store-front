import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useAuthRedirect from "../components/UseAuthRedirect";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useAuthRedirect();

  const verifyEmail = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
  
      const response = await axios.post("/api/account/login/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Email Verified! Check your Email...");
      navigate(`/otpVerification/?email=${email}&is_login_code=${true}`);
    } catch (error) {
      toast.error(error.message || "OTP Verification failed!");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-md py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={verifyEmail}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email Address</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
