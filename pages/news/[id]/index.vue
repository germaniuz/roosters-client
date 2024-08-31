<script lang="ts" setup>
import type { NewsItem } from '~/types/news';

const route = useRoute();
const newsId = +route.params.id;

const newsItem = ref<NewsItem>({
    image: '/images/test-image-3.webp',
    title: 'Новинки с фирменным соусом барбекю',
    subtitle: 'Roosters — ваш надежный спутник в любое время суток!',
    description:
        'Круглосуточная доставка пиццы Рустерс! Заказывай в любой день в любое время! Время доставки на указанный адрес может превышать 60 минут и озвучивается оператором при подтверждении заказа.',
    badge: '',
    link: '#',
    date: '01/08/2024',
});
</script>

<template>
    <div class="container news-single">
        <h1 class="h1">{{ newsItem.title }}</h1>
        <div class="news-single__image">
            <img :src="newsItem.image" :alt="newsItem.title" />
        </div>
        <div class="news-single__description">
            <div v-if="newsItem.subtitle" class="news-single__subtitle">{{ newsItem.subtitle }}</div>
            <div class="news-single__description">{{ newsItem.description }}</div>
            <div class="news-single__date">{{ newsItem.date }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.news-single {
    margin-bottom: 80px;
}

.news-single__image {
    border-radius: var(--b-radius-sm);
    overflow: hidden;
    max-height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    @include media.md-up {
        aspect-ratio: 2;
        max-height: unset;
        max-width: 560px;
        margin-bottom: 30px;
    }

    @include media.lg-up {
        max-width: 760px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.news-single__description {
    @include media.lg-up {
        max-width: 760px;
    }
}

.news-single__subtitle {
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(24);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;

    @include media.md-up {
        margin-bottom: 30px;
    }
}

.news-single__description {
    color: var(--c-grey70);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 30px;
}

.news-single__date {
    color: var(--c-grey70);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: 1.5;
}
</style>
