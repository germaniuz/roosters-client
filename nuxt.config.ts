// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/google-fonts', '@pinia/nuxt', '@nuxt/eslint', 'vue-yandex-maps/nuxt'],
    typescript: {
        typeCheck: true,
        strict: true,
    },
    css: ['@/assets/styles/app.scss'],
    runtimeConfig: {
        app: {
            BASE_URL: process.env.BASE_URL!,
            DADATA_API_TOKEN: process.env.DADATA_API_TOKEN!,
        },
    },
    pinia: {
        storesDirs: ['./stores/**'],
    },
    yandexMaps: {
        apikey: process.env.YANDEX_MAPS_API_KEY!,
        strictMode: true,
    },
    // apollo: {
    //     authType: 'Bearer',
    //     authHeader: 'Authorization',
    //     tokenStorage: 'cookie',
    //     clients: {
    //         default: {
    //             httpEndpoint: process.env.BASE_URL!,
    //         },
    //     },
    // },
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
