import Joi from 'joi'

interface UserValidator {
    email?: string;
    password?: string;
}

const userSignInValidator = Joi.object<UserValidator>({
    email: Joi.string().email().required().messages({
        'any.required': "Email Required",
        'string.email': "Email must contain @xxxx.com"
    }),

    password: Joi.string().min(8).required().messages({
        'any.required': "Password Required",
        'string.min': "Password need min 8 characters",
    }),
})

export default userSignInValidator