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
};

export default nextConfig;
