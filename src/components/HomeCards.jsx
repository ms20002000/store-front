import { Link } from 'react-router-dom'
import Card from './Card'


const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <Card>
            <h2 className="text-2xl font-bold">For Sellers</h2>
            <p className="mt-2 mb-4">
              Contact us to become one of the sellers
            </p>
            <Link
              to="/jobs.html"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Contact Us
            </Link>
            </Card>
            <Card bg='bg-indigo-100'>
                <h2 className="text-2xl font-bold">For Buyers</h2>
                <p className="mt-2 mb-4">
                Contact us to find the best product for you.
                </p>
                <Link
                to="/add-job.html"
                className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
                >
                Contact Us
                </Link>
            </Card>
          
        </div>
      </div>
    </section>
  )
}

export default HomeCards