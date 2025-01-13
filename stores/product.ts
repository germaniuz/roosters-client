import type { Product } from '~/types/Product';

export const useProductStore = defineStore('product', () => {
    const isProductDialogShown = ref(false);
    const modalProduct = ref<Product>();

    const openProductDialog = (product: Product) => {
        modalProduct.value = product;
        isProductDialogShown.value = true;
    };

    const closeProductDialog = () => {
        modalProduct.value = undefined;
        isProductDialogShown.value = false;
    };

    return {
        isProductDialogShown,
        modalProduct,
        openProductDialog,
        closeProductDialog,
    };
});
