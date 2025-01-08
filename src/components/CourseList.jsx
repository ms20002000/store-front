import Product from './Product';
import Spinner from './Spinner';
import { useState, useEffect } from 'react';



const CourseList = ({ courses }) => {
  const [loading, setLoading] = useState(false);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-2xl font-bold text-indigo-500 mb-6 text-center">
          Your Courses
        </h2>
            {loading ? (<Spinner loading={loading} />):( 
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            { courses.map((product) => (
                <Product key={product.id} product={product} />
            )) }
            </div>
            )}
    
      </div>
    </section>
  )
};

export default CourseList;
