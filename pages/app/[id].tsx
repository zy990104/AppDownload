"use client"; // 标记为客户端组件
import React, {useEffect, useState} from "react";
import appIcon from "../../assets/bg.png"; // 替换成你的应用图标路径
import Image from "next/image";
import {getAppData} from "../../api/app";
import {useRouter} from "next/router";
import {AppData} from "../../model/type/app_data";

function App() {
    const router = useRouter();
    const {id} = router.query; // 动态获取 URL 参数
    const [data, setData] = useState<AppData | null>(null);
    const getAppDetails = async () => {
        const res = await getAppData(id)
        setData(res);
    }
    useEffect(() => {
        getAppDetails()
    }, [])
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center">
            {/* 应用背景图片 */}
            <div className="relative w-full h-64">
                {/* 左上角返回按钮 */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 p-2 bg-gray-700 rounded-full text-white">
                    ←
                </button>
                <Image
                    src={data?.appIcon || appIcon} // 替换成你的背景图链接
                    alt="背景图"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                />
                <div className="absolute top-4 right-4 text-2xl">21:57 ♥</div>
            </div>

            {/* 应用信息 */}
            <div className="p-6 flex items-center w-full">
                <Image
                    width={300}
                    height={300}
                    src={data?.appIcon || appIcon}
                    alt="App Icon"
                    className="w-16 h-16 rounded-xl border-2 border-gray-700"
                />
                <div className="ml-4 flex-1">
                    <h1 className="text-2xl font-bold">{data?.title || "加载中..."}</h1>
                    {/*<p className="text-sm text-gray-400">{data?.version || "1.0.0"}</p>*/}
                </div>
                <button
                    className="bg-blue-500 px-6 py-2 rounded-full  text-center flex items-center justify-center">
                    下载
                </button>

            </div>

            {/* 简介 */}
            <div className="w-full px-6 mt-4">
                <p className="mt-4 text-gray-300">
                    {data?.description || "暂无简介"}
                </p>
            </div>

            {/*/!* 版本更新 *!/*/}
            {/*<div className="w-full px-6 mt-6">*/}
            {/*    <h2 className="text-lg font-bold mb-2">版本更新</h2>*/}
            {/*    <div className="bg-gray-800 p-4 rounded-lg">*/}
            {/*        <p className="text-gray-300">*/}
            {/*            版本 {data?.version} 更新内容：*/}
            {/*        </p>*/}
            {/*        <ul className="list-disc list-inside text-gray-400 mt-2">*/}
            {/*            {data?.features*/}
            {/*                ?.split(";")*/}
            {/*                .map((feature, index) => (*/}
            {/*                    <li key={index}>{feature}</li>*/}
            {/*                )) || <li>加载中...</li>}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* 预览图片 */}
            <div className="w-full px-6 mt-6">
                <h2 className="text-lg font-bold mb-2">预览</h2>
                <div className="flex overflow-x-scroll space-x-4">
                    {
                        data?.fileList.map((file, index) => {
                            return (
                                <Image
                                    key={index}
                                    width={300}
                                    height={300}
                                    src={file}
                                    alt={`预览图${index + 1}`} // 使用动态的 alt 文本
                                    className="rounded-lg"
                                />
                            );
                        })
                    }
                </div>
            </div>

            {/* 底部 */}
            <div className="w-full p-6 text-center text-sm text-gray-500">
                iPhone、iPad
            </div>
        </div>
    );
}

export default App;
