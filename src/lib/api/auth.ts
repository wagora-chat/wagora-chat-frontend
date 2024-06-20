import client from "./client";

interface SendEmailCodeParams {
    email: string;
}

interface SendVerifyCodeParams {
    verifyCode: string;
}

interface SignUpParams {
    "path": string | null,
    "nickname": string,
    "email": string,
    "password": string,
    "checkPassword": string
}

interface LoginParams {
    "email": string,
    "password": string,
}

interface CheckNicknameParams {
    nickname: string,
}

interface CheckEmailParams {
    email: string,
}

interface FileUploadParams {
    file: File | null;
}

export const sendEmailCode = ({email}: SendEmailCodeParams) => client.post('/auth/emails', ({email}));

export const sendVerifyCode = ({email}: SendEmailCodeParams, {verifyCode}: SendVerifyCodeParams) => client.post('auth/emails', ({ email, verifyCode }));

export const signUp = (body: SignUpParams) => client.post('/auth/signUp', ({body}));

export const login = (body: LoginParams) => client.post('/auth/login', ({body}));

export const checkDuplicateNickname = ({nickname}: CheckNicknameParams) => (client.get('auth/nicknames', {
        params: {
            nickname,
        },
    },
));

export const checkDuplicateEmail = ({email}: CheckEmailParams) => (client.get('auth/emails', {
        params: {
            email,
        },
    },
));

export const fileUpload = ({file}: FileUploadParams) => {
    const formData = new FormData();
    if (file) formData.append('file', file);
    return client.post('/fileUpload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};