
import express from 'express';

import { userSignUp, userLogin } from "../services/user.services";

export const signUpUserHandler = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password} = req.body;
    if (! email || ! username || !password) {
       return res.status(401).send('Please put the correct parameters.');
   }
   const user = await userSignUp({email, password, username});
   return res.status(200).send(user);
   
} catch (err) {
  console.log(err);
    return res.status(500).send({message: 'Authentication failed'});
}
}
// Function to handle user login
export const loginUserHandler = async (req: express.Request, res: express.Response) => {
  try{
    const {email, password} = req.body;
    if (!email ) {
      return res.status(400).send('Please input your email. ');
    }
    if (!password) {
      return res.status(400).send('Pleace input your password.');
    }
    const user = await userLogin({email, password});
    console.log(user);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send('Authentication failed')
  }
}
