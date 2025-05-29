<script setup lang="ts">
import type { Shop } from '~/types/Shop';
import { SHOP_LIST } from '~/gql/queries/shop';
import {
    YandexMap,
    YandexMapControls,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapHint,
    YandexMapMarker,
    YandexMapZoomControl,
} from 'vue-yandex-maps';
import type { YMap } from '@yandex/ymaps3-types';
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';

type Props = {
    activeShop: Shop | null;
};
defineProps<Props>();
const emit = defineEmits(['setShop']);

const { items: shops } = useListQuery<Shop>(SHOP_LIST);

const map = shallowRef<YMap | null>(null);
const LOCATION: YMapLocationRequest = {
    center: [44.50183, 48.71939], // starting position [lng, lat]
    zoom: 12, // starting zoom
};
</script>

<template>
    <div class="shop-map">
        <YandexMap
            v-model="map"
            height="100%"
            :settings="{
                location: LOCATION,
            }"
            width="100%"
        >
            <YandexMapDefaultSchemeLayer />
            <YandexMapDefaultFeaturesLayer />
            <YandexMapControls :settings="{ position: 'right' }">
                <YandexMapZoomControl />
            </YandexMapControls>

            <template v-for="shop in shops" :key="shop.id">
                <YandexMapMarker
                    position="left-center top"
                    :settings="{
                        coordinates: [shop.address.location.longitude, shop.address.location.latitude],
                        id: shop.id.toString(),
                        properties: {
                            hint: shop.name,
                        },
                        onClick: () => {
                            emit('setShop', shop);
                        },
                    }"
                >
                    <span class="shop-icon" :class="{ 'shop-icon--active': activeShop?.id === shop.id }">
                        <img src="/images/mini-logo.png" alt="Рустерс" />
                        <svg class="shop-icon__pin" viewBox="0 0 62 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                id="Vector"
                                d="M31 75L52.92 53.03C57.25 48.68 60.2 43.15 61.4 37.12C62.6 31.1 61.98 24.85 59.64 19.17C57.29 13.5 53.32 8.64 48.22 5.23C43.12 1.82 37.13 0 31 0C24.86 0 18.87 1.82 13.77 5.23C8.67 8.64 4.7 13.5 2.35 19.17C0.01 24.85 -0.61 31.1 0.59 37.12C1.79 43.15 4.74 48.68 9.07 53.03L31 75Z"
                                fill-opacity="1.000000"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </span>
                </YandexMapMarker>
                <YandexMapHint hint-property="hint">
                    <template #default="{ content }">
                        <div class="hint-window" v-html="content" />
                    </template>
                </YandexMapHint>
            </template>
        </YandexMap>
    </div>
</template>

<style scoped lang="scss">
.shop-map {
    width: 500px;
    min-height: 400px;
    height: 100%;
    border-radius: var(--b-radius-lg);
    overflow: clip;
}

.hint-window {
    color: var(--c-grey70);
    background: var(--c-grey00);
    border-radius: var(--b-radius-md);
    position: absolute;
    transform: translate(7px, -100%);
    padding: 6px 8px;
    background: white;
    opacity: 0.5;
    white-space: nowrap;
}

.shop-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 62px;
    height: 75px;

    &:hover {
        cursor: pointer;
    }

    &::before {
        border-radius: 50%;
        background: var(--c-grey00);
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        translate: -50% 6px;
        width: 50px;
        height: 50px;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
        z-index: var(--z-middle);
    }

    img {
        position: relative;
        width: 40px;
        margin-top: 10px;
        height: auto;
        z-index: var(--z-middle);
    }
}

.shop-icon__pin {
    width: 62px;
    height: 75px;
    fill: var(--c-secondary);
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--z-middle-bottom);

    .shop-icon--active & {
        fill: var(--c-primary);
    }
}
</style>
