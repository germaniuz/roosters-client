<script setup lang="ts">
import type { PopularItem } from '~/types/PopularItem';

const popularItems: Array<PopularItem> = [
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
    {
        title: 'Пышная Дружная семейка',
        price: 1200,
        img: '/images/test-pizza.webp',
    },
];

type Props = {
    title: string;
    icon: string;
};

withDefaults(defineProps<Props>(), {
    title: 'Часто заказывают',
    icon: 'sets',
});

const popularItemsRef = ref();
const popularItemsBlockRef = ref();

const itemsScrolled = ref<boolean>(false);
const itemsScrolledToEnd = ref<boolean>(false);

const updateButtonsVisibility = () => {
    console.log(23);
    if (popularItemsRef.value.scrollLeft !== 0) {
        itemsScrolled.value = true;
        itemsScrolledToEnd.value =
            popularItemsRef.value.scrollWidth <= popularItemsRef.value.scrollLeft + popularItemsRef.value.clientWidth;
    } else {
        itemsScrolled.value = false;
    }
};

const scrollRight = () => {
    popularItemsRef.value.scrollLeft += 300;
};

const scrollLeft = () => {
    popularItemsRef.value.scrollLeft -= 300;
};
</script>

<template>
    <div class="popular-items section">
        <h2 class="h2 h2--icon">
            <BaseIcon :name="icon" />
            {{ title }}
        </h2>
        <div
            ref="popularItemsBlockRef"
            class="popular-items__grid-wrapper"
            :class="[
                itemsScrolled && 'popular-items__grid-wrapper--scrolled',
                itemsScrolledToEnd && 'popular-items__grid-wrapper--scrolled-to-end',
            ]"
        >
            <div ref="popularItemsRef" class="popular-items__grid" @scroll="updateButtonsVisibility">
                <PopularItemCard v-for="popularItem in popularItems" :key="popularItem.title" :item="popularItem" />
            </div>
            <BaseIconButton
                icon="angle-left"
                class="popular-items__scroll-btn popular-items__scroll-left-btn"
                :modifiers="['icon', 'single-icon']"
                @click="scrollLeft"
            />
            <BaseIconButton
                icon="angle-right"
                class="popular-items__scroll-btn popular-items__scroll-right-btn"
                :modifiers="['icon', 'single-icon']"
                @click="scrollRight"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.popular-items {
}

.popular-items__grid-wrapper {
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: all 0.1s ease-in;
    }

    &::before {
        @include media.lg-up {
            background: var(--c-gradient-white-left);
            left: calc(var(--pi-container-md) * -1);
            opacity: 0;
        }
    }

    &::after {
        @include media.lg-up {
            background: var(--c-gradient-white-right);
            opacity: 1;
        }
    }

    &--scrolled {
        &::before {
            opacity: 1;
        }
    }

    &--scrolled-to-end {
        &::after {
            @include media.lg-up {
                opacity: 0;
            }
        }
    }
}

.popular-items__grid {
    display: flex;
    flex-direction: row;
    overflow: auto;
    margin-inline: calc(var(--pi-container-xs) * -1);
    padding-inline: var(--pi-container-xs);
    gap: 20px;
    padding-bottom: 10px;
    transition: all 0.2s ease-in;
    scroll-behavior: smooth;

    @include media.md-up {
        margin-inline: calc(var(--pi-container-md) * -1);
        padding-inline: var(--pi-container-md);
    }

    @include media.lg-up {
        overflow: hidden;
        padding-bottom: 0;
        margin-inline: 0;
        padding-left: 0;
    }
}

.popular-items__scroll-btn {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    height: 38px;
    aspect-ratio: 1;
    background-color: var(--c-grey00);
    border-radius: var(--b-radius-round);
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.1s ease-in;
    opacity: 1;
    z-index: var(--z-middle);

    @include media.md-down {
        display: none;
    }

    &:hover {
        background-color: var(--c-primary);
        color: var(--c-grey00);
    }
}

.popular-items__scroll-left-btn {
    left: 0;
    opacity: 0;
    pointer-events: none;

    .popular-items__grid-wrapper--scrolled & {
        opacity: 1;
        pointer-events: all;
    }
}

.popular-items__scroll-right-btn {
    right: 0;
    pointer-events: all;

    .popular-items__grid-wrapper--scrolled-to-end & {
        opacity: 0;
        pointer-events: none;
    }
}
</style>
