import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import Categories from '../components/Categories'
import Products from '../components/Products'
import ViewAllProducs from '../components/ViewAllProducs'

function HomePage() {
  return (
    <>
    <Hero />
    <HomeCards />
    <Categories isHome={true} />
    <Products isHome={true} />
    <ViewAllProducs />
    </>
  )
}

export default HomePage