import User from "../models/User";
import passport from "passport";
import { Strategy , ExtractJwt } from "passport-jwt";
import { JWT_SECRET } from '../constants/env'

export default passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        },              
        async (jwt_payload,done) => {
            try {              
                const user = await User.findOne({email:jwt_payload.email})
                if (user) {
                    user.password = "";
                    return done(null, user)
                } else {
                    return done(null)
                }
            } catch (error) {
                return done(error)
            }
        }
    )
)