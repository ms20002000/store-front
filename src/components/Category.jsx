import { Link } from 'react-router-dom';

const Category = ({ category }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="flex">
          <img
            className="w-full h-48 object-cover rounded-lg"
            src={category.category_photo}
            alt={category.name}
          />
        </div>

        <div className="flex justify-center mt-3">
          <Link
            to={`/${category.name}/products/`}
            className="bg-indigo-500 text-black px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            {category.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
