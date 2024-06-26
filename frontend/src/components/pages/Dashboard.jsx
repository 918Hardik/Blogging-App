import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import SideBar from "../layouts/SideBar"
import MyProfile from '../mini_components/MyProfile';
import CreateBlog  from '../mini_components/createBlog';
import Chart from '../mini_components/chart';
import MyBlogs from '../mini_components/MyBlogs';

const Dashboard = () => {
  const [component , setComponent] = useState("MyBlogs");
  const {mode, isAuthenticated,user} = useContext(Context);
  if(!isAuthenticated || user.role === "Reader"){
    return <Navigate to={"/"}/>
  }
  return (
    <section className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}>
      <SideBar component = {component} setComponent = {setComponent}/>
      {
        component === "My Profile" ? (<MyProfile/>) : component === "Create Blog" ? (<CreateBlog/>) : component === "Chart" ? (<Chart/>) : (<MyBlogs/>)
      }
    </section >
  )
}

export default Dashboard