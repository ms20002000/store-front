import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import Categories from '../components/Categories'
import Products from '../components/Products'
import ViewAllJobs from '../components/ViewAllJobs'

function HomePage() {
  return (
    <>
    <Hero />
    <HomeCards />
    <Categories isHome={true} />
    <Products isHome={true} />
    <ViewAllJobs />
    </>
  )
}

export default HomePage