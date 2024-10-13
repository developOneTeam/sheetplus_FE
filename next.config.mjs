/** @type {import('next').NextConfig} */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

export default withVanillaExtract({
    
});