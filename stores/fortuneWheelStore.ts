import type { FortuneWheelSlot } from '~/types/FortuneWheel';

export const useFortuneWheelStore = defineStore('fortuneWheel', () => {
    const isFortuneWheelDialogShown = ref(false);
    const currentOrderId = ref<number | null>(null);
    const lastWinningSlot = ref<FortuneWheelSlot | null>(null);

    const openFortuneWheelDialog = (orderId?: number) => {
        if (orderId) {
            currentOrderId.value = orderId;
        }
        isFortuneWheelDialogShown.value = true;
    };

    const closeFortuneWheelDialog = () => {
        isFortuneWheelDialogShown.value = false;
        // Don't reset orderId immediately, keep it for the session
    };

    const setWinningSlot = (slot: FortuneWheelSlot) => {
        lastWinningSlot.value = slot;
    };

    const clearOrderId = () => {
        currentOrderId.value = null;
    };

    return {
        isFortuneWheelDialogShown,
        currentOrderId,
        lastWinningSlot,
        openFortuneWheelDialog,
        closeFortuneWheelDialog,
        setWinningSlot,
        clearOrderId,
    };
});
