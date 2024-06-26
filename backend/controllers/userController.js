import { catchAsyncError } from '../middleware/catchAsyncError.js'
import ErrorHandler from '../middleware/error.js';
import { User } from '../models/userSchema.js'
import { sendToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';
export const register = catchAsyncError(async (req, res, next) => {

    if(!req.files || Object.keys(req.files).length===0){
        return  next(new ErrorHandler("user avatar required",400));
    }
    const {avatar} = req.files;
    const allowedFormat = ["image/png","image/jpeg","image/webp"];

    if(!allowedFormat.includes(avatar.mimetype)){
        return next(new ErrorHandler("Invalid file type. Please provide your avatar in png, jpg or webp format.",400));
    }
    
    const { name, email, phone, password, role, education } = req.body;
    if (!name || !email || !phone || !password || !role || !education || !avatar) {
        return next(new ErrorHandler("Please fill full details", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already Existes", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("cloudinary error :", cloudinaryResponse.error || "Unknown cloudinary error!" )
    }
    user = await User.create({
        name, email, phone, password, role, education,
        avatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    sendToken(user, 200, "User Registered Successfully", res);
    // res.status(200).json({
    //     success: true,
    //     message: "User register"
    // });

});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please Fill full form !", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("InValid email or password", 400))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("InValid email or password", 400))
    }
    if (user.role !== role) {
        return next(new ErrorHandler(`User with provided role (${role}) not found`, 400));
    }

    sendToken(user, 200, "User logged in Successfully", res);

    // res.status(200).json({
    //     success: true,
    //     message: "User logged in!",
    // });
});

export const logout = catchAsyncError((req,res,next)=>{
    res.status(200).cookie("token","",{
        expires : new Date(Date.now()),
        httpOnly:true
    })
    .json({
        success: true,
        message:"User logged out"
    });
});

export const getMyProfile= catchAsyncError((req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    });
}); 

export const getAllAuthors = catchAsyncError(async(req,res,next)=>{
    const authors = await User.find({role:"Author"})
    res.status(200).json({
        success:true,
        authors
    });
});
//abi route bnaega iska tbi toh ye kaam krega