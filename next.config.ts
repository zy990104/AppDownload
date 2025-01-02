import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8080/:path*', // 目标接口地址
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http', // 协议
                hostname: '61.185.125.170', // 域名
                pathname: '/klf-sp/**', // 路径模式，可以是通配符
            },
        ],
    },
};

export default nextConfig;
