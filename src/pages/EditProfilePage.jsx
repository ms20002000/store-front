import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie';


const EditProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get('access_token');
        const response = await axios.get("/api/account/edit-profile/", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        
        const { first_name, last_name, phone_number, email ,address, profile_picture } = response.data;
        setFirstName(first_name);
        setLastName(last_name);
        setPhoneNumber(phone_number);
        setAddress(address);
        setEmail(email);
        setProfilePicture(profile_picture);
      } catch (error) {
        toast.error("Failed to load profile data.");
      }
    };
    
    fetchProfile();
  }, []);
  
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
      formData.append("phone_number", phoneNumber);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("password", password);

      
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }
      
      const token = Cookies.get('access_token');
      const response = await axios.put("/api/account/edit-profile/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      navigate("/customerDashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-2">Edit Profile</h2>
            <h4 className="text-l text-center font-normal mb-6">Only change the fields you want to update</h4>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">First Name</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                className="border rounded w-full py-2 px-3"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">New Password</label>
              <input
                type="password"
                className="border rounded w-full py-2 px-3"
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
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfilePage;
