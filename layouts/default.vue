<script lang="ts" setup>
import { useProductStore } from '~/stores/product';
import { useDeliveryStore } from '~/stores/deliveryStore';

const route = useRoute();
const productStore = useProductStore();
const { closeProductDialog } = productStore;
const { isProductDialogShown, modalProduct } = storeToRefs(productStore);
const { isDeliveryChooserOpen } = storeToRefs(useDeliveryStore());
const { cartCount } = storeToRefs(useCartStore());
</script>

<template>
    <div class="default-layout">
        <AppTopNav />
        <AppHeader />
        <div class="app">
            <AppToastNotification />
            <main class="main">
                <slot />
            </main>
        </div>
        <AppFooter />
        <ClientOnly>
            <CartButton v-if="cartCount && route.fullPath !== '/cart'" />
        </ClientOnly>
        <transition name="fade-n-pop">
            <BaseDialog
                v-if="modalProduct && isProductDialogShown"
                v-model:is-active="isProductDialogShown"
                :sm="true"
                @close="closeProductDialog"
            >
                <TheProduct :product="modalProduct" />
            </BaseDialog>
        </transition>
        <ClientOnly>
            <transition name="fade-n-pop">
                <BaseDialog
                    v-show="isDeliveryChooserOpen"
                    v-model:is-active="isDeliveryChooserOpen"
                    :modifiers="['p-sm']"
                >
                    <DeliveryTypeChooser />
                </BaseDialog>
            </transition>
        </ClientOnly>
    </div>
</template>
