// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/google-fonts', '@pinia/nuxt', '@nuxtjs/apollo', '@nuxt/eslint'],
    typescript: {
        typeCheck: true,
        strict: true,
    },
    css: ['@/assets/styles/app.scss'],
    runtimeConfig: {
        app: {
            BASE_URL: process.env.BASE_URL!,
        },
    },
    pinia: {
        storesDirs: ['./stores/**'],
    },
    apollo: {
        authType: 'Bearer',
        authHeader: 'Authorization',
        tokenStorage: 'cookie',
        clients: {
            default: {
                httpEndpoint: process.env.BASE_URL!,
            },
        },
    },
    devtools: { enabled: true },
    googleFonts: {
        families: {
            Rubik: [300, 400, 500, 600, 700, 800, 900],
        },
        prefetch: true,
        preload: true,
        display: 'swap',
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
    },
    compatibilityDate: '2024-08-29',
});
