import express from 'express';
import { getAllAuthors, getMyProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from '../middleware/auth.js';

const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/logout",isAuthenticated,logout);
// router.get("/myprofile", isAuthenticated ,isAuthorized("Reader"),getMyProfile);
router.get("/myprofile", isAuthenticated ,getMyProfile);
router.get("/authors",getAllAuthors)

export default router;