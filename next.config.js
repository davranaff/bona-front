/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://www.bonafresco.com" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          { key: "Host", value: "bonafresco79.pythonanywhere.com"},
          { key: "Origin", value: "https://www.bonafresco.com"},
          { key: "Sec-Fetch-Dest", value: "empty"},
          { key: "Sec-Fetch-Mode", value: "cors"},
          { key: "Sec-Fetch-Site", value: "cross-site"},
        ],
      }
    ]
  },
}

module.exports = nextConfig
