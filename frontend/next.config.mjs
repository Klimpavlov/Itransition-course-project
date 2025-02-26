// /** @type {import('next').NextConfig} */
// const nextConfig = {};
//
// export default nextConfig;


/** @type {import('next').NextConfig} */

import withNextIntl from "next-intl/plugin";

const nextConfig = {};

export default withNextIntl("./src/next-i18next.config.js")(nextConfig);
