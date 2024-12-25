import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import MainLayout from './assets/layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import CategoriesPage from './pages/CategoriesPage'
import ProductsPage from './pages/ProductsPage'
import RegisterPage from './pages/RegisterPage'
import CategoryProductsPage from './pages/CategoryProductsPage'
import OTPVerificationPage from './pages/OTPVerificationPage'
import LoginPage from './pages/LoginPage'
import ProductDetailPage from './pages/productDetailPage'


function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={ <HomePage /> } />
      <Route path='/categories/' element={ <CategoriesPage /> } />
      <Route path='/products/' element={ <ProductsPage /> } />
      <Route path="/products/:productName/" element={<ProductDetailPage />} />
      <Route path="/:name/products/" element={<CategoryProductsPage />}/>
      <Route path='/register/' element={ <RegisterPage /> } />
      <Route path="/otpVerification/" element={<OTPVerificationPage />} />
      <Route path="/login/" element={<LoginPage />} />
      <Route path='*' element={ <NotFoundPage /> } />
    </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App
