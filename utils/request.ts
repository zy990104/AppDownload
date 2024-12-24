import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 创建 axios 实例
const service = axios.create({
    // baseURL: "http://127.0.0.1:8080", // 后端统一地址
    timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        console.error("请求错误：", error);
        return Promise.reject(error);
    }
);

// 基础请求方法
const request = {
    get<T = never>(url: string, params?: never, config?: AxiosRequestConfig): Promise<T> {
        return service({ url, method: "get", params, ...config });
    },

    post<T = never>(url: string, data?: never, config?: AxiosRequestConfig): Promise<T> {
        return service({ url, method: "post", data, ...config });
    },

    put<T = never>(url: string, data?: never, config?: AxiosRequestConfig): Promise<T> {
        return service({ url, method: "put", data, ...config });
    },

    delete<T = never>(url: string, params?: never, config?: AxiosRequestConfig): Promise<T> {
        return service({ url, method: "delete", params, ...config });
    },
};

export default request;
