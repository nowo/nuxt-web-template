import { pwa } from './config/pwa'
import { appDescription } from './config/constant'

export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/color-mode',
        '@vite-pwa/nuxt',
        'nuxt-module-eslint-config',
        '@element-plus/nuxt',
    ],

    experimental: {
        // when using generate, payload js assets included in sw precache manifest
        // but missing on offline, disabling extraction it until fixed
        payloadExtraction: false,
        renderJsonPayloads: true,
        typedPages: true,
    },

    css: [
        '@unocss/reset/tailwind.css',
    ],

    colorMode: {
        classSuffix: '',
    },

    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
        // prerender: {
        //     crawlLinks: false,
        //     routes: ['/'],
        //     ignore: ['/hi'],
        // },
    },

    app: {
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: appDescription },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
                { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
            ],
        },
    },
    imports: {
        dirs: ['config'],
    },

    pwa,
    runtimeConfig: {
        // 仅在服务端serve可以访问
        appKey: 'abcd',
        upload: {
            //         # 文件上传主机地址
            host: process.env.NUXT_UPLOAD_HOST,
            // # 文件上传保存路径
            dir: process.env.NUXT_UPLOAD_DIR,
        },
        // public里的在服务端serve,客户端client皆可访问
        public: {
            baseUrl: process.env.VITE_BASE_URL || '/',
            apiBase: process.env.VITE_API_BASE || '',
            otherUrl: process.env.OTHER_URL || 'default_other_url',
            secret: process.env.NUXT_AUTH_SECRET, // You can generate one with `openssl rand -base64 32`
        },
    },

    devtools: {
        enabled: true,
    },

    features: {
        // For UnoCSS
        inlineStyles: false,
    },

    eslintConfig: {
        setup: false,
    },
})
