/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
    reactStrictMode: false,

    // async redirects() {
    //     return [
    //         {

    //         }
    //     ]
    // },   

    images: {
        domains: ['www.foodsafetykorea.go.kr'],
    },

    // async rewrites() {
    //     return [
    //         {
    //             source: `/api/recomMenu`,
    //             destination: `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000`
    //         },
    //     ]
    // },

}

module.exports = nextConfig