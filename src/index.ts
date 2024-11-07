import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/login';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/register';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false,    
    secure: true      
  })
)

app.use(currentUserRouter);
app.use(signinRouter); 
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler);

const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not present');
  }
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@mern-cluster.pydupa0.mongodb.net/?retryWrites=true&w=majority&appName=mern-cluster`);
    console.log('Connected to db');    
  } catch (err) {
    console.error(err)
  }
  app.listen(process.env.PORT, () => {
    console.log(`User Service listening on port ${process.env.PORT}!!!`);      
  });
};

start();
