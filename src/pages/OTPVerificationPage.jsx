  import { useState } from "react";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { toast } from "react-toastify";
  import axios from "axios";

  const OTPVerificationPage = () => {
    const [otp, setOtp] = useState("");
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    const navigate = useNavigate();

    const verifyOtp = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("otp_code", otp);
        formData.append("is_login_code", true);
    
        const response = await axios.post("/api/account/verify-register/", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("OTP Verified! Redirecting to Home...");
        navigate("/");
      } catch (error) {
        toast.error(error.message || "OTP Verification failed!");
      }
    };

    return (
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-md py-24">
          <div className="bg-white px-6 py-8 shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
            <p className="text-center mb-6">Enter the OTP sent to <strong>{email}</strong></p>
            <form onSubmit={verifyOtp}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">OTP</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };

  export default OTPVerificationPage;
