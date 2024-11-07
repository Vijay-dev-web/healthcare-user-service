import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

	console.log('err : ', err);
	

	if(err instanceof CustomError) {
		res.status(err.statusCode).send({
			errors: err.serializeErrors()
		})
	}

	if(err instanceof RequestValidationError) {
			res.status(err.statusCode).send({
			errors: err.serializeErrors()
		})
	}

	if(err instanceof DatabaseConnectionError) {
		res.status(err.statusCode).send({
			errors: err.serializeErrors()
		})
	}

	res.status(500).send({
		errors: [{
			message: 'Something Went Wrong!!!'
		}]
	});
};