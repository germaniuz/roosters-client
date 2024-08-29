<script setup lang="ts">
type Props = {
    isColored?: boolean
    hasText?: boolean
}

const props= withDefaults(defineProps<Props>(), {
    isColored: true,
    hasText: false
});

const logoImagePath = ref<string>('/images/logo.svg');

if (!props.isColored) {
    logoImagePath.value = '/images/logo-colorless.svg'
}
</script>

<template>
    <NuxtLink to="/" class="logo" :class="{'logo--has-text' : hasText}">
        <img class="logo__image" :src="logoImagePath" alt="Рустерс" />
        <span v-if="hasText" class="logo__text">Основано в 1999</span>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.logo {

    &--has-text {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
}

.logo__image {
    width: 100%;
    height: auto;
    object-fit: contain;
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
