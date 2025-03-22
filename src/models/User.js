import mongoose from "mongoose";

 const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    batch:String,
    image:{
        type:String,
      
    },
    phone:{
        type:Number,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        trim:true,
        lowercase:true,
        unique:true,
        validate: {
        validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
        
    },


    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(v);
            },
            message: props => 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
        }


    },
    roles:{
        type:[String],
        default:["USER"],
    },
    // enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

export default mongoose.model("User",userSchema);