import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokens = async () => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axios.post("/api/token/refresh/", {
            refresh: refreshToken,
          });
          document.cookie = `access_token=${response.data.access}; path=/;`;

        } catch (err) {
          // console.log("Tokens expired or invalid. Redirecting to login page.");
          localStorage.removeItem("refresh_token"); 
          navigate("/loginPassword");
        }
      } else {
        // console.log("No refresh token found. Redirecting to login page.");
        navigate("/loginPassword");
      }
    };

    checkTokens();
  }, [navigate]);
};

export default useAuthRedirect;
