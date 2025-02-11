import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validator = <T>(schema: Joi.ObjectSchema<T>) => (req: Request<unknown,unknown,T>, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, {abortEarly: false})
    if(validation.error){
        res.status(400).json({
            success: false,
            message: validation.error.details.map(error => error.message),
            response: "validation error"
        })
        return;
    }
    return next()
}

export default validator