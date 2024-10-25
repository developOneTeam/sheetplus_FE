/** @type {import('next').NextConfig} */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import withSerwistInit from "@serwist/next";

const withVanillaExtract = createVanillaExtractPlugin();

const withSerwist = withSerwistInit({
    swSrc: "src/sw.ts",
    swDest: "public/sw.js"
});

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

export default withSerwist(
    withVanillaExtract({
        reactStrictMode: false,
}));