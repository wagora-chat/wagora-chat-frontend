import client from "./client";

interface SendTempPasswordBody {
    email: string;
}

interface SendEmailCodeBody {
    email: string;
}

interface SendVerifyCodeBody {
    verifyCode: string;
}

interface SignUpBody {
    "path": string | null,
    "nickname": string,
    "email": string,
    "password": string,
    "checkPassword": string
}

interface LoginBody {
    "email": string,
    "password": string,
}

interface CheckNicknameParams {
    nickname: string,
}

interface CheckEmailParams {
    email: string,
}

interface FileUploadBody {
    file: File | null;
}

export const sendTempPassword = ({ email }: SendTempPasswordBody) => client.patch('/auth/passwords', ({ email }));

export const sendEmailCode = ({ email }: SendEmailCodeBody) => client.post('/auth/emails', ({ email }));

export const sendVerifyCode = ({ email }: SendEmailCodeBody, { verifyCode }: SendVerifyCodeBody) => client.post('auth/emails', ({ email, verifyCode }));

export const signUp = (body: SignUpBody) => client.post('/auth/signUp', ({ body }));

export const login = (body: LoginBody) => client.post('/auth/login', ({ body }));

export const checkDuplicateNickname = ({ nickname }: CheckNicknameParams) => (client.get('auth/nicknames', {
        params: {
            nickname,
        },
    },
));

export const checkDuplicateEmail = ({ email }: CheckEmailParams) => (client.get('auth/emails', {
        params: {
            email,
        },
    },
));

export const fileUpload = ({ file }: FileUploadBody) => {
    const formData = new FormData();
    if (file) formData.append('file', file);
    return client.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};