<script setup lang="ts"></script>

<template>
    <nav class="top-nav">
        <div class="container top-nav__container">
            <NuxtLink class="top-nav__link" to="/delivery">Доставка</NuxtLink>
            <NuxtLink class="top-nav__link" to="/about">О нас</NuxtLink>
            <NuxtLink class="top-nav__link" to="/job-offers">Вакансии</NuxtLink>
            <NuxtLink class="top-nav__link" to="/news">Новости</NuxtLink>
            <NuxtLink class="top-nav__link" to="/reviews">Отзывы</NuxtLink>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.top-nav {
    @include media.md-down {
        display: none;
    }
}

.top-nav__container {
    display: flex;
    gap: 30px;
    padding-block: 10px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        translate: 0 70%;
        opacity: 0.5;
        z-index: -1;
        display: block;
        width: 590px;
        height: 100px;
        background: var(--c-top-nav-gradient);
    }
}

.top-nav__link {
    color: var(--c-grey50);
    font-size: functions.rem(14);
    line-height: 1;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: var(--c-secondary);
    }
}
</style>
