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
    "profile": string | null,
    "nickname": string,
    "email": string,
    "password": string,
    "checkPassword": string
}

interface LoginBody {
    "email": string,
    "password": string,
}

interface LogoutBody {
    "nickname": string | undefined,
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

export const signUp = (body: SignUpBody) => {
    if(!body.profile) body.profile = "www.path.com"; // 프로필을 설정하지 않는 경우 기본 경로로 설정
    return client.post('/auth/signUp', ({ ...body }))
};

export const login = (body: LoginBody) => client.post('/auth/login', ({ ...body }));

export const logout = (body: LogoutBody) => client.post('/auth/logout', ({ ...body }));

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