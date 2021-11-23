import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

interface ICredentials {
    email: string;
    password: string;
}

interface IUser {
    banned: boolean;
    email: string;
    image: string;
    name: string;
    role: string;
    token: string;
    _id: string;
}

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            async authorize(credentials) {
                try {
                    const user = credentials.user;
                    return user;
                    // const email: string = credentials.email;
                    // const password: string = credentials.password;
                    // const axiosConfig = {
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Access-Control-Allow-Origin': '*',
                    //     },
                    // };
                    // console.log({ email, password });
                    // const { data } = await axios.post(
                    //     'http://localhost:5001/api/v1/users/login',
                    //     { email, password },
                    //     axiosConfig
                    // );
                    // // console.log('NEXT AUTH CREDENTIALS: ', data);
                    // if (!data || data.status !== 'success') {
                    //     console.log('HERE: NOT SUCCESS');
                    //     throw new Error('CACCC');
                    // }
                    // const user = data.data;
                    // return user;
                } catch (error) {
                    console.log(
                        'ERROR FROM CREDENTIALS: ',
                        error.response.data.errors
                    );
                    return error.response.data;
                }
            },
        }),
    ],
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    session: {
        jwt: true,
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt: async (token, user, account, profile) => {
            if (profile) {
                token.profile = profile;
            }
            return token;
        },
        session: async (session, token) => {
            // console.log('SESSION: ', { session, token });
            session.user._id = token.profile._id;
            session.user.role = token.profile.role;
            session.user.banned = token.profile.banned;
            session.user.token = token.profile.token;
            //return session;
            return Promise.resolve(session);
        },
    },
});
