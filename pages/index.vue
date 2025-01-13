<script lang="ts" setup>
import type { Product } from '~/types/Product';
import type { Story } from '~/types/Story';
import { PRODUCT_LIST } from '~/gql/queries/product';
import { useListQuery } from '~/composables/useListQuery';

const { items } = useListQuery<Product>(PRODUCT_LIST);

const _radio = ref(false);

const stories = ref<Array<Story>>([
    // TODO: JS add stories
    {
        image: '/images/stories/story.webp',
        link: '#',
    },
    {
        image: '/images/stories/story2.webp',
        link: '#',
    },
    {
        image: '/images/stories/story3.webp',
        link: '#',
    },
    {
        image: '/images/stories/story.webp',
        link: '#',
    },
    {
        image: '/images/stories/story2.webp',
        link: '#',
    },
    {
        image: '/images/stories/story3.webp',
        link: '#',
    },
    {
        image: '/images/stories/story.webp',
        link: '#',
    },
    {
        image: '/images/stories/story.webp',
        link: '#',
    },
    {
        image: '/images/stories/story.webp',
        link: '#',
    },
    {
        image: '/images/stories/story.webp',
        link: '#',
    },
]);

const storiesRef = ref();

const scrollStoriesRight = () => {
    storiesRef.value.scrollLeft += 300;
    if (storiesRef.value.scrollWidth <= storiesRef.value.scrollLeft + storiesRef.value.clientWidth + 20) {
        storiesRef.value.scrollLeft = 0;
    }
};

const scrollStoriesLeft = () => {
    storiesRef.value.scrollLeft -= 300;
    if (storiesRef.value.scrollLeft === 0) {
        storiesRef.value.scrollLeft = storiesRef.value.scrollWidth;
    }
};
</script>
<template>
    <div class="container front-page">
        <h1 class="h1">Главная</h1>
        <div class="front-page__stories">
            <div ref="storiesRef" class="front-page__stories-grid">
                <div v-for="story in stories" :key="story.link" class="front-page__story">
                    <img :src="story.image" alt="" />
                </div>
            </div>
            <BaseIconButton
                icon="angle-left"
                class="front-page__stories-scroll-btn front-page__stories-scroll-left-btn"
                :modifiers="['icon', 'single-icon']"
                @click="scrollStoriesLeft"
            />
            <BaseIconButton
                icon="angle-right"
                class="front-page__stories-scroll-btn front-page__stories-scroll-right-btn"
                :modifiers="['icon', 'single-icon']"
                @click="scrollStoriesRight"
            />
        </div>
        <div v-if="items.length" class="grid grid--product-test">
            <ClientOnly>
                <ProductCard v-for="product in items" :key="product.id" :product="product" />
            </ClientOnly>
        </div>
        <PopularItems />
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.front-page__stories {
    position: relative;
    margin-bottom: 30px;

    @include media.md-up {
        margin-bottom: 60px;
    }

    @include media.lg-up {
        margin-bottom: 80px;
    }
}

.front-page__stories-grid {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow: auto;
    margin-inline: calc(var(--pi-container-xs) * -1);
    padding-inline: var(--pi-container-xs);
    scroll-behavior: smooth;

    @include media.md-up {
        margin-inline: calc(var(--pi-container-md) * -1);
        padding-inline: var(--pi-container-md);
        gap: 15px;
    }

    @include media.lg-up {
        margin-inline: calc(var(--pi-container-lg) * -1);
        padding-inline: var(--pi-container-lg);
        gap: 20px;
    }

    @include media.xl-up {
        margin-inline: 0;
        padding-inline: 0 80px;
        gap: 20px;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: all 0.1s ease-in;

        @include media.xl-up {
            background: var(--c-gradient-white-right);
            opacity: 1;
        }
    }

    &::-webkit-scrollbar {
        @include media.lg-up {
            display: none;
        }
    }
}

.front-page__story {
    min-width: 130px;
    height: 170px;
    background-color: var(--c-grey50);
    border-radius: var(--b-radius);

    @include media.md-up {
        min-width: 180px;
        height: 244px;
    }

    @include media.lg-up {
        min-width: 208px;
        height: 276px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.front-page__stories-scroll-btn {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    height: 38px;
    aspect-ratio: 1;
    background-color: var(--c-grey00);
    border-radius: var(--b-radius-round);
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.1s ease-in;
    z-index: var(--z-middle);

    @include media.md-down {
        display: none;
    }

    &:hover {
        background-color: var(--c-primary);
        color: var(--c-grey00);
    }
}

.front-page__stories-scroll-left-btn {
    left: -20px;
}

.front-page__stories-scroll-right-btn {
    right: -20px;
}
</style>
