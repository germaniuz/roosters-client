<script setup lang="ts">
import type { PopularItem } from '~/types/PopularItem';

const popularItems: Array<PopularItem> = [
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
];
</script>

<template>
    <div class="popular-items section">
        <h2 class="h2 h2--icon"><BaseIcon name="sets" /> Часто заказывают</h2>
        <div class="popular-items__grid">
            <PopularItemCard v-for="popularItem in popularItems" :item="popularItem" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.popular-items {
}

.popular-items__grid {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    gap: 20px;
}
</style>
