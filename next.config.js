/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        appDir: true,
    },
    webpack: config => {
        config.externals = [...config.externals, "encoding"];

        return config;
    },
};

module.exports = nextConfig;
