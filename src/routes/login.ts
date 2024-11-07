import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/request-handler';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', 
  [
    body('email')
      .isEmail().withMessage('Please enter a valid email...!'),
    body('password')
      .trim()
      .notEmpty().withMessage('Password should not be empty...!')
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    res.status(200).send({
      user
    })
  })

export { router as signinRouter };