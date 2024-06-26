import React, { useContext } from 'react'
import { Context } from '../../main'
import HeroSection from '../mini_components/HeroSection';
import TrendingBlogs from '../mini_components/TrendingBlogs';
import LatestBlog from '../mini_components/LatestBlog';
import PopularAuthors from '../mini_components/PopularAuthors';

const Home = () => {
  const {mode,blogs}=useContext(Context);
  const filteredBlogs=blogs.slice(0,6);
  return (
    <article className={mode==="dark"?"dark-bg":"light-bg"}>
      <HeroSection></HeroSection>
      <TrendingBlogs></TrendingBlogs>
      <LatestBlog blogs={filteredBlogs} heading={"Latest Blogs"}></LatestBlog>
      <PopularAuthors></PopularAuthors>
    </article>
  )
}

export default Home