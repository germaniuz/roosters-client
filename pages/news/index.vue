<script lang="ts" setup>
const news = [
    {
        id: 1,
        image: '/images/test-image.webp',
        title: 'Какая пицца с доставкой в Волгограде называется ЛУЧШЕЙ?',
        description:
            'Круглосуточная доставка пиццы Рустерс! Заказывай в любой день в любое время! Время доставки на указанный адрес может превышать 60 минут и озвучивается оператором при подтверждении заказа.',
        badge: '',
        link: '#',
        date: '01/08/2024',
    },
    {
        id: 2,
        image: '/images/test-image-2.webp',
        title: 'Утоли ночной голод с пиццей Рустерс!',
        description:
            'Круглосуточная доставка пиццы Рустерс! Заказывай в любой день в любое время! Время доставки на указанный адрес может превышать 60 минут и озвучивается оператором при подтверждении заказа.',
        badge: '',
        link: '#',
        date: '01/08/2024',
    },
    {
        id: 3,
        image: '/images/test-image-3',
        title: 'Новинки с фирменным соусом барбекю',
        description:
            'Круглосуточная доставка пиццы Рустерс! Заказывай в любой день в любое время! Время доставки на указанный адрес может превышать 60 минут и озвучивается оператором при подтверждении заказа.',
        badge: '',
        link: '#',
        date: '01/08/2024',
    },
    {
        id: 4,
        image: '/images/test-image-4.webp',
        title: 'Празднуйте день рождения вместе с Рустерс!',
        description:
            'Круглосуточная доставка пиццы Рустерс! Заказывай в любой день в любое время! Время доставки на указанный адрес может превышать 60 минут и озвучивается оператором при подтверждении заказа.',
        badge: '',
        link: '#',
        date: '01/08/2024',
    },
    {
        id: 5,
        image: '/images/test-image-2.webp',
        title: 'Любители сыра, это для вас!',
        description:
            'Круглосуточная доставка пиццы Рустерс! Заказывай в любой день в любое время! Время доставки на указанный адрес может превышать 60 минут и озвучивается оператором при подтверждении заказа.',
        badge: '',
        link: '#',
        date: '01/08/2024',
    },
];
</script>
<template>
    <div class="news container">
        <h1 class="h1">Новости</h1>
        <div class="news__grid">
            <NewsCard v-for="newsItem in news" :key="newsItem.id" :news-item="newsItem" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.news {
    margin-bottom: 100px;
}

.news__grid {
    gap: 20px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    @include media.xl-up {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
