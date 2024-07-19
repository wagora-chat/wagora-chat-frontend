import { useState } from 'react';

const useSessionStorage = <T,>(key: string, initialValue: T | null) => {// 제네릭 타입, 키 값, 초기 값 전달
    // useState 훅을 사용하여 상태 변수 storedValue를 생성하고 초기화
    const [storedValue, setStoredValue] = useState<T | null>(() => {
        try {
            // 세션 스토리지에서 데이터를 가져오기
            const item = sessionStorage.getItem(key);
            // 데이터를 JSON 파싱하여 상태로 설정
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // 상태 값을 설정하는 함수
    const setValue = (value: T | null) => {
        try {
            if (value === null) {
                // 값이 null이면 세션 스토리지에서 해당 키를 제거
                sessionStorage.removeItem(key);
            } else {
                // 값을 JSON 문자열로 변환하여 세션 스토리지에 저장
                sessionStorage.setItem(key, JSON.stringify(value));
            }
            // 상태 값을 업데이트
            setStoredValue(value);
        } catch (error) {
            console.error(error);
        }
    };

    // storedValue와 setValue를 반환
    return [storedValue, setValue] as const;
};

export default useSessionStorage;
