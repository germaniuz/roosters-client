<script setup lang="ts">

import type { PopularItem } from '~/types/PopularItem';

const popularItems: Array<PopularItem> = [{
    title: 'Пышная Дружная семейка',
    price: 1200,
    img: '/images/test-pizza.webp',
},{
    title: 'Пышная',
    price: 1200,
    img: '/images/test-pizza.webp',
},{
    title: 'Пышная Дружная семейка',
    price: 1200,
    img: '/images/test-pizza.webp',
},{
    title: 'Пышная Дружная семейка',
    price: 1200,
    img: '/images/test-pizza.webp',
},{
    title: 'Пышная Дружная семейка',
    price: 1200,
    img: '/images/test-pizza.webp',
}]
</script>

<template>
    <div class="popular-items">
        <PopularItemCard v-for="popularItem in popularItems" :item="popularItem"/>
    </div>
</template>

<style scoped lang="scss">

.popular-items {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    gap: 20px;
}
</style>