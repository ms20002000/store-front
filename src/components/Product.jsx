import React, { useState } from 'react';


const Product = ({ product }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    
        let description = product.description;
    
        if (!showFullDescription){
            description = description.substring(0, 90) + '...';
        }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
                <div className="p-4">
                    <div>
                        <img
                            className="w-full h-48 object-cover rounded-lg"
                            src={product.product_photo}
                            alt={product.name}
                        />
                    </div>
                <div className="mb-6">
                    <div className="text-gray-600 my-2">{ product.brand }</div>
                    <h3 className="text-xl font-bold">{ product.price }</h3>
                  </div>

                <div className="mb-5">
                    { description }
                  </div>
                  <button onClick={ () => setShowFullDescription((prevState) => !prevState) } className='text-indigo-500 mb-5 hover:text-indigo-600'>
                    { showFullDescription ? 'Less' : 'More' }
                  </button>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold">{ product.name }</h3>
                  </div>
                </div>
    </div>
  )
}

export default Product