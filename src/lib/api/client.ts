import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

interface Member {
    accessToken: string;
}


const client = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
        const memberStr = sessionStorage.getItem('member');
        let member: Member | null = null;

        if (memberStr) {
            try {
                member = JSON.parse(memberStr) as Member;
            } catch (e) {
                console.error('Error parsing member from sessionStorage', e);
            }
        }

        // 요청 헤더 설정
        if (member) {
            config.headers['Content-Type'] = 'application/json';
            config.headers['Authorization'] = `Bearer ${member.accessToken}`;
        }

        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default client;