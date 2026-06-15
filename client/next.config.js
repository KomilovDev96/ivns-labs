const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

const config = withNextIntl(nextConfig);
config.env = { ...config.env, _next_intl_trailing_slash: '' };
module.exports = config;
