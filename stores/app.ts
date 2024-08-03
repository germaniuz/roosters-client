export const useAppStore = defineStore('app', () => {
    const phone = ref('8 (8442) 46-65-52'); // TODO: get it from API

    return {
        phone,
    };
});
