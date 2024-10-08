import express from "express";
import {GetSingleBlog, blogPost, deleteBlog, getAllBlogs, getMyBlogs, updateBlog} from "../controllers/blogController.js";
import {isAuthorized , isAuthenticated} from "../middleware/auth.js"
const router = express.Router();


router.post('/post',isAuthenticated,isAuthorized("Author"),blogPost);
router.delete('/delete/:id',isAuthenticated,isAuthorized("Author"),deleteBlog);
router.get("/all",getAllBlogs)
router.get("/singleblog/:id",isAuthenticated,GetSingleBlog)
router.get('/myblogs',isAuthenticated,isAuthorized("Author"),getMyBlogs);
router.put("/update/:id",isAuthenticated,isAuthorized("Author"),updateBlog);

export default router;


