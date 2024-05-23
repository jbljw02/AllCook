/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'www.foodsafetykorea.go.kr',
                port: '', // 포트가 필요 없는 경우 비워둡니다.
            },
            {
                protocol: 'https',
                hostname: 'www.foodsafetykorea.go.kr',
                port: '', // 포트가 필요 없는 경우 비워둡니다.
            },
        ],
    },
}

module.exports = nextConfig