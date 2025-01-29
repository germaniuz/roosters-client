<script lang="ts" setup>
const items = ref([
    {
        title: 'СЕТ "ХИТ" 5 ПИЦЦ',
        img: '/images/test-pizza.webp',
        details: [
            {
                title: 'Маргарита',
                text: ['Средняя 28 см, традиционное тесто'],
            },
            {
                title: 'Жюльен',
                text: ['Средняя 28 см, традиционное тесто'],
            },
            {
                title: 'Фирменная Рустерс',
                text: ['Фирменная Рустерс'],
            },
            {
                title: 'Добавки',
                text: ['Наггетсы куриные', 'Картофель по-деревенски', 'Напиток Черноголовка, стекло 1 л'],
            },
        ],
        quantity: '1',
        price: '1200',
        price_old: '1500',
    },
    {
        title: 'ФИРМЕННАЯ РУСТЕРС',
        img: '/images/test-pizza.webp',
        details: [
            {
                title: 'Добавки',
                text: ['Наггетсы куриные', 'Картофель по-деревенски', 'Напиток Черноголовка, стекло 1 л'],
            },
        ],
        quantity: '1',
        price: '1200',
        price_old: '1500',
    },
]);
</script>
<template>
    <div class="container cart">
        <h1 class="h1">Корзина</h1>
        <div class="cart__grid">
            <div class="cart__items">
                <CartItem v-for="item in items" :item="item" />
            </div>
        </div>
    </div>
</template>
