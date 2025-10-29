import axios, { AxiosRequestConfig } from "axios";
import { AccountCredentials, ShoppingItem, ShoppingItemEntry } from "../type";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.log('API Error', error.response || error.message || error);
    return Promise.reject(error.response?.date || new Error(error.message) || '예상 못한 에러 발생');
  }
);

// JWT 토큰 포함 요청 설정
const getRequestConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  if (token) {
    return {
      headers: {
        Authorization:token
      }
    };
  }
  return {};
}

// 기존 API 관련 함수들 정의
export const login = async (creds: AccountCredentials): Promise<string> => {
  try {
    const res = await apiClient.post('/login', creds);
    const jwtToken = res.headers.authorization;
    if (!jwtToken) {
      throw new Error("JWT 토큰이 없습니다.");
    }
    return jwtToken;

  } catch (error) {
    console.log('username / password가 틀렸습니다.')
    // error 객체가 AxiosError 인스턴스인지 확인하는 과정 작성
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || error.response.data?.error || `login 실패${error.response.status}`);
    }
    else if (error instanceof Error) {
      throw error;
    }
    else {
      throw new Error('예상하지 못한 에러 발생');
    }
  }
};

export const getItems = async(): Promise<ShoppingItem[]> => {
    const res = await apiClient.get('/api/shoppingItems', getRequestConfig())
    return res.data._embedded.shoppingItems;
}
export const addItem = async(item: ShoppingItemEntry) : Promise<ShoppingItem> => {
  const res = await apiClient.post('/api/shoppingItems', item, getRequestConfig());
  return res.data;
} 
export const updateItem = async (id: number , itemUpdate : ShoppingItemEntry) : Promise<ShoppingItem> => {
  const res = await apiClient.post(`/api/shoppingItems${id}`,itemUpdate,getRequestConfig());
  return res.data;
}
export const deleteItem = async (id: number) : Promise<void> => {
  await apiClient.delete(`/api/shoppingItems${id}`,getRequestConfig());
}

// Google ID 토큰 백앤드 전송 및 JWT 수신 관련 함수
/**
 * Google ID 토큰을 백엔드로 보낸 다음 검증하고, 앱의 JWT를 받아온다.
 * @param idToken = Google 로그인 성공 시 받은 ID 토큰
 * @returns 백엔드에서 발급한 JWT(Authorization headers 값)
 */
export const authenticateWithGoogleToken = async(idToken : string): Promise<string> => {
  console.log('Google Id 토큰을 백엔드로 전송한다.',idToken.substring(0,30) + '...')// 토큰 전체 노출하지 않기 위해 잘라내는 방법
  try {
    // 백엔드에 구현한 Google 토큰 검증 엔드포인트를 호출한다.
    console.log("asdasdasd1")
    const res = await apiClient.post('/api/auth/google',{idToken});
    console.log(res.headers.authorization)
    const backendJwt = res.headers.authorization; // 백엔드에서 token field에 JWT를 담아서 반환

    if(!backendJwt) {throw new Error('백엔드에서 JWT를 보내지 않았습니다.');}
    console.log('JWT가 백엔드로부터 전송됨 ' , backendJwt.substring(0,15)+'...');
    return backendJwt;
  } catch (error) {
    console.log('Backend Google Auth Error : ' + error);
    if(axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || error.response.data?.error || `백엔드 구글 인증 실패 (${error.response?.status})`)
    } else if (error instanceof Error) {
      throw error;
    }
    else {
      throw new Error('에측할 수 없는 에러가 구글 인증 시에 발생했습니다.')
    }
  }
}  