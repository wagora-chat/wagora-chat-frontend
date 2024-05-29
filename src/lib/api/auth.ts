import client from "./client";

interface SendEmailCodeParams {
    email: string;
}

interface SignUpParams {
        "profile": string,
        "nickname": string,
        "email": string,
        "password": string,
        "checkPassword": string
}

export const sendEmailCode = ({ email }: SendEmailCodeParams) => client.post('/auth/emails', ({ email }));

export const signUp = ( body : SignUpParams ) => client.post('/auth/signUp', ({ body }));