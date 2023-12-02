module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
  },
  images: {
    domains: ["vpn-conf.stark-industries.solutions"],
  },
};
