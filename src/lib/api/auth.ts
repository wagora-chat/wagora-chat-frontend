import client from "./client";

interface SendEmailCodeParams {
    email: string;
}

interface SignUpParams {
    "path": string,
    "nickname": string,
    "email": string,
    "password": string,
    "checkPassword": string
}

interface CheckNicknameParams {
    nickname: string,
}

interface FileUploadParams {
    file: File | null;
}

export const sendEmailCode = ({email}: SendEmailCodeParams) => client.post('/auth/emails', ({email}));

export const signUp = (body: SignUpParams) => client.post('/auth/signUp', ({body}));

export const CheckDuplicateNickname = ({nickname}: CheckNicknameParams) => (client.get('auth/nicknames', {
        params: {
            nickname,
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