import client from "./client";

interface SendEmailCodeParams {
    email: string;
}

export const sendEmailCode = ({ email }: SendEmailCodeParams) => client.post('/auth/emails', ({ email }));