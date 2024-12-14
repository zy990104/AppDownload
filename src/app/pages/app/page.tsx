import React from "react";
import appIcon from "@/assets/bg.png"; // 替换成你的应用图标路径
import Image from "next/image";

function App() {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center">
            {/* 应用背景图片 */}
            <div className="relative w-full h-64">
                <Image
                    src={appIcon} // 替换成你的背景图链接
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
                    src={appIcon}
                    alt="App Icon"
                    className="w-16 h-16 rounded-xl border-2 border-gray-700"
                />
                <div className="ml-4 flex-1">
                    <h1 className="text-2xl font-bold">王者荣耀</h1>
                    <p className="text-sm text-gray-400">S37赛季 暗影狂舞</p>
                </div>
                <button className="bg-blue-500 px-6 py-2 rounded-full font-bold">
                    下载
                </button>
            </div>

            {/* 简介 */}
            <div className="w-full px-6 mt-4">
                <p className="mt-4 text-gray-300">
                    新英雄-影：昔日战死的“东君”，如今从死地复生归来，她会为云梦泽带来怎样的改变？觉醒了不死之力的影，受到致命伤害...
                </p>
            </div>

            {/* 版本更新 */}
            <div className="w-full px-6 mt-6">
                <h2 className="text-lg font-bold mb-2">版本更新</h2>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-300">
                        版本 3.1.0 更新内容：
                    </p>
                    <ul className="list-disc list-inside text-gray-400 mt-2">
                        <li>新增英雄：影，觉醒不死之力，掀起新的战争。</li>
                        <li>优化匹配机制，提升游戏公平性。</li>
                        <li>修复部分设备适配问题，提升运行性能。</li>
                        <li>新增赛季皮肤和限时活动。</li>
                    </ul>
                </div>
            </div>

            {/* 预览图片 */}
            <div className="w-full px-6 mt-6">
                <h2 className="text-lg font-bold mb-2">预览</h2>
                <div className="flex overflow-x-scroll space-x-4">
                    <Image
                        width={300}
                        height={300}
                        src={appIcon}
                        alt="预览图1"
                        className="rounded-lg"
                    />
                    <Image
                        width={300}
                        height={300}
                        src={appIcon}
                        alt="预览图2"
                        className="rounded-lg"
                    />
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
