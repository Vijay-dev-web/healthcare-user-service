import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/request-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const router = express.Router();

router.get('/doctor-list', 
  [
    body('role')
      .notEmpty().withMessage('Role is required...!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    const doctorsList = await User.find({ role: req.query.role })
    
    res.status(200).send({
      doctorsList
    })
  })

export { router as doctorListRouter };