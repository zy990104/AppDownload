"use client";
import React, { useEffect, useState } from "react";
import { getAppList } from "@/api/app"; // 假设这是你的获取列表的 API
import { useRouter } from "next/navigation";

interface AppItem {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    title: string;
    version: string;
    description: string;
    features: string;
}

function AppListPage() {
    const [apps, setApps] = useState<AppItem[]>([]);
    const router = useRouter();

    const fetchApps = async () => {
        const res = await getAppList();
        setApps(res.data || []); // 获取到的 App 列表
    };

    useEffect(() => {
        fetchApps();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-800">
                <h1 className="text-xl font-bold">应用列表</h1>
                <button
                    onClick={() => router.push("/apps/add")}
                    className="bg-blue-500 px-4 py-2 rounded-lg font-bold text-sm"
                >
                    新增应用
                </button>
            </div>

            {/* 应用列表 */}
            <div className="p-6">
                {apps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {apps.map((app) => (
                            <div
                                key={app.ID}
                                className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col"
                            >
                                <h2 className="text-lg font-bold">{app.title}</h2>
                                <p className="text-gray-400 text-sm mt-2">
                                    版本：{app.version}
                                </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {app.description}
                                </p>
                                <button
                                    onClick={() => router.push(`/apps/${app.ID}`)}
                                    className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm"
                                >
                                    查看详情
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center mt-4">
                        暂无应用，请点击右上角新增应用。
                    </p>
                )}
            </div>
        </div>
    );
}

export default AppListPage;
