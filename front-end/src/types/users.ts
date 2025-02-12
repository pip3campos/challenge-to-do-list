export interface IUser {
    email: string,
    password: string,
    response: {
        token: string,
        findUser: {
            _id: string,
            email: string
        }
    }
}