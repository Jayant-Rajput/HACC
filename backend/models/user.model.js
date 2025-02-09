import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { 
        type:String, 
        required: true
    },
    email: { 
        type:String, required: true, 
        unique:true
    },
    password: { 
        type:String, 
        required: true
    },
    branch: { 
        type:String
    },
    year: { 
        type:String
    },
    college: { 
        type:String
    },
    codechefId: { 
        type:String, 
        required: true
    },
    codeforcesId: { 
        type:String, 
        required: true
    },
    leetcodeId: { 
        type:String, 
        required: true
    },
    codechefRating: { 
        type:Number
    },
    codeforcesRating: {  
        type:Number
    },
    leetcodeRating: { 
        type:Number
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;



