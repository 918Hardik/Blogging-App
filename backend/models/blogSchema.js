import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength: [10, "Blog title must contain at least 10 character"],
        maxLength: [40, "Name must not exceed at least 40 character"],
    },
    mainImage:{
        public_id:{
            type: String,
            required: true,
            
        },
        url:{
            
            type: String,
            required: true,
        }
    },
    intro:{
        type: String,
        required: true,
        minLength: [250, "Blog title must contain at least 250 character"],
        
        
    },
    paraOneImage:{
        public_id:{
            type: String,
            // required: true,
            
        },
        url:{
            
            type: String,
            // required: true,
        }
        
    },
    paraOneDescription:{
        type: String,
        // required: true,   
        minLength:[50,"Blog inro must contain at least 50 characters!"]
    },
    paraOneTitle:{
        type: String,
        minLength:[50,"Blog inro must contain at least 50 characters!"]
        
    },
    paraTwoImage:{
        public_id:{
            type: String,
            // required: true,
            
        },
        url:{
            
            type: String,
            // required: true,
        }
        
    },
    paraTwoDescription:{
        type: String,
        // required: true,   
        minLength:[50,"Blog inro must contain at least 50 characters!"]
    },
    paraTwoTitle:{
        type: String,
        minLength:[50,"Blog inro must contain at least 50 characters!"]
        
    },
    paraThreeImage:{
        public_id:{
            type: String,
            // required: true,
            
        },
        url:{
            
            type: String,
            // required: true,
        }
        
    },
    paraThreeDescription:{
        type: String,
        // required: true,   
        minLength:[50,"Blog inro must contain at least 50 characters!"]
    },
    paraThreeTitle:{
        type: String,
        minLength:[50,"Blog inro must contain at least 50 characters!"]
        
    },
    category:{
        type: String,
        required : true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },
    authorName:{
        type:String,
        required : true
    },
    authorAvatar:{
        type:String,
        required : true
        
    },
    published:{
        type: Boolean,
        default:false

    }


}) 

export const Blog = mongoose.model("Blog", blogSchema);