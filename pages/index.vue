<script lang="ts" setup>
import BaseButton from '~/components/BaseButton.vue';
import type { Product } from '~/types/Product';

const radio = ref(false)
const product = ref<Product>({
    name: 'Пышная Дружная семейка',
    ingredients: ['Ветчина', 'салями', 'шампиньоны', 'помидоры', 'перец сладкий', 'зелень', 'соус', 'сыр "Моцарелла"'],
    price: 1200,
    tag: 'Хит',
    image: '/images/test-pizza.webp'
})

const product1 = ref<Product>({
    name: 'Пышная Дружная семейка Пышная Дружная семейка',
    ingredients: ['Ветчина', 'салями', 'шампиньоны', 'помидоры', 'перец сладкий', 'зелень', 'салями', 'шампиньоны', 'помидоры', 'перец сладкий', 'зелень', 'соус', 'сыр "Моцарелла"'],
    price: 1200,
    tag: 'Хит',
    image: '/images/test-pizza.webp'
})
</script>
<template>
    <div class="container">
        <h1 class="h1">Главная</h1>
        <BaseButton :modifiers="['primary']">Btn</BaseButton>
        <FormRadioButton label="Radio btn" name="radio" v-model="radio"/>
        <div class="" style="display: grid; grid-template-columns: repeat(3, 1fr)">
            <ProductCard :product="product"/>
            <ProductCard :product="product1"/>
            <ProductCard :product="product"/>
        </div>
    </div>

</template>
