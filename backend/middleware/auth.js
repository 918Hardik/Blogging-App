import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from '../middleware/error.js';
import jwt from "jsonwebtoken";


//authentication
//means giving email password mai ye falana banda hu
export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not authenticated",400))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);

    next();
})

//authorization
//agr mera blog h toh koi or author bnke usko access ni kr skta rather than me

export const isAuthorized=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`User with this (${req.user.role}) not allowed to access this resource`));

        }
        next();
    }
};