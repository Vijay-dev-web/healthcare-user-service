import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/request-handler';

const router = express.Router();

router.post('/register', [
    body('email')
      .isEmail().withMessage('Invalid Email!!!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 15}).withMessage('Password must be minimum 4 & maximum 15 characters'),
    body('role')
      .notEmpty().withMessage('Role should not be empty')
],
  validateRequest,
  async (req: Request, res: Response) => {

  const { email, password, role, token, contact, name } = req.body;
  const existingUser = await User.findOne({ email });
  if(existingUser) {
    throw new BadRequestError('Email in use!!!')
  }

  const user = User.build({ email, password, role, token, contact, name}); 
  await user.save();

  const userJwt = jwt.sign({
    id: user.id,
    email: user.email,
    role,
    contact,
    name
  }, process.env.JWT_KEY!);

  req.session = {
    jwt: userJwt
  }

  user.token = userJwt;

  console.log('user : ', user);
  
  

  res.status(201).send({user})

});

export { router as signupRouter };