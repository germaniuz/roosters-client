<script setup lang="ts"></script>

<template>
    <NuxtLink to="/" class="logo">
        <img class="logo__image" src="/images/logo.svg" alt="Рустерс" />
        <span class="logo__text">Основано в 1999</span>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.logo {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.logo__image {
    flex: 1 0 100%;
    width: 100%;
    height: auto;
}

.logo__text {
    color: var(--c-primary);
    font-size: functions.rem(12);
    font-style: italic;
    font-weight: 700;

    @include media.md-down {
        display: none;
    }
}
</style>
