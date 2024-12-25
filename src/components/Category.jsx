import { useNavigate } from 'react-router-dom';


const Category = ({ category }) => {
  const navigate = useNavigate();

    const handleProductClick = () => {
      navigate(`/${category.name}/products/`);
    };
  return (
    <div className="bg-white rounded-xl shadow-md relative cursor-pointer transform hover:translate-y-2 hover:shadow-lg transition duration-300 ease-in-out" 
    onClick={handleProductClick}>      
      <div className="p-4">
        <div className="flex">
          <img
            className="w-full h-48 object-cover rounded-lg"
            src={category.category_photo}
            alt={category.name}
          />
        </div>

        <div className="flex justify-center mt-3">
            {category.name}
        </div>
      </div>
    </div>
  );
};

export default Category;
