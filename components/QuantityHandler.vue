<script lang="ts" setup>
type Props = {
    quantity: number;
    increaseHandler: () => void | Promise<void>;
    decreaseHandler: () => void | Promise<void>;
    size?: 'sm' | 'md' | 'lg';
};
withDefaults(defineProps<Props>(), {
    size: 'md',
});
</script>

<template>
    <div class="quantity-handler" :class="`quantity-handler--${size}`">
        <button class="quantity-handler__quantity-btn" @click="decreaseHandler">-</button>
        <span class="quantity-handler__number">{{ quantity }}</span>
        <button class="quantity-handler__quantity-btn" @click="increaseHandler">+</button>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.quantity-handler {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    color: var(--c-grey80);
    font-size: functions.rem(14);
    line-height: functions.rem(17);

    @include media.lg-up {
        font-size: functions.rem(16);
        line-height: functions.rem(19);
    }
}

.quantity-handler__quantity-btn {
    background: none;
    width: 32px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--c-grey30);
    border-radius: var(--b-radius-round);
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        border-color: var(--c-secondary);
        color: var(--c-secondary);
    }
}
</style>
