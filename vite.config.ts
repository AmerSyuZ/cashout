import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from "vite-plugin-node-polyfills"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ["crypto"],
      globals: {
        Buffer: true,
        process: true,
      },
    })
  ],
  resolve: {
    alias: {
      stream: "stream-browserify",
      fs: "browserify-fs"
    },
    extensions: [".js", ".ts", ".tsx"]
  },
  server: {
    port: 3000,
  },
  base: "/cashout",
  envDir:`./environment`
})
