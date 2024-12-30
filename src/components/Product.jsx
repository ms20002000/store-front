import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Product = ({ product }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    
        let description = product.description;
    
        if (!showFullDescription){
            description = description.substring(0, 90) + '...';
        }

    const navigate = useNavigate();

    const handleProductClick = () => {
      navigate(`/products/${product.name}`);
    };

  return (
    <div className="bg-white rounded-xl shadow-md relative cursor-pointer transform hover:translate-y-2 hover:shadow-lg transition duration-300 ease-in-out" 
    onClick={handleProductClick}>
                <div className="p-4">
                    <div>
                        <img
                            className="w-full h-48 object-cover rounded-lg"
                            src={
                              product.product_file && product.product_file.length > 0 && product.product_file[0].product_photo 
                              ? product.product_file[0].product_photo 
                              : "https://via.placeholder.com/150"
                            }
                            alt={product.name}
                        />
                    </div>
                <div className="mb-6">
                    <div className="text-gray-600 my-2">Teacher: { product.teacher }</div>
                    <h3 className="text-xl font-bold">Price: { product.price }</h3>
                  </div>

                <div className="mb-5">
                    Descriptoin: { description }
                  </div>
                  <button onClick={ () => setShowFullDescription((prevState) => !prevState) } className='text-indigo-500 mb-5 hover:text-indigo-600'>
                    { showFullDescription ? 'Less' : 'More' }
                  </button>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold">Name: { product.name }</h3>
                  </div>
                </div>
    </div>
  )
}

export default Product