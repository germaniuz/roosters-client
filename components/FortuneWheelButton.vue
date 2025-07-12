<script setup lang="ts">
import { useFortuneWheelStore } from '~/stores/fortuneWheelStore';

const { openFortuneWheelDialog } = useFortuneWheelStore();
const { isAuthenticated } = storeToRefs(useProfileStore());

// Mock order ID for now - in real app this would come from the last completed order
const mockOrderId = 1; // TODO: Replace with actual order ID logic

const handleClick = () => {
    if (isAuthenticated.value) {
        openFortuneWheelDialog(mockOrderId);
    } else {
        // Could show auth dialog or message
        console.log('User needs to be authenticated to use fortune wheel');
    }
};
</script>

<template>
    <div class="fortune-wheel-button">
        <BaseButton class="fortune-wheel-button__btn" :modifiers="['primary', 'single-icon']" @click="handleClick">
            <i class="icon-star"></i>
        </BaseButton>
        <span class="fortune-wheel-button__label">Колесо фортуны</span>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.fortune-wheel-button {
    position: fixed;
    top: functions.rem(20);
    left: functions.rem(20);
    z-index: var(--z-top-20);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: functions.rem(8);

    @include media.lg-up {
        top: functions.rem(30);
        left: functions.rem(30);
    }
}

.fortune-wheel-button__btn {
    width: functions.rem(60);
    height: functions.rem(60);
    border-radius: 50%;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    i {
        font-size: functions.rem(24);
        color: var(--c-grey00);
    }
}

.fortune-wheel-button__label {
    font-size: functions.rem(12);
    font-weight: 500;
    color: var(--c-grey-80);
    text-align: center;
    max-width: functions.rem(80);
    line-height: 1.2;

    @include media.md-up {
        font-size: functions.rem(14);
    }
}
</style>
