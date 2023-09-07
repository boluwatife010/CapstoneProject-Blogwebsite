
import mongoose from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: [true, 'your email is required'],
        lowerCase: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: false,
        bcrypt: true,
        rounds: 10,
        minlength: [6, 'The minimum password length is 6 characters']
    },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
   
},
 {timestamps: true}
);
export const UserModel = mongoose.model("User", userSchema);