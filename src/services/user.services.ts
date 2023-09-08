import { UserModel } from "../models/user";
import bcrypt from 'bcrypt';
import { generateAuthToken,  } from "./auth.services";
import { signUpRequest, loginRequest } from "../interfaces/user.types";

// Function to sign user up
export const userSignUp = async (body: signUpRequest ): Promise<any> => {
    const {username, email, password} = body;
    const existingUser = await UserModel.find({ username, email });
  if (existingUser) {
    throw new Error('One of the two parameters are already in use');
  }
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = new UserModel({email, username, password: hashPassword});
    const token = generateAuthToken(createUser._id.toString());
    if (!createUser) {
        throw new Error ('Unable to create new user');
    }
    await createUser.save();
    return { user: createUser, token };
   
}
// Function to log user in
export const userLogin = async ( body:loginRequest): Promise<any> => {
    const {email, password} = body;
    const user = await UserModel.findOne({email});
    if (!user) {
        throw new Error('Email not found.');
    }
    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
        throw new Error ('Wrong password.');
    }
   const token = generateAuthToken(user._id.toString());
   return { user, token };
}
