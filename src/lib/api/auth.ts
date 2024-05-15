import client from "./client";
import {FieldValues} from "react-hook-form";

interface SendEmailCodeParams {
    email: string;
}

interface SignUpParams {
    body: FieldValues;
}

export const sendEmailCode = ({ email }: SendEmailCodeParams) => client.post('/auth/emails', ({ email }));

export const signUp = ({ body }: SignUpParams ) => client.post('/auth/signUp', ({ body }));