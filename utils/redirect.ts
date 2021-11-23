import jwtDecode from 'jwt-decode';
import { IUser } from '../redux/slices/authSlice';
import mongoose from 'mongoose';

const redirect = (context, source, redirectTo: string) => {
    const token = context.req.cookies.ecommerceJwt;
    const user: IUser = jwtDecode(token);
    console.log('USER REDIRECT', user);
    if (user && mongoose.Types.ObjectId.isValid(user._id) && !user.banned)
        return {
            redirect: { source, destination: redirectTo, permanent: false },
        };
};

export default redirect;
