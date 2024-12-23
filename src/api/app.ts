import request from "@/utils/request";

// 获取app数据
export const getAppData = (id: number) => {
    return request.get(`/apps/${id}`);
};
// 获取app数据
export const getAppList = () => {
    return request.get(`/apps/list`);
};

