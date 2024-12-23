<script lang="ts" setup>
import type { NewsItem } from '~/types/news';
import { formatDate } from '../../../utils/date';

const route = useRoute();
const newsId = +route.params.id;

const newsItem = ref<NewsItem>({
    id: 13,
    image: '/images/test-image-3.webp',
    title: 'Новинки с фирменным соусом барбекю',
    subtitle: 'Roosters — ваш надежный спутник в любое время суток!',
    description:
        'Ночная жизнь оживает с пиццей Roosters! Наши двери никогда не закрываются для вас — круглосуточная доставка любимых пицц прямо к вам домой! Независимо от дня и времени, вы всегда можете насладиться ароматной, горячей пиццей. Наши операторы свяжутся с вами для подтверждения заказа и сообщат время доставки, которое может немного превышать 60 минут, чтобы вы точно знали, когда ждать свой вкусный заказ.',
    badge: '',
    link: '#',
    date: '01/08/2024',
});
</script>

<template>
    <div class="news-single">
        <div class="container">
            <h1 class="h1">{{ newsItem.title }}</h1>
            <div class="news-single__image">
                <img :src="newsItem.image" :alt="newsItem.title" />
            </div>
            <div class="news-single__description">
                <div v-if="newsItem.subtitle" class="news-single__subtitle">{{ newsItem.subtitle }}</div>
                <div class="news-single__description">{{ newsItem.description }}</div>
                <div class="news-single__date">
                    {{ formatDate(newsItem.date) }}
                </div>
            </div>
        </div>
        <div class="news-single_gradient"></div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.news-single {
    position: relative;
    margin-bottom: 80px;
}

.news-single__image {
    border-radius: var(--b-radius-lg);
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
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    color: var(--c-grey70);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: 1.5;

    &::before {
        content: '';
        position: relative;
        width: 33px;
        border-bottom: 1px solid var(--c-grey30);
    }
}

.news-single_gradient {
    position: absolute;
    top: 100px;
    left: 0;
    height: 120px;
    width: 100%;
    z-index: -1;
    background: var(--c-news-page-gradient);

    @include media.md-up {
        top: 170px;
    }

    @include media.lg-up {
        top: 290px;
    }
}
</style>
