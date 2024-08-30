<script setup lang="ts">
import type { NewsItem } from '~/types/news';

type Props = {
    newsItem: NewsItem;
};

defineProps<Props>();
</script>

<template>
    <div class="news-card">
        <div class="news-card__image">
            <img :src="newsItem.image" :alt="newsItem.title" />
        </div>
        <div class="news-card__title">{{ newsItem.title }}</div>
        <div class="news-card__description">{{ newsItem.description }}</div>
        <BaseButtonLink :modifiers="['item']" class="news-card__button" linkTo="#"> Подробнее </BaseButtonLink>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/mixins';
@use '@/assets/styles/components/buttons';

.news-card {
    padding: 15px;
    border-radius: var(--b-radius);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    transition: all 0.2s ease-in-out;

    @include media.lg-up {
        gap: 20px;
    }

    &:hover {
        background-color: var(--c-grey05);
    }
}

.news-card__image {
    border-radius: var(--b-radius-sm);
    overflow: hidden;
    max-height: 200px;
    width: 100%;
    display: flex;
    align-items: center;

    @include media.md-up {
        aspect-ratio: 2;
        max-height: unset;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.news-card__title {
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 600;
    line-height: normal;

    @include media.lg-up {
        font-size: functions.rem(18);
    }
}

.news-card__description {
    color: var(--c-grey60);
    font-family: var(--f-base);
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: 1.35;

    @include mixins.ellipsis(3, 1.35);

    @include media.lg-up {
        @include mixins.ellipsis(4, 1.35);
        margin-top: -5px;
    }
}

.news-card__button {
    font-weight: 600;
    margin-inline: auto;
    width: 100%;
    max-width: 150px;

    @include media.xl-up {
        max-width: 170px;
    }

    .news-card:hover & {
        @extend .btn--primary;

        @include media.lg-up {
            max-width: 50%;
        }
    }
}
</style>
