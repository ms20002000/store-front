import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import axios from "axios";

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        if (response.data.access) {
          document.cookie = `access_token=${response.data.access}; path=/;`;
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Token validation failed", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/menu/categories/");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/menu/products/search/`, {
        params: { search: searchTerm },
      });
      navigate("/search", { state: { results: res.data } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleLogout = () => {
    document.cookie = "access_token=; Max-Age=0; path=/;";
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
            <img className="h-10 w-auto" src={logo} alt="React Jobs" />
            <span className="hidden md:block text-white text-2xl font-bold ml-2">Store</span>
          </NavLink>

          <div className="relative flex flex-grow mx-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 my-1 px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Search
            </button>
          </div>

          <div className="md:ml-auto">
            <div className="flex space-x-2">
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)} 
              onMouseLeave={() => setMenuOpen(false)} 
            >
              {/* All Categories */}
              <button className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                All Categories
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div
                  className="absolute bg-white border rounded-md shadow-md mt-2 w-48"
                  style={{ marginTop: "0px", paddingTop: "10px" }} 
                >
                  <ul className="py-2">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className="relative"
                        onMouseEnter={() => setActiveCategory(category.id)} 
                        onMouseLeave={() => setActiveCategory(null)} 
                      >
                        {/* Main Categories */}
                        <NavLink
                          to={`/${category.name}/products/`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {category.name}
                        </NavLink>

                        {/* Sub Categories */}
                        {/* {activeCategory === category.id && (
                          <div
                            className="absolute bg-gray-100 border rounded-md shadow-md mt-0 w-48 left-full top-0"
                            style={{ paddingLeft: "10px" }}
                          >
                            <ul className="py-2">
                              {category.subcategories.map((sub) => (
                                <li key={sub.id}>
                                  <NavLink
                                    to={`/${category.name}/${sub.name}/products/`}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                  >
                                    {sub.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )} */}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>


              {!isLoggedIn ? (
                <NavLink
                  to="/login"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  Logout
                </button>
              )}
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/cart">
                <img className="h-10 w-auto" src={cart} alt="React Jobs" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

