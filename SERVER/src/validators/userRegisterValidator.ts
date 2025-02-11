import Joi from 'joi'

interface UserRegistrationBody {
    email?: string;
    password?: string
}

const userRegisterValidator = Joi.object<UserRegistrationBody>({
    email: Joi.string().email({minDomainSegments: 2}).required().messages({
        'any.required': "Email Required",
        'string.email': "Email must contain @xxxx.com"
    }),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]')).required().messages({
        'any.required': "Password Required",
        'string.min': "Password need min 8 characters",
        'string.pattern': "Password must contain a alpha and numeric characters"
    }),
})

export default userRegisterValidator