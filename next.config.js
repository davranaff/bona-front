/** @type {import('next').NextConfig} */

const express = require('express')
const app = express()
const port = 3000

app.use(cors({
  origin: 'https://bonafresco79.pythonanywhere.com'
}))

const nextConfig = {
  async headers() {
    return [
      {
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
      ]
      }
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
