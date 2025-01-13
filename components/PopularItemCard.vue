<script setup lang="ts">
import type { PopularItem } from '~/types/PopularItem';

type Props = {
    item: PopularItem;
};

defineProps<Props>();
</script>

<template>
    <div class="popular-item-card">
        <div class="popular-item-card__img">
            <img :src="item.img" :alt="item.title" />
        </div>
        <div class="popular-item-card__title">{{ item.title }}</div>
        <BaseButton :modifiers="['item-white']" class="popular-item-card__price">от {{ item.price }} ₽</BaseButton>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.popular-item-card {
    padding: 15px;
    background-color: var(--c-grey10);
    border-radius: var(--b-radius-lg);
    min-width: 240px;
    display: grid;
    grid-template-columns: 62px 1fr;
    gap: 17px 20px;
    grid-template-areas:
        'img title'
        'img price';

    @include media.lg-up {
        padding: 20px;
        min-height: 120px;
        min-width: 260px;
    }
}

.popular-item-card__img {
    grid-area: img;

    img {
        width: 100%;
        height: auto;
    }
}

.popular-item-card__title {
    grid-area: title;
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: functions.rem(17);
}

.popular-item-card__price {
    padding: 5px 20px;
    width: max-content;
    font-weight: 600;
    margin-top: auto;
    grid-area: price;
}
</style>
