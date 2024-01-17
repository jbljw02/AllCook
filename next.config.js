/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
    reactStrictMode: true,

    // async redirects() {
    //     return [
    //         {

    //         }
    //     ]
    // },   
    
    async rewrites() {
        return [
            {
                source: "/home/api/recipe",
                destination: `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/20`
            },
        ]
    },
    
    images: {
        domains: ['www.foodsafetykorea.go.kr']
    }
}

module.exports = nextConfig
