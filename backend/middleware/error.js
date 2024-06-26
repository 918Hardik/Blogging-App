class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode;
    }
}
export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "INTERNAL SERVER ERROR";
    err.statuscode=err.statuscode || 500;

    if(err.name === "CastError"){
        const message = `Invalid resource not found: ${err.path}`;
        err = new ErrorHandler(message,404);
    }  //casterror means if no internet error in mongodb databse vgera vgera

    return res.status(err.statuscode).json({
        success:false,
        message: err.message,

    })
}
export default ErrorHandler;