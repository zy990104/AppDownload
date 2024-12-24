import request from "../utils/request";


// 获取app数据
export const getAppData = (id: string | string[] | undefined) => {
    return request.get(`/api/apps/${id}`);
};
// 获取app数据
export const getAppList = () => {
    return request.get(`/api/apps/list`);
};
// 获取app数据
export const addApp = (data: never) => {
    return request.post(`/api/apps/addApp`, data);
};
