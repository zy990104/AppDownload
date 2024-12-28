import React, {useState} from "react";
import {useRouter} from "next/router";
import {addApp} from "../../api/app"; // 假设你有 addApp 方法来处理提交请求
import LoadingSpinner from "../../components/LoadingSpinner"; // 引入 LoadingSpinner 组件
import {Image, Upload} from 'antd';
import type {GetProp, UploadFile, UploadProps} from 'antd';

interface AppData {
    title: string;
    description: string;
    version: string;
    features: string;
    fileList: string[];
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function AddApp() {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // 控制加载状态
    const [success, setSuccess] = useState<boolean>(false); // 控制是否成功
    const router = useRouter();
    const [appData, setAppData] = useState<AppData>({
        title: "",
        description: "",
        version: "",
        features: "",
        fileList: []
    });
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
        newFileList.forEach(file => {
            if (file.status === "done") {
                setAppData(i => ({
                    ...i,
                    fileList: [
                        ...i.fileList,
                        file.response.url
                    ]
                }));
            }
        })
    };
    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
    // 提交表单处理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // 开始加载

        try {
            // 提交表单数据
            console.log("提交的应用数据：", appData);
            const response = await addApp(appData); // 假设你有 addApp 方法来处理提交请求

            console.log("新增成功：", response);

            // 提交成功，显示提示框
            setSuccess(true);
        } catch (error) {
            console.error("新增失败：", error);
            alert("新增失败，请稍后再试！");
        } finally {
            setLoading(false); // 停止加载
        }
    };

    // 提交成功后，点击确定按钮跳转回首页
    const handleSuccessConfirm = () => {
        router.push("/"); // 跳转到首页
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

                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-lg">应用描述</label>
                        <textarea
                            id="description"
                            value={appData.description}
                            onChange={(e) => setAppData({...appData, description: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="version" className="block text-gray-700 text-lg">版本</label>
                        <input
                            type="text"
                            id="version"
                            value={appData.version}
                            onChange={(e) => setAppData({...appData, version: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="features" className="block text-gray-700 text-lg">功能列表</label>
                        <textarea
                            id="features"
                            value={appData.features}
                            onChange={(e) => setAppData({...appData, features: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="features" className="block text-gray-700 text-lg">上传图片</label>
                        <Upload
                            action="/api/files/upload"
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{display: 'none'}}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
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
