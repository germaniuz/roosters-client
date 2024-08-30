<script setup lang="ts">
import type { NewsItem } from '~/types/news';

type Props = {
    newsItem: NewsItem;
};

defineProps<Props>();
</script>

<template>
    <div class="news-card">
        <div class="news-card__image"></div>
        <div class="news-card__title">{{ newsItem.title }}</div>
        <div class="news-card__description">{{ newsItem.description }}</div>
        <BaseButton modifiers="" />
    </div>
</template>

<style scoped lang="scss"></style>
