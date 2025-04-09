<script lang="ts" setup>
import { useProductStore } from '~/stores/product';
import { useDeliveryStore } from '~/stores/deliveryStore';

const productStore = useProductStore();
const { closeProductDialog } = productStore;
const { isProductDialogShown, modalProduct } = storeToRefs(productStore);
const { isDeliveryChooserOpen } = storeToRefs(useDeliveryStore());
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
        <transition name="fade-n-pop">
            <BaseDialog
                v-if="modalProduct && isProductDialogShown"
                v-model:is-active="isProductDialogShown"
                @close="closeProductDialog"
            >
                <TheProduct :product="modalProduct" />
            </BaseDialog>
        </transition>
        <transition name="fade-n-pop">
            <BaseDialog v-show="isDeliveryChooserOpen" v-model:is-active="isDeliveryChooserOpen">
                <DeliveryTypeChooser />
            </BaseDialog>
        </transition>
    </div>
</template>
