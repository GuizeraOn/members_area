const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login/index.html'),
                dashboard: resolve(__dirname, 'dashboard/index.html'),
                module: resolve(__dirname, 'module/index.html'),
                profile: resolve(__dirname, 'profile/index.html'),
                tools: resolve(__dirname, 'tools/index.html'),
                simulator: resolve(__dirname, 'simulator/index.html'),
            },
        },
    },
})
