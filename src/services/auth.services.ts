import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
require('dotenv').config();
// Function to generate a JWT token
export function generateAuthToken(userId: string): string {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, { expiresIn: '7days' });
  return token;
}
// Function to verify a JWT token
 function verifyAuthToken(token: string): any {
  try {
    const decoding = jwt.verify(token, process.env.JWT_SECRET as Secret);
    return decoding;
  } catch (err) {
    throw new Error('Invalid token');
  }
}
// Middleware to check if the request contains a valid JWT token
export function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  // Get the JWT token from the request headers or cookies
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(400).send({ message: 'Authentication required' });
  };
  try {
    const tokenString = Array.isArray(token) ? token[0] : token; // Ensure token is a string
    const decoded = verifyAuthToken(tokenString.replace('Bearer ', '')); // Remove 'Bearer ' from the token
    (req as any).user = decoded; // Attach the user to the request object
    next(); // Move on to the next middleware
  }  catch (error) {
    return res.status(400).send('Invalid token');
  }
}
