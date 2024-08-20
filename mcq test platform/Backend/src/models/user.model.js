import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken" //based on cryptography algorithm
import bcrypt from "bcrypt" // password hashing

const userSchema = new Schema(
    {
        //id generate by mongoDb is bson not json
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true // to enable searching field on any field for optimzation only 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            //required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        testHistory: [ 
            {
                type: Schema.Types.ObjectId,
                ref: "AttemptedTest"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true // createdAt, updatedAt
    }
)
// before some to encrypt the password. pre just invokes before saving the data
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10) // what to hash and how many rounds
    next()
})
// mongoose can create custom methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
// jwt is a bearer token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)