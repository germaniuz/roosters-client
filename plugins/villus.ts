import { fetch, type ClientPluginContext, createClient } from 'villus';
import { multipart } from '@villus/multipart';

export default defineNuxtPlugin(async (nuxtApp) => {
    const { app } = useRuntimeConfig();
    const cookieToken = useCookie('villus:default.token');

    function authPlugin({ opContext }: ClientPluginContext) {
        if (cookieToken.value) {
            opContext.headers.Authorization = `Bearer ${cookieToken.value}`;
        } else {
            delete opContext.headers.Authorization;
        }
    }

    const client = createClient({
        url: app.BASE_URL,
        use: [authPlugin, multipart(), fetch()],
    });

    nuxtApp.vueApp.use(client);
});
