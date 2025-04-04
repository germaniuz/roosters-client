import { fetch, type ClientPluginContext, createClient } from 'villus';
import { multipart } from '@villus/multipart';

export default defineNuxtPlugin(async (nuxtApp) => {
    const { app } = useRuntimeConfig();
    const authToken = useCookie('villus:default.token');
    console.log(authToken.value);

    function authPlugin({ opContext }: ClientPluginContext) {
        if (authToken.value) {
            opContext.headers.Authorization = `Bearer ${authToken.value}`;
        }
    }
    const client = createClient({
        url: app.BASE_URL,
        use: [authPlugin, multipart(), fetch()],
    });

    nuxtApp.vueApp.use(client);
});
