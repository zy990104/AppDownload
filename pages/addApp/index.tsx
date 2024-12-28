import React, {useState} from "react";
import {useRouter} from "next/router";
import {addApp} from "../../api/app";
import LoadingSpinner from "../../components/LoadingSpinner";
import {Image, Upload} from "antd";
import type {GetProp, UploadFile, UploadProps} from "antd";

interface AppData {
    title: string;
    description: string;
    appIcon: string;
    fileList: string[];
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function AddApp() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [appPreviewOpen, setAppPreviewOpen] = useState(false);
    const [appPreviewImage, setAppPreviewImage] = useState("");
    const [appIconFileList, setAppIconFileList] = useState<UploadFile[]>([]); // 独立的文件列表
    const [imageFileList, setImageFileList] = useState<UploadFile[]>([]); // 独立的文件列表
    const [loading, setLoading] = useState<boolean>(false); // 控制加载状态
    const [success, setSuccess] = useState<boolean>(false); // 控制是否成功
    const router = useRouter();
    const [appData, setAppData] = useState<AppData>({
        title: "",
        description: "",
        appIcon: "",
        fileList: [],
    });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleAppIconChange: UploadProps["onChange"] = ({fileList: newFileList}) => {
        setAppIconFileList(newFileList);
        newFileList.forEach((file) => {
            if (file.status === "done") {
                setAppData((prev) => ({
                    ...prev,
                    appIcon: file.response.url, // 设置应用图标的 URL
                }));
            }
        });
    };

    const handleImageChange: UploadProps["onChange"] = ({fileList: newFileList}) => {
        setAppData(p => ({
            ...p,
            fileList: []
        }))
        setImageFileList(newFileList);
        newFileList.forEach((file) => {
            if (file.status === "done") {
                setAppData((prev) => ({
                    ...prev,
                    fileList: [...prev.fileList, file.response.url], // 保存图片预览文件列表
                }));
            }
        });
    };

    const uploadButton = (
        <button style={{border: 0, background: "none"}} type="button">
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("提交的应用数据：", appData);
            const response = await addApp(appData);
            console.log("新增成功：", response);
            setSuccess(true);
        } catch (error) {
            console.error("新增失败：", error);
            alert("新增失败，请稍后再试！");
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessConfirm = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-xl w-96 max-w-md space-y-6"
            >
                <h2 className="text-3xl font-semibold text-center text-gray-800">新增应用</h2>

                {/* 表单字段 */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-lg">应用标题</label>
                        <input
                            type="text"
                            id="title"
                            value={appData.title}
                            onChange={(e) => setAppData({...appData, title: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            required
                        />
                    </div>

                    {/* 应用图标 */}
                    <div>
                        <label htmlFor="appIcon" className="block text-gray-700 text-lg">应用图标</label>
                        <Upload
                            action="/api/files/upload"
                            listType="picture-circle"
                            fileList={appIconFileList}
                            onPreview={handlePreview}
                            maxCount={1}
                            onChange={handleAppIconChange}
                        >
                            {appIconFileList.length < 1 && uploadButton}
                        </Upload>
                        {appPreviewImage && (
                            <Image
                                wrapperStyle={{display: "none"}}
                                preview={{
                                    visible: appPreviewOpen,
                                    onVisibleChange: (visible) => setAppPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setAppPreviewImage(""),
                                }}
                                src={appPreviewImage}
                            />
                        )}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-lg">应用简介</label>
                        <input
                            type="text"
                            id="description"
                            value={appData.description}
                            onChange={(e) => setAppData({...appData, description: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            required
                        />
                    </div>
                    {/* 图片预览 */}
                    <div>
                        <label htmlFor="features" className="block text-gray-700 text-lg">图片预览</label>
                        <Upload
                            action="/api/files/upload"
                            listType="picture-circle"
                            fileList={imageFileList}
                            onPreview={handlePreview}
                            onChange={handleImageChange}
                        >
                            {imageFileList.length < 8 && uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{display: "none"}}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(""),
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                </div>

                {/* 提交按钮 */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-full w-full max-w-xs transition transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? <LoadingSpinner/> : "提交"}
                    </button>
                </div>
            </form>

            {/* 成功提示框 */}
            {success && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full text-center">
                        <h2 className="text-3xl font-semibold text-green-600">应用新增成功！</h2>
                        <p className="mt-4 text-lg text-gray-600">您的应用已经成功新增。</p>
                        <button
                            onClick={handleSuccessConfirm}
                            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full transition transform hover:scale-105"
                        >
                            确定
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddApp;
