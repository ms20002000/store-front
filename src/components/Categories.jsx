import Category from "./Category";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const Categories = ({ isHome = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = isHome
        ? "/api/menu/categories/?_limit=3"
        : "/api/menu/categories/";
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Categories" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
