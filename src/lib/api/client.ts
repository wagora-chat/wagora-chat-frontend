import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

interface Member {
    accessToken: string;
    // 필요한 다른 필드들도 정의할 수 있습니다.
}

const client = axios.create();

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

        if (member) {
            config.headers['Content-Type'] = 'application/json';
            config.headers['Authorization'] = `Bearer ${member.accessToken}`;
        }

        console.log(config);

        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default client;