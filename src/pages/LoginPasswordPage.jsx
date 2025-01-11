import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useAuthRedirect from "../components/UseAuthRedirect";


const LoginPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

//   useAuthRedirect() 

  const verifyInformation = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
  
      const response = await axios.post("/api/account/login_password/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Infromation Verified! You are logged in...");
      localStorage.setItem('refresh_token', response.data.refresh)
      localStorage.setItem("user_email", response.data.email);
      localStorage.setItem("profile_picture", response.data.profile_picture);

      window.location.href = "/";
    } catch (error) {
      toast.error(error.message || "Information Verification failed!");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-md py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={verifyInformation}>
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

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Verify 
            </button>
          </form>
          <div className="mt-2 text-center"><br/> 
          <NavLink to='/login' className='hover:font-bold'>
             Sing in with OTP Code
          </NavLink>
          
          </div>
          <div className="mt-2 text-center"> If you dont have account click on<br/> 
          <NavLink to='/register' className='hover:font-bold'>
             Register
          </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPasswordPage;
