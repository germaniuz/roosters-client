import { fetch, type ClientPluginContext, createClient } from 'villus';
import { multipart } from '@villus/multipart';

export default defineNuxtPlugin((nuxtApp) => {
    const { app } = useRuntimeConfig();
    const token = useCookie('villus:default.token');

    function authPlugin({ opContext }: ClientPluginContext) {
        if (token.value) {
            opContext.headers.Authorization = `Bearer ${token.value}`;
        }
    }
    const client = createClient({
        url: app.BASE_URL,
        use: [authPlugin, multipart(), fetch()],
    });
    nuxtApp.vueApp.use(client);
});
