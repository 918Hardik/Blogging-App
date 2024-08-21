import React, { useContext, useEffect } from 'react'
import "./App.css"
import {Toaster} from 'react-hot-toast';
import Footer from './components/layouts/footer'
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import SingleBlog from "./components/pages/SingleBlog"
import About from "./components/pages/About"
import AllAuthors from "./components/pages/AllAuthors"
import Dashboard from './components/pages/Dashboard'
import Blogs from './components/pages/Blogs'
import UpdateBlog from './components/pages/UpdateBlogs'
import Navbar from './components/layouts/navbar'
import { Context } from './main'
import axios from 'axios'
const App = () => {
  const {setUser,isAuthenticated,setIsAuthenticated,user,setBlogs}=useContext(Context);
  useEffect(() => {
    const FetchUser = async () => {
        try {
            const { data } = await axios.get("https://blogging-app-backend-mqk7.onrender.com/api/v1/user/myprofile", {
                withCredentials: true
            })
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            setUser({});
        }
    }

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("https://blogging-app-backend-mqk7.onrender.com/api/v1/blog/all", { withCredentials: true })
            setBlogs(data.allBlogs);
        } catch (error) {
            setBlogs([]);
        }
    }

    FetchUser();
    fetchBlogs();
}, [isAuthenticated]); // Include isAuthenticated and user in the dependency array

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/blog/:id' element={<SingleBlog/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/authors' element={<AllAuthors/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/blog/update/:id' element={<UpdateBlog/>}></Route>

      </Routes>
      <Footer></Footer>
      <Toaster></Toaster>

    </Router>
  )
}

export default App
