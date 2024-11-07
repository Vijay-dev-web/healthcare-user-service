import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor (public errors: ValidationError[]) {
        super('Invalid Request');  // Not going to be used. Added for this to work: new Error('something')
        // Because we inherit built-in Class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            if(error.type === 'field') {
                return {
                    message: error.msg,
                    field: error.path
                }
            }  
            return {
                message: error.msg
            }
        })
    }
}