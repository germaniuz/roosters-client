<script lang="ts" setup>
import { useProductStore } from '~/stores/product';
import { useDeliveryStore } from '~/stores/deliveryStore';
import { useFortuneWheelStore } from '~/stores/fortuneWheelStore';
import type { FortuneWheelSlot } from '~/types/FortuneWheel';

const route = useRoute();
const productStore = useProductStore();
const { closeProductDialog } = productStore;
const { isProductDialogShown, modalProduct } = storeToRefs(productStore);
const { isDeliveryChooserOpen } = storeToRefs(useDeliveryStore());
const { cartCount } = storeToRefs(useCartStore());
const fortuneWheelStore = useFortuneWheelStore();
const { isFortuneWheelDialogShown, currentOrderId } = storeToRefs(fortuneWheelStore);
const { closeFortuneWheelDialog, setWinningSlot } = fortuneWheelStore;

const handleFortuneWheelSpinComplete = (slot: FortuneWheelSlot) => {
    setWinningSlot(slot);
    // Show toast notification with result
    // TODO: Integrate with toast notification system
    console.log('Fortune wheel result:', slot);
};
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
            <FortuneWheelButton />
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
            <FortuneWheel
                v-model:is-active="isFortuneWheelDialogShown"
                :order-id="currentOrderId"
                @spin-complete="handleFortuneWheelSpinComplete"
                @update:is-active="closeFortuneWheelDialog"
            />
        </ClientOnly>
    </div>
</template>
